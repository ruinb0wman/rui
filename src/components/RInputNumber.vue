<script setup lang="ts">
import { ref, computed, watch, useSlots } from 'vue'

import { isTextAllowed } from '../utils/number'

defineOptions({ name: 'RInputNumber' })

type BInputNumberSize = 'large' | 'default' | 'small'
type ControlsPosition = 'default' | 'right'

const props = withDefaults(defineProps<{
  modelValue?: number | null
  min?: number
  max?: number
  step?: number
  stepStrictly?: boolean
  precision?: number
  size?: BInputNumberSize
  disabled?: boolean
  readonly?: boolean
  controls?: boolean
  controlsPosition?: ControlsPosition
  placeholder?: string
  formatter?: (value: number | null) => string
  parser?: (value: string) => number | null
  name?: string
  id?: string
  valueOnClear?: number | null
  /** 允许输入小数（关掉后拒绝 "."，输入框用数字键盘） */
  allowDecimal?: boolean
}>(), {
  modelValue: null,
  min: Number.MIN_SAFE_INTEGER,
  max: Number.MAX_SAFE_INTEGER,
  step: 1,
  stepStrictly: false,
  size: 'default',
  disabled: false,
  readonly: false,
  controls: true,
  controlsPosition: 'default',
  placeholder: '',
  valueOnClear: null,
  allowDecimal: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: number | null]
  change: [value: number | null]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

defineSlots<{
  'decrease-icon'?: (props: {}) => any
  'increase-icon'?: (props: {}) => any
  prefix?: (props: {}) => any
  suffix?: (props: {}) => any
}>()

const slots = useSlots()

const inputRef = ref<HTMLInputElement | null>(null)
const focused = ref(false)
const tempValue = ref('')

function formatValue(val: number | null | undefined): string {
  if (val == null) return ''
  if (props.formatter) return props.formatter(val)
  return String(val)
}

function parseValue(str: string): number | null {
  if (props.parser) return props.parser(str)
  const trimmed = str.trim()
  if (trimmed === '') return null
  const num = Number(trimmed)
  return isNaN(num) ? null : num
}

function clampValue(val: number): number {
  let v = val
  if (v < props.min) v = props.min
  if (v > props.max) v = props.max
  if (props.stepStrictly && props.step > 0) {
    v = Math.round((v - props.min) / props.step) * props.step + props.min
  }
  if (props.precision != null) {
    v = Number(v.toFixed(props.precision))
  }
  return v
}

const displayValue = computed(() => {
  if (focused.value) return tempValue.value
  return formatValue(props.modelValue)
})

const atMin = computed(() => props.modelValue != null && props.modelValue <= props.min)
const atMax = computed(() => props.modelValue != null && props.modelValue >= props.max)

const hasPrefix = computed(() => !!slots.prefix)
const hasSuffix = computed(() => !!slots.suffix)

const wrapperClasses = computed(() => {
  const cls = ['r-input-number', `r-input-number--${props.size}`]
  if (props.disabled) cls.push('r-input-number--disabled')
  if (props.readonly && !props.disabled) cls.push('r-input-number--readonly')
  if (focused.value) cls.push('r-input-number--focused')
  if (props.controlsPosition === 'right') cls.push('r-input-number--controls-right')
  if (!props.controls) cls.push('r-input-number--no-controls')
  return cls
})

function emitValue(val: number | null) {
  emit('update:modelValue', val)
  emit('change', val)
}

function stepUp() {
  if (props.disabled || props.readonly || atMax.value) return
  const base = props.modelValue ?? 0
  let val = base + props.step
  val = clampValue(val)
  emitValue(val)
}

function stepDown() {
  if (props.disabled || props.readonly || atMin.value) return
  const base = props.modelValue ?? 0
  let val = base - props.step
  val = clampValue(val)
  emitValue(val)
}

function onInput(event: Event) {
  if (props.disabled || props.readonly) return
  const el = event.target as HTMLInputElement
  // 小数键盘在部分区域设置下输出逗号，先归一为小数点
  const raw = props.allowDecimal ? el.value.replace(',', '.') : el.value
  // 非法字符：忽略本次输入并把 DOM 回滚到上一次合法文本
  // （Vue 不控制 input 的 value，不回滚的话非法字符会留在界面上）
  if (!isTextAllowed(raw, props.allowDecimal, props.min < 0)) {
    el.value = tempValue.value
    return
  }
  tempValue.value = raw
}

function onFocus(event: FocusEvent) {
  focused.value = true
  tempValue.value = formatValue(props.modelValue)
  emit('focus', event)
}

function onBlur(event: FocusEvent) {
  focused.value = false
  commitValue()
  emit('blur', event)
}

function commitValue() {
  const parsed = parseValue(tempValue.value)
  if (parsed == null) {
    emitValue(props.valueOnClear)
    return
  }
  const clamped = clampValue(parsed)
  emitValue(clamped)
}

function onKeydown(event: KeyboardEvent) {
  if (props.disabled || props.readonly) return
  if (event.key === 'ArrowUp') {
    event.preventDefault()
    stepUp()
  } else if (event.key === 'ArrowDown') {
    event.preventDefault()
    stepDown()
  } else if (event.key === 'Enter') {
    commitValue()
  }
}

function focus() { inputRef.value?.focus() }
function blur() { inputRef.value?.blur() }

watch(() => props.modelValue, (val) => {
  if (!focused.value) {
    tempValue.value = formatValue(val)
  }
})

defineExpose({ focus, blur })
</script>

<template>
  <div :class="wrapperClasses">
    <button
      v-if="controls && controlsPosition === 'default'"
      class="r-input-number__decrease"
      :disabled="disabled || readonly || atMin"
      type="button"
      tabindex="-1"
      @click="stepDown"
      :aria-label="'decrease'"
    >
      <slot name="decrease-icon">
        <span class="btn-label">−</span>
      </slot>
    </button>
    <div class="r-input-number__input">
      <div v-if="hasPrefix" class="r-input-number__prefix">
        <slot name="prefix" />
      </div>
      <input
        ref="inputRef"
        :value="displayValue"
        type="text"
        :inputmode="allowDecimal ? 'decimal' : 'numeric'"
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="placeholder"
        :name="name"
        :id="id"
        autocomplete="off"
        class="r-input-number__inner"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        @keydown="onKeydown"
      />
      <div v-if="hasSuffix" class="r-input-number__suffix">
        <slot name="suffix" />
      </div>
      <div
        v-if="controls && controlsPosition === 'right'"
        class="r-input-number__controls"
      >
        <button
          class="r-input-number__increase"
          :disabled="disabled || readonly || atMax"
          type="button"
          tabindex="-1"
          @click="stepUp"
          :aria-label="'increase'"
        >
          <slot name="increase-icon">
            <span class="btn-label">+</span>
          </slot>
        </button>
        <button
          class="r-input-number__decrease"
          :disabled="disabled || readonly || atMin"
          type="button"
          tabindex="-1"
          @click="stepDown"
          :aria-label="'decrease'"
        >
          <slot name="decrease-icon">
            <span class="btn-label">−</span>
          </slot>
        </button>
      </div>
    </div>
    <button
      v-if="controls && controlsPosition === 'default'"
      class="r-input-number__increase"
      :disabled="disabled || readonly || atMax"
      type="button"
      tabindex="-1"
      @click="stepUp"
      :aria-label="'increase'"
    >
      <slot name="increase-icon">
        <span class="btn-label">+</span>
      </slot>
    </button>
  </div>
</template>

<style scoped>
.r-input-number {
  display: inline-flex;
  align-items: stretch;
  vertical-align: middle;
  box-sizing: border-box;
  font-size: var(--font-base);
}

.r-input-number__decrease,
.r-input-number__increase {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-default);
  background: var(--bg-card);
  cursor: pointer;
  color: var(--text-secondary);
  transition: border-color var(--motion-base) var(--motion-ease), color var(--motion-base) var(--motion-ease), background var(--motion-base) var(--motion-ease);
  user-select: none;
  padding: 0;
  flex-shrink: 0;
  outline: none;
  font-family: inherit;
}

