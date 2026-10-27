<template>
  <RModal
    :visible="visible"
    direction="center"
    :closable="false"
    width="min(92vw, 384px)"
    height="auto"
    :max-height="'85vh'"
    @close="onCancel"
  >
    <div class="r-confirm">
      <div class="r-confirm-icon" :class="`r-confirm-icon--${variant}`">
        <RLucideIcon :name="iconName" :size="24" />
      </div>

      <h3 class="r-confirm-title">{{ title }}</h3>
      <p class="r-confirm-message">{{ message }}</p>

      <div class="r-confirm-actions">
        <RButton v-if="!alertOnly" size="large" class="r-confirm-btn" @click="onCancel">
          {{ cancelLabel }}
        </RButton>
        <RButton
          :type="confirmType"
          size="large"
          class="r-confirm-btn"
          @click="emit('confirm')"
        >
          {{ confirmLabel }}
        </RButton>
      </div>
    </div>
  </RModal>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import RModal from './RModal.vue'
import RButton from './RButton.vue'
import RLucideIcon from './RLucideIcon.vue'

defineOptions({ name: 'RConfirmDialog' })

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
.r-confirm {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.r-confirm-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--space-7);
  height: var(--space-7);
  border-radius: var(--radius-full);
}

.r-confirm-icon--danger {
  background: var(--color-danger-bg);
  color: var(--color-danger);
}

.r-confirm-icon--warning {
  background: var(--color-warning-bg);
  color: var(--color-warning);
}

.r-confirm-icon--info {
  background: var(--color-info-bg);
  color: var(--color-info);
}

.r-confirm-title {
  margin: 0;
  font-size: var(--font-lg);
  font-weight: 600;
  color: var(--text-primary);
}

.r-confirm-message {
  margin: 0;
  font-size: var(--font-base);
  line-height: var(--leading-base);
  color: var(--text-secondary);
}

.r-confirm-actions {
  display: flex;
  gap: var(--space-3);
  margin-top: var(--space-3);
}

.r-confirm-btn {
  flex: 1;
}
</style>
