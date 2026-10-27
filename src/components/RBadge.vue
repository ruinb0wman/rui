<script setup lang="ts">
defineOptions({ name: 'RBadge' })

/** 状态徽标：胶囊/方块 + 可选圆点，`dot` 单独用时就是状态灯。 */
withDefaults(defineProps<{
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'muted'
  /** 文案前的圆点 */
  dot?: boolean
  /** 圆点脉冲（进行中） */
  pulse?: boolean
  /** 胶囊圆角；默认方块（--radius-sm） */
  round?: boolean
}>(), {
  type: 'muted',
  dot: false,
  pulse: false,
  round: false,
})

defineSlots<{ default?: (props: {}) => any }>()
</script>

<template>
  <span
    class="r-badge"
    :class="[`r-badge--${type}`, { 'r-badge--round': round, 'r-badge--dot-only': dot && !$slots.default }]"
  >
    <i v-if="dot" class="r-badge-dot" :class="{ 'r-badge-dot--pulse': pulse }" />
    <slot />
  </span>
</template>

<style scoped>
.r-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-05) var(--space-2);
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  background: var(--bg-subtle);
  color: var(--text-secondary);
  font-size: var(--font-xs);
  line-height: var(--leading-tight);
  white-space: nowrap;
}

.r-badge--round {
  border-radius: var(--radius-full);
}

/* 纯状态灯：去掉内距、底色与描边，只留点 */
.r-badge--dot-only {
  padding: 0;
  background: none;
  border-color: transparent;
}

.r-badge-dot {
  flex: none;
  width: calc(var(--space-1) + var(--space-05));
  height: calc(var(--space-1) + var(--space-05));
  border-radius: var(--radius-full);
  background: currentColor;
}

.r-badge-dot--pulse {
  animation: r-badge-pulse var(--motion-base) var(--motion-ease) infinite alternate;
}

.r-badge--primary {
  background: var(--color-primary-bg);
  color: var(--color-primary);
  border-color: var(--color-primary-border);
}

.r-badge--success {
  background: var(--color-success-bg);
  color: var(--color-success);
  border-color: var(--color-success-border);
}

.r-badge--warning {
  background: var(--color-warning-bg);
  color: var(--color-warning);
  border-color: var(--color-warning-border);
}

.r-badge--danger {
  background: var(--color-danger-bg);
  color: var(--color-danger);
  border-color: var(--color-danger-border);
}

/* info 没有 -border 语义变量（四套主题都没有），靠底色与文字色区分 */
.r-badge--info {
  background: var(--color-info-bg);
  color: var(--color-info);
}

@keyframes r-badge-pulse {
  from { opacity: 1; }
  to { opacity: 0.35; }
}
</style>
