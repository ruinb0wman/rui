<script setup lang="ts">
import { ref, computed, useSlots, onMounted, nextTick } from 'vue'
import RLucideIcon from './RLucideIcon.vue'

defineOptions({ name: 'RInput' })

type BInputType = 'text' | 'textarea' | 'password'
type BInputSize = 'large' | 'default' | 'small'

const props = withDefaults(defineProps<{
  modelValue?: string | number
  type?: BInputType
  size?: BInputSize
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  showPassword?: boolean
  showWordLimit?: boolean
  maxlength?: number | string
  minlength?: number | string
  rows?: number
  autosize?: boolean | { minRows?: number; maxRows?: number }
  readonly?: boolean
  autofocus?: boolean
  prefixIcon?: string
  suffixIcon?: string
  clearIcon?: string
  wordLimitPosition?: 'inside' | 'outside'
  formatter?: (value: string | number) => string
  parser?: (value: string) => string | number
}>(), {
  modelValue: '',
  type: 'text',
  size: 'default',
  placeholder: '',
  disabled: false,
  clearable: false,
  showPassword: false,
  showWordLimit: false,
  rows: 2,
  autosize: false,
  readonly: false,
  autofocus: false,
  prefixIcon: '',
  suffixIcon: '',
  clearIcon: 'X',
  wordLimitPosition: 'inside',
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
  change: [event: Event]
  input: [event: Event]
  clear: []
  keydown: [event: KeyboardEvent]
}>()

defineSlots<{
  prefix?: (props: {}) => any
  suffix?: (props: {}) => any
  prepend?: (props: {}) => any
  append?: (props: {}) => any
  passwordIcon?: (props: { visible: boolean }) => any
}>()

const slots = useSlots()
const inputRef = ref<HTMLInputElement | HTMLTextAreaElement | null>(null)
const focused = ref(false)
const passwordVisible = ref(false)
const isComposing = ref(false)

const isTextarea = computed(() => props.type === 'textarea')
const actualType = computed(() => {
  if (props.type === 'password') return passwordVisible.value ? 'text' : 'password'
  return props.type
})

const displayValue = computed(() => {
  const val = props.modelValue ?? ''
  if (props.formatter) return String(props.formatter(val))
  return String(val)
})

const hasPrefix = computed(() => !!(slots.prefix || props.prefixIcon))
const showClearBtn = computed(() => props.clearable && !props.disabled && !props.readonly && !!displayValue.value && !isTextarea.value)
const hasSuffix = computed(() => !!(slots.suffix || props.suffixIcon || showClearBtn.value || (props.showPassword && !isTextarea.value) || (props.showWordLimit && maxCount.value != null)))
const hasPrepend = computed(() => !!slots.prepend)
const hasAppend = computed(() => !!slots.append)
const wordCount = computed(() => displayValue.value.length)
const maxCount = computed(() => (props.maxlength != null ? Number(props.maxlength) : undefined))
const wordExceeded = computed(() => maxCount.value != null && wordCount.value > maxCount.value)

const iconSize = computed(() => {
  switch (props.size) {
    case 'large': return 18
    case 'small': return 14
    default: return 16
  }
})

const wrapperClasses = computed(() => {
  const cls = ['r-input', `r-input--${props.size}`]
  if (props.disabled) cls.push('r-input--disabled')
  if (props.readonly && !props.disabled) cls.push('r-input--readonly')
  if (focused.value) cls.push('r-input--focused')
  if (isTextarea.value) cls.push('r-input--textarea')
  if (hasPrepend.value) cls.push('r-input--prepend')
  if (hasAppend.value) cls.push('r-input--append')
  if (wordExceeded.value) cls.push('r-input--exceed')
  return cls
})

function onInput(event: Event) {
  if (isComposing.value) return
  const target = event.target as HTMLInputElement | HTMLTextAreaElement
  let value: string | number = target.value
  if (props.parser) {
    value = props.parser(value)
  }
  emit('update:modelValue', value)
  emit('input', event)
  if (isTextarea.value && props.autosize) {
    nextTick(() => resizeTextarea())
  }
}

function onChange(event: Event) {
  emit('change', event)
}

function onFocus(event: FocusEvent) {
  focused.value = true
  emit('focus', event)
}

function onBlur(event: FocusEvent) {
  focused.value = false
  emit('blur', event)
}

function onKeydown(event: KeyboardEvent) {
  emit('keydown', event)
}

function onCompositionStart() { isComposing.value = true }
function onCompositionEnd(event: CompositionEvent) {
  isComposing.value = false
  onInput(event)
}

function onClear() {
  emit('update:modelValue', '')
  emit('clear')
  inputRef.value?.focus()
}

function togglePassword() {
  passwordVisible.value = !passwordVisible.value
}

function resizeTextarea() {
  const el = inputRef.value as HTMLTextAreaElement | null
  if (!el || !el.scrollHeight) return
  el.style.height = 'auto'
  if (props.autosize) {
    const lineHeight = 22
    const minRows = typeof props.autosize === 'object' && props.autosize.minRows != null ? props.autosize.minRows : props.rows
    const maxRows = typeof props.autosize === 'object' && props.autosize.maxRows != null ? props.autosize.maxRows : Infinity
    const minH = minRows * lineHeight
    const maxH = maxRows * lineHeight
    el.style.height = Math.min(Math.max(el.scrollHeight, minH), maxH) + 'px'
  }
}

function focus() { inputRef.value?.focus() }
function blur() { inputRef.value?.blur() }
function clear() { onClear() }
function select() { inputRef.value?.select() }

onMounted(() => {
  if (props.autofocus) focus()
  if (isTextarea.value && props.autosize) nextTick(() => resizeTextarea())
})

defineExpose({ focus, blur, clear, select, input: inputRef })
</script>

<template>
  <div
    :class="wrapperClasses"
  >
    <div v-if="hasPrepend" class="r-input__prepend">
      <slot name="prepend" />
    </div>
    <div class="r-input__wrapper">
      <span v-if="hasPrefix" class="r-input__prefix">
        <slot name="prefix">
          <RLucideIcon v-if="prefixIcon" :name="prefixIcon" :size="iconSize" class="r-input__icon" />
        </slot>
      </span>
      <input
        v-if="!isTextarea"
        ref="inputRef"
        :value="displayValue"
        :type="actualType"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :minlength="minlength"
        class="r-input__inner"
        @input="onInput"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
        @keydown="onKeydown"
        @compositionstart="onCompositionStart"
        @compositionupdate="onCompositionStart"
        @compositionend="onCompositionEnd"
      />
      <textarea
        v-else
        ref="inputRef"
        :value="displayValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :rows="rows"
        class="r-input__inner"
        @input="onInput"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
        @keydown="onKeydown"
        @compositionstart="onCompositionStart"
        @compositionupdate="onCompositionStart"
        @compositionend="onCompositionEnd"
      />
      <span v-if="hasSuffix" class="r-input__suffix">
        <span
          v-if="showClearBtn"
          class="r-input__suffix-item r-input__clear"
          @click="onClear"
          @mousedown.prevent
        >
          <RLucideIcon :name="clearIcon" :size="14" />
        </span>
        <span
          v-if="showPassword && !isTextarea"
          class="r-input__suffix-item r-input__password-toggle"
          @click="togglePassword"
        >
          <slot name="passwordIcon" :visible="passwordVisible">
            <RLucideIcon :name="passwordVisible ? 'Eye' : 'EyeOff'" :size="iconSize" class="r-input__icon" />
          </slot>
        </span>
        <span
          v-if="showWordLimit && maxCount != null && wordLimitPosition === 'inside'"
          class="r-input__suffix-item r-input__word-limit"
        >
          {{ wordCount }} / {{ maxCount }}
        </span>
        <slot name="suffix">
          <RLucideIcon v-if="suffixIcon" :name="suffixIcon" :size="iconSize" class="r-input__icon" />
        </slot>
      </span>
    </div>
    <span
      v-if="showWordLimit && maxCount != null && wordLimitPosition === 'outside'"
      class="r-input__word-limit-outside"
    >
      {{ wordCount }} / {{ maxCount }}
    </span>
    <div v-if="hasAppend" class="r-input__append">
      <slot name="append" />
    </div>
  </div>
</template>

<style scoped>
.r-input {
  display: inline-flex;
  align-items: stretch;
  width: 100%;
  font-size: var(--font-base);
  vertical-align: middle;
  box-sizing: border-box;
}

.r-input__wrapper {
  display: flex;
  align-items: center;
  flex: 1;
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-sm);
  transition: border-color var(--motion-base) var(--motion-ease), box-shadow var(--motion-base) var(--motion-ease);
  overflow: hidden;
  min-width: 0;
}

