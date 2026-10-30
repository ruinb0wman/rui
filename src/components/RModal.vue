<template>
  <Teleport :to="to">
    <Transition :name="animated ? 'bm' : 'bm-none'">
      <div
        v-if="visible"
        class="base-modal-overlay"
        :class="[`base-modal-overlay--${direction}`, { 'base-modal-overlay--hidden': hideOverlay }]"
        :style="{ zIndex }"
        @click.self="onOverlayClick"
      >
        <div
          ref="root"
          class="base-modal"
          :class="`base-modal--${direction}`"
          role="dialog"
          aria-modal="true"
          :aria-label="title"
          :style="modalStyle"
        >
          <!-- 底部/顶部弹出：拖动条（纯装饰，提示可下滑关闭） -->
          <div v-if="showHandle" class="base-modal-handle" aria-hidden="true" />

          <div v-if="hasHeader" class="base-modal-header">
            <slot name="header">
              <h3>{{ title }}</h3>
            </slot>
            <div class="base-modal-header-right">
              <slot name="header-right" />
              <button v-if="closable" class="base-modal-close" @click="onClose" :aria-label="'Close'">
                ×
              </button>
            </div>
          </div>
          <div class="base-modal-body" :class="{ 'no-header': !hasHeader }">
            <slot />
          </div>
          <div v-if="$slots.footer" class="base-modal-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useOverlayLayer } from '../composables/useOverlayLayer'

defineOptions({ name: 'RModal' })

/** center=居中弹窗；bottom/top=移动端底部/顶部弹出；left/right=侧边抽屉 */
export type ModalDirection = 'center' | 'bottom' | 'top' | 'left' | 'right'

const props = withDefaults(defineProps<{
  visible: boolean
  direction?: ModalDirection
  title?: string
  width?: number | string
  height?: string
  /** 内容最大高度，默认 85vh（bottom/top/center 生效） */
  maxHeight?: string
  /** 隐藏底部/顶部弹出的拖动条 */
  hideHandle?: boolean
  /** 隐藏遮罩（保留滚动锁与 ESC） */
  hideOverlay?: boolean
  /** 关闭动画，默认开 */
  animated?: boolean
  closable?: boolean
  closeOnOverlay?: boolean
  closeOnEscape?: boolean
  /** teleport 目标，默认 body；文档站 demo 里传容器选择器即可留在页内 */
  to?: string
}>(), {
  visible: false,
  direction: 'center',
  maxHeight: '85vh',
  hideOverlay: false,
  animated: true,
  closable: true,
  closeOnOverlay: true,
  closeOnEscape: true,
  to: 'body',
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

const slots = defineSlots<{
  header?: (props: {}) => any
  'header-right'?: (props: {}) => any
  footer?: (props: {}) => any
  default?: (props: {}) => any
}>()

const hasHeader = computed(() => !!(slots.header || props.title))

const isVertical = computed(() => props.direction === 'bottom' || props.direction === 'top')
const isSide = computed(() => props.direction === 'left' || props.direction === 'right')

const showHandle = computed(
  () =>
    !props.hideHandle && (props.direction === 'bottom' || props.direction === 'top'),
)

const modalStyle = computed(() => {
  const style: Record<string, string> = {}
  const w = props.width
  if (w) {
    style.width = typeof w === 'number' ? `${w}px` : w
    // 手机窄屏：宽度夹到遮罩内宽，否则 680px 的弹窗只能靠 flex 挤压（形状对、内容挤）
    style.maxWidth = '100%'
  }
  if (props.height) {
    style.height = props.height
  }
  // 底部/顶部弹出按内容撑高，交给 max-height 兜住；侧边抽屉是满高的，不要 cap
  if (!isSide.value) {
    style.maxHeight = props.maxHeight
  }
  if (isVertical.value && !props.height) {
    style.height = 'auto'
  }
  if (isSide.value && !props.height) {
    style.height = '100%'
  }
  return style
})

const root = ref<HTMLElement>()

const { zIndex } = useOverlayLayer({
  visible: computed(() => props.visible),
  container: root,
  onEscape: () => {
    if (props.closeOnEscape) onClose()
  },
})

function onClose() {
  emit('close')
}

function onOverlayClick() {
  if (props.closeOnOverlay) onClose()
}
</script>

<style scoped>
.base-modal-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-6);
  background: var(--bg-overlay);
  backdrop-filter: blur(4px);
}

