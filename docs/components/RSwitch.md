<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: RSwitch
summary: 开关，立即生效型布尔切换。
when:
  - 设置项即时开关
  - 启用/停用某个功能
notFor:
  - 提交时才生效的表单项（用 RCheckbox）
---

# RSwitch

开关，立即生效型布尔切换。

## 什么时候用

- 设置项即时开关
- 启用/停用某个功能

## 不要用于

- 提交时才生效的表单项（用 RCheckbox）

## 示例

<script setup>
import { ref, computed } from 'vue'
import RSwitch from '../../src/components/RSwitch.vue'
const on = ref(true)
</script>

<ClientOnly>
<div class="demo-box">

<div style="display:grid;gap:8px">
  <RSwitch v-model="on" active-text="已启用" inactive-text="已停用" />
  <RSwitch :model-value="false" disabled />
</div>

</div>
</ClientOnly>

## Props

| prop | 说明 |
| --- | --- |
| `modelValue` | v-model 布尔值 |
| `activeText` | 开启时文案 |
| `inactiveText` | 关闭时文案 |
| `loading` | 加载态 |
| `disabled` | 禁用 |
| `size` | large | default | small |

## 用到的 token

`--color-primary` · `--bg-hover` · `--motion-fast`

## 可访问性

role="switch"，空格/回车切换

## 来源

`src/components/RSwitch.vue`
