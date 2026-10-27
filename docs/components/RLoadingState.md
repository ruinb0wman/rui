<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: RLoadingState
summary: 加载态：主色圆环 spinner + 可选文案，三档尺寸。
when:
  - 首次加载、切换数据源时的整块占位
notFor:
  - 已知结构的列表刷新（用 RSkeletonCard 保持布局不跳）
  - 按钮内部加载（用 RButton 的 loading）
---

# RLoadingState

加载态：主色圆环 spinner + 可选文案，三档尺寸。

## 什么时候用

- 首次加载、切换数据源时的整块占位

## 不要用于

- 已知结构的列表刷新（用 RSkeletonCard 保持布局不跳）
- 按钮内部加载（用 RButton 的 loading）

## 示例

<script setup>
import RLoadingState from '../../src/components/RLoadingState.vue'

</script>

<ClientOnly>
<div class="demo-box">

<RLoadingState message="Loading tasks..." />

</div>
</ClientOnly>

## Props

| prop | 说明 |
| --- | --- |
| `message` | 文案，默认 Loading...；传空串则不显示 |
| `size` | small | default | large |

## 用到的 token

`--color-primary` · `--text-tertiary` · `--space-6` · `--space-7`

## 可访问性

spinner 无文字依赖：文案与图形同时在；prefers-reduced-motion 下放慢动画

## 来源

`src/components/RLoadingState.vue`
