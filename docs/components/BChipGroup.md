<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: BChipGroup
summary: 胶囊选择组：单选/多选 × 横滑/等分网格，四种形态一个组件。
when:
  - 筛选项、标签选择、星期多选
  - 选项数量固定且都值得展示（2–12 个）
notFor:
  - 选项很多且需要搜索（用 BInput + 列表）
  - 开关语义（用 BSwitch）
---

# BChipGroup

胶囊选择组：单选/多选 × 横滑/等分网格，四种形态一个组件。

## 什么时候用

- 筛选项、标签选择、星期多选
- 选项数量固定且都值得展示（2–12 个）

## 不要用于

- 选项很多且需要搜索（用 BInput + 列表）
- 开关语义（用 BSwitch）

## 示例

<script setup>
import { ref, computed } from 'vue'
import BChipGroup from '../../src/components/BChipGroup.vue'
const one = ref('week')
const many = ref([1, 3])
const filters = ['all','pending','done']
const activeFilter = ref('all')
</script>

<ClientOnly>
<div class="demo-box">

<div style="display:grid;gap:16px">
  <BChipGroup v-model="one" :options="[{label:'Daily',value:'day'},{label:'Weekly',value:'week'},{label:'Monthly',value:'month'}]" />
  <BChipGroup v-model="many" multiple layout="grid" :columns="7"
    :options="[1,2,3,4,5,6,7].map(d => ({ label: String(d), value: d }))" />
  <BChipGroup v-model="activeFilter" :options="filters.map(f => ({ label: f, value: f }))" />
</div>

</div>
</ClientOnly>

## Props

| prop | 说明 |
| --- | --- |
| `options` | 选项数组 { label, value } |
| `modelValue` | 单选传值，多选传数组 |
| `multiple` | 多选 |
| `layout` | scroll（横滑胶囊）| grid（等分网格，默认 4 列） |
| `columns` | grid 列数 |
| `itemWidth` | grid 项宽，默认 1fr（可传 "36px"） |
| `size` | small | default |
| `disabled` | 禁用整组 |
| `label 插槽` | 自定义每项内容，接收 { option } |

## 用到的 token

`--color-primary` · `--bg-card` · `--border-default` · `--radius-full` · `--control-h`

## 可访问性

每项是 button + aria-pressed；横向滚动不隐藏键盘可达性（Tab 可进入）

## 来源

`src/components/BChipGroup.vue`
