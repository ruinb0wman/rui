<template>
  <Teleport :to="to">
    <Transition name="confirm-fade">
      <div v-if="visible" class="confirm-mask" :style="{ zIndex }" @click.self="emit('cancel')">
        <div
          ref="root"
          class="confirm-dialog"
          role="dialog"
          aria-modal="true"
          :aria-label="title"
        >
          <div class="dialog-head">
            <div>
              <h3>{{ title }}</h3>
              <p v-if="subtitle">{{ subtitle }}</p>
            </div>
            <RButton v-if="closable" circle size="small" @click="emit('cancel')">×</RButton>
          </div>
          <div class="confirm-body">
            <button
              v-for="(opt, i) in options"
              :key="String(opt.value ?? opt.title ?? i)"
              type="button"
              class="confirm-option"
              :class="{ danger: opt.danger }"
              @click="emit('select', opt.value)"
            >
              <span class="confirm-option-icon"><RLucideIcon :name="opt.icon" :size="20" /></span>
              <span class="confirm-option-text">
                <strong>{{ opt.title }}</strong>
                <em v-if="opt.desc">{{ opt.desc }}</em>
              </span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import RButton from './RButton.vue'
import RLucideIcon from './RLucideIcon.vue'
import { useOverlayLayer } from '../composables/useOverlayLayer'

defineOptions({ name: 'RDialog' })

export interface ConfirmDialogOption {
  icon: string
  title: string
  desc?: string
  value?: unknown
  danger?: boolean
}

const props = withDefaults(defineProps<{
  visible: boolean
  title?: string
  subtitle?: string
  options?: ConfirmDialogOption[]
  closable?: boolean
  closeOnEscape?: boolean
  /** teleport 目标，默认 body */
  to?: string
}>(), {
  title: '确认',
  subtitle: '',
  options: () => [],
  closable: true,
  closeOnEscape: true,
  to: 'body',
})

const emit = defineEmits<{
  (e: 'select', value?: unknown): void
  (e: 'cancel'): void
}>()

const root = ref<HTMLElement>()

const { zIndex } = useOverlayLayer({
  visible: computed(() => props.visible),
  container: root,
  onEscape: () => {
    if (props.closeOnEscape) emit('cancel')
  },
})
</script>

<style scoped>
.confirm-mask {
  position: fixed;
  inset: 0;
  z-index: 3000; /* 覆盖值来自 useOverlayLayer（--z-modal + 层号）；这里只是无 JS 时的兜底 */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-5);
  background: var(--bg-overlay);
}

.confirm-dialog {
  width: min(480px, 100%);
  background: var(--bg-card);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
}

.dialog-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-5) var(--space-5) var(--space-4);
  border-bottom: 1px solid var(--border-subtle);
}

.dialog-head h3 {
  margin: 0 0 var(--space-2);
  font-size: var(--font-lg);
  color: var(--text-primary);
}

.dialog-head p {
  margin: 0;
  font-size: var(--font-sm);
  color: var(--text-secondary);
}

.confirm-body {
  padding: var(--space-4) var(--space-5) var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.confirm-option {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
  padding: var(--space-4) var(--space-4);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  background: transparent;
  font: inherit;
  color: inherit;
  text-align: left;
  cursor: pointer;
  transition: all var(--motion-base) var(--motion-ease);
}

.confirm-option:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.confirm-option:hover {
  border-color: var(--color-primary);
  background: var(--color-primary-bg);
}

.confirm-option.danger {
  border-color: var(--color-danger, #e5534b);
}

.confirm-option.danger:hover {
  border-color: var(--color-danger, #e5534b);
  background: var(--color-danger-bg, rgba(229, 83, 75, 0.08));
}

.confirm-option-icon {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  margin-top: 1px;
}

.confirm-option-text {
  display: block;
}

.confirm-option strong {
  display: block;
  font-size: var(--font-base);
  color: var(--text-primary);
}

.confirm-option em {
  display: block;
  margin-top: var(--space-1);
  font-style: normal;
  font-size: var(--font-xs);
  color: var(--text-secondary);
}

.confirm-fade-enter-active,
.confirm-fade-leave-active {
  transition: opacity var(--motion-fast) var(--motion-ease);
}

.confirm-fade-enter-from,
.confirm-fade-leave-to {
  opacity: 0;
}
</style>
