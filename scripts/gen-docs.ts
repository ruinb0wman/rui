/**
 * src/ai/registry.ts → docs/components/*.md（含可交互 demo）+ 侧边栏清单
 * 跑：bun run gen:docs
 * 页面是生成物：改文档请改 registry，勿手改 md。
 */
import { mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { componentGroups, components, type ComponentSpec } from '../src/ai/registry'

const root = join(import.meta.dir, '..')
const outDir = join(root, 'docs/components')
mkdirSync(outDir, { recursive: true })

const esc = (s: string) => s.replace(/</g, '&lt;').replace(/>/g, '&gt;') // 正文里的 <a> 之类会被 Vue 当标签
const bullet = (items: string[]) => items.map((i) => `- ${esc(i)}`).join('\n')

function page(spec: ComponentSpec): string {
  const imports = new Set<string>()
  let script = ''
  if (spec.demo) {
    spec.demo.components.forEach((c) => imports.add(c))
    if (spec.demo.setup) script = spec.demo.setup
  }
  const importLines = [...imports].map((c) => `import ${c} from '../../src/components/${c}.vue'`)
  if (script) importLines.unshift(`import { ref, computed } from 'vue'`)

  const propsTable = Object.entries(spec.props)
    .map(([k, v]) => (k === '—' ? `| — | ${esc(v)} |` : `| \`${k}\` | ${esc(v)} |`))
    .join('\n')

  return `<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: ${spec.name}
summary: ${esc(spec.summary)}
when:
${spec.when.map((w) => `  - ${esc(w)}`).join('\n')}
notFor:
${spec.notFor.map((w) => `  - ${esc(w)}`).join('\n')}
---

# ${spec.name}

${esc(spec.summary)}

## 什么时候用

${bullet(spec.when)}

## 不要用于

${bullet(spec.notFor)}

${spec.demo
    ? `## 示例

<script setup>
${importLines.join('\n')}
${script}
</script>

<ClientOnly>
<div class="demo-box">

${spec.demo.template}

</div>
</ClientOnly>`
    : ''}

## Props

| prop | 说明 |
| --- | --- |
${propsTable}

## 用到的 token

${spec.tokens.map((t) => `\`${t}\``).join(' · ')}
${spec.a11y ? `\n## 可访问性\n\n${esc(spec.a11y)}\n` : ''}
## 来源

\`src/components/${spec.file}\`
`
}

const written = new Set<string>()
for (const spec of components) {
  const file = `${spec.name}.md`
  writeFileSync(join(outDir, file), page(spec))
  written.add(file)
}

// 漂移保护：registry 里没有的页面直接删（改过名/删过组件的残留）
for (const file of readdirSync(outDir)) {
  if (file.endsWith('.md') && file !== 'index.md' && !written.has(file)) {
    rmSync(join(outDir, file))
    console.log(`docs: 删除陈旧页面 ${file}`)
  }
}

// 分组来自 registry（componentGroups），这里不再维护组件名单
const groups = componentGroups.map((g) => [g.title, g.items.map((c) => c.name)] as [string, string[]])

// 兜底：注册表里出现了不属于任何分组的组件就直接报错，避免它悄悄从文档里消失
const grouped = new Set(groups.flatMap(([, names]) => names))
const orphans = components.map((c) => c.name).filter((n) => !grouped.has(n))
if (orphans.length) {
  console.error(`docs: 以下组件不在任何分组里，侧边栏会看不到它们：${orphans.join(', ')}`)
  process.exit(1)
}

const index = `<!-- 生成物：源在 src/ai/registry.ts -->
# 组件总览

${components.length} 个组件。每页都带可交互示例，页面内容与 \`ai/manifest.json\` 同源（\`bun run gen:all\` 生成）。

${groups
  .map(
    ([title, names]) => `## ${title}

${names
  .filter((n) => components.some((c) => c.name === n))
  .map((n) => {
    const spec = components.find((c) => c.name === n)!
    return `- [${n}](./${n}) — ${esc(spec.summary)}`
  })
  .join('\n')}`,
  )
  .join('\n\n')}
`
writeFileSync(join(outDir, 'index.md'), index)

// 侧边栏（docs/.vitepress/config.ts 直接 import 这个 json）
writeFileSync(
  join(root, 'docs/.vitepress/sidebar.generated.json'),
  `${JSON.stringify(
    groups.map(([text, names]) => ({
      text,
      items: names.filter((n) => components.some((c) => c.name === n)).map((n) => ({ text: n, link: `/components/${n}` })),
    })),
    null,
    2,
  )}\n`,
)

console.log(`docs: ${components.length} 个组件页 + index + sidebar`)
