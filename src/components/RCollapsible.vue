<script setup lang="ts">
import { ref } from 'vue'
import RLucideIcon from './RLucideIcon.vue'

defineOptions({ name: 'RCollapsible' })

const props = withDefaults(defineProps<{
  /** 标题文本 */
  title: string
  /** 标题右侧的数量徽标，null 不显示 */
  count?: number | null
  /** false = 纯标题区，无折叠交互 */
  collapsible?: boolean
  /** collapsible 时的初始状态，收起为 true */
  defaultCollapsed?: boolean
}>(), {
  count: null,
  collapsible: true,
  defaultCollapsed: false,
})

defineSlots<{
  /** 标题行右侧（按钮等） */
  actions?: (props: {}) => any
  default?: (props: {}) => any
}>()

// 展开状态只在组件内：不做 v-model、不持久化（消费方要记住状态再议）
const isOpen = ref(!props.defaultCollapsed)
</script>

<template>
  <section class="r-collapsible">
    <div class="r-collapsible-header">
      <button
        v-if="collapsible"
        type="button"
        class="r-collapsible-toggle"
        :aria-expanded="isOpen"
        @click="isOpen = !isOpen"
      >
        <span class="r-collapsible-title">{{ title }}</span>
        <span v-if="count !== null" class="r-collapsible-count">{{ count }}</span>
        <RLucideIcon
          name="ChevronDown"
          :size="16"
          class="r-collapsible-chevron"
          :class="{ 'r-collapsible-chevron--open': isOpen }"
        />
      </button>
      <div v-else class="r-collapsible-toggle">
        <span class="r-collapsible-title">{{ title }}</span>
        <span v-if="count !== null" class="r-collapsible-count">{{ count }}</span>
      </div>

      <div v-if="$slots.actions" class="r-collapsible-actions">
        <slot name="actions" />
      </div>
    </div>

    <div v-show="!collapsible || isOpen" class="r-collapsible-body">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.r-collapsible {
  display: flex;
  flex-direction: column;
}

.r-collapsible-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
}

.r-collapsible-toggle {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  font: inherit;
  color: inherit;
  cursor: pointer;
}

div.r-collapsible-toggle {
  cursor: default;
}

.r-collapsible-title {
  color: var(--text-primary);
  font-size: var(--font-lg);
  font-weight: 600;
  line-height: var(--leading-tight);
  letter-spacing: -0.01em;
}

.r-collapsible-count {
  padding: var(--space-05) var(--space-2);
  border-radius: var(--radius-full);
  background: var(--bg-subtle);
  color: var(--text-secondary);
  font-size: var(--font-xs);
  font-weight: 600;
  line-height: var(--leading-tight);
}

.r-collapsible-chevron {
  color: var(--text-secondary);
  transition: transform var(--motion-fast) var(--motion-ease);
}

.r-collapsible-chevron--open {
  transform: rotate(180deg);
}

.r-collapsible-actions {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
</style>
