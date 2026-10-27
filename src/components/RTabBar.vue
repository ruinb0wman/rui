<template>
  <nav
    class="r-tabbar"
    :class="{ 'r-tabbar--rail': railOnLandscape }"
    role="tablist"
    :aria-label="label"
  >
    <button
      v-for="item in items"
      :key="item.key"
      type="button"
      role="tab"
      class="r-tabbar-item"
      :class="{ 'r-tabbar-item--active': isActiveItem(item) }"
      :aria-selected="isActiveItem(item)"
      @click="emit('select', item.key)"
    >
      <RLucideIcon
        :name="item.icon"
        :size="20"
        :fill="fillActive && isActiveItem(item) ? 'currentColor' : 'none'"
      />
      <span class="r-tabbar-label">{{ item.label }}</span>
    </button>
  </nav>
</template>

<script setup lang="ts">
import RLucideIcon from './RLucideIcon.vue'

defineOptions({ name: 'RTabBar' })

export interface TabBarItem {
  key: string
  label: string
  icon: string
}

const props = withDefaults(defineProps<{
  items: TabBarItem[]
  activeKey?: string
  /** 激活判定函数，优先于 activeKey：路由项目传 (i) => route.name === i.key */
  isActive?: (item: TabBarItem) => boolean
  label?: string
  /** 横屏时变成左侧竖栏（@media (orientation: landscape)） */
  railOnLandscape?: boolean
  /** 激活项图标填充 */
  fillActive?: boolean
}>(), {
  activeKey: '',
  label: 'Main navigation',
  railOnLandscape: false,
  fillActive: false,
})

const emit = defineEmits<{ (e: 'select', key: string): void }>()

function isActiveItem(item: TabBarItem): boolean {
  return props.isActive ? props.isActive(item) : item.key === props.activeKey
}

</script>

<style scoped>
.r-tabbar {
  display: flex;
  justify-content: space-around;
  align-items: stretch;
  padding: var(--space-1) 0;
  /* 8px 是 env() 为 0 时的视觉下限（部分模拟器/三键导航不上报 inset） */
  padding-bottom: max(var(--space-2), env(safe-area-inset-bottom));
  border-top: 1px solid var(--border-default);
  background: var(--bg-card);
}

/*
 * 移动端底部标签栏：显示条件由使用方决定（v-if / 媒体查询都行）。
 * shortcut: 组件自己不做断点判断，桌面端想隐藏请在外层控制，避免库内置 768px 假设。
 */
.r-tabbar-item {
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

.r-tabbar-item:hover {
  color: var(--text-secondary);
}

.r-tabbar-item:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: -2px;
}

.r-tabbar-item--active {
  color: var(--color-primary);
}

.r-tabbar-label {
  font-size: var(--font-xs);
  line-height: var(--leading-tight);
}
/* 横屏：底部栏变左侧竖栏（移动端横屏没有底部空间） */
@media (orientation: landscape) {
  .r-tabbar--rail {
    flex-direction: column;
    justify-content: flex-start;
    gap: var(--space-2);
    width: 224px;
    height: 100%;
    padding: var(--space-4) var(--space-3);
    padding-top: max(var(--space-4), env(safe-area-inset-top));
    border-top: none;
    border-right: 1px solid var(--border-default);
  }

  .r-tabbar--rail .r-tabbar-item {
    flex: 0 0 auto;
    flex-direction: row;
    justify-content: flex-start;
    gap: var(--space-3);
    width: 100%;
    padding: 0 var(--space-4);
    border-radius: var(--radius-sm);
  }

  .r-tabbar--rail .r-tabbar-item--active {
    background: var(--color-primary-bg);
  }

  .r-tabbar--rail .r-tabbar-label {
    font-size: var(--font-base);
  }
}
</style>
