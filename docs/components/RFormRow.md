<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: RFormRow
summary: 设置行布局：定宽 label + 控件 + 说明，控件放默认插槽。只管布局，不包表单逻辑。
when:
  - 设置页/配置面板的「标签 + 控件」行
  - 需要在控件下方补一句说明（hint）
  - 把控件换行排列（body 内 flex-wrap）
notFor:
  - 表单校验与错误提示（控件自己负责）
  - 表格/列表行（用列表自己写）
---

# RFormRow

设置行布局：定宽 label + 控件 + 说明，控件放默认插槽。只管布局，不包表单逻辑。

## 什么时候用

- 设置页/配置面板的「标签 + 控件」行
- 需要在控件下方补一句说明（hint）
- 把控件换行排列（body 内 flex-wrap）

## 不要用于

- 表单校验与错误提示（控件自己负责）
- 表格/列表行（用列表自己写）

## 示例

<script setup>
import { ref, computed } from 'vue'
import RFormRow from '../../src/components/RFormRow.vue'
import RInput from '../../src/components/RInput.vue'
import RSwitch from '../../src/components/RSwitch.vue'
const homepage = ref('https://example.com'); const on = ref(true)
</script>

<ClientOnly>
<div class="demo-box">

<div style="border:1px solid var(--border-subtle);border-radius:var(--radius-md);max-width:520px">
  <RFormRow label="主页" hint="启动新窗口时打开的首页">
    <RInput v-model="homepage" />
  </RFormRow>
  <RFormRow label="自动更新"><RSwitch v-model="on" /></RFormRow>
</div>

</div>
</ClientOnly>

## Props

| prop | 说明 |
| --- | --- |
| `label` | 左侧标签文字；不给则整行给控件 |
| `hint` | 说明文字，占满整行放在下方 |
| `labelWidth` | label 列宽，默认 96px（--space-7 × 2），数字按 px 处理 |
| `align` | center | start（多行控件/列表用 start） |
| `默认插槽` | 控件本体 |

## 用到的 token

`--text-secondary` · `--font-ui` · `--font-xs` · `--space-3` · `--space-4`

## 可访问性

标签是纯展示 &lt;span&gt;：控件自己带 label / aria-label（本组件不承担控件命名）

## 来源

`src/components/RFormRow.vue`