.btn-label {
  font-size: var(--font-md);
  font-weight: 600;
  line-height: 1;
}

.r-input-number--small .btn-label {
  font-size: var(--font-md);
}

.r-input-number--large .btn-label {
  font-size: var(--font-lg);
}

.r-input-number__decrease:hover:not(:disabled),
.r-input-number__increase:hover:not(:disabled) {
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.r-input-number__decrease:active:not(:disabled),
.r-input-number__increase:active:not(:disabled) {
  background: var(--color-primary-bg);
}

.r-input-number__decrease:disabled,
.r-input-number__increase:disabled {
  cursor: not-allowed;
  opacity: 0.4;
}

.r-input-number--large .r-input-number__decrease,
.r-input-number--large .r-input-number__increase {
  width: 44px;
  font-size: var(--font-md);
}

.r-input-number--default .r-input-number__decrease,
.r-input-number--default .r-input-number__increase {
  width: 36px;
  font-size: var(--font-base);
}

.r-input-number--small .r-input-number__decrease,
.r-input-number--small .r-input-number__increase {
  width: 28px;
  font-size: var(--font-xs);
}

.r-input-number__decrease {
  border-right: none;
  border-radius: var(--radius-sm) 0 0 var(--radius-sm);
}

.r-input-number__increase {
  border-left: none;
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
}

.r-input-number__input {
  flex: 1;
  display: flex;
  align-items: stretch;
  min-width: 0;
}

.r-input-number__inner {
  width: 100%;
  border: 1px solid var(--border-default);
  background: var(--bg-card);
  outline: none;
  color: var(--text-primary);
  font-family: inherit;
  font-size: inherit;
  text-align: center;
  transition: border-color var(--motion-base) var(--motion-ease), box-shadow var(--motion-base) var(--motion-ease);
  box-sizing: border-box;
  border-radius: var(--radius-sm);
}

.r-input-number__decrease + .r-input-number__input .r-input-number__inner {
  border-radius: 0;
}

.r-input-number:not(.r-input-number--controls-right) .r-input-number__input + .r-input-number__increase .r-input-number__inner {
  border-radius: 0;
}

.r-input-number--controls-right .r-input-number__inner {
  border-radius: var(--radius-sm) 0 0 var(--radius-sm);
}

.r-input-number--no-controls .r-input-number__inner {
  border-radius: var(--radius-sm);
}

.r-input-number__inner::placeholder {
  color: var(--text-tertiary);
  opacity: 1;
}

.r-input-number--focused .r-input-number__inner {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-primary-bg);
}

