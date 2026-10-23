# @ruinb0w/ui

跨项目 Vue 3 组件库：**一套视觉尺度**（间距/圆角/字号/密度），**多套语义主题**（GoFundBot / bow / exp1），
外加一套给 AI 用的清单（`AI.md` + `ai/manifest.json`）。

三个项目共用同一套组件与 token，颜色靠 `data-theme` 切换，控件尺寸靠 `data-density` 切换。

## 从哪看

- [组件总览](./components/) — 每个组件一页，页内示例**可交互**（就是真实组件，不是截图）
- [规范](./design/) — 间距/圆角/字号/密度/层级/可访问性底线，以及「不许做什么」
- [Token 一览](./design/tokens) — 生成的四套主题与三档密度全表
- [接入](./getting-started) — 三种消费方式（源码 alias / 构建产物 / 文档站）

## 给 AI 的入口

```bash
bun run gen:all   # 重算 token / 文档 / AI 清单（含漂移检查）
```

| 产物 | 用途 |
| --- | --- |
| `AI.md` | 模型一次读完的速查表（规范 + 每个组件 what/when/notFor/骨架） |
| `ai/manifest.json` | 机器可读（JSON），可按组件名单取 |
| `docs/components/*.md` | 人读的详细页（生成物，源在 `src/ai/registry.ts`） |

文档、AI 清单、组件目录三者由同一次生成保持一致 —— 加组件忘了登记会直接生成失败。
