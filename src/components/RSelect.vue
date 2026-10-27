<script setup lang="ts">
import RLucideIcon from './RLucideIcon.vue'

defineOptions({ name: 'RSelect' })

/**
 * 原生 `<select>` 的壳：统一高度/内距/字号/箭头，选项还是原生 `<option>`（保留系统下拉的可访问性）。
 */
const props = withDefaults(defineProps<{
  modelValue?: string | number
  size?: 'large' | 'default' | 'small'
  disabled?: boolean
  /** 无障碍名称（没有可见 label 时必填） */
  ariaLabel?: string
}>(), {
  modelValue: '',
  size: 'default',
  disabled: false,
  ariaLabel: '',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}>()

function onChange(event: Event): void {
  const value = (event.target as HTMLSelectElement).value
  emit('update:modelValue', value)
  emit('change', value)
}

defineSlots<{ default?: (props: {}) => any }>()
</script>

<template>
  <div class="r-select" :class="[`r-select--${props.size}`, { 'r-select--disabled': disabled }]">
    <select
      class="r-select__inner"
      :value="modelValue"
      :disabled="disabled"
      :aria-label="ariaLabel || undefined"
      @change="onChange"
    >
      <slot />
    </select>
    <RLucideIcon name="ChevronDown" :size="14" class="r-select__arrow" />
  </div>
</template>

<style scoped>
.r-select {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
}

.r-select__inner {
  appearance: none;
  width: 100%;
  min-width: 0;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-sm);
  background: var(--bg-card);
  color: var(--text-primary);
  font-family: inherit;
  outline: none;
  cursor: pointer;
  /* 右侧给箭头留位 */
  padding-right: calc(var(--control-px) + var(--space-4));
  transition: border-color var(--motion-fast) var(--motion-ease);
}

.r-select__inner:hover {
  border-color: var(--border-strong);
}

.r-select__inner:focus-visible {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-primary-bg);
}

.r-select--large .r-select__inner {
  height: calc(var(--control-h) + var(--space-2));
  padding-left: var(--space-4);
  font-size: var(--font-md);
}

.r-select--default .r-select__inner {
  height: var(--control-h);
  padding-left: var(--control-px);
  font-size: var(--font-ui);
}

.r-select--small .r-select__inner {
  height: var(--control-h-sm);
  padding-left: var(--space-2);
  font-size: var(--font-xs);
}

.r-select__inner option {
  background: var(--bg-card);
  color: var(--text-primary);
}

.r-select__arrow {
  position: absolute;
  right: var(--space-2);
  color: var(--text-tertiary);
  pointer-events: none;
}

.r-select--disabled .r-select__inner {
  background: var(--bg-subtle);
  color: var(--text-disabled);
  cursor: not-allowed;
}
</style>
