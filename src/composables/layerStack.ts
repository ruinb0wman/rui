/**
 * 浮层层栈 + 宿主返回键适配器。
 *
 * 为什么要这一层：ESC（`useOverlayLayer` 处理）和 Android 返回手势 / Electron 返回
 * 必须对「哪一层是最上面」有**同一个**判断，否则嵌套浮层（详情弹窗 → 删除确认）
 * 会出现 Esc 关一层、返回键关另一层。所以两者都从这一个栈顶取处理器。
 *
 * 宿主的返回键 API 是平台相关的（Tauri 是 `onBackButtonPress`，Electron 是
 * `before-input-event`），本库不 import 任何平台包 —— 由宿主在入口注册一次：
 *
 *   setBackButtonAdapter((onBack) => {
 *     let unregister: (() => void) | null = null
 *     let cancelled = false
 *     onBackButtonPress(onBack).then((r) => {
 *       if (cancelled) void r.unregister()
 *       else unregister = () => void r.unregister()
 *     })
 *     return () => { cancelled = true; unregister?.() }
 *   })
 *
 * 栈空就立刻注销监听：宿主系统发现 JS 注册了返回监听后会**停止自己处理返回**，
 * 一直挂着会导致「返回键失灵」。
 */
import { onScopeDispose, shallowRef, toValue, watch, type MaybeRefOrGetter } from 'vue'

/** 收到返回手势时调用 onBack；返回注销监听的函数 */
export type BackButtonAdapter = (onBack: () => void) => () => void

interface Layer {
  id: symbol
  onBack?: () => void
}

const stack: Layer[] = []
let adapter: BackButtonAdapter | null = null
let detach: (() => void) | null = null

function attach() {
  if (detach || !adapter || stack.length === 0) return
  detach = adapter(() => backTop())
}

function detachIfIdle() {
  if (stack.length > 0 || !detach) return
  detach()
  detach = null
}

/** 宿主能力注入点。设 null 卸载。 */
export function setBackButtonAdapter(fn: BackButtonAdapter | null) {
  detach?.()
  detach = null
  adapter = fn
  attach()
}

/** 把一层浮层压栈；返回 { id, depth }（depth 用于 z-index）与出栈函数 remove */
export function pushLayer(onBack?: () => void) {
  const id = Symbol('layer')
  stack.push({ id, onBack })
  attach()
  return {
    id,
    depth: stack.length,
    remove: () => removeLayer(id),
  }
}

export function removeLayer(id: symbol) {
  const index = stack.findIndex((l) => l.id === id)
  if (index >= 0) stack.splice(index, 1)
  detachIfIdle()
}

/** 只有最上层处理 ESC，避免一次按键关掉整叠浮层 */
export function isTopLayer(id: symbol): boolean {
  return stack[stack.length - 1]?.id === id
}

/** 返回手势 / 返回键：交给最上层 */
export function backTop() {
  stack[stack.length - 1]?.onBack?.()
}

/**
 * 给项目自建的浮层（没有复用 useOverlayLayer 的那些）接返回手势。
 * 与 useOverlayLayer 共用同一个栈，所以嵌套顺序天然正确。
 */
export function useBackButtonHandler(
  enabled: MaybeRefOrGetter<boolean>,
  handler: () => void,
) {
  // handler 身份每次渲染都在变，放进依赖会反复重注册、打断栈顺序
  const handlerRef = shallowRef(handler)
  watch(
    () => handler,
    (next) => {
      handlerRef.value = next
    },
    { immediate: true },
  )

  let remove: (() => void) | null = null

  watch(
    () => toValue(enabled),
    (isEnabled) => {
      if (isEnabled && !remove) {
        remove = pushLayer(() => handlerRef.value()).remove
      } else if (!isEnabled && remove) {
        remove()
        remove = null
      }
    },
    { immediate: true },
  )

  onScopeDispose(() => {
    remove?.()
    remove = null
  })
}
