<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: BConfirmHost
summary: 确认框宿主：应用根挂一次，useConfirm()/useAlert() 就能 await。
when:
  - 替代 window.alert / window.confirm（Android WebView 会丢弃 alert，Electron 里会阻塞渲染）
notFor:
  - 只需要一次性的静态弹窗（直接写 BConfirmDialog）
---

# BConfirmHost

确认框宿主：应用根挂一次，useConfirm()/useAlert() 就能 await。

## 什么时候用

- 替代 window.alert / window.confirm（Android WebView 会丢弃 alert，Electron 里会阻塞渲染）

## 不要用于

- 只需要一次性的静态弹窗（直接写 BConfirmDialog）

## 示例

<script setup>
import { ref, computed } from 'vue'
import BConfirmHost from '../../src/components/BConfirmHost.vue'
import BConfirmDialog from '../../src/components/BConfirmDialog.vue'
const open = ref(false)
</script>

<ClientOnly>
<div class="demo-box">

<p style="color:var(--text-secondary)">挂一次宿主，然后任何地方 <code>await useConfirm()({...})</code>。下面直接渲染 BConfirmDialog 演示外观：</p>
<BConfirmHost />
<BConfirmDialog :visible="open" title="Heads up" message="Saved." variant="info" alert-only
  @confirm="open = false" @cancel="open = false" />
<button style="margin-top:12px" @click="open = true">打开提示框</button>

</div>
</ClientOnly>

## Props

| prop | 说明 |
| --- | --- |
| — | 无 props；状态在 useConfirm 的模块级 store 里 |

## 用到的 token

`--color-danger` · `--color-warning` · `--color-info`

## 可访问性

同 BConfirmDialog；关掉即 resolve，不会永久挂起的 Promise

## 来源

`src/components/BConfirmHost.vue`
