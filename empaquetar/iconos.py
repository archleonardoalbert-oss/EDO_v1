"""Arma icono.icns (macOS) y el recurso de icono de Windows (rsrc_windows_amd64.syso) a partir de PNG.

Uso: python3 iconos.py <carpeta con icono-<tamaño>.png> <carpeta del paquete Go>
"""
import struct
import sys
from pathlib import Path

png, destino = Path(sys.argv[1]), Path(sys.argv[2])
leer = lambda t: (png / f"icono-{t}.png").read_bytes()

# ICNS: cabecera «icns» + bloques (tipo, longitud, PNG).
bloques = b"".join(tipo + struct.pack(">I", 8 + len(leer(t))) + leer(t)
                   for tipo, t in [(b"icp4", 16), (b"icp5", 32), (b"icp6", 64), (b"ic07", 128),
                                   (b"ic08", 256), (b"ic09", 512), (b"ic10", 1024)])
(png / "icono.icns").write_bytes(b"icns" + struct.pack(">I", 8 + len(bloques)) + bloques)

# Windows: objeto COFF con una sección .rsrc que contiene RT_GROUP_ICON + RT_ICON (PNG embebidos).
tamanos = [16, 32, 48, 64, 128, 256]
imagenes = [leer(t) for t in tamanos]


def directorio(entradas):
    """Cabecera de directorio de recursos con entradas por id (id, desplazamiento ya con bits)."""
    return struct.pack("<IIHHHH", 0, 0, 0, 0, 0, len(entradas)) + b"".join(
        struct.pack("<II", i, d) for i, d in entradas)


grupo = struct.pack("<HHH", 0, 1, len(tamanos)) + b"".join(
    struct.pack("<BBBBHHIH", t % 256, t % 256, 0, 0, 1, 32, len(img), n + 1)
    for n, (t, img) in enumerate(zip(tamanos, imagenes)))

# Diseño: raíz → tipos (RT_ICON=3, RT_GROUP_ICON=14) → ids → idioma → datos.
datos = [(3, n + 1, img) for n, img in enumerate(imagenes)] + [(14, 1, grupo)]
SUB = 0x80000000
raiz_tam = 16 + 8 * 2
tipos = {3: [d for d in datos if d[0] == 3], 14: [d for d in datos if d[0] == 14]}

partes, pos = [], raiz_tam
dir_tipo = {}
for tipo in (3, 14):
    dir_tipo[tipo] = pos
    pos += 16 + 8 * len(tipos[tipo])
dir_idioma = {}
for d in datos:
    dir_idioma[(d[0], d[1])] = pos
    pos += 16 + 8
entrada_datos = {}
for d in datos:
    entrada_datos[(d[0], d[1])] = pos
    pos += 16
contenido = {}
for d in datos:
    pos = (pos + 7) & ~7
    contenido[(d[0], d[1])] = pos
    pos += len(d[2])

sec = bytearray(pos)
sec[0:raiz_tam] = directorio([(3, SUB | dir_tipo[3]), (14, SUB | dir_tipo[14])])
for tipo in (3, 14):
    b = directorio([(d[1], SUB | dir_idioma[(d[0], d[1])]) for d in tipos[tipo]])
    sec[dir_tipo[tipo]:dir_tipo[tipo] + len(b)] = b
relocs = []
for d in datos:
    k = (d[0], d[1])
    b = directorio([(0x0409, entrada_datos[k])])
    sec[dir_idioma[k]:dir_idioma[k] + len(b)] = b
    sec[entrada_datos[k]:entrada_datos[k] + 16] = struct.pack("<IIII", contenido[k], len(d[2]), 0, 0)
    relocs.append(entrada_datos[k])  # el RVA de los datos se reubica respecto de .rsrc
    sec[contenido[k]:contenido[k] + len(d[2])] = d[2]

# COFF (AMD64): cabecera, una sección, datos, reubicaciones, tabla de símbolos.
cab, sh = 20, 40
datos_off = cab + sh
reloc_off = datos_off + len(sec)
sim_off = reloc_off + 10 * len(relocs)
nombre = b".rsrc\0\0\0"
coff = struct.pack("<HHIIIHH", 0x8664, 1, 0, sim_off, 1, 0, 0)
coff += nombre + struct.pack("<IIIIIIHHI", 0, 0, len(sec), datos_off, reloc_off, 0, len(relocs), 0, 0xC0000040)
coff += bytes(sec)
coff += b"".join(struct.pack("<IIH", r, 0, 3) for r in relocs)  # IMAGE_REL_AMD64_ADDR32NB
coff += nombre + struct.pack("<IhHBB", 0, 1, 0, 3, 0)  # símbolo de sección (estático)
coff += struct.pack("<I", 4)  # tabla de cadenas vacía
(destino / "rsrc_windows_amd64.syso").write_bytes(coff)
