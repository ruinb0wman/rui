<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: RDatePicker
summary: 日期选择（原生 date input 的封装，带图标与清空）。
when:
  - 交易日期、定投起始日等日期字段
notFor:
  - 需要日历面板或范围选择（用 RCalendar）
---

# RDatePicker

日期选择（原生 date input 的封装，带图标与清空）。

## 什么时候用

- 交易日期、定投起始日等日期字段

## 不要用于

- 需要日历面板或范围选择（用 RCalendar）

## 示例

<script setup>
import { ref, computed } from 'vue'
import RDatePicker from '../../src/components/RDatePicker.vue'
const date = ref('2026-10-24')
</script>

<ClientOnly>
<div class="demo-box">

<div style="max-width:220px"><RDatePicker v-model="date" clearable /></div>

</div>
</ClientOnly>

## Props

| prop | 说明 |
| --- | --- |
| `modelValue` | v-model 日期字符串（YYYY-MM-DD） |
| `placeholder` | 占位文本 |
| `clearable` | 显示清空按钮 |
| `min` | 最小日期 |
| `max` | 最大日期 |
| `size` | large | default | small |

## 用到的 token

`--bg-card` · `--border-default` · `--control-h`

## 来源

`src/components/RDatePicker.vue`
