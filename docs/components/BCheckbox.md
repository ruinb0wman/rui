<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: BCheckbox
summary: 复选框，支持半选（indeterminate）。
when:
  - 多选列表
  - 「全选」控制子项（indeterminate）
  - 单个开关式确认（同意条款）
notFor:
  - 立即生效的开关（用 BSwitch）
  - 互斥选项（用 BRadioGroup）
---

# BCheckbox

复选框，支持半选（indeterminate）。

## 什么时候用

- 多选列表
- 「全选」控制子项（indeterminate）
- 单个开关式确认（同意条款）

## 不要用于

- 立即生效的开关（用 BSwitch）
- 互斥选项（用 BRadioGroup）

## 示例

<script setup>
import { ref, computed } from 'vue'
import BCheckbox from '../../src/components/BCheckbox.vue'
const checked = ref(true)
</script>

<ClientOnly>
<div class="demo-box">

<div style="display:grid;gap:8px">
  <BCheckbox v-model="checked" label="已选中的选项" />
  <BCheckbox :model-value="false" indeterminate label="半选（全选用的视觉态）" />
  <BCheckbox :model-value="false" disabled label="禁用" />
</div>

</div>
</ClientOnly>

## Props

| prop | 说明 |
| --- | --- |
| `modelValue` | v-model 布尔值 |
| `label` | 右侧文案 |
| `indeterminate` | 半选态（视觉，不改变值） |
| `disabled` | 禁用 |
| `size` | large | default | small |

## 用到的 token

`--color-primary` · `--border-default` · `--radius-sm`

## 来源

`src/components/BCheckbox.vue`
