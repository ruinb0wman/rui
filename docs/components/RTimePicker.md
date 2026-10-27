<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: RTimePicker
summary: 时间选择（原生 time input 的封装）。
when:
  - 提醒时间、交易时间点
notFor:
  - 需要滚动轮盘（移动端）—— 页面自己实现，别硬套
---

# RTimePicker

时间选择（原生 time input 的封装）。

## 什么时候用

- 提醒时间、交易时间点

## 不要用于

- 需要滚动轮盘（移动端）—— 页面自己实现，别硬套

## 示例

<script setup>
import { ref, computed } from 'vue'
import RTimePicker from '../../src/components/RTimePicker.vue'
const at = ref('09:30')
</script>

<ClientOnly>
<div class="demo-box">

<div style="max-width:180px"><RTimePicker v-model="at" clearable /></div>

</div>
</ClientOnly>

## Props

| prop | 说明 |
| --- | --- |
| `modelValue` | v-model 时间字符串（HH:mm） |
| `placeholder` | 占位文本 |
| `clearable` | 显示清空按钮 |
| `min` | 最小时间 |
| `max` | 最大时间 |
| `step` | 秒级步长，默认 60 |
| `size` | large | default | small |

## 用到的 token

`--bg-card` · `--border-default` · `--control-h`

## 来源

`src/components/RTimePicker.vue`
