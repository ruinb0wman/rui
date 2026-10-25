<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: BErrorState
summary: 失败态：一句标题 + 可选重试按钮（只在传了 @retry 时渲染）。
when:
  - 请求失败、数据读不出来
  - 需要给用户一个重试入口
notFor:
  - 表单校验错误（写在字段旁）
  - 空数据（用 BEmptyState）
---

# BErrorState

失败态：一句标题 + 可选重试按钮（只在传了 @retry 时渲染）。

## 什么时候用

- 请求失败、数据读不出来
- 需要给用户一个重试入口

## 不要用于

- 表单校验错误（写在字段旁）
- 空数据（用 BEmptyState）

## 示例

<script setup>
import { ref, computed } from 'vue'
import BErrorState from '../../src/components/BErrorState.vue'
const tries = ref(0)
</script>

<ClientOnly>
<div class="demo-box">

<BErrorState title="Failed to load data" @retry="tries++" />
<p style="color:var(--text-secondary);text-align:center">重试 {{ tries }} 次</p>

</div>
</ClientOnly>

## Props

| prop | 说明 |
| --- | --- |
| `title` | 失败文案，默认 Failed to load data |
| `retryLabel` | 重试按钮文案，默认 Retry |
| `retry 事件` | 监听才显示按钮，不监听就不渲染 |

## 用到的 token

`--color-primary` · `--text-tertiary` · `--radius-sm`

## 可访问性

重试是真 button，可 Tab/回车；按钮有无由是否监听事件决定，避免空按钮

## 来源

`src/components/BErrorState.vue`
