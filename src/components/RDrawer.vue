<template>
  <Teleport :to="to">
    <Transition name="r-drawer-fade">
      <div v-if="visible" class="r-drawer-overlay" :style="{ zIndex }" @click.self="onClose">
        <aside
          ref="root"
          class="r-drawer"
          role="dialog"
          aria-modal="true"
          :aria-label="title"
          :style="{ width, zIndex }"
        >
          <header class="r-drawer-header">
            <h2>{{ title }}</h2>
            <RButton circle size="small" aria-label="关闭" @click="onClose">
              <RLucideIcon name="X" :size="18" />
            </RButton>
          </header>
          <nav class="r-drawer-nav">
            <button
              v-for="item in items"
              :key="item.key"
              type="button"
              class="r-drawer-item"
              :class="{ 'r-drawer-item--active': item.key === activeKey }"
              :aria-current="item.key === activeKey ? 'page' : undefined"
              @click="emit('select', item.key)"
            >
              <RLucideIcon :name="item.icon" :size="18" />
              <span>{{ item.label }}</span>
            </button>
          </nav>
          <div v-if="$slots.default" class="r-drawer-extra">
            <slot />
          </div>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import RButton from './RButton.vue'
import RLucideIcon from './RLucideIcon.vue'
import { useOverlayLayer } from '../composables/useOverlayLayer'

defineOptions({ name: 'RDrawer' })

export interface DrawerItem {
  key: string
  label: string
  icon: string
}

const props = withDefaults(defineProps<{
  visible: boolean
  title?: string
  items: DrawerItem[]
  activeKey?: string
  width?: string
  closeOnEscape?: boolean
  to?: string
}>(), {
  title: '导航',
  activeKey: '',
  width: '280px',
  closeOnEscape: true,
  to: 'body',
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'select', key: string): void
}>()

const root = ref<HTMLElement>()

const { zIndex } = useOverlayLayer({
  visible: computed(() => props.visible),
  container: root,
  onEscape: () => {
    if (props.closeOnEscape) onClose()
  },
})

function onClose() {
  emit('close')
}
</script>

<style scoped>
.r-drawer-overlay {
  position: fixed;
  inset: 0;
  background: var(--bg-overlay);
}

.r-drawer {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  max-width: 80vw;
  display: flex;
  flex-direction: column;
  background: var(--bg-card);
  box-shadow: var(--shadow-lg);
}

.r-drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-4) var(--space-5);
  border-bottom: 1px solid var(--border-subtle);
}

.r-drawer-header h2 {
  margin: 0;
  font-size: var(--font-md);
  font-weight: 600;
  color: var(--text-primary);
}

.r-drawer-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-05);
  padding: var(--space-2);
  overflow-y: auto;
}

.r-drawer-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  height: var(--control-h);
  padding: 0 var(--space-4);
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-primary);
  font-family: inherit;
  font-size: var(--font-ui);
  text-align: left;
  cursor: pointer;
  transition: background var(--motion-fast) var(--motion-ease), color var(--motion-fast) var(--motion-ease);
}

.r-drawer-item:hover {
  background: var(--bg-subtle);
}

.r-drawer-item:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: -2px;
}

.r-drawer-item--active {
  background: var(--color-primary);
  color: var(--text-inverse);
}

.r-drawer-extra {
  margin-top: auto;
  padding: var(--space-4);
  border-top: 1px solid var(--border-subtle);
}

.r-drawer-fade-enter-active,
.r-drawer-fade-leave-active {
  transition: opacity var(--motion-base) var(--motion-ease);
}

.r-drawer-fade-enter-active .r-drawer,
.r-drawer-fade-leave-active .r-drawer {
  transition: transform var(--motion-base) var(--motion-ease);
}

.r-drawer-fade-enter-from,
.r-drawer-fade-leave-to {
  opacity: 0;
}

.r-drawer-fade-enter-from .r-drawer,
.r-drawer-fade-leave-to .r-drawer {
  transform: translateX(-100%);
}
</style>
