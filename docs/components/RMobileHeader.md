<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: RMobileHeader
summary: 移动端页面标题栏：返回键 + 居中标题 + 左右两个 44px 槽，高度读 --header-h。
when:
  - 移动端二级页面的顶部栏
  - 需要左右各放一个图标按钮的标题栏
notFor:
  - 需要塞下拉菜单、搜索框的桌面顶栏（用页面自己布局）
  - 带问候语/统计的个性化头部（那是页面内容，不是标题栏）
---

# RMobileHeader

移动端页面标题栏：返回键 + 居中标题 + 左右两个 44px 槽，高度读 --header-h。

## 什么时候用

- 移动端二级页面的顶部栏
- 需要左右各放一个图标按钮的标题栏

## 不要用于

- 需要塞下拉菜单、搜索框的桌面顶栏（用页面自己布局）
- 带问候语/统计的个性化头部（那是页面内容，不是标题栏）

## 示例

<script setup>
import { ref, computed } from 'vue'
import RMobileHeader from '../../src/components/RMobileHeader.vue'
import RButton from '../../src/components/RButton.vue'
const hint = ref('')
</script>

<ClientOnly>
<div class="demo-box">

<div style="border:1px solid var(--border-default);border-radius:10px;overflow:hidden">
  <RMobileHeader title="Settings" back @back="hint = 'back'" >
    <template #right><RButton size="small" text>Save</RButton></template>
  </RMobileHeader>
  <p style="padding:16px;color:var(--text-secondary)">{{ hint || '点左侧箭头试试（这里只 emit back，不做路由跳转）' }}</p>
</div>

</div>
</ClientOnly>

## Props

| prop | 说明 |
| --- | --- |
| `title` | 标题（自动截断） |
| `back` | 显示返回键；点击只 emit("back")，路由由使用方接 |
| `left 插槽` | 返回键之外想放左侧内容时用 |
| `right 插槽` | 右侧操作区（图标按钮） |

## 用到的 token

`--header-h` · `--bg-page` · `--border-default` · `--control-h` · `--z-sticky`

## 可访问性

真实 &lt;header&gt; + &lt;h1&gt;；返回键有 aria-label="Back"；两个槽 ≥44×44；焦点可见

## 来源

`src/components/RMobileHeader.vue`
