<template>
  <div class="b-error">
    <p class="b-error-title">{{ title }}</p>
    <button v-if="hasRetry" type="button" class="b-error-retry" @click="emit('retry')">
      {{ retryLabel }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'

defineOptions({ name: 'BErrorState' })

withDefaults(defineProps<{
  title?: string
  retryLabel?: string
}>(), {
  title: 'Failed to load data',
  retryLabel: 'Retry',
})

const emit = defineEmits<{
  (e: 'retry'): void
}>()

// 不声明 emits 时父组件的 @retry 会留在 attrs；这里声明了 emits 仍要看 attrs，
// 因为「有没有传 @retry」只有 attrs 能回答（emits 列表不反映运行时是否监听）。
const attrs = useAttrs()
const hasRetry = computed(() => typeof attrs.onRetry === 'function')
</script>

<style scoped>
.b-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-7) var(--space-4);
  text-align: center;
}

.b-error-title {
  margin: 0;
  font-size: var(--font-md);
  font-weight: 500;
  color: var(--text-tertiary);
}

.b-error-retry {
  padding: var(--space-1) var(--space-3);
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-primary);
  font-family: inherit;
  font-size: var(--font-base);
  cursor: pointer;
  transition: color var(--motion-fast) var(--motion-ease), background var(--motion-fast) var(--motion-ease);
}

.b-error-retry:hover {
  color: var(--color-primary-hover);
  background: var(--color-primary-bg);
}

.b-error-retry:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
</style>
