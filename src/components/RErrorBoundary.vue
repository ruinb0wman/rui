<template>
  <div v-if="hasError" class="error-boundary">
    <RLucideIcon name="AlertTriangle" :size="24" />
    <p>{{ '页面渲染异常' }}</p>
    <RButton plain @click="retry">{{ '重试' }}</RButton>
  </div>
  <slot v-else />
</template>

<script setup lang="ts">
import RButton from './RButton.vue'
import RLucideIcon from './RLucideIcon.vue'
import { ref, onErrorCaptured } from 'vue'

defineOptions({ name: 'RErrorBoundary' })

const hasError = ref(false)

onErrorCaptured((err: Error) => {
  console.error('[RErrorBoundary]', err)
  hasError.value = true
  return false
})

function retry() {
  hasError.value = false
}
</script>

<style scoped>
.error-boundary {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  padding: var(--space-7) var(--space-5);
  color: var(--text-secondary);
  text-align: center;
}

.error-boundary p {
  margin: 0;
  font-size: var(--font-base);
}

</style>
