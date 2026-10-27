<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: RHamburgerButton
summary: 汉堡菜单按钮：open 时三条线变叉，尺寸跟随密度档。
when:
  - 窄屏打开 RDrawer 的触发按钮
notFor:
  - 桌面端常驻导航
  - 需要图标的普通按钮（用 RButton + RLucideIcon）
---

# RHamburgerButton

汉堡菜单按钮：open 时三条线变叉，尺寸跟随密度档。

## 什么时候用

- 窄屏打开 RDrawer 的触发按钮

## 不要用于

- 桌面端常驻导航
- 需要图标的普通按钮（用 RButton + RLucideIcon）

## 示例

<script setup>
import { ref, computed } from 'vue'
import RHamburgerButton from '../../src/components/RHamburgerButton.vue'
const open = ref(false)
</script>

<ClientOnly>
<div class="demo-box">

<RHamburgerButton :open="open" @toggle="open = !open" />

</div>
</ClientOnly>

## Props

| prop | 说明 |
| --- | --- |
| `open` | 菜单是否打开（控制动画与 aria-expanded） |

## 用到的 token

`--control-h` · `--bg-subtle` · `--text-primary` · `--motion-base`

## 可访问性

button + aria-expanded + 动态 aria-label（打开/关闭菜单）

## 来源

`src/components/RHamburgerButton.vue`
