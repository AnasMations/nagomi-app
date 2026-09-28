# Betta Jar — a living desktop background for macOS

A tiny menu-bar app that puts a glass jar on your desktop, hanging from a braided
rope against a tiled wall, with one dark-blue betta living inside. The scene sits
where your wallpaper is: below your desktop icons and every window.

## Install

Requires macOS 13+ and the Xcode Command Line Tools (`xcode-select --install`).

```bash
cd BettaPond
./build.sh --install      # builds, copies to /Applications, launches
```

A fish icon appears in the menu bar. Quit from there to get your normal wallpaper back.

## What the betta does

It wanders, hovers with its fins draped, rests near the sand, swims up to gulp air
at the surface (bettas breathe air), and now and then flares its fins and gills.
Click empty desktop and it swims toward the spot. There's a bubble nest at the surface.

## Her mood

Bettas get bored. If nobody plays with her (clicking her or moving her jar) for
about 10 minutes she starts to fade: over the next half hour she turns dull and
dark, clamps her fins and tail tight, shows pale stress stripes, stops tending her
bubble nest, and mopes in a bottom corner. Play with her and her colour and fins
come right back, and she flares happily at you. The menu shows how she's feeling.

## Moving the jar

Press on the jar (on an empty part of the desktop) and drag: it hangs from its two
ropes like a real pendulum. Pull it sideways and let go to set it swinging, lift it
and the ropes go slack, flick it and the water sloshes while the betta gets jostled
(and darts off if you shake too hard). **Settle the Jar** in the menu puts it back.

Note: macOS still draws Finder's selection rectangle while you drag on the desktop.

## Menu

- **Pause / Resume**, **Startle the Betta**, **Settle the Jar**
- **Lighting**: follow time of day (haze → daylight → golden hour → night) or pick one
- **Air Bubbles**, **Water Ambience** (sound)
- **Click Betta / Drag Jar on Desktop**
- **Frame Rate**, **Pause on Battery Power**, **Open at Login**

It pauses automatically when the desktop is fully covered, when displays sleep, and
when the screen is locked.

## How it's built

- `Sources/`: Swift/AppKit. One borderless, click-through window per display at
  desktop level, each hosting a WKWebView that serves the scene from the app bundle
  via a custom `koipond://` scheme.
- `web-src/betta-jar.ts`: the scene: plain Canvas 2D, no dependencies. Static art
  (wall, rope, glass, lid) is cached to bitmaps; the fish, water, bubbles and the
  two hanging ropes are drawn each frame. The jar is a rigid body on two
  inextensible ropes, simulated with position-based dynamics. Rebuild with
  `bun build web-src/betta-jar.ts --outfile Resources/web/betta-jar.js --minify --format iife`.
- `Resources/web/`: the built scene plus the ambient audio.

## Credits

Inspired by [nagomi](https://github.com/msk1039/nagomi) by Mayank Kadam. The ambient
audio comes from nagomi and is used under the PolyForm Noncommercial License 1.0.0
(see `LICENSE-nagomi.md`). Personal, noncommercial use.
