<template>
  <BaseModal
    :visible="isOpen"
    direction="bottom"
    hide-handle
    :closable="false"
    :max-height="'80vh'"
    @close="emit('close')"
  >
    <template #header>
      <div class="m-time-header">
        <button type="button" class="m-time-btn" aria-label="Cancel" @click="emit('close')">
          <LucideIcon name="X" :size="20" />
        </button>
        <h3 class="m-time-title">{{ displayTitle }}</h3>
        <button type="button" class="m-time-btn m-time-btn--primary" aria-label="Confirm" @click="handleConfirm">
          <LucideIcon name="Check" :size="20" />
        </button>
      </div>
    </template>

    <div class="m-time-body">
      <div class="m-time-col">
        <span class="m-time-unit">h</span>
        <MobileWheelPicker v-model="hour" :options="hours" :format="pad" />
      </div>
      <div class="m-time-sep">:</div>
      <div class="m-time-col">
        <span class="m-time-unit">m</span>
        <MobileWheelPicker v-model="minute" :options="minutes" :format="pad" />
      </div>
    </div>

    <p class="m-time-preview">Selected: {{ selectedText }}</p>
  </BaseModal>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import BaseModal from './BaseModal.vue'
import MobileWheelPicker from './MobileWheelPicker.vue'
import LucideIcon from './LucideIcon.vue'

defineOptions({ name: 'MobileTimePicker' })

const props = withDefaults(defineProps<{
  /** 受控显示；点击确认/取消只 emit，开关状态由使用方持有 */
  isOpen: boolean
  /** "HH:mm" */
  modelValue: string
  title?: string
  /** 分钟步进，默认 15 */
  minuteInterval?: number
}>(), {
  minuteInterval: 15,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  close: []
}>()

function pad(value: number): string {
  return String(value).padStart(2, '0')
}

/** "HH:mm" → { hour, minute }，非法输入回落到 0 */
function parseTime(time: string): { hour: number; minute: number } {
  const [h, m] = time.split(':')
  const hour = Number.parseInt(h ?? '', 10)
  const minute = Number.parseInt(m ?? '', 10)
  return {
    hour: Number.isFinite(hour) ? Math.min(23, Math.max(0, hour)) : 0,
    minute: Number.isFinite(minute) ? Math.min(59, Math.max(0, minute)) : 0,
  }
}

const initial = parseTime(props.modelValue)
const hour = ref(initial.hour)
const minute = ref(Math.floor(initial.minute / props.minuteInterval) * props.minuteInterval)

watch(
  () => [props.modelValue, props.minuteInterval] as const,
  () => {
    const parsed = parseTime(props.modelValue)
    hour.value = parsed.hour
    minute.value = Math.floor(parsed.minute / props.minuteInterval) * props.minuteInterval
  },
)

const hours = Array.from({ length: 24 }, (_, i) => i)
const minutes = Array.from({ length: Math.ceil(60 / props.minuteInterval) }, (_, i) => i * props.minuteInterval)

const displayTitle = computed(() => props.title ?? 'Select Time')
const selectedText = computed(() => `${pad(hour.value)}:${pad(minute.value)}`)

function handleConfirm() {
  emit('update:modelValue', selectedText.value)
  emit('close')
}
</script>

<style scoped>
.m-time-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.m-time-title {
  margin: 0;
  font-size: var(--font-md);
  font-weight: 600;
  color: var(--text-primary);
}

.m-time-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--control-h);
  height: var(--control-h);
  padding: 0;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  transition: color var(--motion-fast) var(--motion-ease);
}

.m-time-btn:hover {
  color: var(--text-primary);
}

.m-time-btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.m-time-btn--primary {
  color: var(--color-primary);
}

.m-time-body {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-5) var(--space-6);
}

.m-time-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
}

.m-time-unit {
  font-size: var(--font-xs);
  color: var(--text-secondary);
}

.m-time-sep {
  padding: var(--space-5) var(--space-4) 0;
  font-size: var(--font-xl);
  font-weight: 700;
  color: var(--text-primary);
}

.m-time-preview {
  margin: 0;
  padding-bottom: var(--space-4);
  text-align: center;
  font-size: var(--font-base);
  color: var(--text-secondary);
}
</style>
