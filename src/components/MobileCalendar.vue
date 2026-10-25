<template>
  <div class="m-cal">
    <div class="m-cal-nav">
      <button
        v-if="showYearSwitcher"
        type="button"
        class="m-cal-nav-btn"
        aria-label="Previous year"
        @click="handlePrevYear"
      >
        <LucideIcon name="ChevronsLeft" :size="16" />
      </button>
      <div v-else class="m-cal-nav-spacer" />

      <button
        type="button"
        class="m-cal-nav-btn"
        aria-label="Previous month"
        @click="handlePrevMonth"
      >
        <LucideIcon name="ChevronLeft" :size="16" />
      </button>

      <p class="m-cal-title">{{ monthTitle }}</p>

      <button
        type="button"
        class="m-cal-nav-btn"
        aria-label="Next month"
        @click="handleNextMonth"
      >
        <LucideIcon name="ChevronRight" :size="16" />
      </button>

      <button
        v-if="showYearSwitcher"
        type="button"
        class="m-cal-nav-btn"
        aria-label="Next year"
        @click="handleNextYear"
      >
        <LucideIcon name="ChevronsRight" :size="16" />
      </button>
      <div v-else class="m-cal-nav-spacer" />
    </div>

    <div class="m-cal-grid">
      <p
        v-for="(weekDay, index) in adjustedWeekDayLabels"
        :key="`${weekDay}-${index}`"
        class="m-cal-weekday"
      >
        {{ weekDay }}
      </p>

      <button
        v-for="(cellInfo, index) in calendarDays"
        :key="`${cellInfo.date.toISOString()}-${index}`"
        type="button"
        class="m-cal-cell"
        :disabled="cellInfo.isDisabled"
        @click="handleDateClick(cellInfo)"
      >
        <slot name="cell" :info="cellInfo">
          <div class="m-cal-day" :class="cellClass(cellInfo)">
            {{ cellInfo.date.getDate() }}
          </div>
        </slot>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
export type CalendarValue = Date | [Date, Date] | null

export interface CalendarCellInfo {
  date: Date
  isToday: boolean
  isSelected: boolean
  isRangeStart: boolean
  isRangeEnd: boolean
  isInRange: boolean
  isCurrentMonth: boolean
  isDisabled: boolean
  dayOfWeek: number
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

/** 是否落在 [start, end] 内（含边界，只比日期不比时刻） */
function isDateInRange(date: Date, start: Date, end: Date): boolean {
  const at = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
  const from = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime()
  const to = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime()
  return at >= from && at <= to
}

function getFirstDayOfMonth(date: Date, weekStartsOn: 0 | 1): number {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  return weekStartsOn === 1 ? (firstDay === 0 ? 6 : firstDay - 1) : firstDay
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

function isDateDisabled(date: Date, minDate?: Date, maxDate?: Date): boolean {
  const day = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  if (minDate && day < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) {
    return true
  }
  if (maxDate && day > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())) {
    return true
  }
  return false
}
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import LucideIcon from './LucideIcon.vue'

defineOptions({ name: 'MobileCalendar' })

const props = withDefaults(defineProps<{
  mode?: 'single' | 'range'
  /** 受控值；不传即非受控（配合 defaultValue） */
  modelValue?: CalendarValue
  defaultValue?: CalendarValue
  /** 默认显示哪个月，默认今天 */
  defaultMonth?: Date
  showYearSwitcher?: boolean
  weekStartsOn?: 0 | 1
  weekDayLabels?: string[]
  monthLabel?: (date: Date) => string
  minDate?: Date
  maxDate?: Date
}>(), {
  mode: 'single',
  showYearSwitcher: false,
  weekStartsOn: 0,
  weekDayLabels: () => ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
})

const emit = defineEmits<{
  'update:modelValue': [value: CalendarValue]
  change: [value: CalendarValue]
  monthChange: [date: Date]
}>()

defineSlots<{
  cell?: (props: { info: CalendarCellInfo }) => any
}>()

// 组件生命周期内固定「今天」，避免跨零点时高亮乱跳
const now = new Date()
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

function initialMonth(): Date {
  if (props.defaultMonth) {
    return new Date(props.defaultMonth.getFullYear(), props.defaultMonth.getMonth(), 1)
  }
  if (props.defaultValue instanceof Date) {
    return new Date(props.defaultValue.getFullYear(), props.defaultValue.getMonth(), 1)
  }
  if (Array.isArray(props.defaultValue) && props.defaultValue[0]) {
    return new Date(
      props.defaultValue[0].getFullYear(),
      props.defaultValue[0].getMonth(),
      1,
    )
  }
  return new Date(today.getFullYear(), today.getMonth(), 1)
}

const currentMonth = ref(initialMonth())
const internalValue = ref<CalendarValue>(props.defaultValue ?? null)
/** 范围选择时记录第一次点击 */
const rangeTemp = ref<Date | null>(null)

const isControlled = computed(() => props.modelValue !== undefined)
const selectedValue = computed(() =>
  isControlled.value ? props.modelValue : internalValue.value,
)

function createCellInfo(date: Date, isCurrentMonth: boolean): CalendarCellInfo {
  const selected = selectedValue.value
  let isSelected = false
  let isRangeStart = false
  let isRangeEnd = false
  let isInRange = false

  if (props.mode === 'single' && selected instanceof Date) {
    isSelected = isSameDay(date, selected)
  } else if (props.mode === 'range' && Array.isArray(selected)) {
    const [start, end] = selected
    if (start && isSameDay(date, start)) {
      isRangeStart = true
      isSelected = true
    }
    if (end && isSameDay(date, end)) {
      isRangeEnd = true
      isSelected = true
    }
    if (start && end && !isRangeStart && !isRangeEnd) {
      isInRange = isDateInRange(date, start, end)
      isSelected = isInRange
    }
  }

  return {
    date,
    isToday: isSameDay(date, today),
    isSelected,
    isRangeStart,
    isRangeEnd,
    isInRange,
    isCurrentMonth,
    isDisabled: isDateDisabled(date, props.minDate, props.maxDate),
    dayOfWeek: date.getDay(),
  }
}

/** 固定 42 格（6 行），避免换月时高度抖动 */
const calendarDays = computed<CalendarCellInfo[]>(() => {
  const year = currentMonth.value.getFullYear()
  const month = currentMonth.value.getMonth()
  const firstDayOffset = getFirstDayOfMonth(currentMonth.value, props.weekStartsOn)
  const daysInMonth = getDaysInMonth(year, month)
  const daysInPrevMonth = getDaysInMonth(year, month - 1)
  const days: CalendarCellInfo[] = []

  for (let i = firstDayOffset - 1; i >= 0; i--) {
    days.push(createCellInfo(new Date(year, month - 1, daysInPrevMonth - i), false))
  }
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(createCellInfo(new Date(year, month, day), true))
  }
  for (let day = 1; day <= 42 - days.length; day++) {
    days.push(createCellInfo(new Date(year, month + 1, day), false))
  }
  return days
})

