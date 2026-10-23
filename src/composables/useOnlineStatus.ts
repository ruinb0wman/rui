import { ref, onMounted, onUnmounted } from 'vue'

const isOnline = ref(typeof navigator === 'undefined' ? true : navigator.onLine) // SSR 安全：VitePress 构建时无 navigator

export function useOnlineStatus() {
  let onlineHandler: (() => void) | null = null
  let offlineHandler: (() => void) | null = null

  onMounted(() => {
    onlineHandler = () => { isOnline.value = true }
    offlineHandler = () => { isOnline.value = false }
    window.addEventListener('online', onlineHandler)
    window.addEventListener('offline', offlineHandler)
  })

  onUnmounted(() => {
    if (onlineHandler) window.removeEventListener('online', onlineHandler)
    if (offlineHandler) window.removeEventListener('offline', offlineHandler)
  })

  return { isOnline }
}