.r-input-number--disabled .r-input-number__inner {
  background: var(--bg-subtle);
  cursor: not-allowed;
  color: var(--text-disabled);
}

.r-input-number--readonly .r-input-number__inner {
  background: var(--bg-subtle);
}

.r-input-number--large .r-input-number__inner {
  height: calc(var(--control-h) + var(--space-2));
  padding: 0 var(--space-3);
  font-size: var(--font-md);
}

.r-input-number--default .r-input-number__inner {
  height: var(--control-h);
  padding: 0 var(--space-3);
  font-size: var(--font-base);
}

.r-input-number--small .r-input-number__inner {
  height: var(--control-h-sm);
  padding: 0 var(--space-2);
  font-size: var(--font-xs);
}

.r-input-number--controls-right .r-input-number__inner {
  border-right: none;
  text-align: left;
}

.r-input-number__controls {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-default);
  border-left: none;
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  overflow: hidden;
  flex-shrink: 0;
}

.r-input-number--controls-right .r-input-number__decrease,
.r-input-number--controls-right .r-input-number__increase {
  width: 100%;
  border: none;
  border-radius: 0;
  flex: 1;
  font-size: var(--font-xs);
  background: var(--bg-subtle);
}

.r-input-number--controls-right .r-input-number__decrease {
  border-top: 1px solid var(--border-default);
}

.r-input-number__prefix,
.r-input-number__suffix {
  display: flex;
  align-items: center;
  padding: 0 var(--space-2);
  color: var(--text-tertiary);
  font-size: var(--font-sm);
  flex-shrink: 0;
}

.r-input-number--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