function setValue(value: CalendarValue) {
  if (!isControlled.value) internalValue.value = value
  emit('update:modelValue', value)
  emit('change', value)
}

function handleDateClick(cellInfo: CalendarCellInfo) {
  if (cellInfo.isDisabled) return
  const clicked = new Date(
    cellInfo.date.getFullYear(),
    cellInfo.date.getMonth(),
    cellInfo.date.getDate(),
  )

  if (props.mode === 'single') {
    setValue(clicked)
    return
  }

  if (!rangeTemp.value) {
    rangeTemp.value = clicked
    setValue([clicked, clicked])
    return
  }

  const start = rangeTemp.value
  const value: [Date, Date] = start <= clicked ? [start, clicked] : [clicked, start]
  rangeTemp.value = null
  setValue(value)
}

function changeMonth(next: Date) {
  currentMonth.value = next
  emit('monthChange', next)
}

function handlePrevMonth() {
  changeMonth(new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() - 1, 1))
}

function handleNextMonth() {
  changeMonth(new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() + 1, 1))
}

function handlePrevYear() {
  changeMonth(new Date(currentMonth.value.getFullYear() - 1, currentMonth.value.getMonth(), 1))
}

function handleNextYear() {
  changeMonth(new Date(currentMonth.value.getFullYear() + 1, currentMonth.value.getMonth(), 1))
}

const monthTitle = computed(() =>
  props.monthLabel
    ? props.monthLabel(currentMonth.value)
    : currentMonth.value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
)

const adjustedWeekDayLabels = computed(() =>
  props.weekStartsOn === 1
    ? [...props.weekDayLabels.slice(1), props.weekDayLabels[0]]
    : props.weekDayLabels,
)

function cellClass(info: CalendarCellInfo): Record<string, boolean> {
  return {
    'm-cal-day--muted': !info.isCurrentMonth || info.isDisabled,
    'm-cal-day--edge': info.isRangeStart || info.isRangeEnd,
    'm-cal-day--range': info.isInRange && !info.isRangeStart && !info.isRangeEnd,
    'm-cal-day--selected': info.isSelected && !info.isInRange,
    'm-cal-day--today': info.isToday && !info.isSelected,
  }
}
</script>

<style scoped>
.m-cal {
  width: 100%;
}

.m-cal-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-2);
}

.m-cal-nav-spacer,
.m-cal-nav-btn {
  width: var(--control-h);
  height: var(--control-h);
  flex-shrink: 0;
}

.m-cal-nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: color var(--motion-fast) var(--motion-ease);
}

.m-cal-nav-btn:hover {
  color: var(--text-primary);
}

.m-cal-nav-btn:focus-visible,
.m-cal-cell:focus-visible .m-cal-day {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.m-cal-title {
  margin: 0;
  padding: 0 var(--space-4);
  font-size: var(--font-md);
  font-weight: 700;
  color: var(--text-primary);
}

.m-cal-grid {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
}

.m-cal-weekday {
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--space-6);
  margin: 0;
  font-size: var(--font-sm);
  font-weight: 700;
  color: var(--text-tertiary);
}

.m-cal-cell {
  height: var(--space-7);
  padding: var(--space-05);
  border: none;
  background: transparent;
  cursor: pointer;
}

.m-cal-cell:disabled {
  cursor: not-allowed;
}

.m-cal-day {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: var(--radius-sm);
  font-size: var(--font-base);
  font-weight: 500;
  color: var(--text-primary);
  transition: background var(--motion-fast) var(--motion-ease);
}

.m-cal-day:hover {
  background: var(--bg-card);
}

.m-cal-day--muted {
  color: var(--text-disabled);
}

.m-cal-day--muted:hover {
  background: transparent;
}

.m-cal-day--edge {
  background: var(--color-primary);
  color: var(--text-inverse);
}

.m-cal-day--range {
  background: var(--color-primary-bg);
  color: var(--color-primary);
}

.m-cal-day--selected {
  background: var(--color-primary);
  color: var(--text-inverse);
}

.m-cal-day--today {
  box-shadow: inset 0 0 0 1px var(--color-primary);
  color: var(--color-primary);
}
</style>
