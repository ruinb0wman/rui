<template>
  <div class="b-empty">
    <div class="b-empty-icon">
      <slot>
        <LucideIcon name="Plus" :size="32" />
      </slot>
    </div>
    <p class="b-empty-title">{{ title }}</p>
    <p v-if="description" class="b-empty-desc">{{ description }}</p>
    <slot name="action" />
  </div>
</template>

<script setup lang="ts">
import LucideIcon from './LucideIcon.vue'

defineOptions({ name: 'BEmptyState' })

withDefaults(defineProps<{
  title: string
  description?: string
}>(), {
  description: '',
})
</script>

<style scoped>
.b-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-7) var(--space-4);
  text-align: center;
  color: var(--text-tertiary);
}

.b-empty-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--space-7);
  height: var(--space-7);
  margin-bottom: var(--space-4);
  border-radius: var(--radius-full);
  background: var(--bg-card);
  color: var(--text-tertiary);
}

.b-empty-title {
  margin: 0;
  font-size: var(--font-md);
  font-weight: 500;
  color: var(--text-secondary);
}

.b-empty-desc {
  margin: var(--space-1) 0 0;
  font-size: var(--font-base);
  color: var(--text-tertiary);
}
</style>
