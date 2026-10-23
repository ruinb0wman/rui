<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: BRadio
summary: 单选按钮，必须放在 BRadioGroup 内使用（值由 group 提供）。
when:
  - BRadioGroup 的子项
notFor:
  - 单独使用（没有 group 上下文时值不会同步）
---

# BRadio

单选按钮，必须放在 BRadioGroup 内使用（值由 group 提供）。

## 什么时候用

- BRadioGroup 的子项

## 不要用于

- 单独使用（没有 group 上下文时值不会同步）

## 示例

<script setup>
import { ref, computed } from 'vue'
import BRadio from '../../src/components/BRadio.vue'
import BRadioGroup from '../../src/components/BRadioGroup.vue'
const picked = ref('b')
</script>

<ClientOnly>
<div class="demo-box">

<BRadioGroup v-model="picked">
  <BRadio value="a" label="选项 A" />
  <BRadio value="b" label="选项 B" />
  <BRadio value="c" label="选项 C（禁用）" disabled />
</BRadioGroup>

</div>
</ClientOnly>

## Props

| prop | 说明 |
| --- | --- |
| `value` | 该项的值 |
| `label` | 右侧文案 |
| `disabled` | 单项禁用 |

## 用到的 token

`--color-primary` · `--control-h`

## 来源

`src/components/BRadio.vue`
