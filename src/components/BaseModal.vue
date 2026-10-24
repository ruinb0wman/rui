<template>
  <Teleport to="body">
    <div v-if="visible" class="base-modal-overlay" @click.self="onOverlayClick">
      <div class="base-modal" :style="modalStyle">
        <div v-if="hasHeader" class="base-modal-header">
          <slot name="header">
            <h3>{{ title }}</h3>
          </slot>
          <button v-if="closable" class="base-modal-close" @click="onClose" :aria-label="'关闭'">×</button>
        </div>
        <div class="base-modal-body" :class="{ 'no-header': !hasHeader }">
          <slot />
        </div>
        <div v-if="$slots.footer" class="base-modal-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'

defineOptions({ name: 'BaseModal' })

const props = withDefaults(defineProps<{
  visible: boolean
  title?: string
  width?: number | string
  height?: string
  closable?: boolean
  closeOnOverlay?: boolean
}>(), {
  visible: false,
  closable: true,
  closeOnOverlay: true,
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

const slots = defineSlots<{
  header?: (props: {}) => any
  footer?: (props: {}) => any
  default?: (props: {}) => any
}>()

const hasHeader = computed(() => !!(slots.header || props.title))

const modalStyle = computed(() => {
  const style: Record<string, string> = {}
  const w = props.width
  if (w) {
    style.width = typeof w === 'number' ? `${w}px` : w
  }
  if (props.height) {
    style.height = props.height
  }
  return style
})

function onClose() {
  emit('close')
}

function onOverlayClick() {
  if (props.closeOnOverlay) onClose()
}

watch(() => props.visible, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
}, { immediate: false })
</script>

<style scoped>
.base-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-6);
  background: var(--bg-overlay);
  backdrop-filter: blur(4px);
}

.base-modal {
  width: min(60vw, 900px);
  height: min(60vh, 600px);
  display: flex;
  flex-direction: column;
  padding: var(--space-5);
  border-radius: var(--radius-md);
  background: var(--bg-card);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
}

.base-modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-4);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--border-default);
  flex-shrink: 0;
}

.base-modal-header h3 {
  margin: 0;
  font-size: var(--font-lg);
  color: var(--text-primary);
}

.base-modal-close {
  width: 30px;
  height: 30px;
  border: none;
  border-radius: var(--radius-sm);
  background: var(--bg-subtle);
  color: var(--text-secondary);
  cursor: pointer;
  font-size: var(--font-lg);
  line-height: 1;
  flex-shrink: 0;
  transition: background var(--motion-fast) var(--motion-ease), color var(--motion-fast) var(--motion-ease);
}

.base-modal-close:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.base-modal-body {
  padding: var(--space-4) 0 0;
  overflow-y: auto;
  flex: 1;
}

.base-modal-body.no-header {
  padding-top: 0;
}

.base-modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  padding-top: var(--space-4);
  margin-top: var(--space-4);
  border-top: 1px solid var(--border-default);
  flex-shrink: 0;
}

/* Button styles for modal footer */
.base-modal-footer .btn {
  padding: var(--space-2) var(--space-4);
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-weight: 500;
  font-size: var(--font-base);
  transition: all var(--motion-base) var(--motion-ease);
}

.base-modal-footer .btn-primary {
  background: var(--color-primary);
  color: var(--text-inverse);
}

.base-modal-footer .btn-primary:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
}

.base-modal-footer .btn-primary:disabled {
  cursor: not-allowed;
  opacity: 0.45;
  transform: none;
}

@media (max-width: 768px) {
  .base-modal-overlay {
    padding: var(--space-3);
    align-items: flex-end;
  }

  .base-modal {
    width: 100%;
    max-height: 90vh;
    border-radius: var(--radius-md) var(--radius-md) 0 0;
    padding: var(--space-4);
  }
}
</style>
