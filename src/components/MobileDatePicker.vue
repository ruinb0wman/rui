<template>
  <div>
    <button
      type="button"
      class="m-date-trigger"
      :disabled="disabled"
      @click="handleOpen"
    >
      <span class="m-date-text" :class="{ 'm-date-text--placeholder': !selectedDate }">
        {{ displayText }}
      </span>
      <span class="m-date-actions">
        <span
          v-if="selectedDate && !disabled"
          class="m-date-clear"
          role="button"
          aria-label="Clear date"
          @click.stop="handleClear"
        >
          ×
        </span>
        <LucideIcon name="Calendar" :size="20" class="m-date-icon" />
      </span>
    </button>

    <BaseModal
      :visible="isOpen"
      direction="bottom"
      :title="'Select date'"
      :max-height="'90vh'"
      @close="handleClose"
    >
      <MobileCalendar
        :model-value="selectedDate"
        mode="single"
        :min-date="minDate"
        :max-date="maxDate"
        :default-month="defaultMonth"
        :week-starts-on="weekStartsOn"
        :week-day-labels="weekDayLabels"
        :month-label="monthLabel"
        :show-year-switcher="showYearSwitcher"
        @change="handleDateChange"
        @month-change="(date) => emit('monthChange', date)"
      >
        <template v-if="$slots.cell" #cell="{ info }">
          <slot name="cell" :info="info" />
        </template>
      </MobileCalendar>

      <template #footer>
        <BButton size="large" @click="handleClose">Cancel</BButton>
        <BButton type="primary" size="large" @click="handleConfirm">Confirm</BButton>
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseModal from './BaseModal.vue'
import MobileCalendar, { type CalendarCellInfo, type CalendarValue } from './MobileCalendar.vue'
import BButton from './BButton.vue'
import LucideIcon from './LucideIcon.vue'

defineOptions({ name: 'MobileDatePicker' })

const props = withDefaults(defineProps<{
  /** 受控值；不传即非受控（配合 defaultValue） */
  modelValue?: Date | null
  defaultValue?: Date | null
  placeholder?: string
  disabled?: boolean
  format?: (date: Date) => string
  minDate?: Date
  maxDate?: Date
  defaultMonth?: Date
  weekStartsOn?: 0 | 1
  weekDayLabels?: string[]
  monthLabel?: (date: Date) => string
  showYearSwitcher?: boolean
}>(), {
  placeholder: 'Select date',
  disabled: false,
  format: (date: Date) =>
    date.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }),
})

const emit = defineEmits<{
  'update:modelValue': [value: Date | null]
  change: [value: Date | null]
  monthChange: [date: Date]
}>()

defineSlots<{
  cell?: (props: { info: CalendarCellInfo }) => any
}>()

const isControlled = computed(() => props.modelValue !== undefined)
const internalValue = ref<Date | null>(props.defaultValue ?? null)
const selectedDate = computed(() =>
  isControlled.value ? (props.modelValue ?? null) : internalValue.value,
)

const isOpen = ref(false)

const displayText = computed(() =>
  selectedDate.value ? props.format(selectedDate.value) : props.placeholder,
)

function handleOpen() {
  if (props.disabled) return
  isOpen.value = true
}

function handleClose() {
  isOpen.value = false
}

function commit(value: Date | null) {
  if (!isControlled.value) internalValue.value = value
  emit('update:modelValue', value)
  emit('change', value)
}

function handleDateChange(value: CalendarValue) {
  if (value instanceof Date) {
    commit(value)
    isOpen.value = false
  }
}

function handleClear() {
  commit(null)
}

function handleConfirm() {
  // 没选过就默认今天，避免「确认了但没值」
  if (!selectedDate.value) commit(new Date())
  handleClose()
}
</script>

<style scoped>
.m-date-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
  width: 100%;
  min-height: var(--control-h);
  padding: 0 var(--space-4);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-sm);
  background: var(--bg-card);
  color: var(--text-primary);
  font-family: inherit;
  font-size: var(--font-ui);
  text-align: left;
  cursor: pointer;
  transition: border-color var(--motion-base) var(--motion-ease);
}

.m-date-trigger:hover:not(:disabled) {
  border-color: var(--color-primary-border);
}

.m-date-trigger:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.m-date-trigger:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.m-date-text {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.m-date-text--placeholder {
  color: var(--text-tertiary);
}

.m-date-actions {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex-shrink: 0;
}

.m-date-clear {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--space-5);
  height: var(--space-5);
  border-radius: var(--radius-full);
  background: var(--bg-subtle);
  color: var(--text-tertiary);
  cursor: pointer;
}

.m-date-clear:hover {
  color: var(--text-primary);
}

.m-date-icon {
  color: var(--text-secondary);
}
</style>