.r-input--focused .r-input__wrapper {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-primary-bg);
}

.r-input--disabled .r-input__wrapper {
  background: var(--bg-subtle);
  cursor: not-allowed;
}

.r-input--readonly .r-input__wrapper {
  background: var(--bg-subtle);
}

.r-input--exceed .r-input__wrapper {
  border-color: var(--color-danger);
}

.r-input--exceed.r-input--focused .r-input__wrapper {
  box-shadow: 0 0 0 2px var(--color-danger-bg);
}

.r-input__inner {
  border: none;
  background: transparent;
  outline: none;
  flex: 1;
  min-width: 0;
  width: 100%;
  color: var(--text-primary);
  font-family: inherit;
  font-size: inherit;
  line-height: 1.5;
}

.r-input__inner::placeholder {
  color: var(--text-tertiary);
  opacity: 1;
}

.r-input--disabled .r-input__inner {
  cursor: not-allowed;
  color: var(--text-disabled);
}

.r-input--large .r-input__inner {
  height: calc(var(--control-h) + var(--space-2));
  padding: 0 var(--space-4);
  font-size: var(--font-md);
}

.r-input--default .r-input__inner {
  height: var(--control-h);
  padding: 0 var(--space-3);
  font-size: var(--font-base);
}

.r-input--small .r-input__inner {
  height: var(--control-h-sm);
  padding: 0 var(--space-2);
  font-size: var(--font-xs);
}

