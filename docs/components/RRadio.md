<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: RRadio
summary: 单选按钮，必须放在 RRadioGroup 内使用（值由 group 提供）。
when:
  - RRadioGroup 的子项
notFor:
  - 单独使用（没有 group 上下文时值不会同步）
---

# RRadio

单选按钮，必须放在 RRadioGroup 内使用（值由 group 提供）。

## 什么时候用

- RRadioGroup 的子项

## 不要用于

- 单独使用（没有 group 上下文时值不会同步）

## 示例

<script setup>
import { ref, computed } from 'vue'
import RRadio from '../../src/components/RRadio.vue'
import RRadioGroup from '../../src/components/RRadioGroup.vue'
const picked = ref('b')
</script>

<ClientOnly>
<div class="demo-box">

<RRadioGroup v-model="picked">
  <RRadio value="a" label="选项 A" />
  <RRadio value="b" label="选项 B" />
  <RRadio value="c" label="选项 C（禁用）" disabled />
</RRadioGroup>

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

`src/components/RRadio.vue`
