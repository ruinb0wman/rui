<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'RSettingsNav' })

export interface SettingsNavItem {
  id: string
  label: string
  /** 右侧角标（如「核心」） */
  badge?: string
  /** 分组标题：与上一项不同时插一条分组标题 */
  group?: string
}

const props = withDefaults(defineProps<{
  items: SettingsNavItem[]
  modelValue: string
  /** 顶部标题，空则不渲染 */
  title?: string
  /** 侧栏宽度，传数字按 px 处理 */
  width?: number | string
  /** 无障碍名称 */
  ariaLabel?: string
}>(), {
  title: '',
  width: 240,
  ariaLabel: '设置导航',
})

const emit = defineEmits<{
  (e: 'update:modelValue', id: string): void
  (e: 'select', id: string): void
}>()

const style = computed(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
}))

/** 每项前面是否需要插一条分组标题 */
const rows = computed(() =>
  props.items.map((item, i) => ({
    item,
    groupTitle: item.group && item.group !== props.items[i - 1]?.group ? item.group : '',
  }))
)

function select(id: string): void {
  if (id === props.modelValue) return
  emit('update:modelValue', id)
  emit('select', id)
}
</script>

<template>
  <nav class="r-settings-nav" :style="style" :aria-label="ariaLabel">
    <div v-if="title" class="r-settings-nav-title">{{ title }}</div>
    <template v-for="row in rows" :key="row.item.id">
      <div v-if="row.groupTitle" class="r-settings-nav-group">{{ row.groupTitle }}</div>
      <button
        type="button"
        class="r-settings-nav-item"
        :class="{ 'r-settings-nav-item--active': row.item.id === modelValue }"
        :aria-current="row.item.id === modelValue ? 'page' : undefined"
        @click="select(row.item.id)"
      >
        <span class="r-settings-nav-label">{{ row.item.label }}</span>
        <span v-if="row.item.badge" class="r-settings-nav-badge">{{ row.item.badge }}</span>
      </button>
    </template>
    <slot />
  </nav>
</template>

<style scoped>
.r-settings-nav {
  flex: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-05);
  padding: var(--space-3) var(--space-2);
  overflow-y: auto;
  background: var(--bg-card);
  border-right: 1px solid var(--border-default);
  box-sizing: border-box;
}

.r-settings-nav-title {
  padding: 0 var(--space-2) var(--space-2);
  font-size: var(--font-md);
  font-weight: 700;
  color: var(--text-primary);
}

.r-settings-nav-group {
  padding: var(--space-3) var(--space-2) var(--space-1);
  color: var(--text-secondary);
  font-size: var(--font-xs);
}

.r-settings-nav-item {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  width: 100%;
  min-height: var(--control-h-sm);
  padding: var(--space-1) var(--space-2);
  border: none;
  border-radius: var(--radius-sm);
  background: none;
  color: var(--text-secondary);
  font-family: inherit;
  font-size: var(--font-ui);
  text-align: left;
  cursor: pointer;
  transition: background var(--motion-fast) var(--motion-ease), color var(--motion-fast) var(--motion-ease);
}

.r-settings-nav-item:hover {
  background: var(--bg-elevated);
  color: var(--text-primary);
}

.r-settings-nav-item--active {
  background: var(--color-primary-bg);
  color: var(--text-primary);
}

.r-settings-nav-item:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.r-settings-nav-label {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.r-settings-nav-badge {
  flex: none;
  padding: 0 var(--space-1);
  border-radius: var(--radius-full);
  background: var(--color-warning-bg);
  color: var(--color-warning);
  font-size: var(--font-xs);
}
</style>
