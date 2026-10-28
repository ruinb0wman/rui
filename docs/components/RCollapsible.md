<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: RCollapsible
summary: 可折叠区块：标题 + 数量徽标 + 右侧操作，内部自管展开状态（默认可收起）。
when:
  - 列表分区要默认收起（逾期/历史/次要分组）
  - 标题右侧还要放操作按钮（查看全部、筛选）
notFor:
  - 需要记住跨会话展开状态（组件只管当次，自己包一层）
  - 弹窗式展开（用 RModal）
  - 需要手风琴互斥（自己算 active 传 collapsible=false + 受控内容）
---

# RCollapsible

可折叠区块：标题 + 数量徽标 + 右侧操作，内部自管展开状态（默认可收起）。

## 什么时候用

- 列表分区要默认收起（逾期/历史/次要分组）
- 标题右侧还要放操作按钮（查看全部、筛选）

## 不要用于

- 需要记住跨会话展开状态（组件只管当次，自己包一层）
- 弹窗式展开（用 RModal）
- 需要手风琴互斥（自己算 active 传 collapsible=false + 受控内容）

## 示例

<script setup>
import RCollapsible from '../../src/components/RCollapsible.vue'

</script>

<ClientOnly>
<div class="demo-box">

<div style="max-width:420px">
  <RCollapsible title="Carried Over" :count="3" default-collapsed>
    <template #actions><span style="color:var(--text-secondary);font-size:var(--font-xs)">actions 插槽</span></template>
    <p style="color:var(--text-secondary);margin:0">区块内容</p>
  </RCollapsible>
</div>

</div>
</ClientOnly>

## Props

| prop | 说明 |
| --- | --- |
| `title` | 标题文本 |
| `count` | 标题右侧数量徽标，null 不显示 |
| `collapsible` | false = 纯标题区、无折叠交互 |
| `defaultCollapsed` | 初始收起 |
| `actions 插槽` | 标题行右侧内容 |

## 用到的 token

`--text-primary` · `--text-secondary` · `--bg-subtle` · `--font-lg` · `--font-xs` · `--motion-fast`

## 可访问性

折叠按钮带 aria-expanded；内容收起用 v-show（DOM 保留，屏幕阅读器不读到隐藏区）

## 来源

`src/components/RCollapsible.vue`
