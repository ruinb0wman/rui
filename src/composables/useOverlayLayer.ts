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
import { isTopLayer, pushLayer } from './layerStack'

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

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
  const zIndex = ref(modalBaseZ())
  let restoreFocus: HTMLElement | null = null
  // 层栈里的 id + 出栈函数；open 可能被 immediate watch 重复触发，用 pushed 兜住
  let layer: ReturnType<typeof pushLayer> | null = null

  function isTop() {
    return layer !== null && isTopLayer(layer.id)
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
    if (!layer) {
      restoreFocus = document.activeElement as HTMLElement | null
      // onEscape 一起入栈：宿主的返回手势与 ESC 走同一个栈顶
      layer = pushLayer(() => {
        if (isTop()) onEscape?.()
      })
      zIndex.value = modalBaseZ() + layer.depth - 1
      lockScroll()
    }
    document.addEventListener('keydown', onKeydown, true)
    nextTick(() => {
      const items = focusables()
      ;(items.find((el) => el.hasAttribute('autofocus')) ?? items[0] ?? container.value)?.focus()
    })
  }

  function close() {
    if (layer) {
      layer.remove()
      layer = null
    }
    document.removeEventListener('keydown', onKeydown, true)
    unlockScroll()
    restoreFocus?.focus?.()
    restoreFocus = null
  }

  watch(visible, (val) => (val ? open() : close()), { immediate: true })
  onScopeDispose(close)

  return { zIndex, isTop }
}
