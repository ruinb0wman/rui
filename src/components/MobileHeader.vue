<template>
  <header class="mobile-header">
    <div class="mobile-header-side">
      <button
        v-if="back"
        type="button"
        aria-label="Back"
        class="mobile-header-back"
        @click="emit('back')"
      >
        <LucideIcon name="ChevronLeft" :size="24" />
      </button>
      <slot v-else name="left" />
    </div>

    <h1 class="mobile-header-title">{{ title }}</h1>

    <div class="mobile-header-side mobile-header-side--end">
      <slot name="right" />
    </div>
  </header>
</template>

<script setup lang="ts">
import LucideIcon from './LucideIcon.vue'

defineOptions({ name: 'MobileHeader' })

withDefaults(defineProps<{
  title: string
  /** 显示返回键；点击只 emit('back')，路由由使用方自己接（本库不 import vue-router） */
  back?: boolean
}>(), {
  back: false,
})

const emit = defineEmits<{
  (e: 'back'): void
}>()

defineSlots<{
  left?: (props: {}) => any
  right?: (props: {}) => any
}>()
</script>

<style scoped>
.mobile-header {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-h);
  padding: 0 var(--space-4);
  background: var(--bg-page);
  border-bottom: 1px solid var(--border-default);
}

.mobile-header-side {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-shrink: 0;
  /* 触控底线：两个槽都是 44×44 */
  min-width: var(--control-h);
  min-height: var(--control-h);
}

.mobile-header-side--end {
  justify-content: flex-end;
}

.mobile-header-back {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: var(--control-h);
  height: var(--control-h);
  padding: 0;
  border: none;
  background: transparent;
  color: var(--text-primary);
  cursor: pointer;
  transition: color var(--motion-fast) var(--motion-ease);
}

.mobile-header-back:hover {
  color: var(--color-primary);
}

.mobile-header-back:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.mobile-header-title {
  flex: 1;
  min-width: 0;
  margin: 0;
  text-align: center;
  color: var(--text-primary);
  font-size: var(--font-lg);
  font-weight: 700;
  line-height: var(--leading-tight);
  letter-spacing: -0.015em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
