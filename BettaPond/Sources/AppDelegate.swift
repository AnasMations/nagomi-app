import AppKit
import IOKit.ps
import ServiceManagement

private enum Prefs {
    static let paused = "paused"
    static let weather = "weather"          // "auto" or a preset id
    static let rain = "rain"
    static let koiCount = "koiCount"        // 0 = pond default
    static let sound = "sound"
    static let clickToCall = "clickToCall"
    static let frameRate = "frameRate"      // 0 = display refresh rate
    static let pauseOnBattery = "pauseOnBattery"
}

private let weatherPresets: [(id: String, label: String)] = [
    ("sunny", "Daylight"),
    ("deep-clear", "Cool Morning"),
    ("overcast", "Overcast"),
    ("mist", "Soft Haze"),
    ("sunset", "Golden Hour"),
    ("moonlight", "Night"),
    ("rain", "Rainy Day"),
]

private let frameRates: [(fps: Int, label: String)] = [
    (0, "Smooth (display refresh rate)"),
    (30, "Balanced (30 fps)"),
    (20, "Battery Saver (20 fps)"),
]

final class AppDelegate: NSObject, NSApplicationDelegate, NSMenuDelegate {
    private var ponds: [PondWindow] = []
    private var statusItem: NSStatusItem!
    private var mouseMonitors: [Any] = []
    private var mood = "happy"
    private weak var activePond: PondWindow?
    private var weatherTimer: Timer?
    private var powerTimer: Timer?
    private var screensAsleep = false
    private var onBattery = false
    private let defaults = UserDefaults.standard

    private var webRoot: URL {
        Bundle.main.resourceURL!.appendingPathComponent("web", isDirectory: true)
    }

    // MARK: - Lifecycle

