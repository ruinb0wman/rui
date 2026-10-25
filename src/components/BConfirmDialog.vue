<template>
  <BaseModal
    :visible="visible"
    direction="center"
    :closable="false"
    width="min(92vw, 384px)"
    height="auto"
    :max-height="'85vh'"
    @close="onCancel"
  >
    <div class="b-confirm">
      <div class="b-confirm-icon" :class="`b-confirm-icon--${variant}`">
        <LucideIcon :name="iconName" :size="24" />
      </div>

      <h3 class="b-confirm-title">{{ title }}</h3>
      <p class="b-confirm-message">{{ message }}</p>

      <div class="b-confirm-actions">
        <BButton v-if="!alertOnly" size="large" class="b-confirm-btn" @click="onCancel">
          {{ cancelLabel }}
        </BButton>
        <BButton
          :type="confirmType"
          size="large"
          class="b-confirm-btn"
          @click="emit('confirm')"
        >
          {{ confirmLabel }}
        </BButton>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseModal from './BaseModal.vue'
import BButton from './BButton.vue'
import LucideIcon from './LucideIcon.vue'

defineOptions({ name: 'BConfirmDialog' })

export type ConfirmVariant = 'danger' | 'warning' | 'info'

const props = withDefaults(defineProps<{
  visible: boolean
  message: string
  title?: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: ConfirmVariant
  /** 只有一个按钮（提示框，没有「取消」语义） */
  alertOnly?: boolean
}>(), {
  title: 'Confirm',
  confirmLabel: 'Confirm',
  cancelLabel: 'Cancel',
  variant: 'danger',
  alertOnly: false,
})

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const confirmType = computed(() =>
  props.variant === 'info' ? 'primary' : (props.variant as 'danger' | 'warning'),
)

const iconName = computed(() =>
  props.variant === 'info' ? 'Info' : 'AlertTriangle',
)

function onCancel() {
  emit('cancel')
}
</script>

<style scoped>
.b-confirm {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.b-confirm-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--space-7);
  height: var(--space-7);
  border-radius: var(--radius-full);
}

.b-confirm-icon--danger {
  background: var(--color-danger-bg);
  color: var(--color-danger);
}

.b-confirm-icon--warning {
  background: var(--color-warning-bg);
  color: var(--color-warning);
}

.b-confirm-icon--info {
  background: var(--color-info-bg);
  color: var(--color-info);
}

.b-confirm-title {
  margin: 0;
  font-size: var(--font-lg);
  font-weight: 600;
  color: var(--text-primary);
}

.b-confirm-message {
  margin: 0;
  font-size: var(--font-base);
  line-height: var(--leading-base);
  color: var(--text-secondary);
}

.b-confirm-actions {
  display: flex;
  gap: var(--space-3);
  margin-top: var(--space-3);
}

.b-confirm-btn {
  flex: 1;
}
</style>
