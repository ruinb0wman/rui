<template>
  <BConfirmDialog
    :visible="state.visible"
    :title="state.options?.title"
    :message="state.options?.message ?? ''"
    :confirm-label="state.options?.confirmLabel"
    :cancel-label="state.options?.cancelLabel"
    :variant="state.options?.variant"
    :alert-only="state.options?.alertOnly"
    @confirm="resolveConfirm(true)"
    @cancel="resolveConfirm(false)"
  />
</template>

<script setup lang="ts">
import BConfirmDialog from './BConfirmDialog.vue'
import { resolveConfirm, useConfirmState } from '../composables/useConfirm'

defineOptions({ name: 'BConfirmHost' })

/** 挂在应用根组件一次，`useConfirm()` / `useAlert()` 就有界面了 */
const state = useConfirmState()
</script>
