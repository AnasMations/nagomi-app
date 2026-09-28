#!/bin/bash
# Builds "Betta Jar.app". Needs only the Xcode Command Line Tools (no Node, no Xcode project).
#   ./build.sh            -> build/Betta Jar.app
#   ./build.sh --install  -> also copies it to /Applications and launches it
set -euo pipefail
cd "$(dirname "$0")"

if ! command -v swiftc >/dev/null 2>&1; then
  echo "swiftc not found. Install the Xcode Command Line Tools first:  xcode-select --install"
  exit 1
fi

APP="build/Betta Jar.app"
ARCH="$(uname -m)"
echo "Building Betta Jar for ${ARCH}..."

rm -rf "$APP"
mkdir -p "$APP/Contents/MacOS" "$APP/Contents/Resources"

swiftc -O -swift-version 5 \
  -target "${ARCH}-apple-macos13.0" \
  -framework AppKit -framework WebKit -framework ServiceManagement -framework IOKit \
  -o "$APP/Contents/MacOS/KoiPond" \
  Sources/*.swift

cp Info.plist "$APP/Contents/Info.plist"
cp Resources/AppIcon.icns "$APP/Contents/Resources/AppIcon.icns"
cp -R Resources/web "$APP/Contents/Resources/web"
cp LICENSE-nagomi.md "$APP/Contents/Resources/"

codesign --force --deep --sign - "$APP" >/dev/null
echo "Built: $APP"

if [[ "${1:-}" == "--install" ]]; then
  pkill -x KoiPond 2>/dev/null || true
  rm -rf "/Applications/Koi Pond.app" "/Applications/Betta Jar.app"
  ditto "$APP" "/Applications/Betta Jar.app"
  open "/Applications/Betta Jar.app"
  echo "Installed to /Applications and launched. Look for the fish icon in your menu bar."
fi
