<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: RMobileWheelPicker
summary: 滚轮选择器：吸附滚动 + 中间高亮，常与 RMobileTimePicker 搭配。
when:
  - 移动端选小时/分钟/数量这类有序数字
  - 需要滑动手感而非点击的选择器
notFor:
  - 选项带图标或长文本（用 RChipGroup 或列表）
  - 桌面端（用 RInputNumber 的上下键）
---

# RMobileWheelPicker

滚轮选择器：吸附滚动 + 中间高亮，常与 RMobileTimePicker 搭配。

## 什么时候用

- 移动端选小时/分钟/数量这类有序数字
- 需要滑动手感而非点击的选择器

## 不要用于

- 选项带图标或长文本（用 RChipGroup 或列表）
- 桌面端（用 RInputNumber 的上下键）

## 示例

<script setup>
import { ref, computed } from 'vue'
import RMobileWheelPicker from '../../src/components/RMobileWheelPicker.vue'
const hour = ref(9)
</script>

<ClientOnly>
<div class="demo-box">

<div style="max-width:220px">
  <RMobileWheelPicker v-model="hour" :options="[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]" :format="(v) => String(v).padStart(2, '0')" />
  <p style="color:var(--text-secondary)">选中：{{ hour }}</p>
</div>

</div>
</ClientOnly>

## Props

| prop | 说明 |
| --- | --- |
| `options` | 候选数字数组 |
| `modelValue` | 当前值 |
| `format` | 每项显示文本，默认 String |

## 用到的 token

`--color-primary-bg` · `--color-primary` · `--text-secondary` · `--radius-sm`

## 可访问性

点每项即可选中（不依赖手势）；高亮不只用颜色，选中项字号/颜色同时变化

## 来源

`src/components/RMobileWheelPicker.vue`
