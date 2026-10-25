<template>
  <div class="m-wheel">
    <div class="m-wheel-highlight" aria-hidden="true" />

    <div
      ref="containerRef"
      class="m-wheel-scroll"
      @scroll="handleScroll"
    >
      <div :style="{ height: `${paddingHeight}px` }" />

      <div
        v-for="option in options"
        :key="option"
        class="m-wheel-item"
        @click="emit('update:modelValue', option)"
      >
        <span class="m-wheel-value" :class="{ 'm-wheel-value--active': option === modelValue }">
          {{ format(option) }}
        </span>
      </div>

      <div :style="{ height: `${paddingHeight}px` }" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

defineOptions({ name: 'MobileWheelPicker' })

const props = withDefaults(defineProps<{
  /** 可选值（数字） */
  options: number[]
  modelValue: number
  /** 每项显示文本 */
  format?: (value: number) => string
}>(), {
  format: (value: number) => String(value),
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

/*
 * 行高与可视行数是滚轮自己的几何常量，不跟 density 走：
 * 吸附位置（scrollTop / ITEM_H）是算术，不是样式，读 CSS 变量会让它依赖渲染时序。
 */
const ITEM_H = 40
const VISIBLE_COUNT = 5
const paddingHeight = ((VISIBLE_COUNT - 1) / 2) * ITEM_H

const containerRef = ref<HTMLDivElement | null>(null)

function handleScroll(event: Event) {
  const target = event.currentTarget as HTMLDivElement
  const index = Math.round(target.scrollTop / ITEM_H)
  const next = props.options[Math.max(0, Math.min(index, props.options.length - 1))]
  if (next !== props.modelValue) emit('update:modelValue', next)
}

function alignToValue() {
  if (!containerRef.value) return
  const index = props.options.indexOf(props.modelValue)
  containerRef.value.scrollTop = Math.max(0, index) * ITEM_H
}

watch([() => props.modelValue, () => props.options], alignToValue, { immediate: true })
onMounted(alignToValue)
</script>

<style scoped>
.m-wheel {
  position: relative;
  height: calc(var(--space-7) * 4 + var(--space-2));
  width: 100%;
}

.m-wheel-highlight {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 40px;
  border-radius: var(--radius-sm);
  background: var(--color-primary-bg);
  pointer-events: none;
}

.m-wheel-scroll {
  height: 100%;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.m-wheel-scroll::-webkit-scrollbar {
  display: none;
}

.m-wheel-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  scroll-snap-align: center;
  cursor: pointer;
}

.m-wheel-value {
  font-size: var(--font-lg);
  font-weight: 500;
  color: var(--text-secondary);
  transition: color var(--motion-fast) var(--motion-ease);
}

.m-wheel-value--active {
  color: var(--color-primary);
}
</style>
