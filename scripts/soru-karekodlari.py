#!/usr/bin/env python3
"""Panel soru karekodları: output/karekod/<slug>.png + yazdırılabilir HTML (A5 başına bir oturum).
Kullanım: python scripts/soru-karekodlari.py"""
import os

import segno

BASE = "https://www.hidrojenzirvesi.com/soru/"
OUT = "output/karekod"
OT = [
    ("keynote-dincer", "Keynote", "Prof. Dr. İbrahim Dinçer", "22 Ekim · 11:15"),
    ("keynote-veziroglu", "Keynote", "Dr. Ayfer Veziroğlu", "22 Ekim · 13:30"),
    ("panel-1", "Panel 1", "Türkiye Hidrojen Yol Haritası 2035", "22 Ekim · 14:30"),
    ("panel-2", "Panel 2", "Savunma Sanayinde Hidrojen Teknolojileri", "22 Ekim · 16:15"),
    ("panel-3", "Panel 3", "Yeşil Hidrojen Üretimi ve Endüstriyel Uygulamalar", "23 Ekim · 10:30"),
    ("panel-4", "Panel 4", "Sanayide Hidrojen Kullanımı", "23 Ekim · 14:00"),
    ("panel-5", "Panel 5", "Hidrojen Ekonomisi, Ar-Ge ve Ticarileşme", "23 Ekim · 15:30"),
]
os.makedirs(OUT, exist_ok=True)
sayfalar = []
for slug, etiket, baslik, zaman in OT:
    q = segno.make(BASE + slug, error="m")
    q.save(f"{OUT}/{slug}.png", scale=24, border=2, dark="#0B1A3C")
    q.save(f"{OUT}/{slug}.svg", scale=24, border=2, dark="#0B1A3C")
    sayfalar.append(f"""<section class="s">
  <div class="et">{etiket}</div>
  <h1>{baslik}</h1>
  <div class="z">{zaman}</div>
  <img src="{slug}.png" alt="">
  <p class="a">Sorunuz için karekodu telefonunuzla okutun</p>
  <p class="u">{BASE.replace('https://', '')}{slug}</p>
  <div class="f">Türkiye Hidrojen Zirvesi 2026</div>
</section>""")

html = f"""<!doctype html><html lang="tr"><head><meta charset="utf-8"><title>Soru karekodları</title>
<style>
@page {{ size: 148mm 210mm; margin: 0 }}
* {{ box-sizing: border-box; margin: 0 }}
body {{ font-family: "Segoe UI", Arial, sans-serif; color: #0B1A3C }}
.s {{ width: 148mm; height: 210mm; padding: 14mm 12mm; text-align: center; page-break-after: always; display: flex; flex-direction: column; align-items: center; position: relative }}
.et {{ background: #0066CC; color: #fff; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; padding: 2mm 6mm; border-radius: 2mm; font-size: 14pt }}
h1 {{ margin-top: 7mm; font-size: 22pt; line-height: 1.2 }}
.z {{ margin-top: 3mm; font-size: 14pt; color: #4a5a78 }}
img {{ width: 100mm; height: 100mm; margin-top: 9mm }}
.a {{ margin-top: 6mm; font-size: 16pt; font-weight: 700 }}
.u {{ margin-top: 2mm; font-size: 10pt; color: #4a5a78 }}
.f {{ position: absolute; bottom: 10mm; font-size: 10pt; letter-spacing: .1em; text-transform: uppercase; color: #4a5a78 }}
</style></head><body>{''.join(sayfalar)}</body></html>"""
open(f"{OUT}/karekodlar.html", "w", encoding="utf-8").write(html)
print("ok", len(OT))
