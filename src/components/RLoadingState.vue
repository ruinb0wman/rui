<template>
  <div class="r-loading" :class="`r-loading--${size}`">
    <div class="r-loading-spinner" />
    <p v-if="message" class="r-loading-text">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'RLoadingState' })

const props = withDefaults(defineProps<{
  message?: string
  size?: 'small' | 'default' | 'large'
}>(), {
  message: 'Loading...',
  size: 'default',
})

const spinnerSize = computed(
  () => ({ small: 'var(--space-6)', default: 'var(--space-6)', large: 'var(--space-7)' })[props.size],
)
</script>

<style scoped>
.r-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  padding: var(--space-7) var(--space-4);
  color: var(--text-tertiary);
}

.r-loading-spinner {
  width: v-bind(spinnerSize);
  height: v-bind(spinnerSize);
  border: 2px solid var(--color-primary);
  border-top-color: transparent;
  border-radius: var(--radius-full);
  animation: r-loading-spin 800ms linear infinite;
}

.r-loading-text {
  margin: 0;
  font-size: var(--font-base);
  color: var(--text-tertiary);
}

.r-loading--small .r-loading-text {
  font-size: var(--font-xs);
}

.r-loading--large .r-loading-text {
  font-size: var(--font-md);
}

@keyframes r-loading-spin {
  to { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .r-loading-spinner {
    animation-duration: 2s;
  }
}
</style>
