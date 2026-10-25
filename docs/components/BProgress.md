<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: BProgress
summary: 进度条：value/max 两参数，颜色走语义色，可显示百分比。
when:
  - 完成度、任务进度、容量占用
  - 需要在条上叠加文案时把文案放外面
notFor:
  - 不定长加载（用 BLoadingState）
  - 环形/多段进度（项目自己画或用图表库）
---

# BProgress

进度条：value/max 两参数，颜色走语义色，可显示百分比。

## 什么时候用

- 完成度、任务进度、容量占用
- 需要在条上叠加文案时把文案放外面

## 不要用于

- 不定长加载（用 BLoadingState）
- 环形/多段进度（项目自己画或用图表库）

## 示例

<script setup>
import { ref, computed } from 'vue'
import BProgress from '../../src/components/BProgress.vue'
const done = ref(3)
</script>

<ClientOnly>
<div class="demo-box">

<div style="display:grid;gap:12px">
  <BProgress :value="done" :max="8" show-label />
  <BProgress :value="done" :max="8" color="success" />
  <BProgress :value="done" :max="8" color="warning" size="small" />
</div>

</div>
</ClientOnly>

## Props

| prop | 说明 |
| --- | --- |
| `value` | 当前值 |
| `max` | 满分值，默认 100；为 0 时进度按 0 处理 |
| `size` | small | default |
| `color` | primary | success | warning | danger |
| `showLabel` | 右侧显示百分比 |
| `label` | progressbar 的无障碍名 |

## 用到的 token

`--color-primary` · `--bg-card` · `--radius-full` · `--motion-base`

## 可访问性

role="progressbar" + aria-valuenow/min/max；进度不只靠颜色（可选 showLabel）

## 来源

`src/components/BProgress.vue`
