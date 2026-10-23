<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: BButton
summary: 按钮。6 种语义色 × 3 档尺寸，支持 plain/round/circle/text/link/loading。
when:
  - 表单提交与主操作
  - 打开弹窗/抽屉的触发点
  - 危险操作入口（type="danger"）
  - 工具栏图标按钮（circle + icon）
notFor:
  - 页面跳转（用 &lt;a&gt; 或路由链接，按钮不承担导航）
  - 纯装饰性图形
---

# BButton

按钮。6 种语义色 × 3 档尺寸，支持 plain/round/circle/text/link/loading。

## 什么时候用

- 表单提交与主操作
- 打开弹窗/抽屉的触发点
- 危险操作入口（type="danger"）
- 工具栏图标按钮（circle + icon）

## 不要用于

- 页面跳转（用 &lt;a&gt; 或路由链接，按钮不承担导航）
- 纯装饰性图形

## 示例

<script setup>
import BButton from '../../src/components/BButton.vue'

</script>

<ClientOnly>
<div class="demo-box">

<div style="display:flex;gap:8px;flex-wrap:wrap">
  <BButton type="primary">主操作</BButton>
  <BButton>次操作</BButton>
  <BButton type="danger" plain>删除</BButton>
  <BButton type="primary" loading>提交中</BButton>
  <BButton size="small" text>文字按钮</BButton>
  <BButton size="small" circle icon="Plus" />
</div>

</div>
</ClientOnly>

## Props

| prop | 说明 |
| --- | --- |
| `type` | default | primary | success | warning | danger | info |
| `size` | large | default | small |
| `plain` | 浅底描边样式 |
| `round` | 全圆角胶囊 |
| `circle` | 圆形（配 icon 用） |
| `text` | 无底无边的文字按钮 |
| `link` | 链接样式按钮 |
| `loading` | 加载态并禁用点击 |
| `disabled` | 禁用 |
| `nativeType` | button | submit | reset |
| `icon` | 图标名（Lucide），渲染在文字左侧 |

## 用到的 token

`--color-primary` · `--color-danger` · `--control-h` · `--radius-sm` · `--motion-fast`

## 可访问性

原生 &lt;button&gt;，键盘可聚焦；仅图标时用 aria-label 说明动作

## 来源

`src/components/BButton.vue`
