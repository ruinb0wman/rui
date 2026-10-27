<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: RInputNumber
summary: 数字输入，min/max/step/precision 钳制，带加减控件。
when:
  - 金额、份额、期数、阈值等数值字段
  - 需要上下键微调的场景
notFor:
  - 纯文本数字（如基金代码）—— 用 RInput 保留前导 0
---

# RInputNumber

数字输入，min/max/step/precision 钳制，带加减控件。

## 什么时候用

- 金额、份额、期数、阈值等数值字段
- 需要上下键微调的场景

## 不要用于

- 纯文本数字（如基金代码）—— 用 RInput 保留前导 0

## 示例

<script setup>
import { ref, computed } from 'vue'
import RInputNumber from '../../src/components/RInputNumber.vue'
const amount = ref(1000)
</script>

<ClientOnly>
<div class="demo-box">

<div style="max-width:220px">
  <RInputNumber v-model="amount" :min="0" :max="100000" :step="100" />
  <p style="margin-top:8px;color:var(--text-secondary);font-size:var(--font-sm)">当前值：{{ amount }}</p>
</div>

</div>
</ClientOnly>

## Props

| prop | 说明 |
| --- | --- |
| `modelValue` | v-model 数字值 |
| `min` | 最小值（默认 Number.MIN_SAFE_INTEGER） |
| `max` | 最大值 |
| `step` | 步长，默认 1 |
| `precision` | 小数位 |
| `stepStrictly` | 强制对齐步长 |
| `controls` | 是否显示加减按钮 |
| `controlsPosition` | default | right |
| `valueOnClear` | 清空后回填的值 |

## 用到的 token

`--bg-card` · `--border-default` · `--control-h` · `--radius-sm`

## 来源

`src/components/RInputNumber.vue`
