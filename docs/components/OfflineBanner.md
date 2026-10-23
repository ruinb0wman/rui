<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: OfflineBanner
summary: 断网提示条（顶栏 sticky，online/offline 事件驱动）。
when:
  - 应用级布局顶部放一条，浏览器离线时自动出现
notFor:
  - 接口报错提示（那是请求层的事）
---

# OfflineBanner

断网提示条（顶栏 sticky，online/offline 事件驱动）。

## 什么时候用

- 应用级布局顶部放一条，浏览器离线时自动出现

## 不要用于

- 接口报错提示（那是请求层的事）

## 示例

<script setup>
import OfflineBanner from '../../src/components/OfflineBanner.vue'

</script>

<ClientOnly>
<div class="demo-box">

<p style="color:var(--text-secondary);font-size:var(--font-sm)">组件只在 navigator.onLine === false 时渲染；想验证可在 DevTools → Network 里切 Offline。</p>
<OfflineBanner />

</div>
</ClientOnly>

## Props

| prop | 说明 |
| --- | --- |
| — | 无 props；依赖 useOnlineStatus |

## 用到的 token

`--color-warning` · `--z-toast`

## 来源

`src/components/OfflineBanner.vue`
