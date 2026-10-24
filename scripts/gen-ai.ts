/**
 * src/ai/registry.ts + tokens/tokens.json → ai/manifest.json（机器读）+ AI.md（贴给模型读）
 * 跑：bun run gen:ai
 * 顺带做漂移检查：src/components/*.vue 与 registry 必须一一对应。
 */
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { components, extras } from '../src/ai/registry'

const root = join(import.meta.dir, '..')
const tokens = JSON.parse(readFileSync(join(root, 'tokens/tokens.json'), 'utf8'))

// ---- 漂移检查 ----
const onDisk = readdirSync(join(root, 'src/components'))
  .filter((f) => f.endsWith('.vue'))
  .map((f) => f.replace(/\.vue$/, ''))
const registered = components.map((c) => c.file.replace(/\.vue$/, ''))
const missing = onDisk.filter((n) => !registered.includes(n))
const ghost = registered.filter((n) => !onDisk.includes(n))
if (missing.length) throw new Error(`src/components 里这些组件没在 registry 登记：${missing.join(', ')}`)
if (ghost.length) throw new Error(`registry 里这些组件在 src/components 找不到：${ghost.join(', ')}`)

const manifest = {
  name: '@ruinb0w/ui',
  version: JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).version,
  entry: '@ruinb0w/ui',
  styleEntry: '@ruinb0w/ui/style.css',
  themes: Object.keys(tokens.themes),
  defaultTheme: 'gofund-light',
  themeSwitch: 'document.documentElement.dataset.theme = "<theme>"',
  densities: Object.keys(tokens.density),
  densitySwitch: 'document.documentElement.dataset.density = "compact|default|touch"',
  rules: {
    colors: '只用语义变量（--bg-*/--text-*/--border-*/--color-*），禁止在组件外写死色值',
    spacing: '只用 --space-* 档位（2/4/8/12/16/24/32/48），禁止裸 px',
    radius: '只用 --radius-sm|md|lg|full（6/10/16/999），控件 sm、卡片 md、弹窗 lg',
    controlSize: '控件高度读 --control-h / --control-h-sm，字号读 --font-ui，不要自己写 px',
    motion: '过渡只用 var(--motion-fast|base) + var(--motion-ease)',
    zIndex: '浮层层级用 --z-sticky|dropdown|modal|toast，禁止 9999',
    overrides: '允许在项目内覆盖语义变量，禁止覆盖组件内部 scoped 样式',
    noCssFramework: '不引入 Tailwind/UnoCSS，不写 @apply，也不做 Tailwind @theme 适配层；只有本库没盖住的样式才在项目里手写 CSS',
  },
  scale: tokens.scale,
  density: tokens.density,
  components: components.map((c) => ({
    name: c.name,
    file: `src/components/${c.file}`,
    summary: c.summary,
    when: c.when,
    notFor: c.notFor,
    props: c.props,
    tokens: c.tokens,
    a11y: c.a11y,
    usage: c.demo?.template,
  })),
  extras,
}

mkdirSync(join(root, 'ai'), { recursive: true })
writeFileSync(join(root, 'ai/manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`)

// ---- AI.md（紧凑版，一次读得完） ----
const md = `# @ruinb0w/ui — 给 AI 的速查表

Vue 3 组件库。**不要手写这些组件已有的样式或行为，先查这里。**

\`\`\`ts
import { BButton, BInput } from '@ruinb0w/ui'
import '@ruinb0w/ui/style.css'   // token + 基线样式，应用入口引入一次
\`\`\`

主题：\`document.documentElement.dataset.theme = '${manifest.defaultTheme}'\`（可选：${manifest.themes.join(' / ')}，另有 \`html.dark\` 兼容 VitePress）
密度：\`document.documentElement.dataset.density = 'default'\`（${manifest.densities.join(' / ')}：控件高 ${Object.values(tokens.density).map((d: any) => d['--control-h']).join(' / ')}）

## 硬规则

${Object.entries(manifest.rules).map(([, v]) => `- ${v}`).join('\n')}

间距档：${Object.values(tokens.scale.space).join(' / ')}
圆角档：${Object.entries(tokens.scale.radius).map(([k, v]) => `${k.replace('--radius-', '')}=${v}`).join(' / ')}
字号档：${Object.values(tokens.scale.font).slice(0, 6).join(' / ')}
动效：${Object.values(tokens.scale.motion).join(' / ')}
层级：${Object.entries(tokens.scale.z).map(([k, v]) => `${k.replace('--z-', '')}=${v}`).join(' / ')}

## 组件

${components
  .map(
    (c) => `### ${c.name} — ${c.summary}
用：${c.when.join('；')}
别用：${c.notFor.join('；')}
props：${Object.keys(c.props).filter((k) => k !== '—').map((k) => `\`${k}\``).join(' ')}
token：${c.tokens.join(' ')}
${c.usage ? `\`\`\`vue\n${c.usage}\n\`\`\`` : ''}`,
  )
  .join('\n\n')}

## 其它导出

${extras.map((e) => `- \`${e.name}\` — ${e.summary}`).join('\n')}

## 详细文档

每个组件一页（含可交互 demo 与 props 全表）：docs/components/<组件名>.md。
规范：DESIGN.md。机器可读清单：ai/manifest.json。
`

writeFileSync(join(root, 'AI.md'), md)
console.log(`ai: manifest.json + AI.md（${components.length} 组件，${(md.length / 1024).toFixed(1)}KB）`)
