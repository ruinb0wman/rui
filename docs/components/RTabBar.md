<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: RTabBar
summary: 移动端底部标签栏：等分图标 + 文字，选中态用主色，已处理底部安全区。
when:
  - 手机端 3–5 个一级入口
  - 平板窄布局的底部导航
notFor:
  - 桌面端顶部导航
  - 可滚动的大量分类（用 RRadioGroup）
---

# RTabBar

移动端底部标签栏：等分图标 + 文字，选中态用主色，已处理底部安全区。

## 什么时候用

- 手机端 3–5 个一级入口
- 平板窄布局的底部导航

## 不要用于

- 桌面端顶部导航
- 可滚动的大量分类（用 RRadioGroup）

## 示例

<script setup>
import { ref, computed } from 'vue'
import RTabBar from '../../src/components/RTabBar.vue'
const active = ref('screening')
const items = [
  { key: 'dashboard', label: '大盘', icon: 'Home' },
  { key: 'screening', label: '筛选', icon: 'Search' },
  { key: 'portfolio', label: '持仓', icon: 'BarChart3' },
  { key: 'strategy', label: '策略', icon: 'NotebookPen' },
]
</script>

<ClientOnly>
<div class="demo-box">

<div style="max-width:420px">
  <RTabBar :items="items" :active-key="active" @select="active = $event" />
</div>

</div>
</ClientOnly>

## Props

| prop | 说明 |
| --- | --- |
| `items` | 标签数组 { key, label, icon } |
| `activeKey` | 当前选中项 key |
| `isActive` | 激活判定函数，优先于 activeKey（路由项目传 i =&gt; route.name === i.key） |
| `label` | 导航的无障碍名，默认 Main navigation |
| `railOnLandscape` | 横屏变成左侧竖栏（@media orientation: landscape） |
| `fillActive` | 激活项图标填充 |

## 用到的 token

`--bg-card` · `--color-primary` · `--font-xs` · `--border-default`

## 可访问性

role="tablist" + 每项 role="tab" + aria-selected；焦点可见；不内置断点，显示条件交给使用方

## 来源

`src/components/RTabBar.vue`