    func applicationDidFinishLaunching(_ notification: Notification) {
        defaults.register(defaults: [
            Prefs.paused: false,
            Prefs.weather: "auto",
            Prefs.rain: false,
            Prefs.koiCount: 0,
            Prefs.sound: false,
            Prefs.clickToCall: true,
            Prefs.frameRate: 0,
            Prefs.pauseOnBattery: false,
        ])

        setUpStatusItem()
        rebuildPonds()
        updateClickMonitor()
        refreshPowerSource()

        NotificationCenter.default.addObserver(
            self, selector: #selector(screensChanged),
            name: NSApplication.didChangeScreenParametersNotification, object: nil)

        let ws = NSWorkspace.shared.notificationCenter
        ws.addObserver(self, selector: #selector(screensSlept), name: NSWorkspace.screensDidSleepNotification, object: nil)
        ws.addObserver(self, selector: #selector(screensWoke), name: NSWorkspace.screensDidWakeNotification, object: nil)
        ws.addObserver(self, selector: #selector(screensSlept), name: NSWorkspace.sessionDidResignActiveNotification, object: nil)
        ws.addObserver(self, selector: #selector(screensWoke), name: NSWorkspace.sessionDidBecomeActiveNotification, object: nil)
        ws.addObserver(self, selector: #selector(spaceChanged), name: NSWorkspace.activeSpaceDidChangeNotification, object: nil)

        weatherTimer = Timer.scheduledTimer(withTimeInterval: 60, repeats: true) { [weak self] _ in
            self?.applyAutoWeatherIfNeeded()
        }
        powerTimer = Timer.scheduledTimer(withTimeInterval: 20, repeats: true) { [weak self] _ in
            self?.refreshPowerSource()
        }
    }

    func applicationWillTerminate(_ notification: Notification) {
        ponds.forEach { $0.close() }
    }

    // MARK: - Windows

    private func rebuildPonds() {
        activePond = nil
        ponds.forEach { $0.close() }
        ponds = NSScreen.screens.map { screen in
            let pond = PondWindow(screen: screen, webRoot: webRoot)
            pond.onReady = { [weak self] pond in self?.pushAllSettings(to: pond) }
            pond.onVisibilityChange = { [weak self] pond in self?.updatePause(for: pond) }
            pond.onMood = { [weak self] mood in self?.mood = mood }
            return pond
        }
    }

    @objc private func screensChanged() {
        // Give the window server a moment to settle after a display change.
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) { [weak self] in self?.rebuildPonds() }
    }

    @objc private func spaceChanged() {
        ponds.forEach { $0.window.orderFront(nil) }
    }

    @objc private func screensSlept() {
        screensAsleep = true
        ponds.forEach(updatePause)
    }

    @objc private func screensWoke() {
        screensAsleep = false
        ponds.forEach(updatePause)
    }

    // MARK: - Pushing state into the pond

    private func pushAllSettings(to pond: PondWindow) {
        pond.run("setWeather('\(currentWeatherID())')")
        pond.run("setRain(\(defaults.bool(forKey: Prefs.rain)))")
        pond.run("setFrameCap(\(defaults.integer(forKey: Prefs.frameRate)))")
        pond.run("setSound(\(defaults.bool(forKey: Prefs.sound) && pond === ponds.first))")
        updatePause(for: pond)
    }

    private func updatePause(for pond: PondWindow) {
        let paused = defaults.bool(forKey: Prefs.paused)
            || screensAsleep
            || !pond.isVisible
            || (onBattery && defaults.bool(forKey: Prefs.pauseOnBattery))
        pond.run("setPaused(\(paused))")
    }

    private func broadcast(_ call: String) {
        ponds.forEach { $0.run(call) }
    }

    // MARK: - Weather

    private func currentWeatherID() -> String {
        let choice = defaults.string(forKey: Prefs.weather) ?? "auto"
        return choice == "auto" ? Self.weatherForTimeOfDay() : choice
    }

    private static func weatherForTimeOfDay(_ date: Date = Date()) -> String {
        let hour = Calendar.current.component(.hour, from: date)
        switch hour {
        case 5..<7: return "mist"
        case 7..<17: return "sunny"
        case 17..<19: return "sunset"
        default: return "moonlight"
        }
    }

    private var lastAutoWeather: String?

    private func applyAutoWeatherIfNeeded() {
        guard defaults.string(forKey: Prefs.weather) == "auto" else { return }
        let id = Self.weatherForTimeOfDay()
        guard id != lastAutoWeather else { return }
        lastAutoWeather = id
        broadcast("setWeather('\(id)')")
    }

    // MARK: - Power

    private func refreshPowerSource() {
        guard let info = IOPSCopyPowerSourcesInfo()?.takeRetainedValue(),
              let source = IOPSGetProvidingPowerSourceType(info)?.takeUnretainedValue()
        else { return }
        let battery = (source as String) == kIOPSBatteryPowerValue
        guard battery != onBattery else { return }
        onBattery = battery
        ponds.forEach(updatePause)
    }

    // MARK: - Desktop interaction: click to call the betta, drag to move the jar

    private func updateClickMonitor() {
        if defaults.bool(forKey: Prefs.clickToCall) {
            guard mouseMonitors.isEmpty else { return }
            let down = NSEvent.addGlobalMonitorForEvents(matching: .leftMouseDown) { [weak self] _ in
                self?.handleMouseDown()
            }
            let drag = NSEvent.addGlobalMonitorForEvents(matching: .leftMouseDragged) { [weak self] _ in
                self?.handleMouseDragged()
            }
            let up = NSEvent.addGlobalMonitorForEvents(matching: .leftMouseUp) { [weak self] _ in
                self?.handleMouseUp()
            }
            mouseMonitors = [down, drag, up].compactMap { $0 }
        } else {
            mouseMonitors.forEach { NSEvent.removeMonitor($0) }
            mouseMonitors = []
            handleMouseUp()
        }
    }

    /// Mouse position as fractions of the pond's screen (y from the top).
    private func fractions(in pond: PondWindow) -> (Double, Double) {
        let point = NSEvent.mouseLocation
        let frame = pond.screen.frame
        return ((point.x - frame.minX) / frame.width, 1 - (point.y - frame.minY) / frame.height)
    }

    private func handleMouseDown() {
        let point = NSEvent.mouseLocation
        guard let pond = ponds.first(where: { NSMouseInRect(point, $0.screen.frame, false) }),
              Self.desktopIsExposed(at: point)
        else { return }
        activePond = pond
        let (fx, fy) = fractions(in: pond)
        pond.run("pointerDown(\(fx), \(fy))")
    }

    private func handleMouseDragged() {
        guard let pond = activePond else { return }
        let (fx, fy) = fractions(in: pond)
        pond.run("pointerMove(\(fx), \(fy))")
    }

    private func handleMouseUp() {
        activePond?.run("pointerUp()")
        activePond = nil
    }

    /// True when no app window, menu bar, or Dock sits under the point,
    /// i.e. the click landed on the desktop itself.
    private static func desktopIsExposed(at point: NSPoint) -> Bool {
        guard let primary = NSScreen.screens.first,
              let list = CGWindowListCopyWindowInfo([.optionOnScreenOnly, .excludeDesktopElements], kCGNullWindowID)
                as? [[String: Any]]
        else { return false }
        let cgPoint = CGPoint(x: point.x, y: primary.frame.maxY - point.y)
        let displayBounds = NSScreen.screens.map { screen in
            CGRect(x: screen.frame.minX, y: primary.frame.maxY - screen.frame.maxY,
                   width: screen.frame.width, height: screen.frame.height)
        }
        let ownPID = ProcessInfo.processInfo.processIdentifier
        for info in list {
            if (info[kCGWindowOwnerPID as String] as? Int32) == ownPID { continue }
            let layer = info[kCGWindowLayer as String] as? Int ?? 0
            if layer < 0 { continue }
            if (info[kCGWindowAlpha as String] as? Double ?? 1) < 0.01 { continue }
            guard let dict = info[kCGWindowBounds as String] as? NSDictionary,
                  let bounds = CGRect(dictionaryRepresentation: dict)
            else { continue }
            // Skip transparent system overlays that span a whole display above
            // normal windows (full-screen apps live on layer 0 and still count).
            if layer > 0 && displayBounds.contains(where: { $0 == bounds }) { continue }
            if bounds.contains(cgPoint) { return false }
        }
        return true
    }

    // MARK: - Menu bar

    private func setUpStatusItem() {
        statusItem = NSStatusBar.system.statusItem(withLength: NSStatusItem.squareLength)
        if let button = statusItem.button {
            if let image = NSImage(systemSymbolName: "fish", accessibilityDescription: "Betta Jar") {
                image.isTemplate = true
                button.image = image
            } else {
                button.title = "鯉"
            }
        }
        let menu = NSMenu()
        menu.delegate = self
        statusItem.menu = menu
    }

    func menuNeedsUpdate(_ menu: NSMenu) {
        menu.removeAllItems()
        let paused = defaults.bool(forKey: Prefs.paused)

        let moodText: String
        switch mood {
        case "sad": moodText = "She's sad and lonely. Play with her!"
        case "lonely": moodText = "She's getting bored…"
        default: moodText = "She's happy"
        }
        let moodItem = NSMenuItem(title: moodText, action: nil, keyEquivalent: "")
        moodItem.isEnabled = false
        menu.addItem(moodItem)
        menu.addItem(.separator())

        menu.addItem(item(paused ? "Resume" : "Pause", #selector(togglePause), key: "p"))
        menu.addItem(item("Startle the Betta", #selector(scatter), key: "s"))
        menu.addItem(item("Settle the Jar", #selector(resetJar), key: "r"))
        menu.addItem(.separator())

        // Weather
        let weatherMenu = NSMenu()
        let choice = defaults.string(forKey: Prefs.weather) ?? "auto"
        let auto = item("Follow Time of Day", #selector(chooseWeather(_:)))
        auto.representedObject = "auto"
        auto.state = choice == "auto" ? .on : .off
        weatherMenu.addItem(auto)
        weatherMenu.addItem(.separator())
        for preset in weatherPresets {
            let entry = item(preset.label, #selector(chooseWeather(_:)))
            entry.representedObject = preset.id
            entry.state = choice == preset.id ? .on : .off
            weatherMenu.addItem(entry)
        }
        menu.addItem(submenu("Lighting", weatherMenu))

        let rain = item("Air Bubbles", #selector(toggleRain))
        rain.state = defaults.bool(forKey: Prefs.rain) ? .on : .off
        menu.addItem(rain)

        let sound = item("Water Ambience", #selector(toggleSound))
        sound.state = defaults.bool(forKey: Prefs.sound) ? .on : .off
        menu.addItem(sound)
        menu.addItem(.separator())

        let click = item("Click Betta / Drag Jar on Desktop", #selector(toggleClickToCall))
        click.state = defaults.bool(forKey: Prefs.clickToCall) ? .on : .off
        menu.addItem(click)

        let fpsMenu = NSMenu()
        let fps = defaults.integer(forKey: Prefs.frameRate)
        for option in frameRates {
            let entry = item(option.label, #selector(chooseFrameRate(_:)))
            entry.tag = option.fps
            entry.state = fps == option.fps ? .on : .off
            fpsMenu.addItem(entry)
        }
        menu.addItem(submenu("Frame Rate", fpsMenu))

        let battery = item("Pause on Battery Power", #selector(togglePauseOnBattery))
        battery.state = defaults.bool(forKey: Prefs.pauseOnBattery) ? .on : .off
        menu.addItem(battery)

        let login = item("Open at Login", #selector(toggleLaunchAtLogin))
        login.state = SMAppService.mainApp.status == .enabled ? .on : .off
        menu.addItem(login)
        menu.addItem(.separator())

        menu.addItem(item("About Betta Jar", #selector(showAbout)))
        menu.addItem(item("Quit Betta Jar", #selector(NSApplication.terminate(_:)), key: "q"))
    }

    private func item(_ title: String, _ action: Selector, key: String = "") -> NSMenuItem {
        let entry = NSMenuItem(title: title, action: action, keyEquivalent: key)
        entry.target = action == #selector(NSApplication.terminate(_:)) ? NSApp : self
        return entry
    }

    private func submenu(_ title: String, _ menu: NSMenu) -> NSMenuItem {
        let entry = NSMenuItem(title: title, action: nil, keyEquivalent: "")
        entry.submenu = menu
        return entry
    }

    // MARK: - Menu actions

    @objc private func togglePause() {
        defaults.set(!defaults.bool(forKey: Prefs.paused), forKey: Prefs.paused)
        ponds.forEach(updatePause)
    }

    @objc private func scatter() {
        broadcast("scatter()")
    }

    @objc private func resetJar() {
        broadcast("reset()")
    }

    @objc private func chooseWeather(_ sender: NSMenuItem) {
        guard let id = sender.representedObject as? String else { return }
        defaults.set(id, forKey: Prefs.weather)
        lastAutoWeather = nil
        broadcast("setWeather('\(currentWeatherID())')")
    }

    @objc private func toggleRain() {
        let on = !defaults.bool(forKey: Prefs.rain)
        defaults.set(on, forKey: Prefs.rain)
        broadcast("setRain(\(on))")
    }

    @objc private func toggleSound() {
        let on = !defaults.bool(forKey: Prefs.sound)
        defaults.set(on, forKey: Prefs.sound)
        // Only the main display's pond plays audio, so it never doubles up.
        ponds.first?.run("setSound(\(on))")
    }

    @objc private func toggleClickToCall() {
        defaults.set(!defaults.bool(forKey: Prefs.clickToCall), forKey: Prefs.clickToCall)
        updateClickMonitor()
    }

    @objc private func chooseFrameRate(_ sender: NSMenuItem) {
        defaults.set(sender.tag, forKey: Prefs.frameRate)
        broadcast("setFrameCap(\(sender.tag))")
    }

    @objc private func togglePauseOnBattery() {
        defaults.set(!defaults.bool(forKey: Prefs.pauseOnBattery), forKey: Prefs.pauseOnBattery)
        refreshPowerSource()
        ponds.forEach(updatePause)
    }

    @objc private func toggleLaunchAtLogin() {
        let service = SMAppService.mainApp
        do {
            if service.status == .enabled {
                try service.unregister()
            } else {
                try service.register()
            }
        } catch {
            let alert = NSAlert()
            alert.messageText = "Couldn't change the login item"
            alert.informativeText = "\(error.localizedDescription)\n\nTip: move Betta Jar to your Applications folder first, or add it manually in System Settings → General → Login Items."
            NSApp.activate(ignoringOtherApps: true)
            alert.runModal()
        }
    }

    @objc private func showAbout() {
        let credits = NSAttributedString(
            string: "A betta in a hanging jar, living on your desktop.\n\nInspired by “nagomi” by Mayank Kadam (github.com/msk1039/nagomi); ambient audio from nagomi, used under the PolyForm Noncommercial License 1.0.0.",
            attributes: [.font: NSFont.systemFont(ofSize: 11)]
        )
        NSApp.activate(ignoringOtherApps: true)
        NSApp.orderFrontStandardAboutPanel(options: [
            .applicationName: "Betta Jar",
            .credits: credits,
        ])
    }
}
