<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: RBadge
summary: 状态徽标：语义色胶囊 + 可选圆点，只用圆点就是状态灯（可脉冲表示进行中）。
when:
  - 列表/标签上的状态标记（在跑 / 等你 / 失败）
  - 导航项右侧的角标（核心 / Beta）
  - 工具栏状态灯（dot + pulse）
notFor:
  - 未读数字气泡（需要绝对定位贴角，项目自己写）
  - 交互式标签筛选（用 RChipGroup）
---

# RBadge

状态徽标：语义色胶囊 + 可选圆点，只用圆点就是状态灯（可脉冲表示进行中）。

## 什么时候用

- 列表/标签上的状态标记（在跑 / 等你 / 失败）
- 导航项右侧的角标（核心 / Beta）
- 工具栏状态灯（dot + pulse）

## 不要用于

- 未读数字气泡（需要绝对定位贴角，项目自己写）
- 交互式标签筛选（用 RChipGroup）

## 示例

<script setup>
import RBadge from '../../src/components/RBadge.vue'

</script>

<ClientOnly>
<div class="demo-box">

<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
  <RBadge type="primary" dot pulse round>在跑</RBadge>
  <RBadge type="warning" dot round>等你</RBadge>
  <RBadge type="success" round>已完成</RBadge>
  <RBadge type="danger" round>失败</RBadge>
  <RBadge type="info" round>Beta</RBadge>
  <RBadge type="primary" dot pulse />
</div>

</div>
</ClientOnly>

## Props

| prop | 说明 |
| --- | --- |
| `type` | primary | success | warning | danger | info | muted（默认 muted） |
| `dot` | 文案前的圆点 |
| `pulse` | 圆点脉冲（进行中） |
| `round` | 胶囊圆角，默认方块 |
| `默认插槽` | 文案；不给文案 + dot 就是纯状态灯 |

## 用到的 token

`--color-*-bg` · `--color-*` · `--font-xs` · `--radius-sm` · `--radius-full`

## 可访问性

纯展示元素；状态不能只靠颜色，文案或 title 要能读出来

## 来源

`src/components/RBadge.vue`
