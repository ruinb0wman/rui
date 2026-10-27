<template>
  <div class="r-progress" :class="`r-progress--${size}`">
    <div
      class="r-progress-track"
      role="progressbar"
      :aria-valuenow="clamped"
      :aria-valuemin="0"
      :aria-valuemax="max"
      :aria-label="label"
    >
      <div
        class="r-progress-bar"
        :class="`r-progress-bar--${color}`"
        :style="{ width: `${percent}%` }"
      />
    </div>
    <span v-if="showLabel" class="r-progress-label">{{ Math.round(percent) }}%</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'RProgress' })

const props = withDefaults(defineProps<{
  value: number
  /** 满分值，0 时进度按 0 处理（不除零） */
  max?: number
  size?: 'small' | 'default'
  /** 进度条颜色走语义色 */
  color?: 'primary' | 'success' | 'warning' | 'danger'
  /** 右侧显示百分比 */
  showLabel?: boolean
  label?: string
}>(), {
  max: 100,
  size: 'default',
  color: 'primary',
  showLabel: false,
  label: 'progress',
})

const clamped = computed(() => Math.min(props.max, Math.max(0, props.value)))
const percent = computed(() => (props.max > 0 ? (clamped.value / props.max) * 100 : 0))
</script>

<style scoped>
.r-progress {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  width: 100%;
}

.r-progress-track {
  flex: 1;
  height: var(--space-2);
  border-radius: var(--radius-full);
  background: var(--bg-card);
  overflow: hidden;
}

.r-progress--small .r-progress-track {
  height: var(--space-1);
}

.r-progress-bar {
  height: 100%;
  border-radius: var(--radius-full);
  transition: width var(--motion-base) var(--motion-ease);
}

.r-progress-bar--primary {
  background: var(--color-primary);
}

.r-progress-bar--success {
  background: var(--color-success);
}

.r-progress-bar--warning {
  background: var(--color-warning);
}

.r-progress-bar--danger {
  background: var(--color-danger);
}

.r-progress-label {
  flex-shrink: 0;
  font-size: var(--font-xs);
  color: var(--text-secondary);
}
</style>
