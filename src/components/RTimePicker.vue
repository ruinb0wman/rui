<script setup lang="ts">
import RLucideIcon from './RLucideIcon.vue'

defineOptions({ name: 'RTimePicker' })

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
    class="r-time-picker"
    :class="[`r-time-picker--${size}`, {
      'r-time-picker--disabled': disabled,
      'r-time-picker--clearable': clearable && modelValue,
    }]"
  >
    <RLucideIcon name="Clock" class="r-time-picker__icon" />
    <input
      type="time"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :min="min"
      :max="max"
      :step="step"
      class="r-time-picker__input"
      @input="handleInput"
      @blur="emit('blur', $event)"
      @focus="emit('focus', $event)"
    />
    <span
      v-if="clearable && modelValue"
      class="r-time-picker__clear"
      @click="handleClear"
      @mousedown.prevent
    >
      <RLucideIcon name="X" />
    </span>
  </span>
</template>

<style scoped>
.r-time-picker {
  display: inline-flex;
  align-items: center;
  position: relative;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-sm);
  background: var(--bg-card);
  transition: border-color var(--motion-base) var(--motion-ease), box-shadow var(--motion-base) var(--motion-ease);
  overflow: hidden;
}
.r-time-picker:hover {
  border-color: var(--color-primary);
}
.r-time-picker:focus-within {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-primary-bg);
}
.r-time-picker--disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
.r-time-picker--disabled:hover {
  border-color: var(--border-default);
}
.r-time-picker--default {
  height: var(--control-h);
}
.r-time-picker--small {
  height: var(--control-h-sm);
}
.r-time-picker--large {
  height: calc(var(--control-h) + var(--space-2));
}
.r-time-picker__icon {
  flex-shrink: 0;
  color: var(--text-tertiary);
  margin-left: var(--space-3);
}
.r-time-picker--small .r-time-picker__icon {
  width: 14px;
  height: 14px;
}
.r-time-picker__input {
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
.r-time-picker--small .r-time-picker__input {
  font-size: var(--font-sm);
  padding: 0 var(--space-2);
}
.r-time-picker--large .r-time-picker__input {
  font-size: var(--font-md);
  padding: 0 var(--space-3);
}
.r-time-picker__input::placeholder {
  color: var(--text-disabled);
}
.r-time-picker--disabled .r-time-picker__input {
  cursor: not-allowed;
}
.r-time-picker__clear {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
  color: var(--text-tertiary);
  padding: 0 var(--space-2);
  transition: color var(--motion-base) var(--motion-ease);
}
.r-time-picker__clear:hover {
  color: var(--text-secondary);
}
</style>
