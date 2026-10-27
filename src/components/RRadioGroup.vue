<script setup lang="ts">
import { computed, provide } from 'vue'
import type { ComputedRef } from 'vue'

defineOptions({ name: 'RRadioGroup' })

type BRadioSize = 'large' | 'default' | 'small'

interface RadioGroupContext {
  modelValue: ComputedRef<string | number>
  disabled: ComputedRef<boolean>
  size: ComputedRef<BRadioSize>
  emit: (event: 'update:modelValue' | 'change', value: string | number) => void
}

const props = withDefaults(defineProps<{
  modelValue?: string | number
  disabled?: boolean
  size?: BRadioSize
  vertical?: boolean
  border?: boolean
}>(), {
  modelValue: '',
  disabled: false,
  size: 'default',
  vertical: false,
  border: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [value: string | number]
}>()

provide<RadioGroupContext>('radioGroup', {
  modelValue: computed(() => props.modelValue),
  disabled: computed(() => props.disabled),
  size: computed(() => props.size),
  emit: (event: 'update:modelValue' | 'change', value: string | number) => {
    if (event === 'update:modelValue') emit('update:modelValue', value)
    else emit('change', value)
  },
})
</script>

<template>
  <div
    class="r-radio-group"
    :class="[`r-radio-group--${size}`, {
      'r-radio-group--vertical': vertical,
      'r-radio-group--border': border,
    }]"
    role="radiogroup"
  >
    <slot />
  </div>
</template>

<style scoped>
.r-radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}
.r-radio-group--vertical {
  flex-direction: column;
  gap: var(--space-2);
}
.r-radio-group--border {
  gap: 0;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-sm);
  overflow: hidden;
}
.r-radio-group--border .r-radio {
  flex: 1;
  justify-content: center;
  padding: var(--space-2) var(--space-4);
  margin: 0;
  border-right: 1px solid var(--border-default);
}
.r-radio-group--border .r-radio:last-child {
  border-right: none;
}
</style>
