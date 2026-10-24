<template>
  <nav ref="root" class="b-tabbar" role="tablist" :aria-label="label">
    <button
      v-for="item in items"
      :key="item.key"
      type="button"
      role="tab"
      class="b-tabbar-item"
      :class="{ 'b-tabbar-item--active': item.key === activeKey }"
      :aria-selected="item.key === activeKey"
      @click="emit('select', item.key)"
    >
      <LucideIcon :name="item.icon" :size="20" />
      <span class="b-tabbar-label">{{ item.label }}</span>
    </button>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LucideIcon from './LucideIcon.vue'

defineOptions({ name: 'BTabBar' })

export interface TabBarItem {
  key: string
  label: string
  icon: string
}

withDefaults(defineProps<{
  items: TabBarItem[]
  activeKey?: string
  label?: string
}>(), {
  activeKey: '',
  label: '主导航',
})

const emit = defineEmits<{ (e: 'select', key: string): void }>()

const root = ref<HTMLElement>()
</script>

<style scoped>
.b-tabbar {
  display: flex;
  justify-content: space-around;
  align-items: stretch;
  padding: var(--space-1) 0;
  padding-bottom: max(var(--space-1), env(safe-area-inset-bottom));
  border-top: 1px solid var(--border-default);
  background: var(--bg-card);
}

/*
 * 移动端底部标签栏：显示条件由使用方决定（v-if / 媒体查询都行）。
 * shortcut: 组件自己不做断点判断，桌面端想隐藏请在外层控制，避免库内置 768px 假设。
 */
.b-tabbar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-05);
  flex: 1;
  min-height: var(--control-h);
  padding: var(--space-05) var(--space-3);
  border: none;
  background: transparent;
  color: var(--text-tertiary);
  font-family: inherit;
  cursor: pointer;
  transition: color var(--motion-fast) var(--motion-ease);
}

.b-tabbar-item:hover {
  color: var(--text-secondary);
}

.b-tabbar-item:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: -2px;
}

.b-tabbar-item--active {
  color: var(--color-primary);
}

.b-tabbar-label {
  font-size: var(--font-xs);
  line-height: var(--leading-tight);
}
</style>
