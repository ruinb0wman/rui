<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: BDialog
summary: 轻量确认/选择对话框：给一组带图标的选项，点击直接返回选项值。
when:
  - 「导出还是打印」这类 2–4 个带图标的选择
  - 需要图标+副标题的确认框
notFor:
  - 承载复杂表单（用 BaseModal）
  - 只有「确定/取消」（用 BaseModal + footer 更直白）
---

# BDialog

轻量确认/选择对话框：给一组带图标的选项，点击直接返回选项值。

## 什么时候用

- 「导出还是打印」这类 2–4 个带图标的选择
- 需要图标+副标题的确认框

## 不要用于

- 承载复杂表单（用 BaseModal）
- 只有「确定/取消」（用 BaseModal + footer 更直白）

## 示例

<script setup>
import { ref, computed } from 'vue'
import BButton from '../../src/components/BButton.vue'
import BDialog from '../../src/components/BDialog.vue'
const open = ref(false)
const options = [
  { icon: 'Download', title: '导出 CSV', desc: '下载到本地', value: 'csv' },
  { icon: 'Printer', title: '打印', desc: '发送到打印机', value: 'print' },
  { icon: 'Trash2', title: '清空', desc: '不可撤销', value: 'clear', danger: true },
]
</script>

<ClientOnly>
<div class="demo-box">

<BButton type="primary" @click="open = true">打开选择框</BButton>
<BDialog :visible="open" title="怎么处理这份数据？" subtitle="选择后立即生效" :options="options" @select="open = false" @cancel="open = false" />

</div>
</ClientOnly>

## Props

| prop | 说明 |
| --- | --- |
| `visible` | 可见标志 |
| `title` | 标题，默认「确认」 |
| `subtitle` | 副标题 |
| `options` | 选项数组 { icon, title, desc, value, danger } |
| `closable` | 显示关闭按钮 |

## 用到的 token

`--bg-overlay` · `--bg-card` · `--shadow-md` · `--radius-md`

## 可访问性

role="dialog" + aria-label；选项是可点击 div，M2 换成 button

## 来源

`src/components/BDialog.vue`
