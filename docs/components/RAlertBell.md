<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: RAlertBell
summary: 告警铃铛 + 下拉规则列表：数据从 props 进、开关与检查动作 emit 出去，组件本身不认识 store。
when:
  - 顶栏的告警/通知入口
  - 需要就地开关某条规则的小面板
notFor:
  - 整页的通知中心
  - 需要分页的复杂列表
---

# RAlertBell

告警铃铛 + 下拉规则列表：数据从 props 进、开关与检查动作 emit 出去，组件本身不认识 store。

## 什么时候用

- 顶栏的告警/通知入口
- 需要就地开关某条规则的小面板

## 不要用于

- 整页的通知中心
- 需要分页的复杂列表

## 示例

<script setup>
import { ref, computed } from 'vue'
import RAlertBell from '../../src/components/RAlertBell.vue'
const items = ref([
  { id: 1, title: '000961', badge: { text: '涨超', tone: 'danger' }, note: '5%', enabled: true },
  { id: 2, title: '023461', badge: { text: '跌超', tone: 'success' }, note: '3%', enabled: false },
])
</script>

<ClientOnly>
<div class="demo-box">

<RAlertBell :items="items" :unread-count="2" solid
  @toggle="id => { const it = items.find(x => x.id === id); if (it) it.enabled = !it.enabled }" />

</div>
</ClientOnly>

## Props

| prop | 说明 |
| --- | --- |
| `items` | 规则数组 { id, title, badge?, note?, enabled } |
| `unreadCount` | 未读数（&gt;0 显示红点） |
| `title` | 面板标题，默认「告警列表」 |
| `emptyText` | 空态文案 |
| `solid` | 触发器用实底样式（放在渐变/图片头部时） |

## 用到的 token

`--bg-card` · `--color-danger` · `--z-dropdown` · `--shadow-lg` · `--control-h`

## 可访问性

触发器 aria-expanded + aria-label（含未读数）；面板 role="dialog"；开关是 RSwitch（自带 aria-checked）；点击外部关闭

## 来源

`src/components/RAlertBell.vue`
