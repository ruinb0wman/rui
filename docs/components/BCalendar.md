<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: BCalendar
summary: 日历面板：单选/范围两种模式，固定 6 行不抖高，单元格可整块替换；不限端，宽度跟随容器。
when:
  - 需要在页面里内联一块日历（桌面侧栏、移动端弹层、范围筛选都一样用）
  - 范围选择（mode="range"）与 minDate/maxDate 限制
  - 需要在格子里画标记（如打卡点、有数据的日期）
notFor:
  - 只要一个日期输入框（桌面用 BDatePicker，移动端用 MobileDatePicker）
  - K 线/热力图这类领域可视化（项目自己做）
---

# BCalendar

日历面板：单选/范围两种模式，固定 6 行不抖高，单元格可整块替换；不限端，宽度跟随容器。

## 什么时候用

- 需要在页面里内联一块日历（桌面侧栏、移动端弹层、范围筛选都一样用）
- 范围选择（mode="range"）与 minDate/maxDate 限制
- 需要在格子里画标记（如打卡点、有数据的日期）

## 不要用于

- 只要一个日期输入框（桌面用 BDatePicker，移动端用 MobileDatePicker）
- K 线/热力图这类领域可视化（项目自己做）

## 示例

<script setup>
import { ref, computed } from 'vue'
import BCalendar from '../../src/components/BCalendar.vue'
const date = ref(new Date())
const text = computed(() => date.value ? date.value.toDateString() : '未选')
</script>

<ClientOnly>
<div class="demo-box">

<div style="max-width:360px">
  <BCalendar v-model="date" />
  <p style="color:var(--text-secondary)">选中：{{ text }}</p>
</div>

</div>
</ClientOnly>

## Props

| prop | 说明 |
| --- | --- |
| `mode` | single | range，默认 single |
| `modelValue` | 受控值：Date 或 [Date, Date] |
| `defaultValue` | 非受控初始值 |
| `defaultMonth` | 默认显示哪个月 |
| `minDate` | 最早可选日期 |
| `maxDate` | 最晚可选日期 |
| `weekStartsOn` | 0=周日开头，1=周一开头 |
| `weekDayLabels` | 星期表头文案 |
| `monthLabel` | 月份标题格式化函数 |
| `showYearSwitcher` | 显示上/下一年按钮 |
| `cell 插槽` | 自定义单元格，接收 { info } |

## 用到的 token

`--color-primary` · `--color-primary-bg` · `--text-primary` · `--text-disabled` · `--radius-sm`

## 可访问性

每个格子是真实 button，禁用项 disabled；键盘可 Tab 到每个日期；焦点可见

## 来源

`src/components/BCalendar.vue`
