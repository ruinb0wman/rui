<script setup lang="ts">
import { computed, inject, type ComputedRef } from 'vue'

defineOptions({ name: 'RRadio' })

type BRadioSize = 'large' | 'default' | 'small'

interface RadioGroupContext {
  modelValue: ComputedRef<string | number>
  disabled: ComputedRef<boolean>
  size: ComputedRef<BRadioSize>
  emit: (event: 'update:modelValue' | 'change', value: string | number) => void
}

const props = withDefaults(defineProps<{
  value?: string | number
  label?: string
  disabled?: boolean
}>(), {
  value: '',
  label: '',
  disabled: false,
})

const radioGroup = inject<RadioGroupContext | null>('radioGroup', null)

const checked = computed(() => radioGroup ? radioGroup.modelValue.value === props.value : false)
const isDisabled = computed(() => props.disabled || (radioGroup?.disabled.value ?? false))
const size = computed(() => radioGroup?.size.value ?? 'default')

function handleClick() {
  if (isDisabled.value) return
  if (radioGroup) {
    radioGroup.emit('update:modelValue', props.value)
    radioGroup.emit('change', props.value)
  }
}
</script>

<template>
  <label
    class="r-radio"
    :class="[`r-radio--${size}`, {
      'r-radio--checked': checked,
      'r-radio--disabled': isDisabled,
    }]"
    @click="handleClick"
    @keydown.space.prevent="handleClick"
    tabindex="0"
  >
    <span class="r-radio__input">
      <input type="radio" :checked="checked" :disabled="isDisabled" :value="value" @click="handleClick" />
      <span class="r-radio__inner">
        <span v-if="checked" class="r-radio__dot" />
      </span>
    </span>
    <span v-if="label" class="r-radio__label">{{ label }}</span>
    <slot v-else />
  </label>
</template>

<style scoped>
.r-radio {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  outline: none;
}
.r-radio:focus-visible .r-radio__inner {
  box-shadow: 0 0 0 2px var(--color-primary-bg), 0 0 0 3px var(--color-primary);
}
.r-radio--disabled {
  cursor: not-allowed;
  opacity: 0.55;
}
.r-radio__input {
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
}
.r-radio__input input {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  z-index: 1;
}
.r-radio--disabled .r-radio__input input {
  cursor: not-allowed;
}
.r-radio__inner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-default);
  border-radius: 50%;
  background: var(--bg-card);
  transition: all var(--motion-base) var(--motion-ease);
}
.r-radio--default .r-radio__inner {
  width: 18px;
  height: 18px;
}
.r-radio--small .r-radio__inner {
  width: 14px;
  height: 14px;
}
.r-radio:hover .r-radio__inner {
  border-color: var(--color-primary);
}
.r-radio--checked .r-radio__inner {
  border-color: var(--color-primary);
  background: var(--color-primary-bg);
}
.r-radio__dot {
  border-radius: 50%;
  background: var(--color-primary);
  transition: transform var(--motion-base) var(--motion-ease);
}
.r-radio--default .r-radio__dot {
  width: 10px;
  height: 10px;
}
.r-radio--small .r-radio__dot {
  width: 8px;
  height: 8px;
}
.r-radio__label {
  font-size: var(--font-base);
  color: var(--text-primary);
  line-height: 1.4;
}
.r-radio--small .r-radio__label {
  font-size: var(--font-sm);
}
</style>
