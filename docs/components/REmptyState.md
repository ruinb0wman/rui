<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: REmptyState
summary: 空状态占位：圆形图标位 + 标题 + 说明，图标可用插槽换。
when:
  - 列表没有数据
  - 搜索无结果
  - 首次使用时引导用户创建
notFor:
  - 加载中的占位（用 RLoadingState / RSkeletonCard）
  - 请求失败（用 RErrorState）
---

# REmptyState

空状态占位：圆形图标位 + 标题 + 说明，图标可用插槽换。

## 什么时候用

- 列表没有数据
- 搜索无结果
- 首次使用时引导用户创建

## 不要用于

- 加载中的占位（用 RLoadingState / RSkeletonCard）
- 请求失败（用 RErrorState）

## 示例

<script setup>
import REmptyState from '../../src/components/REmptyState.vue'
import RButton from '../../src/components/RButton.vue'

</script>

<ClientOnly>
<div class="demo-box">

<REmptyState title="No tasks for today" description="Create a task to get started">
  <template #action><RButton type="primary" style="margin-top:12px">New task</RButton></template>
</REmptyState>

</div>
</ClientOnly>

## Props

| prop | 说明 |
| --- | --- |
| `title` | 主文案 |
| `description` | 补充说明 |
| `默认插槽` | 替换图标（默认 Plus） |
| `action 插槽` | 标题下方的操作按钮 |

## 用到的 token

`--bg-card` · `--text-tertiary` · `--radius-full` · `--space-7`

## 来源

`src/components/REmptyState.vue`
