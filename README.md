# @ruinb0w/ui

跨项目 Vue 3 组件库：**一套视觉尺度**（间距/圆角/字号/密度）+ **可切换的语义主题** + **给 AI 读的组件清单**。
消费方：`GoFundBot`（已接入）、`bow`、`exp1`。

- 规范判据：[`DESIGN.md`](./DESIGN.md)（尺度和颜色两层契约、a11y 底线、迁移影响）
- AI 速查表：[`AI.md`](./AI.md) + [`ai/manifest.json`](./ai/manifest.json)（22 个组件的 when / notFor / props / tokens）
- 组件文档站：`docs/`（VitePress，每页 demo 是**真实可交互组件**）

## 看文档

```bash
cd ~/Workspace/ui
bun install            # 首次
bun run docs:dev       # → http://127.0.0.1:8580
```

`docs:dev` 会先跑 `gen:all`（生成 token CSS/TS、组件页、AI 清单）再起 VitePress，端口 **8580**。
只想构建静态站：`bun run docs:build` → `docs/.vitepress/dist/`。

> 文档页左边栏就是组件列表；右上角能切明暗（对应 `gofund-dark` / `gofund-light`）。
> 想看密度三档的效果，在控制台执行 `document.documentElement.dataset.density = 'compact' | 'touch'`。

## 在项目里用

推荐**源码 alias**（HMR 从源生效，不用先 build）：

```jsonc
// package.json
{ "dependencies": { "@ruinb0w/ui": "file:../../ui" } }
```

```ts
// vite.config.ts —— 带斜杠的别名排在前
const ui = fileURLToPath(new URL('../../ui/src', import.meta.url))
resolve: { alias: [
  { find: '@ruinb0w/ui/style.css', replacement: `${ui}/index.css` },
  { find: '@ruinb0w/ui', replacement: `${ui}/index.ts` },
] },
// 源码在项目根之外，必须显式放行（fs.allow 一旦设置就覆盖默认值，项目根要自己列）
server: { fs: { allow: [fileURLToPath(new URL('./', import.meta.url)), fileURLToPath(new URL('../../ui', import.meta.url))] } }
```

```jsonc
// tsconfig.json
"paths": {
  "@ruinb0w/ui": ["../../ui/src/index.ts"],
  "@ruinb0w/ui/style.css": ["../../ui/src/index.css"]
}
```

```ts
import { RButton, RInput, RModal } from '@ruinb0w/ui'
import '@ruinb0w/ui/style.css'   // token + 基线样式，入口引一次
```

也可以消费构建产物（`bun run build` → `dist/`，组件级 chunk + d.ts + `style.css`）。

## 主题与密度

```ts
document.documentElement.dataset.theme = 'gofund-light'   // 默认
// 可选：gofund-dark / bow-dark / exp1-dark；html.dark 已映射到 gofund-dark
document.documentElement.dataset.density = 'default'      // compact 28px / default 36px / touch 44px
```

| 主题 | 谁用 | 主色 |
| --- | --- | --- |
| `gofund-light`（默认） | GoFundBot 浅色 | `#1677ff` |
| `gofund-dark` | GoFundBot 深色 / VitePress 暗色 | `#a8b1ff` |
| `bow-dark` | bow 浏览器 chrome | `#4a8ef7` |
| `exp1-dark` | exp1 移动端 | `#f56565` |

| 密度 | 控件高 | 小号 | 水平内距 | 字号 | 谁用 |
| --- | --- | --- | --- | --- | --- |
| `compact` | 28px | 24px | 12px | 13px | bow |
| `default` | 36px | 28px | 16px | 14px | GoFundBot |
| `touch` | 44px | 36px | 20px | 15px | exp1 |

## 组件

**表单**：`RButton` `RInput` `RInputNumber` `RCheckbox` `RRadio` `RRadioGroup` `RSwitch` `RDatePicker` `RCalendar` `RTimePicker` `RFileInput` `RSelect` `RFormRow`
**浮层**：`RModal`（`direction`: center/bottom/top/left/right 五向合一）`RDialog` `RDrawer`
**导航/通知**：`RTabBar` `RHamburgerButton` `RAlertBell` `RSettingsNav`
**展示/反馈**：`RCard` `RSkeletonCard` `RSkeletonChart` `RErrorBoundary` `ROfflineBanner` `RLucideIcon` `REmptyState` `RLoadingState` `RErrorState` `RProgress` `RChipGroup` `RBadge`
**确认框**：`RConfirmDialog`（受控）+ `RConfirmHost`（根挂一次，`useConfirm()` / `useAlert()` 可 await，替代 Android WebView 里会被丢弃的 `alert()`）
**移动端（`RMobile*`）**：`RMobileHeader` `RMobileWheelPicker` `RMobileTimePicker` `RMobileDatePicker` `RMobileIconPicker`
**composable**：`useOverlayLayer`（浮层内核：ESC 只关最上层、焦点循环、滚动锁、层号 z-index）、`setBackButtonAdapter` + `useBackButtonHandler`（把 Android 返回手势接到同一个层栈）、`useConfirm` / `useAlert`、`useOnlineStatus`

## 目录

```
tokens/tokens.json     唯一数值真源（尺度 + 4 主题 + 3 密度）
scripts/gen-tokens.ts  → src/tokens/generated.css + index.ts + docs 表格
scripts/gen-docs.ts    → docs/components/*.md（内嵌真实组件）+ 侧边栏
scripts/gen-ai.ts      → AI.md + ai/manifest.json（含组件↔登记表漂移检查）
scripts/check-style.ts 裸值体检（padding/圆角/字号/过渡，非档位值即报错）
src/ai/registry.ts     组件元数据唯一真源（entries/ 下按分组）
src/components/        组件（每组件一个 .vue + __tests__）
DESIGN.md / AI.md      规范判据 / AI 速查（后两者由脚本生成）
docs/                  VitePress 文档站
```

## 开发

```bash
bun run check       # gen:all + lint + lint:style --fail + vue-tsc + vitest + docs build（提交前跑这个）
bun run test        # vitest run
bun run lint:style  # 只看裸值违规数
bun run gen:all     # 改完 token 或 registry 必须跑
bun run build       # 产物 dist/（组件级 chunk + d.ts）
```

**加组件**：写 `src/components/BXxx.vue` → 在 `src/ai/entries/` 对应分组里加一条（summary / when / notFor / props / tokens / a11y / demo）→ `bun run gen:all` → `bun run check`。
漏登记会被漂移检查拦下；文档页和 AI 清单都由登记表生成，**不要手写**。

**改设计**：改 `tokens/tokens.json`（不要在组件里写死数值）→ `bun run gen:all`。四套主题的键集合必须一致，`gen-tokens` 会校验。

## 约束

- 只用语义变量与档位 token，禁止裸 px / 硬编码色值（`lint:style --fail` 已进 `check`）。
- **不用 Tailwind/UnoCSS**，不写 `@apply`，不做 Tailwind `@theme` 适配层。
- 项目内可以覆盖语义变量，禁止覆盖组件内部 scoped 样式。
- 单文件 ≤500 行（ESLint `max-lines`）。