.r-input--textarea .r-input__wrapper {
  padding: var(--space-2) var(--space-3);
  align-items: flex-start;
}

.r-input--textarea .r-input__inner {
  height: auto;
  min-height: 44px;
  resize: vertical;
  padding: 0;
  line-height: 1.6;
}

.r-input__prefix,
.r-input__suffix {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  color: var(--text-tertiary);
  gap: var(--space-1);
}

.r-input__prefix {
  padding-left: var(--space-3);
}

.r-input__suffix {
  padding-right: var(--space-3);
}

.r-input--large .r-input__prefix { padding-left: 16px; }
.r-input--large .r-input__suffix { padding-right: 16px; }
.r-input--small .r-input__prefix { padding-left: 8px; }
.r-input--small .r-input__suffix { padding-right: 8px; }

.r-input__icon {
  display: inline-flex;
  flex-shrink: 0;
}

.r-input__suffix-item {
  display: inline-flex;
  align-items: center;
}

.r-input__clear {
  cursor: pointer;
  transition: color var(--motion-fast) var(--motion-ease);
  color: var(--text-tertiary);
}

.r-input__clear:hover {
  color: var(--text-primary);
}

.r-input__password-toggle {
  cursor: pointer;
  transition: color var(--motion-fast) var(--motion-ease);
  display: inline-flex;
  align-items: center;
}

.r-input__password-toggle:hover {
  color: var(--text-primary);
}

.r-input__word-limit,
.r-input__word-limit-outside {
  font-size: var(--font-xs);
  color: var(--text-tertiary);
  white-space: nowrap;
  flex-shrink: 0;
}

.r-input__word-limit-outside {
  display: inline-flex;
  align-items: center;
  margin-left: var(--space-2);
}

.r-input--exceed .r-input__word-limit,
.r-input--exceed .r-input__word-limit-outside {
  color: var(--color-danger);
}

.r-input--textarea.r-input--focused .r-input__wrapper {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-primary-bg);
}

.r-input__prepend,
.r-input__append {
  display: flex;
  align-items: center;
  background: var(--bg-subtle);
  border: 1px solid var(--border-default);
  padding: 0 var(--space-3);
  white-space: nowrap;
  color: var(--text-secondary);
  font-size: var(--font-base);
  flex-shrink: 0;
}

.r-input__prepend {
  border-right: none;
  border-radius: var(--radius-sm) 0 0 var(--radius-sm);
}

.r-input__append {
  border-left: none;
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
}

.r-input--prepend .r-input__wrapper {
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
}

.r-input--append .r-input__wrapper {
  border-radius: var(--radius-sm) 0 0 var(--radius-sm);
}

.r-input--prepend.r-input--append .r-input__wrapper {
  border-radius: 0;
}
</style>
