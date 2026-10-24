/**
 * 浮层行为：ESC 只关最上层、焦点进入并困在层内、关闭后回到原处、body 滚动锁按层计数。
 *
 * 用法（组件里）：
 *   const root = ref<HTMLElement>()
 *   const { zIndex } = useOverlayLayer({ visible, container: root, onEscape: () => emit('close') })
 *
 * z-index = --z-modal + 层号，所以后开的浮层一定盖住先开的，不用再写 9999。
 */
import { onScopeDispose, ref, watch, nextTick, type Ref } from 'vue'

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

const stack: symbol[] = []
let lockCount = 0

function lockScroll() {
  if (lockCount++ === 0) document.body.style.overflow = 'hidden'
}

function unlockScroll() {
  if (lockCount > 0 && --lockCount === 0) document.body.style.overflow = ''
}

function modalBaseZ(): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--z-modal').trim()
  const n = Number(raw)
  return Number.isFinite(n) && n > 0 ? n : 3000
}

export interface OverlayLayerOptions {
  visible: Ref<boolean>
  container: Ref<HTMLElement | undefined>
  onEscape?: () => void
}

export function useOverlayLayer(options: OverlayLayerOptions) {
  const { visible, container, onEscape } = options
  const id = Symbol('overlay')
  const zIndex = ref(modalBaseZ())
  let restoreFocus: HTMLElement | null = null

  function isTop() {
    return stack[stack.length - 1] === id
  }

  function focusables(): HTMLElement[] {
    if (!container.value) return []
    return [...container.value.querySelectorAll<HTMLElement>(FOCUSABLE)]
  }

  function onKeydown(e: KeyboardEvent) {
    if (!isTop()) return
    if (e.key === 'Escape') {
      e.stopPropagation()
      onEscape?.()
      return
    }
    if (e.key !== 'Tab') return
    const items = focusables()
    if (!items.length) return
    const first = items[0]
    const last = items[items.length - 1]
    const active = document.activeElement
    if (e.shiftKey && (active === first || !container.value?.contains(active))) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && active === last) {
      e.preventDefault()
      first.focus()
    }
  }

  function open() {
    restoreFocus = document.activeElement as HTMLElement | null
    stack.push(id)
    zIndex.value = modalBaseZ() + stack.length - 1
    lockScroll()
    document.addEventListener('keydown', onKeydown, true)
    nextTick(() => {
      const items = focusables()
      ;(items.find((el) => el.hasAttribute('autofocus')) ?? items[0] ?? container.value)?.focus()
    })
  }

  function close() {
    const i = stack.indexOf(id)
    if (i >= 0) stack.splice(i, 1)
    document.removeEventListener('keydown', onKeydown, true)
    unlockScroll()
    restoreFocus?.focus?.()
    restoreFocus = null
  }

  watch(visible, (val) => (val ? open() : close()), { immediate: true })
  onScopeDispose(close)

  return { zIndex, isTop }
}
