/**
 * tokens/tokens.json → src/tokens/generated.css + src/tokens/index.ts
 * 跑：bun run gen:tokens
 *
 * 三条硬约束（改了会直接抛错，避免静默漂移）：
 * 1. 所有主题解析完 extends 后必须是同一组 CSS 变量名（组件跨主题可用）；
 * 2. scale 里只允许放尺寸/动效/层级，不许放颜色（颜色只能进 themes）；
 * 3. density 三档必须是同一组变量名。
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const root = join(import.meta.dir, '..')
const src = JSON.parse(readFileSync(join(root, 'tokens/tokens.json'), 'utf8'))

type Vars = Record<string, string>
interface Theme extends Vars {
  extends?: string
}

const scale: Record<string, Vars> = src.scale
const density: Record<string, Vars> = src.density
const rawThemes: Record<string, Theme> = src.themes

const isColor = (v: string) => /(#[0-9a-f]{3,8}|rgba?\(|hsla?\(|gradient\()/i.test(v)
for (const [group, vars] of Object.entries(scale)) {
  for (const [name, value] of Object.entries(vars)) {
    if (isColor(value)) throw new Error(`scale.${group}.${name} 是颜色（${value}）——颜色只能放 themes`)
  }
}

function resolve(name: string, seen: string[] = []): Vars {
  if (seen.includes(name)) throw new Error(`主题 extends 成环：${[...seen, name].join(' → ')}`)
  const { extends: parent, ...own } = rawThemes[name] ?? {}
  if (!rawThemes[name]) throw new Error(`未知主题 ${name}`)
  return parent ? { ...resolve(parent, [...seen, name]), ...own } : { ...own }
}

const themes: Record<string, Vars> = {}
for (const name of Object.keys(rawThemes)) themes[name] = resolve(name)

const keySets = Object.entries(themes).map(([n, t]) => [n, Object.keys(t).sort().join(',')] as const)
const [, reference] = keySets[0]
for (const [name, keys] of keySets.slice(1)) {
  if (keys !== reference) {
    const have = new Set(keys.split(','))
    const want = new Set(reference.split(','))
    throw new Error(
      `主题 ${name} 的变量集合与 ${keySets[0][0]} 不一致：缺 ${[...want].filter((k) => !have.has(k))}，多 ${[...have].filter((k) => !want.has(k))}`,
    )
  }
}
const densityKeys = Object.entries(density).map(([n, d]) => [n, Object.keys(d).sort().join(',')] as const)
for (const [name, keys] of densityKeys.slice(1)) {
  if (keys !== densityKeys[0][1]) throw new Error(`density.${name} 的变量集合与 ${densityKeys[0][0]} 不一致`)
}

const block = (vars: Vars, indent = '  ') =>
  Object.entries(vars).map(([k, v]) => `${indent}${k}: ${v};`).join('\n')

const legacyAliases = [
  '--primary-color: var(--color-primary);',
  '--primary-gradient: var(--bg-gradient);',
  '--success-color: var(--color-success);',
  '--danger-color: var(--color-danger);',
  '--warning-color: var(--color-warning);',
]

const css = `/* 由 tokens/tokens.json 生成 —— 勿手改，改 tokens.json 后跑 bun run gen:tokens */
:root {
${Object.values(scale).map((g) => block(g)).join('\n')}
  /* 历史别名（Phase 2 删除） */
${legacyAliases.map((l) => `  ${l}`).join('\n')}
  /* 默认密度 */
${block(density.default ?? {})}
  /* 默认主题 gofund-light */
${block(themes['gofund-light'])}
}

/* 主题：html[data-theme="<name>"]；html.dark 兼容 VitePress 暗色 */
html[data-theme="gofund-light"] {
${block(themes['gofund-light'])}
}

html[data-theme="dark"],
html[data-theme="gofund-dark"],
html.dark {
${block(themes['gofund-dark'])}
}

html[data-theme="bow-dark"] {
${block(themes['bow-dark'])}
}

html[data-theme="exp1-dark"] {
${block(themes['exp1-dark'])}
}

/* 密度：html[data-density="compact|default|touch"]，默认 default（见 :root） */
html[data-density="compact"] {
${block(density.compact)}
}