.base-modal-overlay--bottom {
  align-items: flex-end;
  padding: 0;
}

.base-modal-overlay--top {
  align-items: flex-start;
  padding: 0;
}

.base-modal-overlay--left {
  justify-content: flex-start;
  padding: 0;
}

.base-modal-overlay--right {
  justify-content: flex-end;
  padding: 0;
}

.base-modal-overlay--hidden {
  background: transparent;
  backdrop-filter: none;
}

.base-modal {
  width: min(60vw, 900px);
  height: min(60vh, 600px);
  display: flex;
  flex-direction: column;
  padding: var(--space-5);
  border-radius: var(--radius-md);
  background: var(--bg-card);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
}

/* ── 底部/顶部弹出（移动端） ── */
.base-modal--bottom,
.base-modal--top {
  width: 100%;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
}

.base-modal--bottom {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  padding-bottom: max(var(--space-5), env(safe-area-inset-bottom));
}

.base-modal--top {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  padding-top: max(var(--space-5), env(safe-area-inset-top));
}

/* ── 侧边抽屉 ── */
.base-modal--left,
.base-modal--right {
  width: 320px;
  max-width: 80vw;
}

.base-modal--left {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.base-modal--right {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.base-modal-handle {
  width: var(--space-7);
  height: var(--space-1);
  margin: calc(var(--space-3) * -1) auto var(--space-2);
  border-radius: var(--radius-full);
  background: var(--border-strong);
  opacity: 0.6;
  flex-shrink: 0;
}

.base-modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-4);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--border-default);
  flex-shrink: 0;
}

.base-modal-header h3 {
  margin: 0;
  font-size: var(--font-lg);
  color: var(--text-primary);
}

.base-modal-header-right {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex-shrink: 0;
}

.base-modal-close {
  width: var(--control-h-sm);
  height: var(--control-h-sm);
  border: none;
  border-radius: var(--radius-sm);
  background: var(--bg-subtle);
  color: var(--text-secondary);
  cursor: pointer;
  font-size: var(--font-lg);
  line-height: 1;
  flex-shrink: 0;
  transition: background var(--motion-fast) var(--motion-ease), color var(--motion-fast) var(--motion-ease);
}

.base-modal-close:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.base-modal-close:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.base-modal-body {
  padding: var(--space-4) 0 0;
  overflow-y: auto;
  flex: 1;
}

.base-modal-body.no-header {
  padding-top: 0;
}

.base-modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  padding-top: var(--space-4);
  margin-top: var(--space-4);
  border-top: 1px solid var(--border-default);
  flex-shrink: 0;
}

/* 进场/出场：遮罩淡入淡出 + 面板按方向的位移 */
.bm-enter-active,
.bm-leave-active {
  transition: opacity var(--motion-base) var(--motion-ease);
}

.bm-enter-active .base-modal,
.bm-leave-active .base-modal {
  transition: transform var(--motion-base) var(--motion-ease);
}

.bm-enter-from,
.bm-leave-to {
  opacity: 0;
}

.bm-enter-from .base-modal--center,
.bm-leave-to .base-modal--center {
  transform: scale(0.95);
}

.bm-enter-from .base-modal--bottom,
.bm-leave-to .base-modal--bottom {
  transform: translateY(100%);
}

.bm-enter-from .base-modal--top,
.bm-leave-to .base-modal--top {
  transform: translateY(-100%);
}

.bm-enter-from .base-modal--left,
.bm-leave-to .base-modal--left {
  transform: translateX(-100%);
}

.bm-enter-from .base-modal--right,
.bm-leave-to .base-modal--right {
  transform: translateX(100%);
}

/* 手机：居中弹窗按视口给尺寸。默认 min(60vw,900px) 在 390 手机上只有 234px；
 * 传了 width 的内联宽度改由 maxWidth:100% 兜（内联样式优先级高于这条 media）。 */
@media (max-width: 768px) {
  .base-modal--center {
    width: 100%;
    max-width: none;
    height: auto;
    max-height: calc(100dvh - 2 * var(--space-6));
  }
}

@media (prefers-reduced-motion: reduce) {
  .bm-enter-active,
  .bm-leave-active,
  .bm-enter-active .base-modal,
  .bm-leave-active .base-modal {
    transition: none;
  }
}
</style>
