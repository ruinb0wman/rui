<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: MobileIconPicker
summary: 图标 + 颜色选择弹层：候选图标名与颜色都由 props 传入，带搜索与预览。
when:
  - 让用户挑一个图标（奖励、成就、分类）
  - 需要「图标 + 主题色」一起选
notFor:
  - 项目只有固定两三个图标可选（用 BChipGroup 更直接）
  - 图标名不是 Lucide 名称体系的项目
---

# MobileIconPicker

图标 + 颜色选择弹层：候选图标名与颜色都由 props 传入，带搜索与预览。

## 什么时候用

- 让用户挑一个图标（奖励、成就、分类）
- 需要「图标 + 主题色」一起选

## 不要用于

- 项目只有固定两三个图标可选（用 BChipGroup 更直接）
- 图标名不是 Lucide 名称体系的项目

## 示例

<script setup>
import { ref, computed } from 'vue'
import MobileIconPicker from '../../src/components/MobileIconPicker.vue'
import BButton from '../../src/components/BButton.vue'
const open = ref(false)
const icon = ref('Gift')
const color = ref('#f56565')
const icons = ['Gift','Coffee','BookOpen','Dumbbell','Pizza','Trophy','Crown','Medal','Flame','Target','Rocket','Award']
const colors = ['#f56565','#f9b44e','#3dd68c','#5c73e7','#f0abfc']
</script>

<ClientOnly>
<div class="demo-box">

<BButton type="primary" @click="open = true">选图标</BButton>
<p style="color:var(--text-secondary)">{{ icon }} / {{ color }}</p>
<MobileIconPicker :is-open="open" :icons="icons" :colors="colors" :icon="icon" :color="color"
  @confirm="(i, c) => { icon = i; color = c }" @close="open = false" />

</div>
</ClientOnly>

## Props

| prop | 说明 |
| --- | --- |
| `isOpen` | 受控显示（配合 @close） |
| `icons` | 候选图标名数组（Lucide 名称） |
| `colors` | 候选颜色数组，留空则不显示取色区 |
| `icon` | 当前图标名 |
| `color` | 当前颜色 |
| `title` | 标题，默认 Select icon |
| `confirm 事件` | 确认时回传 (icon, color) |

## 用到的 token

`--bg-page` · `--bg-elevated` · `--color-primary` · `--color-primary-bg` · `--radius-sm`

## 可访问性

每格是 button + aria-pressed + aria-label；色块同样可 Tab；搜索框有 placeholder

## 来源

`src/components/MobileIconPicker.vue`
