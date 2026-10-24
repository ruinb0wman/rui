<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: BaseModal
summary: 模态框底座（Teleport + 遮罩 + header/body/footer 三槽 + 移动端底部弹出）。
when:
  - 需要承载任意内容的弹窗（表单、详情）
  - 需要 footer 操作区的确认流程
notFor:
  - 只要两三个按钮的确认（用 BDialog 更轻）
  - 页面内联展开（用 BCard）
---

# BaseModal

模态框底座（Teleport + 遮罩 + header/body/footer 三槽 + 移动端底部弹出）。

## 什么时候用

- 需要承载任意内容的弹窗（表单、详情）
- 需要 footer 操作区的确认流程

## 不要用于

- 只要两三个按钮的确认（用 BDialog 更轻）
- 页面内联展开（用 BCard）

## 示例

<script setup>
import { ref, computed } from 'vue'
import BButton from '../../src/components/BButton.vue'
import BaseModal from '../../src/components/BaseModal.vue'
const open = ref(false)
</script>

<ClientOnly>
<div class="demo-box">

<BButton type="primary" @click="open = true">打开弹窗</BButton>
<BaseModal :visible="open" title="示例弹窗" width="480" height="auto" @close="open = false">
  <p style="color:var(--text-secondary)">弹窗正文，可放表单或详情。</p>
  <template #footer>
    <BButton @click="open = false">取消</BButton>
    <BButton type="primary" @click="open = false">确定</BButton>
  </template>
</BaseModal>

</div>
</ClientOnly>

## Props

| prop | 说明 |
| --- | --- |
| `visible` | v-model 式的可见标志（配合 @close） |
| `title` | 标题（也可用 header 插槽） |
| `width` | 宽度 px 或字符串，默认 min(60vw, 900px) |
| `height` | 高度，默认 min(60vh, 600px) |
| `closable` | 显示右上角关闭 |
| `closeOnOverlay` | 点遮罩关闭 |
| `closeOnEscape` | ESC 关闭，默认 true（只有最上层响应） |
| `to` | teleport 目标，默认 'body'；demo/故事里传容器选择器可留在页内 |

## 用到的 token

`--bg-overlay` · `--bg-card` · `--shadow-lg` · `--radius-md` · `--z-modal`

## 可访问性

role="dialog" + aria-modal + aria-label；焦点进层、Tab 循环、关闭后回到原触发元素；ESC 只关最上层；body 滚动按层计数加锁

## 来源

`src/components/BaseModal.vue`
