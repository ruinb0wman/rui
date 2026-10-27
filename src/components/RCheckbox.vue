<script setup lang="ts">
defineOptions({ name: 'RCheckbox' })

type BCheckboxSize = 'default' | 'small'

const props = withDefaults(defineProps<{
  modelValue?: boolean
  label?: string
  disabled?: boolean
  indeterminate?: boolean
  size?: BCheckboxSize
}>(), {
  modelValue: false,
  label: '',
  disabled: false,
  indeterminate: false,
  size: 'default',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [value: boolean]
}>()

function handleChange() {
  if (props.disabled) return
  const next = !props.modelValue
  emit('update:modelValue', next)
  emit('change', next)
}
</script>

<template>
  <label
    class="r-checkbox"
    :class="[`r-checkbox--${size}`, {
      'r-checkbox--checked': modelValue,
      'r-checkbox--indeterminate': indeterminate && !modelValue,
      'r-checkbox--disabled': disabled,
    }]"
    @keydown.space.prevent="handleChange"
  >
    <span class="r-checkbox__input">
      <input type="checkbox" :checked="modelValue" :disabled="disabled" @change="handleChange" />
      <span class="r-checkbox__inner">
        <svg v-if="indeterminate && !modelValue" class="r-checkbox__icon" viewBox="0 0 16 16">
          <line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
        <svg v-else-if="modelValue" class="r-checkbox__icon" viewBox="0 0 16 16">
          <polyline points="3,8 7,12 13,5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
    </span>
    <span v-if="label" class="r-checkbox__label">{{ label }}</span>
    <slot v-else />
  </label>
</template>

<style scoped>
.r-checkbox {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  outline: none;
}
.r-checkbox--disabled {
  cursor: not-allowed;
  opacity: 0.55;
}
.r-checkbox__input {
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
}
.r-checkbox__input input {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  z-index: 1;
}
.r-checkbox--disabled .r-checkbox__input input {
  cursor: not-allowed;
}
.r-checkbox__inner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-sm);
  background: var(--bg-card);
  transition: all var(--motion-base) var(--motion-ease);
}
.r-checkbox--default .r-checkbox__inner {
  width: 18px;
  height: 18px;
}
.r-checkbox--small .r-checkbox__inner {
  width: 14px;
  height: 14px;
}
.r-checkbox--checked .r-checkbox__inner,
.r-checkbox--indeterminate .r-checkbox__inner {
  background: var(--color-primary);
  border-color: var(--color-primary);
}
.r-checkbox:hover .r-checkbox__inner {
  border-color: var(--color-primary);
}
.r-checkbox:focus-visible .r-checkbox__inner {
  box-shadow: 0 0 0 2px var(--color-primary-bg), 0 0 0 3px var(--color-primary);
}
.r-checkbox__icon {
  color: #fff;
  width: 12px;
  height: 12px;
}
.r-checkbox--small .r-checkbox__icon {
  width: 10px;
  height: 10px;
}
.r-checkbox__label {
  font-size: var(--font-base);
  color: var(--text-primary);
  line-height: 1.4;
}
.r-checkbox--small .r-checkbox__label {
  font-size: var(--font-sm);
}
</style>
