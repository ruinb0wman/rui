<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: RConfirmDialog
summary: 确认/提示对话框（受控）：图标 + 标题 + 说明 + 确定/取消。
when:
  - 直接渲染确认框的场合（自己持有 visible 状态）
notFor:
  - 想用 await confirm({...}) 的写法（用 RConfirmHost + useConfirm）
  - 需要多个带图标选项（用 RDialog）
  - 承载表单（用 RModal）
---

# RConfirmDialog

确认/提示对话框（受控）：图标 + 标题 + 说明 + 确定/取消。

## 什么时候用

- 直接渲染确认框的场合（自己持有 visible 状态）

## 不要用于

- 想用 await confirm({...}) 的写法（用 RConfirmHost + useConfirm）
- 需要多个带图标选项（用 RDialog）
- 承载表单（用 RModal）

## 示例

<script setup>
import { ref, computed } from 'vue'
import RConfirmDialog from '../../src/components/RConfirmDialog.vue'
import RButton from '../../src/components/RButton.vue'
const open = ref(false)
</script>

<ClientOnly>
<div class="demo-box">

<RButton type="danger" @click="open = true">Delete task</RButton>
<RConfirmDialog :visible="open" variant="danger" title="Delete task"
  message="This cannot be undone." confirm-label="Delete"
  @confirm="open = false" @cancel="open = false" />

</div>
</ClientOnly>

## Props

| prop | 说明 |
| --- | --- |
| `visible` | 可见标志 |
| `message` | 正文（必填） |
| `title` | 标题，默认 Confirm |
| `confirmLabel` | 确定按钮文案 |
| `cancelLabel` | 取消按钮文案 |
| `variant` | danger | warning | info（决定图标与按钮色） |
| `alertOnly` | 只显示确定按钮（提示框语义） |

## 用到的 token

`--color-danger` · `--color-warning` · `--color-info` · `--bg-card` · `--radius-lg`

## 可访问性

走 RModal：焦点进层、ESC 取消、滚动锁、返回手势只关最上层

## 来源

`src/components/RConfirmDialog.vue`
