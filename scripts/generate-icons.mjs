import sharp from 'sharp'
import { mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const src = join(__dirname, 'icon-source.svg')
const outDir = join(__dirname, '..', 'public', 'icons')
mkdirSync(outDir, { recursive: true })

const sizes = [
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
]

for (const { name, size } of sizes) {
  await sharp(src).resize(size, size).png().toFile(join(outDir, name))
  console.log('generated', name)
}

// maskable icon with safe-area padding (icon content inside ~80% circle)
const maskableSize = 512
const padding = Math.round(maskableSize * 0.1)
await sharp(src)
  .resize(maskableSize - padding * 2, maskableSize - padding * 2)
  .extend({
    top: padding,
    bottom: padding,
    left: padding,
    right: padding,
    background: { r: 15, g: 23, b: 42, alpha: 1 },
  })
  .png()
  .toFile(join(outDir, 'icon-maskable-512.png'))
console.log('generated icon-maskable-512.png')

await sharp(src).resize(32, 32).png().toFile(join(__dirname, '..', 'public', 'favicon.png'))
console.log('generated favicon.png')
