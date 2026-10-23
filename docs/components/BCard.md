<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: BCard
summary: 内容卡片容器，shadow 三档 + 可选 header 渐变。
when:
  - 页面内的内容分组
  - 需要 hover 抬起的可点击卡片（shadow="hover"）
notFor:
  - 页面级布局（用页面自己的 grid/flex）
  - 弹窗容器（用 BaseModal）
---

# BCard

内容卡片容器，shadow 三档 + 可选 header 渐变。

## 什么时候用

- 页面内的内容分组
- 需要 hover 抬起的可点击卡片（shadow="hover"）

## 不要用于

- 页面级布局（用页面自己的 grid/flex）
- 弹窗容器（用 BaseModal）

## 示例

<script setup>
import BCard from '../../src/components/BCard.vue'

</script>

<ClientOnly>
<div class="demo-box">

<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(180px,1fr))">
  <BCard header="默认卡片"><p style="color:var(--text-secondary)">shadow=always</p></BCard>
  <BCard header="悬浮抬起" shadow="hover"><p style="color:var(--text-secondary)">shadow=hover</p></BCard>
  <BCard shadow="never"><p style="color:var(--text-secondary)">shadow=never</p></BCard>
</div>

</div>
</ClientOnly>

## Props

| prop | 说明 |
| --- | --- |
| `shadow` | always | hover | never |
| `header` | 标题文本（也可用 header 插槽） |
| `bodyStyle` | 正文区内联样式对象 |

## 用到的 token

`--bg-card` · `--border-default` · `--shadow-sm` · `--radius-md`

## 来源

`src/components/BCard.vue`
