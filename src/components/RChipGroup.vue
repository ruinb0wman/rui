<template>
  <div
    class="r-chips"
    :class="[`r-chips--${layout}`, { 'r-chips--small': size === 'small' }]"
    :style="gridStyle"
    role="group"
  >
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      class="r-chip"
      :class="{ 'r-chip--active': isActive(option.value) }"
      :aria-pressed="isActive(option.value)"
      :disabled="disabled"
      @click="toggle(option.value)"
    >
      <slot name="label" :option="option">{{ option.label }}</slot>
    </button>
  </div>
</template>

<script lang="ts">
export interface ChipOption<V> {
  label: string
  value: V
}
</script>

<script setup lang="ts" generic="T extends string | number">
import { computed } from 'vue'

defineOptions({ name: 'RChipGroup' })

const props = withDefaults(defineProps<{
  options: ChipOption<T>[]
  /** 单选传单个值，多选传数组 */
  modelValue?: T | T[] | null
  multiple?: boolean
  /** scroll=横向可滑的胶囊行；grid=等分网格 */
  layout?: 'scroll' | 'grid'
  /** grid 的列数与项宽 */
  columns?: number
  itemWidth?: string
  size?: 'small' | 'default'
  disabled?: boolean
}>(), {
  modelValue: null,
  multiple: false,
  layout: 'scroll',
  columns: 4,
  itemWidth: '',
  size: 'default',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: T | T[]]
  change: [value: T | T[]]
}>()

function isActive(value: T): boolean {
  if (props.multiple) {
    return Array.isArray(props.modelValue) && props.modelValue.includes(value)
  }
  return props.modelValue === value
}

function toggle(value: T) {
  if (props.disabled) return
  if (!props.multiple) {
    emit('update:modelValue', value)
    emit('change', value)
    return
  }
  const current = Array.isArray(props.modelValue) ? [...props.modelValue] : []
  const index = current.indexOf(value)
  if (index >= 0) current.splice(index, 1)
  else current.push(value)
  emit('update:modelValue', current)
  emit('change', current)
}

const gridStyle = computed(() => {
  if (props.layout !== 'grid') return {}
  const track = props.itemWidth || 'minmax(0, 1fr)'
  return { gridTemplateColumns: `repeat(${props.columns}, ${track})` }
})
</script>

<style scoped>
.r-chips {
  display: grid;
  gap: var(--space-2);
}

.r-chips--scroll {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  overflow-x: auto;
  padding-bottom: var(--space-2);
  scrollbar-width: none;
}

.r-chips--scroll::-webkit-scrollbar {
  display: none;
}

.r-chip {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: var(--control-h);
  padding: 0 var(--space-4);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-full);
  background: var(--bg-card);
  color: var(--text-secondary);
  font-family: inherit;
  font-size: var(--font-base);
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  transition: background var(--motion-fast) var(--motion-ease), color var(--motion-fast) var(--motion-ease);
}

.r-chip:hover:not(:disabled) {
  background: var(--bg-elevated);
  color: var(--text-primary);
}

.r-chip:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.r-chip:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.r-chip--active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--text-inverse);
}

.r-chip--active:hover:not(:disabled) {
  background: var(--color-primary-hover);
  color: var(--text-inverse);
}

.r-chips--small .r-chip {
  min-height: var(--control-h-sm);
  padding: 0 var(--space-3);
  font-size: var(--font-sm);
}
</style>
