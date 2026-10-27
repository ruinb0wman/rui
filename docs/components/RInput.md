<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: RInput
summary: 输入框 / 密码框 / 文本域（type="textarea"），带清空、字数统计、前缀图标。
when:
  - 单行文本、搜索、密码
  - 多行备注（type="textarea" + autosize）
notFor:
  - 数字输入（用 RInputNumber）
  - 日期/时间（用 RDatePicker / RTimePicker）
  - 下拉选择（用原生 &lt;select&gt; 或列表组件）
---

# RInput

输入框 / 密码框 / 文本域（type="textarea"），带清空、字数统计、前缀图标。

## 什么时候用

- 单行文本、搜索、密码
- 多行备注（type="textarea" + autosize）

## 不要用于

- 数字输入（用 RInputNumber）
- 日期/时间（用 RDatePicker / RTimePicker）
- 下拉选择（用原生 &lt;select&gt; 或列表组件）

## 示例

<script setup>
import { ref, computed } from 'vue'
import RInput from '../../src/components/RInput.vue'
const text = ref('')
</script>

<ClientOnly>
<div class="demo-box">

<div style="display:grid;gap:8px;max-width:320px">
  <RInput v-model="text" placeholder="输入点什么" clearable prefix-icon="Search" />
  <RInput v-model="text" type="textarea" :rows="2" show-word-limit :maxlength="40" placeholder="多行备注" />
</div>

</div>
</ClientOnly>

## Props

| prop | 说明 |
| --- | --- |
| `modelValue` | v-model 值 |
| `type` | text | password | textarea 等原生 input type |
| `size` | large | default | small |
| `placeholder` | 占位文本 |
| `clearable` | 显示清空按钮 |
| `showPassword` | 密码可见切换 |
| `showWordLimit` | 显示字数 x/maxlength |
| `maxlength` | 最大长度 |
| `rows` | textarea 行数 |
| `autosize` | textarea 自适应高度 |
| `prefixIcon` | 前缀图标名 |
| `suffixIcon` | 后缀图标名 |
| `formatter` | 显示值格式化（(v) =&gt; string） |
| `parser` | 回写值解析（(v) =&gt; string | number） |

## 用到的 token

`--bg-card` · `--border-default` · `--control-h` · `--radius-sm`

## 可访问性

label 用外部 &lt;label for&gt; 关联，不要只靠 placeholder

## 来源

`src/components/RInput.vue`
