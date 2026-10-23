# 接入

三种消费方式，按项目现状挑一种（目前三个项目都是第一种）。

## 一、源码 alias（推荐，开发期）

项目直接引仓库源码，HMR 从源生效，不需要先 build。

```jsonc
// package.json
{ "dependencies": { "@ruinb0w/ui": "file:../../ui" } }
```

```ts
// vite.config.ts —— 别名指向源码，带斜杠的排在前
const ui = fileURLToPath(new URL('../../ui/src', import.meta.url))
resolve: { alias: [
  { find: '@ruinb0w/ui/style.css', replacement: `${ui}/index.css` },
  { find: '@ruinb0w/ui', replacement: `${ui}/index.ts` },
] }
```

```ts
// tsconfig.json
"paths": {
  "@ruinb0w/ui": ["../../ui/src/index.ts"],
  "@ruinb0w/ui/style.css": ["../../ui/src/index.css"]
}
```

源码在项目根之外，Vite 需要放行（`fs.allow` 一旦显式设置就会覆盖默认值，项目根要自己列）：

```ts
server: { fs: { allow: [projectRoot, uiRoot] } }
```

## 二、构建产物

```bash
bun run build   # dist/（组件级 chunk + d.ts + style.css）
```

```ts
import { BButton } from '@ruinb0w/ui'
import '@ruinb0w/ui/style.css'
```

## 三、文档站内直接用

`docs/components/*.md` 里就是真实组件的用法，可以直接复制。页面由 `src/ai/registry.ts` 生成。

## 主题与密度

```ts
document.documentElement.dataset.theme = 'gofund-light' | 'gofund-dark' | 'bow-dark' | 'exp1-dark'
document.documentElement.dataset.density = 'compact' | 'default' | 'touch'
```

- 不设置令牌时默认 `gofund-light` + `default`。
- VitePress 的 `html.dark` 已映射到 `gofund-dark`。
- 项目可以覆盖**语义变量**（颜色/阴影），禁止覆盖组件内部 scoped 样式。

## 命令

```bash
bun run dev          # vite build --watch（产物模式消费时需要）
bun run gen:all      # token + docs + AI 清单（改 registry/tokens 后必跑）
bun run docs:dev     # http://localhost:8580
bun run lint:style   # 裸值体检（存量重写进度表）
bun run check        # gen:all + lint + typecheck + test + docs build
```
