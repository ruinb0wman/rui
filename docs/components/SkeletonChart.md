<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: SkeletonChart
summary: 图表骨架屏（虚线走势 + 图例占位）。
when:
  - K 线/走势图加载中
notFor:
  - 非图表区域（用 SkeletonCard）
---

# SkeletonChart

图表骨架屏（虚线走势 + 图例占位）。

## 什么时候用

- K 线/走势图加载中

## 不要用于

- 非图表区域（用 SkeletonCard）

## 示例

<script setup>
import SkeletonChart from '../../src/components/SkeletonChart.vue'

</script>

<ClientOnly>
<div class="demo-box">

<div style="max-width:420px"><SkeletonChart :height="180" :width="420" /></div>

</div>
</ClientOnly>

## Props

| prop | 说明 |
| --- | --- |
| `height` | 高度，默认 300 |
| `width` | 宽度，默认 300 |

## 用到的 token

`--bg-subtle` · `--border-subtle` · `--radius-md`

## 来源

`src/components/SkeletonChart.vue`
