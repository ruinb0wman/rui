<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: RInfoTip
summary: 字段说明气泡：一个 ⓘ 图标，hover / 聚焦 / 点击弹出解释。替代原生 title（延迟 1s、不可样式化、触屏看不到）。
when:
  - 指标/字段名后面要一句口径解释（PE 分位、机会值这类）
  - `title` 的样式与触屏体验不够用
notFor:
  - 多行富内容或带按钮的浮层（用 RDialog）
  - 需要箭头、跟随鼠标、逐帧跟随滚动（气泡在滚动/改窗口时收起）
  - 主操作按钮上的提示（用可见文案或 RFormRow 的说明）
---

# RInfoTip

字段说明气泡：一个 ⓘ 图标，hover / 聚焦 / 点击弹出解释。替代原生 title（延迟 1s、不可样式化、触屏看不到）。

## 什么时候用

- 指标/字段名后面要一句口径解释（PE 分位、机会值这类）
- `title` 的样式与触屏体验不够用

## 不要用于

- 多行富内容或带按钮的浮层（用 RDialog）
- 需要箭头、跟随鼠标、逐帧跟随滚动（气泡在滚动/改窗口时收起）
- 主操作按钮上的提示（用可见文案或 RFormRow 的说明）

## 示例

<script setup>
import RInfoTip from '../../src/components/RInfoTip.vue'

</script>

<ClientOnly>
<div class="demo-box">

<div style="display:flex;gap:var(--space-4);align-items:center;color:var(--text-secondary)">
  <span>机会值 <RInfoTip label="机会值" text="窗口内 PE 的 20% 分位，历史上只有 20% 的时间比它更便宜。" /></span>
  <span>危险值 <RInfoTip label="危险值" side="bottom" text="窗口内 PE 的 80% 分位，历史上只有 20% 的时间比它更贵。" /></span>
</div>

</div>
</ClientOnly>

## Props

| prop | 说明 |
| --- | --- |
| `text` | 提示正文，也可用 default 插槽 |
| `label` | 无障碍名称前缀，如「机会值」→ aria-label="机会值 说明" |
| `side` | 首选方向 top（默认）/ bottom，空间不够自动翻到另一侧 |

## 用到的 token

`--text-tertiary` · `--text-secondary` · `--bg-elevated` · `--border-default` · `--shadow-md` · `--radius-sm` · `--font-xs` · `--z-dropdown`

## 可访问性

触发元素是真 button（可 Tab、回车/空格切换、ESC 关闭），带 aria-label 与 aria-expanded；气泡 role="tooltip"，只在打开时渲染并挂 aria-describedby。点击组件外部也关闭（触屏没有 hover）。气泡 teleport 到 body + position:fixed，不会被 overflow 容器裁掉，位置夹在视口内。

## 来源

`src/components/RInfoTip.vue`
