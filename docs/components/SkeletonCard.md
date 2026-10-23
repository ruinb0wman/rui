<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: SkeletonCard
summary: 卡片骨架屏（shimmer 动画），数据未到位时的占位。
when:
  - 列表/卡片首次加载
  - 轮询刷新时保持布局不跳动
notFor:
  - 耗时 &gt;3s 且需要说明进度（用进度或文案）
---

# SkeletonCard

卡片骨架屏（shimmer 动画），数据未到位时的占位。

## 什么时候用

- 列表/卡片首次加载
- 轮询刷新时保持布局不跳动

## 不要用于

- 耗时 &gt;3s 且需要说明进度（用进度或文案）

## 示例

<script setup>
import SkeletonCard from '../../src/components/SkeletonCard.vue'

</script>

<ClientOnly>
<div class="demo-box">

<div style="max-width:320px"><SkeletonCard :lines="3" :widths="['100%','72%','45%']" title /></div>

</div>
</ClientOnly>

## Props

| prop | 说明 |
| --- | --- |
| `lines` | 占位行数，默认 3 |
| `widths` | 每行宽度数组（如 ["100%","60%"]） |
| `height` | 卡片高度，默认 120 |
| `title` | 是否显示标题占位条 |

## 用到的 token

`--bg-subtle` · `--border-subtle` · `--radius-md`

## 来源

`src/components/SkeletonCard.vue`
