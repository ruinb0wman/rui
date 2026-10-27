<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: MobileDatePicker
summary: 日期字段：一个触发按钮 + 底部日历弹层，选完即关，带清空与确认兜底。
when:
  - 移动端表单里的日期字段
notFor:
  - 桌面端（用 BDatePicker 的原生 input）
  - 需要范围选择（直接用 BCalendar mode="range"）
---

# MobileDatePicker

日期字段：一个触发按钮 + 底部日历弹层，选完即关，带清空与确认兜底。

## 什么时候用

- 移动端表单里的日期字段

## 不要用于

- 桌面端（用 BDatePicker 的原生 input）
- 需要范围选择（直接用 BCalendar mode="range"）

## 示例

<script setup>
import { ref, computed } from 'vue'
import MobileDatePicker from '../../src/components/MobileDatePicker.vue'
const date = ref(null)
</script>

<ClientOnly>
<div class="demo-box">

<div style="max-width:360px">
  <MobileDatePicker v-model="date" placeholder="选择日期" />
  <p style="color:var(--text-secondary)">{{ date ? date.toDateString() : '未选' }}</p>
</div>

</div>
</ClientOnly>

## Props

| prop | 说明 |
| --- | --- |
| `modelValue` | 受控值 Date | null |
| `defaultValue` | 非受控初始值 |
| `placeholder` | 占位文案 |
| `disabled` | 禁用 |
| `format` | 显示格式化函数 |
| `minDate` | 最早可选 |
| `maxDate` | 最晚可选 |
| `weekStartsOn` | 0=周日开头，1=周一开头 |
| `showYearSwitcher` | 显示上/下一年按钮 |

## 用到的 token

`--bg-card` · `--border-default` · `--radius-sm` · `--control-h`

## 可访问性

触发区是 &lt;button&gt;；清空是独立可点元素并带 aria-label；弹层同 BaseModal

## 来源

`src/components/MobileDatePicker.vue`
