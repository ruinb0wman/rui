<template>
  <Transition name="offline-fade">
    <div v-if="!isOnline" class="offline-banner">
      <RLucideIcon name="WifiOff" :size="16" />
      <span>{{ '网络已断开，部分功能不可用' }}</span>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import RLucideIcon from './RLucideIcon.vue'
import { useOnlineStatus } from '../composables/useOnlineStatus'

defineOptions({ name: 'ROfflineBanner' })

const { isOnline } = useOnlineStatus()
</script>

<style scoped>
.offline-banner {
  position: sticky;
  top: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background: var(--color-danger, #e74c3c);
  color: #fff;
  font-size: var(--font-sm);
  font-weight: 500;
}

.offline-fade-enter-active,
.offline-fade-leave-active {
  transition: opacity var(--motion-base) var(--motion-ease), transform var(--motion-base) var(--motion-ease);
}

.offline-fade-enter-from,
.offline-fade-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>
