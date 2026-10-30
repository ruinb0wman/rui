<template>
  <div ref="wrapperRef" class="r-bell">
    <button
      type="button"
      class="r-bell-trigger"
      :class="{ 'r-bell-trigger--solid': solid }"
      :aria-label="`告警（${unreadCount}）`"
      :aria-expanded="open"
      @click="toggle"
    >
      <RLucideIcon :name="unreadCount > 0 ? 'BellRing' : 'Bell'" :size="18" />
      <span v-if="unreadCount > 0" class="r-bell-badge">{{ unreadCount > 99 ? '99+' : unreadCount }}</span>
    </button>

    <Transition name="r-bell-drop">
      <div v-if="open" class="r-bell-panel" role="dialog" :aria-label="title">
        <div class="r-bell-panel-head">
          <span class="r-bell-panel-title">{{ title }}</span>
          <RButton circle size="small" aria-label="关闭" @click="open = false">×</RButton>
        </div>
        <div class="r-bell-panel-body">
          <p v-if="!items.length" class="r-bell-empty">{{ emptyText }}</p>
          <div v-for="item in items" :key="item.id" class="r-bell-row">
            <span class="r-bell-row-main">
              <strong>{{ item.title }}</strong>
              <em v-if="item.badge" class="r-bell-tag" :class="`r-bell-tag--${item.badge.tone ?? 'neutral'}`">
                {{ item.badge.text }}
              </em>
              <span v-if="item.note" class="r-bell-note">{{ item.note }}</span>
            </span>
            <RSwitch
              :model-value="item.enabled"
              size="small"
              @update:model-value="(v: boolean) => emit('toggle', item.id, v)"
            />
          </div>
        </div>
        <div v-if="$slots.footer" class="r-bell-panel-foot">
          <slot name="footer" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue'
import RButton from './RButton.vue'
import RSwitch from './RSwitch.vue'
import RLucideIcon from './RLucideIcon.vue'

defineOptions({ name: 'RAlertBell' })

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
.r-bell {
  position: relative;
}

.r-bell-trigger {
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

.r-bell-trigger:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.r-bell-trigger:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* 放在渐变头部时用 solid：半透明底 + 反色图标 */
.r-bell-trigger--solid {
  border-color: var(--border-strong);
  background: var(--bg-subtle);
  color: var(--text-inverse);
}

.r-bell-badge {
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

.r-bell-panel {
  position: absolute;
  top: calc(var(--control-h) + var(--space-2));
  right: 0;
  z-index: var(--z-dropdown);
  /* 窄屏必须收窄：写死 320px 在 390 手机上一路顶到屏幕左外侧（实测 x = -110） */
  width: min(320px, calc(100vw - 2 * var(--space-4)));
  max-height: 400px;  display: flex;
  flex-direction: column;
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
}

.r-bell-panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--border-default);
}

.r-bell-panel-title {
  font-size: var(--font-base);
  font-weight: 600;
  color: var(--text-primary);
}

.r-bell-panel-body {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-2);
}

.r-bell-empty {
  margin: 0;
  padding: var(--space-5);
  text-align: center;
  font-size: var(--font-sm);
  color: var(--text-tertiary);
}

.r-bell-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
  transition: background var(--motion-fast) var(--motion-ease);
}

.r-bell-row:hover {
  background: var(--bg-hover);
}

.r-bell-row-main {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  min-width: 0;
  font-size: var(--font-sm);
}

.r-bell-row-main strong {
  font-weight: 600;
  color: var(--text-primary);
}

.r-bell-tag {
  padding: 0 var(--space-1);
  border-radius: var(--radius-sm);
  font-style: normal;
  font-size: var(--font-xs);
  color: var(--text-secondary);
  background: var(--bg-subtle);
}

.r-bell-tag--danger {
  background: var(--color-danger-bg);
  color: var(--color-danger);
}

.r-bell-tag--success {
  background: var(--color-success-bg);
  color: var(--color-success);
}

.r-bell-note {
  color: var(--text-tertiary);
}

.r-bell-panel-foot {
  display: flex;
  justify-content: center;
  padding: var(--space-2) var(--space-4);
  border-top: 1px solid var(--border-default);
}

.r-bell-drop-enter-active,
.r-bell-drop-leave-active {
  transition: opacity var(--motion-base) var(--motion-ease), transform var(--motion-base) var(--motion-ease);
}

.r-bell-drop-enter-from,
.r-bell-drop-leave-to {
  opacity: 0;
  transform: translateY(calc(var(--space-2) * -1));
}

/* 手机：320px 的浮层锚在触发器的 right:0 上会跑到屏幕外（实测 390 宽下 x = -110），
 * 窄屏统一改成贴边浮层，位置交给视口而不是触发器。 */
@media (max-width: 480px) {
  .r-bell-panel {
    position: fixed;
    top: calc(var(--control-h) + var(--space-7));
    left: var(--space-4);
    right: var(--space-4);
    width: auto;
    max-width: none;
    max-height: calc(100dvh - var(--control-h) - var(--space-7) * 2);
  }
}
</style>
