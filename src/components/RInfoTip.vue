<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import RLucideIcon from './RLucideIcon.vue'

defineOptions({ name: 'RInfoTip' })

/**
 * 字段说明气泡：一个 ⓘ 图标，hover / 聚焦 / 点击时弹出解释。
 *
 * 为什么不用原生 `title`：延迟约 1s、样式不可控、触屏看不到。
 * 气泡 teleport 到 body + `position: fixed`（在滑动/`overflow:hidden` 的容器里不会被裁），
 * 位置由 getBoundingClientRect 现算并夹在视口内 —— 不引入定位库，也不做箭头/跟随。
 */
const props = withDefaults(defineProps<{
  /** 提示正文（也可用 default 插槽） */
  text?: string
  /** 无障碍名称前缀，如「机会值」→ aria-label="机会值 说明" */
  label?: string
  /** 首选方向；空间不够自动翻到另一侧 */
  side?: 'top' | 'bottom'
}>(), {
  text: '',
  label: '',
  side: 'top',
})

const MARGIN = 8 // 与视口边缘的最近距离
const GAP = 4 // 与图标之间的缝

const root = ref<HTMLElement | null>(null)
const bubble = ref<HTMLElement | null>(null)
const hovered = ref(false)
const focused = ref(false)
const pinned = ref(false)
const pos = ref<{ left: number; top: number }>({ left: -9999, top: -9999 })

const open = computed(() => hovered.value || focused.value || pinned.value)

// 组件可能在一页里出现多次，id 只需页内唯一（script setup 没有模块级计数器）
const tipId = `r-infotip-${Math.random().toString(36).slice(2, 8)}`

const closeAll = () => {
  hovered.value = false
  focused.value = false
  pinned.value = false
}

const place = () => {
  const anchor = root.value?.getBoundingClientRect()
  const box = bubble.value
  if (!anchor || !box) return
  const w = box.offsetWidth
  const h = box.offsetHeight
  const left = Math.min(Math.max(anchor.left + anchor.width / 2 - w / 2, MARGIN), window.innerWidth - w - MARGIN)
  const above = anchor.top - h - GAP
  const below = anchor.bottom + GAP
  const fitsAt = (top: number) => top >= MARGIN && top + h <= window.innerHeight - MARGIN
  const preferAbove = props.side === 'top'
  pos.value = { left, top: preferAbove ? (fitsAt(above) ? above : below) : (fitsAt(below) ? below : above) }
}

watch(open, async (isOpen) => {
  if (!isOpen) return
  await nextTick() // 气泡 v-if 刚挂上，量得到宽高才放得准
  place()
})

// 触屏没有 hover，点开之后点别处要能关上
const onDocPointerDown = (event: PointerEvent) => {
  if (!open.value) return
  if (!root.value?.contains(event.target as Node)) closeAll()
}

// fixed 定位不随页面滚动，滚动/改窗口就收起，避免气泡飘在原处
const onViewportChange = () => closeAll()

onMounted(() => {
  document.addEventListener('pointerdown', onDocPointerDown)
  window.addEventListener('scroll', onViewportChange, { capture: true, passive: true })
  window.addEventListener('resize', onViewportChange)
})
onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onDocPointerDown)
  window.removeEventListener('scroll', onViewportChange, { capture: true })
  window.removeEventListener('resize', onViewportChange)
})
</script>

<template>
  <span
    ref="root"
    class="r-infotip"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    @keydown.esc="closeAll"
  >
    <button
      type="button"
      class="r-infotip-trigger"
      :aria-label="label ? `${label} 说明` : undefined"
      :aria-describedby="open ? tipId : undefined"
      :aria-expanded="open"
      @click="pinned = !pinned"
      @focus="focused = true"
      @blur="focused = false"
    >
      <RLucideIcon name="Info" :size="14" />
    </button>
    <Teleport to="body">
      <span
        v-if="open"
        :id="tipId"
        ref="bubble"
        class="r-infotip-bubble"
        role="tooltip"
        :style="{ left: `${pos.left}px`, top: `${pos.top}px` }"
      >
        <slot>{{ text }}</slot>
      </span>
    </Teleport>
  </span>
</template>

<style scoped>
.r-infotip {
  position: relative;
  display: inline-flex;
  vertical-align: middle;
}

.r-infotip-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  /* 图标 14px，靠内距把点击区撑到约 22px */
  padding: var(--space-1);
  border: 0;
  border-radius: var(--radius-full);
  background: none;
  color: var(--text-tertiary);
  cursor: help;
  transition: color var(--motion-fast) var(--motion-ease);
}

.r-infotip-trigger:hover,
.r-infotip-trigger:focus-visible,
.r-infotip-trigger[aria-expanded='true'] {
  color: var(--text-secondary);
}

.r-infotip-trigger:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: var(--space-05);
}

.r-infotip-bubble {
  position: fixed;
  z-index: var(--z-dropdown);
  /* 用 em 而不是新档 px：宽度跟随字号与密度，不额外引入尺度 */
  width: max-content;
  max-width: 22em;
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-sm);
  background: var(--bg-elevated);
  box-shadow: var(--shadow-md);
  color: var(--text-secondary);
  font-size: var(--font-xs);
  line-height: var(--leading-base);
  text-align: left;
  white-space: normal;
  pointer-events: none;
}
</style>
