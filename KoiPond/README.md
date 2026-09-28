# Koi Pond — animated koi wallpaper for macOS

A tiny menu-bar app that turns your desktop into a living koi pond, powered by the
procedural pond simulation from [nagomi](https://github.com/msk1039/nagomi).
The pond sits where your wallpaper is: below your desktop icons and every window.

## Install

Requires macOS 13+ and the Xcode Command Line Tools (`xcode-select --install`).

```bash
cd KoiPond
./build.sh --install      # builds, copies to /Applications, launches
```

A fish icon appears in the menu bar. Quit from there to get your normal wallpaper back.

## Menu

- **Pause / Resume**, **Scatter Fish**
- **Weather**: follow time of day (mist → sunny → sunset → moonlight), or pick a preset
- **Rain Ripples**, **Number of Koi**, **River Ambience** (sound)
- **Click Desktop to Call Fish**: click empty desktop and the koi swim toward the spot
- **Frame Rate**: Smooth / 30 fps / 20 fps
- **Pause on Battery Power**, **Open at Login**

The pond pauses automatically when it's fully covered by windows, when displays sleep,
and when the screen is locked. Each display gets its own pond.

## How it's built

- `Sources/`: Swift/AppKit. One borderless, click-through window per display at
  desktop level, each hosting a WKWebView that serves the bundled pond via a custom
  `koipond://` scheme.
- `Resources/web/`: prebuilt pond (nagomi's simulation + three.js, bundled with a
  UI-free entry point that fills the screen and exposes `window.koipond` to the app).
- `web-src/wallpaper.ts`: that entry point. To rebuild, drop it into nagomi's `src/`
  and run `bun build src/wallpaper.ts --outfile wallpaper.js --minify --format iife`.

## License

The pond simulation is © 2026 Mayank Kadam, used under the PolyForm Noncommercial
License 1.0.0 (see `LICENSE-nagomi.md`). Personal, noncommercial use only.
