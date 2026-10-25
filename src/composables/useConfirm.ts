/**
 * 应用级确认框 / 提示框（`await confirm({...})` 形式）。
 *
 * 为什么不直接用 `window.alert` / `window.confirm`：
 * - Android WebView 没实现 `onJsAlert`，`WebChromeClient` 默认返回 false → 提示被静默丢弃；
 * - Electron 里是原生模态，会阻塞渲染进程。
 *
 * 用法：应用根组件挂一次 `<BConfirmHost />`，之后在任何地方
 *   const confirm = useConfirm(); if (await confirm({ message: '...' })) { ... }
 *   const alertDialog = useAlert(); await alertDialog({ message: '...' })
 */
import { ref } from 'vue'

export type ConfirmVariant = 'danger' | 'warning' | 'info'

export interface ConfirmOptions {
  title?: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: ConfirmVariant
  /** 只显示一个按钮（提示框用，没有「取消」语义） */
  alertOnly?: boolean
}

export interface AlertOptions {
  title?: string
  message: string
  confirmLabel?: string
  variant?: ConfirmVariant
}

interface ConfirmState {
  visible: boolean
  options: ConfirmOptions | null
  resolve: ((value: boolean) => void) | null
}

const state = ref<ConfirmState>({
  visible: false,
  options: null,
  resolve: null,
})

/** 供 BConfirmHost 读取当前对话框状态 */
export function useConfirmState() {
  return state
}

function confirm(options: ConfirmOptions): Promise<boolean> {
  return new Promise((resolve) => {
    state.value = { visible: true, options: { ...options, alertOnly: false }, resolve }
  })
}

function showAlert(options: AlertOptions): Promise<void> {
  return new Promise((resolve) => {
    state.value = {
      visible: true,
      options: { ...options, alertOnly: true },
      // 没有「取消」语义：关掉即完成（按钮 / 遮罩 / Esc / 返回手势都算）
      resolve: () => resolve(),
    }
  })
}

/** 关闭对话框并回传结果 */
export function resolveConfirm(value: boolean) {
  state.value.resolve?.(value)
  state.value = { visible: false, options: null, resolve: null }
}

export function useConfirm() {
  return confirm
}

export function useAlert() {
  return showAlert
}
