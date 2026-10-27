<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: RSettingsNav
summary: 常驻侧栏导航：分组标题 + 选中态 + 右侧角标，宽度与分组全由 props 给。
when:
  - 设置页左侧分区导航（常驻，不浮层）
  - 桌面/平板的后台一级导航
notFor:
  - 移动端抽屉导航（用 RDrawer）
  - 底部标签栏（用 RTabBar）
  - 桌面端顶部导航（用页面自己的 flex 列表）
---

# RSettingsNav

常驻侧栏导航：分组标题 + 选中态 + 右侧角标，宽度与分组全由 props 给。

## 什么时候用

- 设置页左侧分区导航（常驻，不浮层）
- 桌面/平板的后台一级导航

## 不要用于

- 移动端抽屉导航（用 RDrawer）
- 底部标签栏（用 RTabBar）
- 桌面端顶部导航（用页面自己的 flex 列表）

## 示例

<script setup>
import { ref, computed } from 'vue'
import RSettingsNav from '../../src/components/RSettingsNav.vue'
const active = ref('general')
</script>

<ClientOnly>
<div class="demo-box">

<RSettingsNav v-model="active" title="设置" :width="200" :items="[
  { id: 'general', label: '常规' },
  { id: 'toolbar', label: '工具栏' },
  { id: 'plugins', label: '插件管理', group: '插件设置' },
  { id: 'bookmarks', label: '书签', badge: '核心', group: '插件设置' },
]" style="height:220px;border-radius:var(--radius-md)" />

</div>
</ClientOnly>

## Props

| prop | 说明 |
| --- | --- |
| `items` | 数组 { id, label, badge?, group? }；group 变化时插一条分组标题 |
| `modelValue` | 当前选中项的 id |
| `title` | 顶部标题，空则不渲染 |
| `width` | 侧栏宽度，默认 240，数字按 px 处理 |
| `ariaLabel` | nav 的无障碍名称，默认「设置导航」 |
| `默认插槽` | 导航列表之后的附加内容 |

## 用到的 token

`--bg-card` · `--border-default` · `--color-primary-bg` · `--control-h-sm` · `--radius-sm`

## 可访问性

&lt;nav aria-label&gt; + 每项 &lt;button&gt;，选中项标 aria-current="page"；键盘 Tab 可达

## 来源

`src/components/RSettingsNav.vue`
