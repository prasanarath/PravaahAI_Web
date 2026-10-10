"""
Prepare web-ready brand assets from the supplied source logos.

Source files (project root, untouched):
  Pravaaha_log.png  - full Pravaah AI lockup on a white background (RGB)
  ent-logo.png      - ENT logo with transparency (RGBA)

Outputs:
  src/assets/logos/pravaah-mark.png / .webp   - the "P" mark, background removed
  src/assets/logos/ent-logo.png / .webp       - ENT logo, trimmed
  public/favicon-32.png, apple-touch-icon.png, icon-512.png
  public/og-image.png                          - full lockup on a 1200x630 canvas

The white background of the Pravaah logo is "unblended" into alpha so the mark's
fading streamlines survive on dark surfaces. Small light highlights inside the
solid ribbon are kept opaque so the mark does not turn translucent in dark mode.

Run:  python scripts/prepare-brand-assets.py
"""
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage

ROOT = Path(__file__).resolve().parent.parent
LOGOS = ROOT / "src" / "assets" / "logos"
PUBLIC = ROOT / "public"
LOGOS.mkdir(parents=True, exist_ok=True)
PUBLIC.mkdir(parents=True, exist_ok=True)

WHITE = 254.0  # measured background level of the source logo


def unblend_from_white(rgb: np.ndarray) -> np.ndarray:
    """Recover RGBA from an image composited over white."""
    rgb = rgb.astype(np.float64)
    alpha = np.clip((WHITE - rgb).max(axis=2) / WHITE, 0.0, 1.0)
    alpha[alpha < 0.03] = 0.0

    # Keep the solid body of the mark opaque: fill small light "holes" (sheen,
    # highlights) that are fully enclosed by solid pixels. The P counter is large
    # and stays transparent.
    solid = alpha > 0.35
    holes = ~solid
    labels, n = ndimage.label(holes)
    sizes = ndimage.sum(np.ones_like(labels), labels, index=np.arange(1, n + 1))
    h, w = labels.shape
    border = set(np.unique(np.concatenate([labels[0], labels[-1], labels[:, 0], labels[:, -1]])))
    fill = np.zeros_like(solid)
    for idx, size in enumerate(sizes, start=1):
        if idx not in border and size < 1500:
            fill |= labels == idx
    opaque_rgb = rgb.copy()

    safe = np.where(alpha > 0, alpha, 1.0)[..., None]
    color = (rgb - WHITE * (1.0 - alpha[..., None])) / safe
    color = np.clip(color, 0, 255)

    # Filled highlights: original colour, fully opaque.
    color[fill] = opaque_rgb[fill]
    alpha[fill] = 1.0

    out = np.dstack([color, alpha * 255.0]).round().astype(np.uint8)
    return out


def trim(img: Image.Image, pad: int = 0) -> Image.Image:
    bbox = img.getchannel("A").point(lambda a: 255 if a > 6 else 0).getbbox()
    img = img.crop(bbox)
    if pad:
        canvas = Image.new("RGBA", (img.width + 2 * pad, img.height + 2 * pad), (0, 0, 0, 0))
        canvas.paste(img, (pad, pad))
        img = canvas
    return img


def save_pair(img: Image.Image, stem: str, max_h: int) -> None:
    if img.height > max_h:
        img = img.resize((round(img.width * max_h / img.height), max_h), Image.LANCZOS)
    img.save(LOGOS / f"{stem}.png", optimize=True)
    img.save(LOGOS / f"{stem}.webp", quality=90, method=6)
    print(f"{stem}: {img.size}")


# --- Pravaah mark -----------------------------------------------------------
src = Image.open(ROOT / "Pravaaha_log.png").convert("RGB")
arr = np.array(src)

# The wordmark starts at x=730 for rows >= 300; the mark's cubes reach x=771
# above that. Mask out everything that belongs to the wordmark.
mask = np.zeros(arr.shape[:2], dtype=bool)
mask[:300, :785] = True
mask[300:, :715] = True
mark_rgb = np.where(mask[..., None], arr, 255).astype(np.uint8)
mark = Image.fromarray(unblend_from_white(mark_rgb), "RGBA")
mark = trim(mark, pad=4)
save_pair(mark, "pravaah-mark", max_h=256)

# Icons: square canvas, mark centred.
def square_icon(size: int, pad_ratio: float = 0.08) -> Image.Image:
    inner = int(size * (1 - 2 * pad_ratio))
    m = mark.copy()
    scale = inner / max(m.width, m.height)
    m = m.resize((max(1, round(m.width * scale)), max(1, round(m.height * scale))), Image.LANCZOS)
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    canvas.paste(m, ((size - m.width) // 2, (size - m.height) // 2), m)
    return canvas

square_icon(32, 0.02).save(PUBLIC / "favicon-32.png", optimize=True)
square_icon(512).save(PUBLIC / "icon-512.png", optimize=True)
# Apple touch icons are shown on an opaque tile; use the light brand surface.
touch = Image.new("RGBA", (180, 180), (246, 245, 241, 255))
ti = square_icon(180, 0.14)
touch.paste(ti, (0, 0), ti)
touch.convert("RGB").save(PUBLIC / "apple-touch-icon.png", optimize=True)

# --- ENT logo ---------------------------------------------------------------
ent = Image.open(ROOT / "ent-logo.png").convert("RGBA")
ent = trim(ent, pad=2)
save_pair(ent, "ent-logo", max_h=120)

# --- Open Graph image: the full, unmodified lockup on its native white -------
og = Image.new("RGB", (1200, 630), (254, 254, 254))
full = src.crop((60, 95, 2050, 620))
scale = 1080 / full.width
full = full.resize((1080, round(full.height * scale)), Image.LANCZOS)
og.paste(full, ((1200 - full.width) // 2, (630 - full.height) // 2))
og.save(PUBLIC / "og-image.png", optimize=True)
print("og-image:", og.size)
