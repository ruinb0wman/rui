<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: BRadioGroup
summary: 单选组，provide/inject 管理子项状态，可横向/纵向/描边。
when:
  - 2–5 个互斥选项、且选项少到值得全部展示
  - 周期选择（每周/每月/每季）
notFor:
  - 选项超过 6 个（用 &lt;select&gt; 或列表）
  - 多选（用 BCheckbox）
---

# BRadioGroup

单选组，provide/inject 管理子项状态，可横向/纵向/描边。

## 什么时候用

- 2–5 个互斥选项、且选项少到值得全部展示
- 周期选择（每周/每月/每季）

## 不要用于

- 选项超过 6 个（用 &lt;select&gt; 或列表）
- 多选（用 BCheckbox）

## 示例

<script setup>
import { ref, computed } from 'vue'
import BRadio from '../../src/components/BRadio.vue'
import BRadioGroup from '../../src/components/BRadioGroup.vue'
const period = ref('monthly')
</script>

<ClientOnly>
<div class="demo-box">

<div style="display:grid;gap:12px">
  <BRadioGroup v-model="period">
    <BRadio value="weekly" label="每周" />
    <BRadio value="monthly" label="每月" />
    <BRadio value="quarterly" label="每季" />
  </BRadioGroup>
  <BRadioGroup v-model="period" border>
    <BRadio value="weekly" label="描边式" />
    <BRadio value="monthly" label="描边式 B" />
  </BRadioGroup>
</div>

</div>
</ClientOnly>

## Props

| prop | 说明 |
| --- | --- |
| `modelValue` | v-model 当前值 |
| `disabled` | 整组禁用 |
| `size` | large | default | small |
| `vertical` | 纵向排列 |
| `border` | 每项加描边 |

## 用到的 token

`--color-primary` · `--border-default` · `--control-h`

## 来源

`src/components/BRadioGroup.vue`
