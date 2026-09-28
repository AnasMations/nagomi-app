import AppKit
import WebKit

/// Serves the bundled pond (Contents/Resources/web) under koipond://app/.
final class BundleSchemeHandler: NSObject, WKURLSchemeHandler {
    private let root: URL

    init(root: URL) {
        self.root = root.standardizedFileURL
    }

    func webView(_ webView: WKWebView, start task: WKURLSchemeTask) {
        guard let url = task.request.url else {
            task.didFailWithError(URLError(.badURL))
            return
        }
        var path = url.path
        if path.isEmpty || path == "/" { path = "/index.html" }
        let file = root.appendingPathComponent(String(path.dropFirst())).standardizedFileURL

        guard file.path.hasPrefix(root.path), let data = try? Data(contentsOf: file) else {
            let response = HTTPURLResponse(url: url, statusCode: 404, httpVersion: "HTTP/1.1", headerFields: nil)!
            task.didReceive(response)
            task.didReceive(Data())
            task.didFinish()
            return
        }

        let headers = [
            "Content-Type": Self.mimeType(for: file.pathExtension),
            "Content-Length": String(data.count),
            "Access-Control-Allow-Origin": "*",
        ]
        let response = HTTPURLResponse(url: url, statusCode: 200, httpVersion: "HTTP/1.1", headerFields: headers)!
        task.didReceive(response)
        task.didReceive(data)
        task.didFinish()
    }

    func webView(_ webView: WKWebView, stop task: WKURLSchemeTask) {}

    private static func mimeType(for ext: String) -> String {
        switch ext.lowercased() {
        case "html": return "text/html; charset=utf-8"
        case "js": return "text/javascript; charset=utf-8"
        case "css": return "text/css; charset=utf-8"
        case "json": return "application/json"
        case "svg": return "image/svg+xml"
        case "png": return "image/png"
        case "m4a": return "audio/mp4"
        case "woff2": return "font/woff2"
        default: return "application/octet-stream"
        }
    }
}

/// Breaks the WKUserContentController -> handler retain cycle.
final class WeakScriptHandler: NSObject, WKScriptMessageHandler {
    weak var target: WKScriptMessageHandler?

    init(_ target: WKScriptMessageHandler) {
        self.target = target
    }

    func userContentController(_ controller: WKUserContentController, didReceive message: WKScriptMessage) {
        target?.userContentController(controller, didReceive: message)
    }
}

/// One borderless, click-through window per display, sitting at desktop level
/// (above the system wallpaper, below desktop icons and every app window).
final class PondWindow: NSObject, WKScriptMessageHandler {
    let screen: NSScreen
    let window: NSWindow
    let webView: WKWebView
    private(set) var isReady = false
    private(set) var isVisible = true

    var onReady: ((PondWindow) -> Void)?
    var onVisibilityChange: ((PondWindow) -> Void)?
    var onMood: ((String) -> Void)?

    init(screen: NSScreen, webRoot: URL) {
        self.screen = screen

        let window = NSWindow(
            contentRect: screen.frame,
            styleMask: [.borderless],
            backing: .buffered,
            defer: false
        )
        window.level = NSWindow.Level(rawValue: Int(CGWindowLevelForKey(.desktopWindow)))
        window.collectionBehavior = [.canJoinAllSpaces, .stationary, .ignoresCycle]
        window.ignoresMouseEvents = true
        window.isOpaque = true
        window.hasShadow = false
        window.backgroundColor = NSColor(red: 0.894, green: 0.906, blue: 0.902, alpha: 1)
        window.isReleasedWhenClosed = false
        window.animationBehavior = .none
        self.window = window

        let config = WKWebViewConfiguration()
        config.setURLSchemeHandler(BundleSchemeHandler(root: webRoot), forURLScheme: "koipond")
        config.mediaTypesRequiringUserActionForPlayback = []
        config.suppressesIncrementalRendering = true
        let webView = WKWebView(frame: NSRect(origin: .zero, size: screen.frame.size), configuration: config)
        webView.autoresizingMask = [.width, .height]
        webView.setValue(false, forKey: "drawsBackground")
        self.webView = webView

        super.init()

        config.userContentController.add(WeakScriptHandler(self), name: "koipond")
        window.contentView = webView
        window.setFrame(screen.frame, display: true)

        NotificationCenter.default.addObserver(
            self,
            selector: #selector(occlusionChanged),
            name: NSWindow.didChangeOcclusionStateNotification,
            object: window
        )

        webView.load(URLRequest(url: URL(string: "koipond://app/index.html")!))
        window.orderFront(nil)
    }

    func close() {
        NotificationCenter.default.removeObserver(self)
        webView.configuration.userContentController.removeScriptMessageHandler(forName: "koipond")
        webView.stopLoading()
        window.orderOut(nil)
        window.close()
    }

    /// Runs `koipond.<call>` in the page once it has loaded.
    func run(_ call: String) {
        guard isReady else { return }
        webView.evaluateJavaScript("window.koipond && window.koipond.\(call)", completionHandler: nil)
    }

    @objc private func occlusionChanged(_ note: Notification) {
        let visible = window.occlusionState.contains(.visible)
        guard visible != isVisible else { return }
        isVisible = visible
        onVisibilityChange?(self)
    }

    func userContentController(_ controller: WKUserContentController, didReceive message: WKScriptMessage) {
        guard let body = message.body as? [String: Any] else { return }
        if let mood = body["mood"] as? String {
            onMood?(mood)
        }
        if body["ready"] as? Bool == true {
            isReady = true
            onReady?(self)
        }
    }
}
