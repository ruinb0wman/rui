<script setup lang="ts">
defineOptions({ name: 'RSwitch' })

type BSwitchSize = 'default' | 'small'

const props = withDefaults(defineProps<{
  modelValue?: boolean
  activeText?: string
  inactiveText?: string
  disabled?: boolean
  loading?: boolean
  size?: BSwitchSize
}>(), {
  modelValue: false,
  activeText: '',
  inactiveText: '',
  disabled: false,
  loading: false,
  size: 'default',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [value: boolean]
}>()

function handleClick() {
  if (props.disabled || props.loading) return
  const next = !props.modelValue
  emit('update:modelValue', next)
  emit('change', next)
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    handleClick()
  }
}
</script>

<template>
  <span
    class="r-switch"
    :class="[`r-switch--${size}`, {
      'r-switch--checked': modelValue,
      'r-switch--disabled': disabled,
      'r-switch--loading': loading,
    }]"
    role="switch"
    :aria-checked="modelValue"
    :aria-disabled="disabled || undefined"
    :tabindex="disabled ? -1 : 0"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <span v-if="inactiveText && !modelValue" class="r-switch__label r-switch__label--inactive">{{ inactiveText }}</span>
    <span class="r-switch__track">
      <span class="r-switch__knob">
        <span v-if="loading" class="r-switch__spinner" />
      </span>
    </span>
    <span v-if="activeText && modelValue" class="r-switch__label r-switch__label--active">{{ activeText }}</span>
  </span>
</template>

<style scoped>
.r-switch {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  outline: none;
}
.r-switch:focus-visible .r-switch__track {
  box-shadow: 0 0 0 2px var(--color-primary-bg), 0 0 0 3px var(--color-primary);
}
.r-switch--disabled {
  cursor: not-allowed;
  opacity: 0.55;
}
.r-switch--loading {
  cursor: wait;
}
.r-switch__track {
  position: relative;
  border-radius: var(--radius-full);
  background: var(--border-default);
  transition: background var(--motion-base) var(--motion-ease);
  flex-shrink: 0;
}
.r-switch--default .r-switch__track {
  width: 44px;
  height: 22px;
}
.r-switch--small .r-switch__track {
  width: 32px;
  height: 16px;
}
.r-switch--checked .r-switch__track {
  background: var(--color-primary);
}
.r-switch__knob {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  transition: transform var(--motion-base) var(--motion-ease);
  display: flex;
  align-items: center;
  justify-content: center;
}
.r-switch--small .r-switch__knob {
  width: 12px;
  height: 12px;
}
.r-switch--checked .r-switch__knob {
  transform: translateX(22px);
}
.r-switch--small.r-switch--checked .r-switch__knob {
  transform: translateX(16px);
}
.r-switch__label {
  font-size: var(--font-sm);
  line-height: 1;
  white-space: nowrap;
}
.r-switch__label--active {
  color: var(--color-primary);
}
.r-switch__label--inactive {
  color: var(--text-tertiary);
}
.r-switch__spinner {
  width: 10px;
  height: 10px;
  border: 2px solid transparent;
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: r-switch-spin 0.6s linear infinite;
}
.r-switch--small .r-switch__spinner {
  width: 8px;
  height: 8px;
  border-width: 1.5px;
}
.r-switch--loading .r-switch__knob {
  background: var(--color-primary-bg);
}
@keyframes r-switch-spin {
  to { transform: rotate(360deg); }
}
</style>
