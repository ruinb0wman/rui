/**
 * 样式规范体检（报告模式，不阻塞）：扫 src/components 里违反 token 尺度的裸值。
 * 跑：bun run lint:style   加 --fail 则在有违规时退出码 1（供后续接入 CI）
 *
 * 只抓最常见的四类：padding/margin/gap、border-radius、font-size、transition 时长。
 * 存量组件还没按规范重写，所以默认只报告不失败 —— 目标是让数字逐月下降。
 */
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = join(import.meta.dir, '..')
const dir = join(root, 'src/components')

const ALLOWED_PX = new Set([0, 1, 2, 4, 8, 12, 16, 24, 32, 48])
const RULES: Array<{ name: string; re: RegExp }> = [
  { name: 'spacing', re: /(?:padding|margin|gap|row-gap|column-gap)(?:-(?:top|right|bottom|left))?\s*:\s*([^;]+);/g },
  { name: 'radius', re: /border-radius\s*:\s*([^;]+);/g },
  { name: 'font-size', re: /font-size\s*:\s*([^;]+);/g },
  { name: 'transition', re: /transition\s*:\s*([^;]+);/g },
]

let total = 0
const perFile: Array<[string, number]> = []

for (const file of readdirSync(dir).filter((f) => f.endsWith('.vue'))) {
  const css = readFileSync(join(dir, file), 'utf8')
  const hits: string[] = []

  for (const rule of RULES) {
    for (const m of css.matchAll(rule.re)) {
      const value = m[1]
      for (const px of value.matchAll(/(-?\d+(?:\.\d+)?)px/g)) {
        const n = Math.abs(Number(px[1]))
        if (!ALLOWED_PX.has(n)) hits.push(`${rule.name}: ${value.trim()}`)
      }
      if (rule.name === 'transition' && /\d*\.?\d+m?s/.test(value) && !value.includes('var(--motion')) {
        hits.push(`transition: ${value.trim()}（应走 --motion-*）`)
      }
    }
  }

  if (hits.length) {
    perFile.push([file, hits.length])
    total += hits.length
  }
}

perFile.sort((a, b) => b[1] - a[1])
console.log(`裸值违规 ${total} 处（${perFile.length} 个文件）—— 存量待按 DESIGN.md 重写：`)
for (const [file, n] of perFile) console.log(`  ${String(n).padStart(3)}  ${file}`)

if (process.argv.includes('--fail') && total > 0) process.exit(1)
