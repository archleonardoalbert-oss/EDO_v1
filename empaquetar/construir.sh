#!/usr/bin/env bash
# Compila los ejecutables de la Biblioteca de EDO para Windows, macOS y Linux.
#
# Uso: empaquetar/construir.sh <versión> [carpeta de salida]
#      empaquetar/construir.sh 1.0 ../ejecutables/EDO
#
# Necesita Go ≥ 1.22, llvm-lipo (o lipo), rsvg-convert, Python 3 y, para firmar la app de macOS
# sin un Mac, rcodesign (https://github.com/indygreg/apple-platform-rs). Sin rcodesign la app se
# genera igual, pero macOS la dará por «dañada» al descargarla.
set -euo pipefail

VERSION=${1:?indica la versión, p. ej. 1.0}
AQUI=$(cd "$(dirname "$0")" && pwd)
RAIZ=$(dirname "$AQUI")
SALIDA=$(realpath -m "${2:-$RAIZ/../ejecutables/EDO}")
NOMBRE="MatCom_EDO_v${VERSION}"
TMP=$(mktemp -d)
trap 'rm -rf "$TMP" "$AQUI/sitio" "$AQUI"/*.syso' EXIT

# 1. La web que va dentro: solo lo que el navegador necesita.
rm -rf "$AQUI/sitio" && mkdir "$AQUI/sitio"
cp -r "$RAIZ"/{index,libro,tema,ejercicio,valiente}.html "$RAIZ"/favicon.svg \
      "$RAIZ"/{css,motor,escenas,libros,vendor,fuentes} "$AQUI/sitio/"

# 2. Iconos a partir de favicon.svg.
for t in 16 32 48 64 128 256 512 1024; do
  rsvg-convert -w $t -h $t "$RAIZ/favicon.svg" -o "$TMP/icono-$t.png"
done
python3 "$AQUI/iconos.py" "$TMP" "$AQUI"

cd "$AQUI"
LD="-s -w -X main.Version=$VERSION"
export CGO_ENABLED=0  # binarios estáticos: no dependen de la libc de ninguna distro

# 3. Windows (sin consola).
mkdir -p "$SALIDA/Windows"
GOOS=windows GOARCH=amd64 go build -trimpath -ldflags "$LD -H windowsgui" -o "$SALIDA/Windows/${NOMBRE}_Windows.exe"

# 4. Linux: x86-64, estático.
mkdir -p "$SALIDA/Linux"
GOOS=linux GOARCH=amd64 go build -trimpath -ldflags "$LD" -o "$SALIDA/Linux/${NOMBRE}_Linux"
chmod +x "$SALIDA/Linux/${NOMBRE}_Linux"

# 5. macOS: binario universal (Intel + Apple Silicon) dentro de una .app.
GOOS=darwin GOARCH=amd64 go build -trimpath -ldflags "$LD" -o "$TMP/mac-amd64"
GOOS=darwin GOARCH=arm64 go build -trimpath -ldflags "$LD" -o "$TMP/mac-arm64"
APP="$SALIDA/Mac/${NOMBRE}_Mac.app"
rm -rf "$APP" && mkdir -p "$APP/Contents/MacOS" "$APP/Contents/Resources"
LIPO=$(command -v lipo || command -v llvm-lipo)
"$LIPO" -create "$TMP/mac-amd64" "$TMP/mac-arm64" -output "$APP/Contents/MacOS/MatCom_EDO"
chmod +x "$APP/Contents/MacOS/MatCom_EDO"
cp "$TMP/icono.icns" "$APP/Contents/Resources/icono.icns"
cat > "$APP/Contents/Info.plist" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleName</key><string>MatCom EDO</string>
  <key>CFBundleDisplayName</key><string>MatCom EDO</string>
  <key>CFBundleIdentifier</key><string>cu.uh.matcom.edo</string>
  <key>CFBundleVersion</key><string>$VERSION</string>
  <key>CFBundleShortVersionString</key><string>$VERSION</string>
  <key>CFBundleExecutable</key><string>MatCom_EDO</string>
  <key>CFBundleIconFile</key><string>icono</string>
  <key>CFBundlePackageType</key><string>APPL</string>
  <key>LSMinimumSystemVersion</key><string>11.0</string>
  <key>LSUIElement</key><true/>
</dict>
</plist>
EOF
if command -v rcodesign >/dev/null; then
  rcodesign sign "$APP" >/dev/null 2>&1
else
  echo "aviso: sin rcodesign, la app de macOS queda sin firmar" >&2
fi

echo "Listo en $SALIDA:"
find "$SALIDA" -maxdepth 2 -mindepth 2 -exec du -sh {} +
