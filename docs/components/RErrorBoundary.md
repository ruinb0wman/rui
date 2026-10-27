<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: RErrorBoundary
summary: 渲染错误捕获，失败时显示提示 + 重试按钮。
when:
  - 包住易崩的第三方图表/富文本区域
notFor:
  - 包裹整个应用（页面级错误交给路由 onError）
  - 异步请求失败（那不是渲染错误）
---

# RErrorBoundary

渲染错误捕获，失败时显示提示 + 重试按钮。

## 什么时候用

- 包住易崩的第三方图表/富文本区域

## 不要用于

- 包裹整个应用（页面级错误交给路由 onError）
- 异步请求失败（那不是渲染错误）

## 示例

<script setup>
import RErrorBoundary from '../../src/components/RErrorBoundary.vue'

</script>

<ClientOnly>
<div class="demo-box">

<RErrorBoundary>
  <p style="color:var(--text-secondary)">这层内容一旦渲染抛错，就会替换成「渲染异常 + 重试」。</p>
</RErrorBoundary>

</div>
</ClientOnly>

## Props

| prop | 说明 |
| --- | --- |
| — | 无 props，默认插槽即受保护内容 |

## 用到的 token

`--color-warning` · `--bg-card`

## 来源

`src/components/RErrorBoundary.vue`
