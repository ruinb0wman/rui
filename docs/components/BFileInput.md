<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: BFileInput
summary: 文件选择（隐藏原生 input，trigger 插槽自定义外观）。
when:
  - 导入 CSV/图片
  - 需要自定义上传按钮外观时
notFor:
  - 拖拽上传（未实现 drop 区域）
  - 需要上传进度（本组件不负责传输）
---

# BFileInput

文件选择（隐藏原生 input，trigger 插槽自定义外观）。

## 什么时候用

- 导入 CSV/图片
- 需要自定义上传按钮外观时

## 不要用于

- 拖拽上传（未实现 drop 区域）
- 需要上传进度（本组件不负责传输）

## 示例

<script setup>
import BFileInput from '../../src/components/BFileInput.vue'

</script>

<ClientOnly>
<div class="demo-box">

<div style="max-width:320px"><BFileInput accept=".csv" placeholder="选择一个 CSV 文件" /></div>

</div>
</ClientOnly>

## Props

| prop | 说明 |
| --- | --- |
| `accept` | 可接受的文件类型 |
| `multiple` | 多选 |
| `disabled` | 禁用 |
| `placeholder` | 未选择时的文案 |

## 用到的 token

`--bg-card` · `--border-default` · `--radius-sm`

## 来源

`src/components/BFileInput.vue`
