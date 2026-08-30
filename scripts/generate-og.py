#!/usr/bin/env python3
"""
generate-og.py — deterministic Open Graph share cards.

Why a build-time script and not next/og at runtime: these images change only
when the copy changes, so paying an edge render per share is waste, and
embedding fonts in an edge bundle is a fragile dependency. Run this, commit
the PNGs, done. CI asserts they stay 1200x630.

    pip install pillow && python3 scripts/generate-og.py
"""
import math
from PIL import Image, ImageDraw, ImageFont

SS = 2
W, H = 1200 * SS, 630 * SS
FONTS = "/usr/share/fonts/truetype/dejavu/"
SERIF_B, SANS, SANS_B, MONO = (
    FONTS + "DejaVuSerif-Bold.ttf",
    FONTS + "DejaVuSans.ttf",
    FONTS + "DejaVuSans-Bold.ttf",
    FONTS + "DejaVuSansMono.ttf",
)
CREAM, MUTED, TERRA = (0xF6, 0xEF, 0xE4), (0x9F, 0xB0, 0xC4), (0xE8, 0x9A, 0x7F)

CARDS = [
    ("og.png", "THE GRIMALDI NETWORK · PERSONAL SURFACE",
     ["Vincenzo Ceccarelli", "Grimaldi"],
     "Electrical Engineer — Frankfurt am Main",
     "Grid digitalisation · Physics-informed cyber-physical systems"),
    ("og-books.png", "TWO MANUSCRIPTS · IN REVISION",
     ["The books, with", "public receipts"],
     "Every load-bearing claim has runnable proof",
     "Eleven public chapter proof-engine repositories"),
    ("og-renewables.png", "MANUSCRIPT · IN REVISION",
     ["The Renewables", "Migration"],
     "Don’t trust the book — run it",
     "11 chapter proof engines recompute every number"),
    ("og-orbital.png", "MANUSCRIPT · IN REVISION",
     ["The Orbital AI", "Compute Roadmap"],
     "The terrestrial trilemma of AI compute",
     "Inertia · copper · heat — and what comes after"),
    ("og-now.png", "NOW",
     ["What I’m", "doing now"],
     "Grid digitalisation · the books · the network",
     "A living page, updated as the work changes"),
    ("og-topics.png", "TOPICS · REFERENCE EXPLAINERS",
     ["The engineering,", "explained"],
     "Grid stability · IT/OT security · digitalisation",
     "Every claim carries its source"),
    ("og-contact.png", "CONTACT",
     ["Start a", "conversation"],
     "Hiring · advisory · press · the books",
     "Replies from Frankfurt, within two working days"),
]


def font(path, size):
    return ImageFont.truetype(path, size * SS)


def tile(draw, x0, y0, s):
    """The Grimaldi mark: geometric V+G on the ink tile, gradient waveform."""
    k = s / 96.0
    draw.rounded_rectangle([x0, y0, x0 + s, y0 + s], radius=22 * k,
                           fill=(0x1A, 0x24, 0x34), outline=(0x3B, 0x46, 0x5C),
                           width=max(1, int(2 * k)))
    lw = int(8 * k)
    draw.line([(x0 + 24 * k, y0 + 28 * k), (x0 + 37 * k, y0 + 58 * k)], fill="white", width=lw)
    draw.line([(x0 + 37 * k, y0 + 58 * k), (x0 + 50 * k, y0 + 28 * k)], fill="white", width=lw)
    draw.arc([x0 + 50 * k, y0 + 30 * k, x0 + 82 * k, y0 + 62 * k], start=-38, end=270, fill="white", width=lw)
    draw.line([(x0 + 69 * k, y0 + 46 * k), (x0 + 82 * k, y0 + 46 * k)], fill="white", width=lw)
    cols = [(0x7A, 0x52, 0xF4), (0x38, 0xBD, 0xF8), (0x34, 0xD3, 0x99)]
    n, pts = 200, []
    for i in range(n + 1):
        t = i / n
        pts.append((x0 + (22 + 52 * t) * k, y0 + 76 * k - math.sin(t * math.pi * 4) * 4.0 * k))
    lw2 = max(2, int(4.5 * k))
    for i in range(n):
        t = i / n
        c0, c1, tt = (cols[0], cols[1], t * 2) if t < .5 else (cols[1], cols[2], (t - .5) * 2)
        col = tuple(int(a + (b - a) * tt) for a, b in zip(c0, c1))
        draw.line([pts[i], pts[i + 1]], fill=col, width=lw2)
        draw.ellipse([pts[i][0] - lw2 / 2, pts[i][1] - lw2 / 2,
                      pts[i][0] + lw2 / 2, pts[i][1] + lw2 / 2], fill=col)


def card(filename, kicker, headline, lead, sub):
    img = Image.new("RGB", (W, H))
    d = ImageDraw.Draw(img)
    for y in range(H):
        t = y / H
        d.line([(0, y), (W, y)],
               fill=tuple(int(a + (b - a) * t) for a, b in zip((0x23, 0x2F, 0x3E), (0x12, 0x19, 0x2A))))

    tile(d, 1200 * SS - 190 * SS - 70 * SS, 70 * SS, 190 * SS)

    x, maxw = 80 * SS, 830 * SS
    d.text((x, 110 * SS), kicker, font=font(SANS_B, 21), fill=TERRA)

    size = 74
    while size > 34 and any(d.textlength(l, font=font(SERIF_B, size)) > maxw for l in headline):
        size -= 2
    f = font(SERIF_B, size)
    for i, line in enumerate(headline):
        d.text((x, (160 + i * (size + 18)) * SS), line, font=f, fill=CREAM)

    y2 = 160 + len(headline) * size + (len(headline) - 1) * 18 + 46
    d.text((x, y2 * SS), lead, font=font(SANS_B, 32), fill=CREAM)
    d.text((x, (y2 + 48) * SS), sub, font=font(SANS, 25), fill=MUTED)

    d.line([(x, 532 * SS), (1120 * SS, 532 * SS)], fill=(0x3B, 0x46, 0x5C), width=2 * SS)
    d.text((x, 556 * SS), "grimaldi.ca", font=font(MONO, 25), fill=CREAM)
    d.text((x + 250 * SS, 556 * SS), "igrimaldi.engineering", font=font(MONO, 25), fill=MUTED)
    d.text((x + 690 * SS, 556 * SS), "engineeringgrimaldi.com", font=font(MONO, 25), fill=MUTED)

    img.resize((1200, 630), Image.LANCZOS).save(f"public/{filename}", optimize=True)
    print(f"  public/{filename}")


if __name__ == "__main__":
    print("Generating Open Graph cards (1200x630):")
    for args in CARDS:
        card(*args)
