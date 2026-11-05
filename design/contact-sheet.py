"""Builds contact sheets from Playwright evidence for visual QA.
Usage: python design/contact-sheet.py <evidence_dir> <out_dir>
Outputs: desktop-heroes.png (3x3), mobile-heroes.png (9 across), and per-route full-page strips.
"""
import sys
from pathlib import Path
from PIL import Image, ImageDraw

ev, out = Path(sys.argv[1]), Path(sys.argv[2])
out.mkdir(parents=True, exist_ok=True)
routes = ["t02", "t05", "t06", "t07", "t08", "t09", "t10", "t11", "t12"]


def label(img, text):
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, 70, 26], fill=(255, 0, 90))
    d.text((8, 6), text, fill=(255, 255, 255))
    return img


# Desktop heroes 3x3 at 640x400 each
W, H = 640, 400
sheet = Image.new("RGB", (W * 3, H * 3), "white")
for i, r in enumerate(routes):
    im = Image.open(ev / f"{r}-desktop-hero.png").convert("RGB").resize((W, H))
    sheet.paste(label(im, r), ((i % 3) * W, (i // 3) * H))
sheet.save(out / "desktop-heroes.png")

# Mobile heroes in one row at 195x422
w, h = 195, 422
row = Image.new("RGB", (w * 9 + 8 * 6, h), "white")
for i, r in enumerate(routes):
    im = Image.open(ev / f"{r}-mobile-hero.png").convert("RGB").resize((w, h))
    row.paste(label(im, r), (i * (w + 6), 0))
row.save(out / "mobile-heroes.png")

# Full-page desktop strips (3 per sheet), scaled to width 480
for k in range(3):
    group = routes[k * 3:(k + 1) * 3]
    ims = []
    for r in group:
        im = Image.open(ev / f"{r}-desktop.png").convert("RGB")
        sc = 480 / im.width
        ims.append(label(im.resize((480, int(im.height * sc))), r))
    hh = max(i.height for i in ims)
    s = Image.new("RGB", (480 * 3 + 20, hh), "white")
    for j, im in enumerate(ims):
        s.paste(im, (j * 490, 0))
    if hh > 2400:
        s = s.resize((s.width * 2400 // hh, 2400))
    s.save(out / f"full-{'-'.join(group)}.png")
print("ok")
