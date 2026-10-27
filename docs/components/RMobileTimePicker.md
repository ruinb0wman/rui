<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: RMobileTimePicker
summary: 时间选择底部弹层：双滚轮选时/分，确认后回传 "HH:mm"。
when:
  - 移动端设置提醒时间、番茄时长这类时刻字段
notFor:
  - 桌面端（用 RTimePicker 的原生控件）
  - 要选日期（用 RMobileDatePicker）
---

# RMobileTimePicker

时间选择底部弹层：双滚轮选时/分，确认后回传 "HH:mm"。

## 什么时候用

- 移动端设置提醒时间、番茄时长这类时刻字段

## 不要用于

- 桌面端（用 RTimePicker 的原生控件）
- 要选日期（用 RMobileDatePicker）

## 示例

<script setup>
import { ref, computed } from 'vue'
import RMobileTimePicker from '../../src/components/RMobileTimePicker.vue'
import RButton from '../../src/components/RButton.vue'
const open = ref(false)
const time = ref('09:30')
</script>

<ClientOnly>
<div class="demo-box">

<RButton type="primary" @click="open = true">选时间</RButton>
<p style="color:var(--text-secondary)">当前：{{ time }}</p>
<RMobileTimePicker v-model="time" :is-open="open" @close="open = false" />

</div>
</ClientOnly>

## Props

| prop | 说明 |
| --- | --- |
| `isOpen` | 受控显示（配合 @close） |
| `modelValue` | "HH:mm" |
| `title` | 标题，默认 Select Time |
| `minuteInterval` | 分钟步进，默认 15 |

## 用到的 token

`--bg-card` · `--radius-lg` · `--color-primary` · `--z-modal`

## 可访问性

走 RModal：焦点进层、Tab 循环、ESC 关闭、滚动锁、Android 返回手势只关最上层

## 来源

`src/components/RMobileTimePicker.vue`
