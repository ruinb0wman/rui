<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: BaseModal
summary: 模态框底座：一个组件吃下居中弹窗、底部/顶部长弹出、左右抽屉五种方向。
when:
  - 需要承载任意内容的弹窗（表单、详情）
  - 移动端底部弹出（direction="bottom"，带拖动条与安全区）
  - 侧边抽屉里放任意内容（direction="left"/"right"）
notFor:
  - 只要两三个按钮的确认（用 BConfirmDialog / BDialog）
  - 纯导航项列表的抽屉（用 BDrawer，已内置导航项样式）
  - 页面内联展开（用 BCard）
---

# BaseModal

模态框底座：一个组件吃下居中弹窗、底部/顶部长弹出、左右抽屉五种方向。

## 什么时候用

- 需要承载任意内容的弹窗（表单、详情）
- 移动端底部弹出（direction="bottom"，带拖动条与安全区）
- 侧边抽屉里放任意内容（direction="left"/"right"）

## 不要用于

- 只要两三个按钮的确认（用 BConfirmDialog / BDialog）
- 纯导航项列表的抽屉（用 BDrawer，已内置导航项样式）
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
| `visible` | 可见标志（配合 @close） |
| `direction` | center | bottom | top | left | right，默认 center |
| `title` | 标题（也可用 header 插槽） |
| `width` | 宽度 px 或字符串；center 默认 min(60vw,900px)，left/right 默认 320px |
| `height` | 高度；center 默认 min(60vh,600px)，bottom/top 默认 auto，left/right 默认 100% |
| `maxHeight` | 内容最大高度，默认 85vh（center/bottom/top 生效） |
| `hideHandle` | 隐藏 bottom/top 的拖动条 |
| `hideOverlay` | 隐藏遮罩（保留滚动锁与 ESC） |
| `animated` | 进出场动画，默认开（200ms，遵循 prefers-reduced-motion） |
| `closable` | 显示右上角关闭 |
| `closeOnOverlay` | 点遮罩关闭 |
| `closeOnEscape` | ESC 关闭，默认 true（只有最上层响应） |
| `header-right 插槽` | 标题栏右侧、关闭按钮左边的操作区 |
| `to` | teleport 目标，默认 'body'；demo 里传容器选择器可留在页内 |

## 用到的 token

`--bg-overlay` · `--bg-card` · `--shadow-lg` · `--radius-md` · `--radius-lg` · `--z-modal`

## 可访问性

role="dialog" + aria-modal + aria-label；焦点进层、Tab 循环、关闭后回到原触发元素；ESC 与宿主返回手势共用同一个层栈（只关最上层）；body 滚动按层计数加锁

## 来源

`src/components/BaseModal.vue`
