<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: RListCard
summary: 列表卡片壳：首列图标方块 + 标题行徽标 + 副信息行 + 可选进度条 + 尾部状态，数据用 props 喂。
when:
  - 任务/订单/通知这类「一行实体」的可点击卡片（业务数据留在项目侧映射）
  - 同一列表里要同时显示等级/类型徽标、剩余时间、积分、进度与状态
notFor:
  - 纯展示的内容分组（用 RCard）
  - 表格型多列布局（一行字段超过 4 个就自己写）
  - 需要每一行自由排版（用 RCard + 自己写 flex）
---

# RListCard

列表卡片壳：首列图标方块 + 标题行徽标 + 副信息行 + 可选进度条 + 尾部状态，数据用 props 喂。

## 什么时候用

- 任务/订单/通知这类「一行实体」的可点击卡片（业务数据留在项目侧映射）
- 同一列表里要同时显示等级/类型徽标、剩余时间、积分、进度与状态

## 不要用于

- 纯展示的内容分组（用 RCard）
- 表格型多列布局（一行字段超过 4 个就自己写）
- 需要每一行自由排版（用 RCard + 自己写 flex）

## 示例

<script setup>
import RListCard from '../../src/components/RListCard.vue'

</script>

<ClientOnly>
<div class="demo-box">

<div style="display:grid;gap:12px;max-width:420px">
  <RListCard
    title="读 20 页书"
    tone="primary"
    icon="Clock"
    :badges="[{ text: 'L1', type: 'success' }, { text: 'Daily', type: 'muted' }]"
    :meta="[{ text: 'Due 2d', icon: 'AlertTriangle', tone: 'warning' }, { text: '+12 exp', tone: 'success' }]"
    :progress="{ percent: 40, label: '8/20 pages', color: 'primary' }"
    :status="{ text: 'Pending', tone: 'primary' }"
  />
  <RListCard
    title="晨跑"
    tone="success"
    icon="Check"
    :meta="[{ text: 'Completed Today 07:12', icon: 'Check', tone: 'success' }]"
    :status="{ text: 'Completed', tone: 'success' }"
  />
</div>

</div>
</ClientOnly>

## Props

| prop | 说明 |
| --- | --- |
| `title` | 主标题（单行截断） |
| `tone` | primary | success | warning | danger | info | muted（图标方块与默认配色） |
| `icon` | 首列图标名（消费方要先 registerIcons），或用 #icon 插槽给组件 |
| `badges` | [{ text, type?, round? }]，标题行的小徽标 |
| `meta` | [{ text, icon?, tone? }]，副信息行的项（剩余时间 / 完成时间 / 积分） |
| `progress` | { percent, label?, color? } | null，0-100 的细进度条 |
| `status` | { text, tone? } | null，尾部状态文字 |
| `disabled` | 置灰且不响应点击（预览态） |

## 用到的 token

`--bg-card` · `--bg-elevated` · `--border-default` · `--color-*-bg` · `--color-*` · `--radius-md` · `--font-*`

## 可访问性

根元素是 button（无修饰键、键盘可点）；disabled 时原生 button 禁用，点击不冒事件

## 来源

`src/components/RListCard.vue`
