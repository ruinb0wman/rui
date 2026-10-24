<template>
  <div ref="wrapperRef" class="b-bell">
    <button
      type="button"
      class="b-bell-trigger"
      :class="{ 'b-bell-trigger--solid': solid }"
      :aria-label="`告警（${unreadCount}）`"
      :aria-expanded="open"
      @click="toggle"
    >
      <LucideIcon :name="unreadCount > 0 ? 'BellRing' : 'Bell'" :size="18" />
      <span v-if="unreadCount > 0" class="b-bell-badge">{{ unreadCount > 99 ? '99+' : unreadCount }}</span>
    </button>

    <Transition name="b-bell-drop">
      <div v-if="open" class="b-bell-panel" role="dialog" :aria-label="title">
        <div class="b-bell-panel-head">
          <span class="b-bell-panel-title">{{ title }}</span>
          <BButton circle size="small" aria-label="关闭" @click="open = false">×</BButton>
        </div>
        <div class="b-bell-panel-body">
          <p v-if="!items.length" class="b-bell-empty">{{ emptyText }}</p>
          <div v-for="item in items" :key="item.id" class="b-bell-row">
            <span class="b-bell-row-main">
              <strong>{{ item.title }}</strong>
              <em v-if="item.badge" class="b-bell-tag" :class="`b-bell-tag--${item.badge.tone ?? 'neutral'}`">
                {{ item.badge.text }}
              </em>
              <span v-if="item.note" class="b-bell-note">{{ item.note }}</span>
            </span>
            <BSwitch
              :model-value="item.enabled"
              size="small"
              @update:model-value="(v: boolean) => emit('toggle', item.id, v)"
            />
          </div>
        </div>
        <div v-if="$slots.footer" class="b-bell-panel-foot">
          <slot name="footer" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue'
import BButton from './BButton.vue'
import BSwitch from './BSwitch.vue'
import LucideIcon from './LucideIcon.vue'

defineOptions({ name: 'BAlertBell' })

export interface BellItem {
  id: string | number
  title: string
  badge?: { text: string; tone?: 'danger' | 'success' | 'neutral' }
  note?: string
  enabled: boolean
}

const props = withDefaults(defineProps<{
  items: BellItem[]
  unreadCount?: number
  title?: string
  emptyText?: string
  /** 触发器用半透明底（放在渐变/图片头上时用） */
  solid?: boolean
}>(), {
  unreadCount: 0,
  title: '告警列表',
  emptyText: '暂无告警规则',
  solid: false,
})

const emit = defineEmits<{
  (e: 'toggle', id: string | number, enabled: boolean): void
  (e: 'update:open', value: boolean): void
}>()

const open = ref(false)
const wrapperRef = ref<HTMLElement>()

function toggle() {
  open.value = !open.value
}

function onClickOutside(e: MouseEvent) {
  if (open.value && wrapperRef.value && !wrapperRef.value.contains(e.target as Node)) {
    open.value = false
  }
}

watch(open, (val) => {
  emit('update:open', val)
  if (val) document.addEventListener('mousedown', onClickOutside)
  else document.removeEventListener('mousedown', onClickOutside)
})

onUnmounted(() => document.removeEventListener('mousedown', onClickOutside))
</script>

<style scoped>
.b-bell {
  position: relative;
}

.b-bell-trigger {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--control-h);
  height: var(--control-h);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-full);
  background: var(--bg-card);
  color: var(--text-primary);
  cursor: pointer;
  transition: background var(--motion-base) var(--motion-ease), border-color var(--motion-base) var(--motion-ease);
}

.b-bell-trigger:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.b-bell-trigger:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* 放在渐变头部时用 solid：半透明底 + 反色图标 */
.b-bell-trigger--solid {
  border-color: var(--border-strong);
  background: var(--bg-subtle);
  color: var(--text-inverse);
}

.b-bell-badge {
  position: absolute;
  top: calc(var(--space-1) * -1);
  right: calc(var(--space-1) * -1);
  min-width: var(--space-4);
  height: var(--space-4);
  padding: 0 var(--space-05);
  border-radius: var(--radius-full);
  background: var(--color-danger);
  color: var(--text-inverse);
  font-size: var(--font-xs);
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.b-bell-panel {
  position: absolute;
  top: calc(var(--control-h) + var(--space-2));
  right: 0;
  z-index: var(--z-dropdown);
  width: 320px;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
}

.b-bell-panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--border-default);
}

.b-bell-panel-title {
  font-size: var(--font-base);
  font-weight: 600;
  color: var(--text-primary);
}

.b-bell-panel-body {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-2);
}

.b-bell-empty {
  margin: 0;
  padding: var(--space-5);
  text-align: center;
  font-size: var(--font-sm);
  color: var(--text-tertiary);
}

.b-bell-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
  transition: background var(--motion-fast) var(--motion-ease);
}

.b-bell-row:hover {
  background: var(--bg-hover);
}

.b-bell-row-main {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  min-width: 0;
  font-size: var(--font-sm);
}

.b-bell-row-main strong {
  font-weight: 600;
  color: var(--text-primary);
}

.b-bell-tag {
  padding: 0 var(--space-1);
  border-radius: var(--radius-sm);
  font-style: normal;
  font-size: var(--font-xs);
  color: var(--text-secondary);
  background: var(--bg-subtle);
}

.b-bell-tag--danger {
  background: var(--color-danger-bg);
  color: var(--color-danger);
}

.b-bell-tag--success {
  background: var(--color-success-bg);
  color: var(--color-success);
}

.b-bell-note {
  color: var(--text-tertiary);
}

.b-bell-panel-foot {
  display: flex;
  justify-content: center;
  padding: var(--space-2) var(--space-4);
  border-top: 1px solid var(--border-default);
}

.b-bell-drop-enter-active,
.b-bell-drop-leave-active {
  transition: opacity var(--motion-base) var(--motion-ease), transform var(--motion-base) var(--motion-ease);
}

.b-bell-drop-enter-from,
.b-bell-drop-leave-to {
  opacity: 0;
  transform: translateY(calc(var(--space-2) * -1));
}
</style>
