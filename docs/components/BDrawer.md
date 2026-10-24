<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: BDrawer
summary: 左侧抽屉导航：导航项由 props 传入、选中靠 key 匹配；复用 useOverlayLayer（ESC / 焦点 / 滚动锁 / 层号）。
when:
  - 窄屏把主导航收进抽屉
  - 需要从侧边滑出的次级导航
notFor:
  - 桌面端常驻侧栏（用普通布局）
  - 居中弹窗（用 BaseModal）
---

# BDrawer

左侧抽屉导航：导航项由 props 传入、选中靠 key 匹配；复用 useOverlayLayer（ESC / 焦点 / 滚动锁 / 层号）。

## 什么时候用

- 窄屏把主导航收进抽屉
- 需要从侧边滑出的次级导航

## 不要用于

- 桌面端常驻侧栏（用普通布局）
- 居中弹窗（用 BaseModal）

## 示例

<script setup>
import { ref, computed } from 'vue'
import BDrawer from '../../src/components/BDrawer.vue'
import BButton from '../../src/components/BButton.vue'
const open = ref(false)
const items = [
  { key: 'dashboard', label: '市场大盘', icon: 'Home' },
  { key: 'screening', label: '基金筛选', icon: 'Search' },
  { key: 'backtest', label: '回测', icon: 'Code2' },
]
</script>

<ClientOnly>
<div class="demo-box">

<BButton type="primary" @click="open = true">打开抽屉</BButton>
<BDrawer :visible="open" :items="items" active-key="screening" @close="open = false" @select="open = false" />

</div>
</ClientOnly>

## Props

| prop | 说明 |
| --- | --- |
| `visible` | 可见标志 |
| `title` | 抽屉标题，默认「导航」 |
| `items` | 导航项数组 { key, label, icon } |
| `activeKey` | 当前选中项的 key（由使用方按路由算） |
| `width` | 宽度，默认 '280px' |
| `closeOnEscape` | ESC 关闭，默认 true |
| `to` | teleport 目标，默认 'body' |

## 用到的 token

`--bg-card` · `--bg-overlay` · `--radius-sm` · `--control-h` · `--z-modal` · `--shadow-lg`

## 可访问性

role="dialog" + aria-modal + aria-label；导航项是 button 且有 aria-current；ESC/焦点循环/滚动锁由 useOverlayLayer 提供

## 来源

`src/components/BDrawer.vue`