html[data-density="touch"] {
${block(density.touch)}
}
`
writeFileSync(join(root, 'src/tokens/generated.css'), css)

// ---- TS 常量（ECharts 等 JS 侧读不到 CSS 变量） ----
const fieldMap: Record<string, string> = {
  colorPrimary: '--color-primary',
  colorPrimaryHover: '--color-primary-hover',
  colorSuccess: '--color-success',
  colorDanger: '--color-danger',
  colorWarning: '--color-warning',
  colorInfo: '--color-info',
  bgPage: '--bg-page',
  bgCard: '--bg-card',
  bgHover: '--bg-hover',
  bgSubtle: '--bg-subtle',
  textPrimary: '--text-primary',
  textSecondary: '--text-secondary',
  textTertiary: '--text-tertiary',
  textDisabled: '--text-disabled',
  borderDefault: '--border-default',
  borderSubtle: '--border-subtle',
  chartBg: '--chart-bg',
  chartGrid: '--chart-grid',
  chartAxisLabel: '--chart-axis-label',
}

const pick = (theme: Vars) => {
  const out = Object.entries(fieldMap)
    .map(([field, cssVar]) => `  ${field}: '${theme[cssVar]}',`)
    .join('\n')
  const charts = Array.from({ length: 10 }, (_, i) => `'${theme[`--chart-${i + 1}`]}'`).join(', ')
  return `{\n${out}\n  chartColors: [${charts}],\n}`
}

const ts = `/* 由 tokens/tokens.json 生成 —— 勿手改，改 tokens.json 后跑 bun run gen:tokens */
export interface DesignTokens {
  colorPrimary: string
  colorPrimaryHover: string
  colorSuccess: string
  colorDanger: string
  colorWarning: string
  colorInfo: string
  bgPage: string
  bgCard: string
  bgHover: string
  bgSubtle: string
  textPrimary: string
  textSecondary: string
  textTertiary: string
  textDisabled: string
  borderDefault: string
  borderSubtle: string
  chartColors: string[]
  chartBg: string
  chartGrid: string
  chartAxisLabel: string
}

export type ThemeMode = 'light' | 'dark'

/** 全部可用主题名 = html[data-theme] 的合法取值 */
export const themeNames = [${Object.keys(themes).map((n) => `'${n}'`).join(', ')}] as const
export type ThemeName = (typeof themeNames)[number]

export const lightTokens: DesignTokens = ${pick(themes['gofund-light'])}

export const darkTokens: DesignTokens = ${pick(themes['gofund-dark'])}

export function getTokens(mode: ThemeMode): DesignTokens {
  return mode === 'dark' ? darkTokens : lightTokens
}
`
writeFileSync(join(root, 'src/tokens/index.ts'), ts)

// ---- 文档用表格（docs/design/tokens.generated.md，被 tokens.md @include） ----
const TOKEN_DOC: Record<string, string[]> = {
  radius: ['--radius-sm', '--radius-md', '--radius-lg', '--radius-full'],
  space: ['--space-05', '--space-1', '--space-2', '--space-3', '--space-4', '--space-5', '--space-6', '--space-7'],
  font: ['--font-xs', '--font-sm', '--font-base', '--font-md', '--font-lg', '--font-xl', '--leading-tight', '--leading-base'],
  motion: ['--motion-fast', '--motion-base', '--motion-ease'],
  z: ['--z-sticky', '--z-dropdown', '--z-modal', '--z-toast'],
}
const table = (cols: string[], rows: Array<Array<string>>) =>
  `| ${cols.join(' | ')} |\n| ${cols.map(() => '---').join(' | ')} |\n${rows.map((r) => `| ${r.join(' | ')} |`).join('\n')}`

const keyColorVars = ['--bg-page', '--bg-card', '--text-primary', '--text-secondary', '--border-default', '--color-primary', '--color-danger', '--color-success']
const docMd = `<!-- 生成物：源在 tokens/tokens.json -->

## 尺度（全项目固定）

${Object.entries(TOKEN_DOC)
  .map(([group, names]) => `**${group}**\n\n${table(['变量', '值'], names.map((n) => [`\`${n}\``, String(scale[group]?.[n] ?? '—')]))}`)
  .join('\n\n')}

## 密度

${table(
  ['档位', ...Object.keys(density[densityKeys[0][0]])],
  Object.entries(density).map(([name, vars]) => [`\`${name}\``, ...Object.keys(density[densityKeys[0][0]]).map((k) => String(vars[k]))]),
)}

## 主题关键色

${table(['变量', ...Object.keys(themes).map((n) => `\`${n}\``)], keyColorVars.map((v) => [`\`${v}\``, ...Object.values(themes).map((t) => String(t[v]))]))}

> 完整变量表：\`tokens/tokens.json\`（四套主题键集合一致，由生成器校验）。
`
writeFileSync(join(root, 'docs/design/tokens.generated.md'), docMd)

console.log(`tokens: ${Object.keys(themes).length} 主题 / ${Object.keys(scale).length} 尺度组 / ${Object.keys(density).length} 密度档 → generated.css + index.ts + docs 表格`)
