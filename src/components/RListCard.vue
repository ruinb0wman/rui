<script setup lang="ts">
import RLucideIcon from './RLucideIcon.vue'
import RBadge from './RBadge.vue'
import RProgress from './RProgress.vue'

defineOptions({ name: 'RListCard' })

type Tone = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'muted'
type ProgressColor = 'primary' | 'success' | 'warning' | 'danger'

/** 标题行上的小徽标（等级、重复模式这类） */
export interface ListCardBadge {
  text: string
  type?: Tone
  round?: boolean
}

/** 副信息行的一项（剩余时间、完成时间、积分这类） */
export interface ListCardMeta {
  text: string
  icon?: string
  tone?: Tone
}

const props = withDefaults(defineProps<{
  title: string
  /** 首列图标方块与尾部状态的配色，通常跟状态走 */
  tone?: Tone
  /** 首列图标名（需消费方已 registerIcons），也可用 #icon 插槽给组件 */
  icon?: string
  badges?: ListCardBadge[]
  meta?: ListCardMeta[]
  progress?: { percent: number; label?: string; color?: ProgressColor } | null
  status?: { text: string; tone?: Tone } | null
  /** 置灰且不响应点击（预览态） */
  disabled?: boolean
}>(), {
  tone: 'primary',
  icon: '',
  badges: () => [],
  meta: () => [],
  progress: null,
  status: null,
  disabled: false,
})

defineSlots<{
  /** 覆盖首列图标 */
  icon?: (props: {}) => any
}>()

const emit = defineEmits<{ click: [] }>()

const TONE_CLASS: Record<Tone, string> = {
  primary: 'primary',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  info: 'info',
  muted: 'muted',
}

/** 图标方块：语义色底 + 语义色字 */
function iconToneClass(tone: Tone = 'primary') {
  return `r-icon--${TONE_CLASS[tone]}`
}

/** 文字（副信息、尾部状态）：只换颜色，不换底色 */
function textToneClass(tone: Tone = 'muted') {
  return `r-text--${TONE_CLASS[tone]}`
}

function onClick() {
  if (props.disabled) return
  emit('click')
}
</script>

<template>
  <button
    type="button"
    class="r-listcard"
    :disabled="disabled"
    @click="onClick"
  >
    <span
      class="r-listcard-icon"
      :class="iconToneClass(props.tone)"
    >
      <slot name="icon">
        <RLucideIcon v-if="props.icon" :name="props.icon" :size="20" />
      </slot>
    </span>

    <span class="r-listcard-main">
      <span class="r-listcard-head">
        <span class="r-listcard-title">{{ title }}</span>
        <RBadge
          v-for="badge in badges"
          :key="badge.text"
          :type="badge.type ?? 'muted'"
          :round="badge.round ?? false"
        >
          {{ badge.text }}
        </RBadge>
      </span>

      <span v-if="meta.length > 0" class="r-listcard-meta">
        <span
          v-for="item in meta"
          :key="item.text"
          class="r-listcard-meta-item"
          :class="item.tone ? textToneClass(item.tone) : ''"
        >
          <RLucideIcon v-if="item.icon" :name="item.icon" :size="12" />
          {{ item.text }}
        </span>
      </span>

      <span v-if="progress" class="r-listcard-progress">
        <RProgress
          :value="progress.percent"
          :max="100"
          size="small"
          :color="progress.color ?? 'primary'"
        />
        <span v-if="progress.label" class="r-listcard-progress-label">{{ progress.label }}</span>
      </span>
    </span>

    <span
      v-if="status"
      class="r-listcard-status"
      :class="textToneClass(status.tone ?? 'muted')"
    >
      {{ status.text }}
    </span>
  </button>
</template>

<style scoped>
.r-listcard {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  width: 100%;
  margin: 0;
  padding: var(--space-4);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  background: var(--bg-card);
  font: inherit;
  color: var(--text-primary);
  text-align: left;
  cursor: pointer;
  transition: background var(--motion-fast) var(--motion-ease);
}

.r-listcard:hover:not(:disabled) {
  background: var(--bg-elevated);
}

.r-listcard:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.r-listcard-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: calc(var(--space-6) + var(--space-2));
  height: calc(var(--space-6) + var(--space-2));
  border-radius: var(--radius-sm);
}

.r-listcard-main {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  flex: 1;
  min-width: 0;
}

.r-listcard-head {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  min-width: 0;
}

.r-listcard-title {
  overflow: hidden;
  font-size: var(--font-base);
  font-weight: 500;
  color: var(--text-primary);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.r-listcard-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-1) var(--space-3);
  font-size: var(--font-xs);
  color: var(--text-secondary);
}

.r-listcard-meta-item {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
}

.r-listcard-progress {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-top: var(--space-2);
}

.r-listcard-progress-label {
  flex: none;
  min-width: calc(var(--space-6) + var(--space-5));
  font-size: var(--font-xs);
  color: var(--text-secondary);
  text-align: right;
}

.r-listcard-status {
  flex: none;
  font-size: var(--font-base);
  font-weight: 500;
}

/* 图标方块：语义色底 */
.r-icon--primary {
  background: var(--color-primary-bg);
  color: var(--color-primary);
}

.r-icon--success {
  background: var(--color-success-bg);
  color: var(--color-success);
}

.r-icon--warning {
  background: var(--color-warning-bg);
  color: var(--color-warning);
}

.r-icon--danger {
  background: var(--color-danger-bg);
  color: var(--color-danger);
}

.r-icon--info {
  background: var(--color-info-bg);
  color: var(--color-info);
}

.r-icon--muted {
  background: var(--bg-subtle);
  color: var(--text-tertiary);
}

/* 文字：只换颜色 */
.r-text--primary { color: var(--color-primary); }
.r-text--success { color: var(--color-success); }
.r-text--warning { color: var(--color-warning); }
.r-text--danger { color: var(--color-danger); }
.r-text--info { color: var(--color-info); }
.r-text--muted { color: var(--text-tertiary); }
</style>
