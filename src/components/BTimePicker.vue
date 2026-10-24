<script setup lang="ts">
import LucideIcon from './LucideIcon.vue'

defineOptions({ name: 'BTimePicker' })

const props = withDefaults(defineProps<{
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  min?: string
  max?: string
  step?: number
  size?: 'large' | 'default' | 'small'
}>(), {
  modelValue: '',
  placeholder: '',
  disabled: false,
  clearable: false,
  min: '',
  max: '',
  step: 60,
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
    class="b-time-picker"
    :class="[`b-time-picker--${size}`, {
      'b-time-picker--disabled': disabled,
      'b-time-picker--clearable': clearable && modelValue,
    }]"
  >
    <LucideIcon name="Clock" class="b-time-picker__icon" />
    <input
      type="time"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :min="min"
      :max="max"
      :step="step"
      class="b-time-picker__input"
      @input="handleInput"
      @blur="emit('blur', $event)"
      @focus="emit('focus', $event)"
    />
    <span
      v-if="clearable && modelValue"
      class="b-time-picker__clear"
      @click="handleClear"
      @mousedown.prevent
    >
      <LucideIcon name="X" />
    </span>
  </span>
</template>

<style scoped>
.b-time-picker {
  display: inline-flex;
  align-items: center;
  position: relative;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-sm);
  background: var(--bg-card);
  transition: border-color var(--motion-base) var(--motion-ease), box-shadow var(--motion-base) var(--motion-ease);
  overflow: hidden;
}
.b-time-picker:hover {
  border-color: var(--color-primary);
}
.b-time-picker:focus-within {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-primary-bg);
}
.b-time-picker--disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
.b-time-picker--disabled:hover {
  border-color: var(--border-default);
}
.b-time-picker--default {
  height: 36px;
}
.b-time-picker--small {
  height: 28px;
}
.b-time-picker--large {
  height: 44px;
}
.b-time-picker__icon {
  flex-shrink: 0;
  color: var(--text-tertiary);
  margin-left: var(--space-3);
}
.b-time-picker--small .b-time-picker__icon {
  width: 14px;
  height: 14px;
}
.b-time-picker__input {
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
.b-time-picker--small .b-time-picker__input {
  font-size: var(--font-sm);
  padding: 0 var(--space-2);
}
.b-time-picker--large .b-time-picker__input {
  font-size: var(--font-md);
  padding: 0 var(--space-3);
}
.b-time-picker__input::placeholder {
  color: var(--text-disabled);
}
.b-time-picker--disabled .b-time-picker__input {
  cursor: not-allowed;
}
.b-time-picker__clear {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
  color: var(--text-tertiary);
  padding: 0 var(--space-2);
  transition: color var(--motion-base) var(--motion-ease);
}
.b-time-picker__clear:hover {
  color: var(--text-secondary);
}
</style>
