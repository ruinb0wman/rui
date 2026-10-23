<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: LucideIcon
summary: Lucide 图标包装：按名字取图标，缺名时回退显示原名（不会白屏）。
when:
  - 所有图标的地方（统一尺寸与描边）
notFor:
  - 需要两个图标叠加/自定义 path 的场景
---

# LucideIcon

Lucide 图标包装：按名字取图标，缺名时回退显示原名（不会白屏）。

## 什么时候用

- 所有图标的地方（统一尺寸与描边）

## 不要用于

- 需要两个图标叠加/自定义 path 的场景

## 示例

<script setup>
import LucideIcon from '../../src/components/LucideIcon.vue'

</script>

<ClientOnly>
<div class="demo-box">

<div style="display:flex;gap:16px;align-items:center;color:var(--text-secondary)">
  <LucideIcon name="TrendingUp" :size="20" />
  <LucideIcon name="Wallet" :size="20" />
  <LucideIcon name="Bell" :size="24" />
  <LucideIcon name="NoSuchIcon" :size="16" />
</div>

</div>
</ClientOnly>

## Props

| prop | 说明 |
| --- | --- |
| `name` | Lucide 图标名（PascalCase，如 "TrendingUp"） |
| `size` | 尺寸，默认 20 |
| `color` | 颜色，默认 currentColor |
| `strokeWidth` | 线宽，默认 2 |

## 用到的 token

`--text-secondary`

## 来源

`src/components/LucideIcon.vue`
