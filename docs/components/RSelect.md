<!-- 生成物：源在 src/ai/registry.ts，跑 bun run gen:docs 覆盖 -->
---
title: RSelect
summary: 原生 select 的壳：统一高度/内距/字号/箭头，选项还是原生 &lt;option&gt;。
when:
  - 选项 6 个以上、不值得全部铺开的下拉选择
  - 设置项里的枚举选择（引擎/端口/精度）
notFor:
  - 2–5 个互斥选项（用 RRadioGroup，少点一次）
  - 可搜索/多选下拉（未实现，项目自己做）
---

# RSelect

原生 select 的壳：统一高度/内距/字号/箭头，选项还是原生 &lt;option&gt;。

## 什么时候用

- 选项 6 个以上、不值得全部铺开的下拉选择
- 设置项里的枚举选择（引擎/端口/精度）

## 不要用于

- 2–5 个互斥选项（用 RRadioGroup，少点一次）
- 可搜索/多选下拉（未实现，项目自己做）

## 示例

<script setup>
import { ref, computed } from 'vue'
import RSelect from '../../src/components/RSelect.vue'
const engine = ref('google')
</script>

<ClientOnly>
<div class="demo-box">

<div style="max-width:240px"><RSelect v-model="engine" aria-label="搜索引擎">
  <option value="google">Google</option>
  <option value="bing">Bing</option>
  <option value="duckduckgo">DuckDuckGo</option>
</RSelect></div>

</div>
</ClientOnly>

## Props

| prop | 说明 |
| --- | --- |
| `modelValue` | 当前值 |
| `size` | large | default | small |
| `disabled` | 禁用 |
| `ariaLabel` | 无障碍名称（没有可见 label 时必填） |
| `默认插槽` | 原生 &lt;option&gt; 列表 |

## 用到的 token

`--bg-card` · `--border-default` · `--control-h` · `--radius-sm` · `--control-px`

## 可访问性

保留原生 select：键盘、读屏、系统下拉全部原生行为；没有可见 label 必须给 aria-label

## 来源

`src/components/RSelect.vue`
