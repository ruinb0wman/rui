<template>
  <div class="r-empty">
    <div class="r-empty-icon">
      <slot>
        <RLucideIcon name="Plus" :size="32" />
      </slot>
    </div>
    <p class="r-empty-title">{{ title }}</p>
    <p v-if="description" class="r-empty-desc">{{ description }}</p>
    <slot name="action" />
  </div>
</template>

<script setup lang="ts">
import RLucideIcon from './RLucideIcon.vue'

defineOptions({ name: 'REmptyState' })

withDefaults(defineProps<{
  title: string
  description?: string
}>(), {
  description: '',
})
</script>

<style scoped>
.r-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-7) var(--space-4);
  text-align: center;
  color: var(--text-tertiary);
}

.r-empty-icon {
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

.r-empty-title {
  margin: 0;
  font-size: var(--font-md);
  font-weight: 500;
  color: var(--text-secondary);
}

.r-empty-desc {
  margin: var(--space-1) 0 0;
  font-size: var(--font-base);
  color: var(--text-tertiary);
}
</style>
