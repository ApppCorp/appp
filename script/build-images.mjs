/**
 * Image pipeline for the APPP site.
 *
 * 1. Selects the curated source photographs from ./img (raw phone shots).
 * 2. Applies one shared colour grade so every image reads as a single set —
 *    the brief explicitly requires "consistent colour tone across all images".
 * 3. Emits responsive WebP variants into ./public/images.
 * 4. Writes ./lib/images.generated.ts so the app never drifts from the
 *    files that actually exist on disk.
 *
 * Run with: npm run images
 */
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC = path.join(ROOT, 'img')
const OUT = path.join(ROOT, 'public', 'images')

/**
 * The shared grade.
 *
 * `recomb` warms the midtones and pulls blue down; `linear` adds a gentle
 * contrast curve and lifts the blacks; the navy overlay is applied in
 * `soft-light` at low alpha so shadows drift toward the brand navy and the
 * set feels graded rather than merely filtered.
 */
const RECOMB = [
  [1.04, 0.02, 0.0],
  [0.01, 1.0, 0.01],
  [0.0, 0.03, 0.95],
]

const NAVY = { r: 0x12, g: 0x32, b: 0x4a }

/**
 * Curated manifest.
 *
 * Excluded on purpose:
 *   - img/warehouse/09,10,11  (meat)   -> "Meats" category removed
 *   - img/warehouse/17         (sheep)  -> category removed
 *   - img/warehouse/24         (control panel) -> not premium imagery
 *   - img/oem-service/19-23    (Mica own-brand kids supplements) -> the brief
 *     asks for the Kids Supplement (Own Brand) line to come down
 *   - img/oem-service/25       (basket texture) -> unrelated
 *
 * There is deliberately no photograph for the Health Supplements category:
 * the brief requires brand names to appear as text only, with no brand
 * logos, so that card is rendered typographically instead of using an
 * unrelated picture of a product that is not a supplement.
 */
const MANIFEST = {
  hero: { src: 'warehouse/12.jpg', widths: [960, 1600, 2400] },
  about: { src: 'warehouse/08.jpg', widths: [720, 1200, 1800] },
  serviceSourcing: { src: 'warehouse/16.jpg', widths: [560, 900, 1280] },
  serviceSupply: { src: 'warehouse/11.jpg', widths: [560, 900, 1280] },
  serviceFulfilment: { src: 'oem-service/04.jpg', widths: [560, 900, 1280] },
  servicePrivateLabel: { src: 'warehouse/25.jpg', widths: [560, 900, 1280] },
  serviceChina: { src: 'warehouse/02.jpg', widths: [560, 900, 1280] },
  productDairy: { src: 'warehouse/20.jpg', widths: [600, 1000, 1400] },
  productPrivateLabel: { src: 'oem-service/14.jpg', widths: [600, 1000, 1400] },
  chinaServing: { src: 'warehouse/03.jpg', widths: [720, 1200, 1800] },
  chinaHainan: { src: 'oem-service/01.jpg', widths: [720, 1200, 1800] },
  privateLabelMain: { src: 'warehouse/22.jpg', widths: [720, 1200, 1800] },
  privateLabelAlt: { src: 'warehouse/19.jpg', widths: [560, 900, 1280] },
}

function graded(source) {
  return sharp(source)
    .rotate()
    .modulate({ saturation: 0.62, brightness: 1.015 })
    .recomb(RECOMB)
    .linear([1.03, 1.015, 0.995], [8, 5, 0])
    .gamma(1.06)
}

async function applyNavyOverlay(pipeline, width, height) {
  const overlay = {
    create: {
      width,
      height,
      channels: 4,
      background: { ...NAVY, alpha: 0.09 },
    },
  }
  return pipeline.composite([{ input: overlay, blend: 'soft-light' }])
}

async function build() {
  fs.mkdirSync(OUT, { recursive: true })

  const generated = {}
  let totalBytes = 0

  for (const [slot, cfg] of Object.entries(MANIFEST)) {
    const source = path.join(SRC, cfg.src)
    if (!fs.existsSync(source)) {
      throw new Error(`Missing source image for "${slot}": ${source}`)
    }

    const base = sharp(source).rotate()
    const meta = await base.metadata()
    const aspect = meta.height / meta.width

    const variants = []
    for (const w of cfg.widths) {
      const h = Math.round(w * aspect)
      const outName = `${slot}-${w}.webp`
      const outPath = path.join(OUT, outName)

      const resized = graded(source).resize(w, h, { fit: 'cover', position: 'centre' })
      const withOverlay = await applyNavyOverlay(resized, w, h)
      await withOverlay.webp({ quality: 80, effort: 5 }).toFile(outPath)

      const bytes = fs.statSync(outPath).size
      totalBytes += bytes
      variants.push({ w, h, file: outName, bytes })
    }

    const largest = variants[variants.length - 1]
    generated[slot] = {
      src: `/images/${variants[0].file}`,
      width: variants[0].w,
      height: variants[0].h,
      aspect: Number(aspect.toFixed(4)),
      srcSet: variants.map((v) => `/images/${v.file} ${v.w}w`).join(', '),
      variants: variants.map((v) => ({ w: v.w, h: v.h, file: v.file })),
    }

    console.log(
      `  ${slot.padEnd(20)} ${cfg.src.padEnd(22)} ${variants.length} variants  ` +
        `${(variants.reduce((s, v) => s + v.bytes, 0) / 1024).toFixed(0)}KB  ` +
        `(${largest.w}x${largest.h})`,
    )
  }

  // Social sharing card, cropped from the hero photograph.
  const ogName = 'og-cover.jpg'
  await graded(path.join(SRC, MANIFEST.hero.src))
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .composite([
      {
        input: {
          create: {
            width: 1200,
            height: 630,
            channels: 4,
            background: { ...NAVY, alpha: 0.42 },
          },
        },
        blend: 'over',
      },
    ])
    .jpeg({ quality: 86, progressive: true })
    .toFile(path.join(OUT, ogName))
  totalBytes += fs.statSync(path.join(OUT, ogName)).size

  const json = JSON.stringify(generated, null, "\t")
    .split("\n")
    .map((line, index) => (index === 0 ? line : `\t${line}`))
    .join("\n")

  const slotUnion = Object.keys(generated)
	.sort()
	.map((k) => `\t| "${k}"`)
	.join("\n")

  const ts = [
	"// 由 script/build-images.mjs 自动生成，请勿手动编辑。",
	"// 重新生成：npm run images",
	"",
	"type ImageSlot =",
	slotUnion,
	"",
	"type ImageAsset = {",
	"\taspect: number",
	"\theight: number",
	"\tsrc: string",
	"\tsrcSet: string",
	"\tvariants: { file: string; h: number; w: number }[]",
	"\twidth: number",
	"};",
	"",
	"export type {",
	"\tImageAsset,",
	"\tImageSlot",
	"};",
	"",
	`export const images: Record<ImageSlot, ImageAsset> = ${json};`,
	"",
	`export const OG_IMAGE = "/images/${ogName}";`,
	""
	].join("\n")
  fs.writeFileSync(path.join(ROOT, 'src', 'utils', 'images.ts'), ts)
  console.log(`\n  ${Object.keys(generated).length} slots · ${(totalBytes / 1024 / 1024).toFixed(2)}MB total`)
  console.log('  wrote src/utils/images.ts')
}

build().catch((err) => {
  console.error(err)
  process.exit(1)
})
