<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: RLucideIcon
summary: Lucide 图标包装：按名字取图标；本库内置十几个自用图标，其他名字由消费方 registerIcons() 登记，未登记时显示原名（不回落到整包）。
when:
  - 所有图标的地方（统一尺寸与描边）
notFor:
  - 需要两个图标叠加/自定义 path 的场景
  - 直接 import 图标组件就能渲染的地方（少一层按名查表，也不会漏登记）
---

# RLucideIcon

Lucide 图标包装：按名字取图标；本库内置十几个自用图标，其他名字由消费方 registerIcons() 登记，未登记时显示原名（不回落到整包）。

## 什么时候用

- 所有图标的地方（统一尺寸与描边）

## 不要用于

- 需要两个图标叠加/自定义 path 的场景
- 直接 import 图标组件就能渲染的地方（少一层按名查表，也不会漏登记）

## 示例

<script setup>
import RLucideIcon from '../../src/components/RLucideIcon.vue'

</script>

<ClientOnly>
<div class="demo-box">

<div style="display:flex;gap:16px;align-items:center;color:var(--text-secondary)">
  <RLucideIcon name="TrendingUp" :size="20" />
  <RLucideIcon name="Wallet" :size="20" />
  <RLucideIcon name="Bell" :size="24" />
  <RLucideIcon name="NoSuchIcon" :size="16" />
</div>

</div>
</ClientOnly>

## Props

| prop | 说明 |
| --- | --- |
| `name` | Lucide 图标名（PascalCase，如 "TrendingUp"），需先 registerIcons({ TrendingUp }) |
| `size` | 尺寸，默认 20 |
| `color` | 颜色，默认 currentColor |
| `strokeWidth` | 线宽，默认 2 |

## 用到的 token

`--text-secondary`

## 来源

`src/components/RLucideIcon.vue`
