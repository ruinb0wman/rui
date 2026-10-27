<script setup lang="ts">

import RLucideIcon from './RLucideIcon.vue'

defineOptions({ name: 'RDatePicker' })

const props = withDefaults(defineProps<{
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  min?: string
  max?: string
  size?: 'large' | 'default' | 'small'
}>(), {
  modelValue: '',
  placeholder: '',
  disabled: false,
  clearable: false,
  min: '',
  max: '',
  size: 'default',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

function handleInput(e: Event) {
  const val = (e.target as HTMLInputElement).value
  emit('update:modelValue', val)
  emit('change', val)
}

function handleClear() {
  emit('update:modelValue', '')
  emit('change', '')
}
</script>

<template>
  <span
    class="r-date-picker"
    :class="[`r-date-picker--${size}`, {
      'r-date-picker--disabled': disabled,
      'r-date-picker--clearable': clearable && modelValue,
    }]"
  >
    <RLucideIcon name="Calendar" class="r-date-picker__icon" />
    <input
      type="date"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :min="min"
      :max="max"
      class="r-date-picker__input"
      @input="handleInput"
      @blur="emit('blur', $event)"
      @focus="emit('focus', $event)"
    />
    <span
      v-if="clearable && modelValue"
      class="r-date-picker__clear"
      @click="handleClear"
      @mousedown.prevent
    >
      <RLucideIcon name="X" />
    </span>
  </span>
</template>

<style scoped>
.r-date-picker {
  display: inline-flex;
  align-items: center;
  position: relative;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-sm);
  background: var(--bg-card);
  transition: border-color var(--motion-base) var(--motion-ease), box-shadow var(--motion-base) var(--motion-ease);
  overflow: hidden;
}
.r-date-picker:hover {
  border-color: var(--color-primary);
}
.r-date-picker:focus-within {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-primary-bg);
}
.r-date-picker--disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
.r-date-picker--disabled:hover {
  border-color: var(--border-default);
}
.r-date-picker--default {
  height: var(--control-h);
}
.r-date-picker--small {
  height: var(--control-h-sm);
}
.r-date-picker--large {
  height: calc(var(--control-h) + var(--space-2));
}
.r-date-picker__icon {
  flex-shrink: 0;
  color: var(--text-tertiary);
  margin-left: var(--space-3);
}
.r-date-picker--small .r-date-picker__icon {
  width: 14px;
  height: 14px;
}
.r-date-picker__input {
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  padding: 0 var(--space-2);
  font-size: var(--font-base);
  color: var(--text-primary);
  font-family: inherit;
  line-height: 1;
  height: 100%;
  cursor: pointer;
}
.r-date-picker--small .r-date-picker__input {
  font-size: var(--font-sm);
  padding: 0 var(--space-2);
}
.r-date-picker--large .r-date-picker__input {
  font-size: var(--font-md);
  padding: 0 var(--space-3);
}
.r-date-picker__input::placeholder {
  color: var(--text-disabled);
}
.r-date-picker__input::-webkit-calendar-picker-indicator {
  cursor: pointer;
  opacity: 0.5;
}
.r-date-picker--disabled .r-date-picker__input {
  cursor: not-allowed;
}
.r-date-picker__clear {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
  color: var(--text-tertiary);
  padding: 0 var(--space-2);
  transition: color var(--motion-base) var(--motion-ease);
}
.r-date-picker__clear:hover {
  color: var(--text-secondary);
}
</style>
