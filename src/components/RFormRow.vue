<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'RFormRow' })

/**
 * 设置行：定宽 label + 控件 + 可选说明。
 * 只管布局，不包表单逻辑 —— 控件自己带 aria-label / label 关联。
 */
const props = withDefaults(defineProps<{
  label?: string
  /** 说明文字，占满整行放在下方 */
  hint?: string
  /** label 列宽，默认 96px（--space-7 × 2），传数字按 px 处理 */
  labelWidth?: number | string
  /** 控件与 label 的对齐方式；多行控件（textarea / 列表）用 start */
  align?: 'center' | 'start'
}>(), {
  label: '',
  hint: '',
  labelWidth: 'calc(var(--space-7) * 2)',
  align: 'center',
})

const style = computed(() => ({
  '--r-form-row-label': typeof props.labelWidth === 'number' ? `${props.labelWidth}px` : props.labelWidth,
}))
</script>

<template>
  <div class="r-form-row" :class="[`r-form-row--${align}`, { 'r-form-row--no-label': !label }]" :style="style">
    <span v-if="label" class="r-form-row-label">{{ label }}</span>
    <div class="r-form-row-body"><slot /></div>
    <p v-if="hint" class="r-form-row-hint">{{ hint }}</p>
  </div>
</template>

<style scoped>
.r-form-row {
  display: grid;
  grid-template-columns: var(--r-form-row-label) minmax(0, 1fr);
  gap: var(--space-3);
  align-items: center;
  padding: var(--space-3) var(--space-4);
}

.r-form-row--no-label {
  grid-template-columns: minmax(0, 1fr);
}

.r-form-row--start {
  align-items: start;
}

.r-form-row-label {
  color: var(--text-secondary);
  font-size: var(--font-ui);
  overflow-wrap: anywhere;
}

.r-form-row-body {
  min-width: 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.r-form-row-hint {
  grid-column: 1 / -1;
  margin: 0;
  color: var(--text-secondary);
  font-size: var(--font-xs);
  line-height: var(--leading-base);
}
</style>
