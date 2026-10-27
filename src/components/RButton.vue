<script setup lang="ts">
import { computed } from 'vue'
import RLucideIcon from './RLucideIcon.vue'

defineOptions({ name: 'RButton' })

type BButtonType = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
type BButtonSize = 'large' | 'default' | 'small'

const props = withDefaults(defineProps<{
  type?: BButtonType
  size?: BButtonSize
  plain?: boolean
  round?: boolean
  circle?: boolean
  loading?: boolean
  disabled?: boolean
  text?: boolean
  link?: boolean
  active?: boolean
  nativeType?: 'button' | 'submit' | 'reset'
  icon?: string
}>(), {
  type: 'default',
  size: 'default',
  plain: false,
  round: false,
  circle: false,
  loading: false,
  disabled: false,
  text: false,
  link: false,
  active: false,
  nativeType: 'button',
  icon: '',
})

defineSlots<{
  default?: (props: {}) => any
  icon?: (props: {}) => any
}>()

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const classes = computed(() => {
  const cls = ['r-btn', `r-btn--${props.type}`, `r-btn--${props.size}`]
  if (props.plain) cls.push('r-btn--plain')
  if (props.round) cls.push('r-btn--round')
  if (props.circle) cls.push('r-btn--circle')
  if (props.loading) cls.push('r-btn--loading')
  if (props.text) cls.push('r-btn--text')
  if (props.link) cls.push('r-btn--link')
  if (props.active) cls.push('r-btn--active')
  return cls
})

const iconSize = computed(() => {
  switch (props.size) {
    case 'large': return 18
    case 'small': return 14
    default: return 16
  }
})

function handleClick(event: MouseEvent) {
  if (props.disabled || props.loading) return
  emit('click', event)
}
</script>

<template>
  <button
    :class="classes"
    :disabled="disabled || loading"
    :type="nativeType"
    @click="handleClick"
  >
    <span v-if="loading" class="r-btn-icon">
      <RLucideIcon name="Loader" :size="iconSize" class="r-btn-spinner" />
    </span>
    <span v-else-if="$slots.icon || icon" class="r-btn-icon">
      <slot name="icon">
        <RLucideIcon v-if="icon" :name="icon" :size="iconSize" />
      </slot>
    </span>
    <span v-if="$slots.default" class="r-btn-text">
      <slot />
    </span>
  </button>
</template>

<style scoped>
.r-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid;
  outline: none;
  transition: all var(--motion-base) var(--motion-ease);
  font-family: inherit;
  font-weight: 500;
  text-decoration: none;
  user-select: none;
  vertical-align: middle;
  box-sizing: border-box;
}

.r-btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.r-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* Sizes */
.r-btn--large { height: calc(var(--control-h) + var(--space-2)); padding: 0 var(--space-5); font-size: var(--font-md); border-radius: var(--radius-sm); }
.r-btn--default { height: var(--control-h); padding: 0 var(--control-px); font-size: var(--font-ui); border-radius: var(--radius-sm); }
.r-btn--small { height: var(--control-h-sm); padding: 0 var(--space-3); font-size: var(--font-xs); border-radius: var(--radius-sm); }

/* Round */
.r-btn--round { border-radius: var(--radius-full); }

/* Circle */
.r-btn--circle { border-radius: 50%; padding: 0; }
.r-btn--circle.r-btn--large { width: calc(var(--control-h) + var(--space-2)); height: calc(var(--control-h) + var(--space-2)); }
.r-btn--circle.r-btn--default { width: var(--control-h); height: var(--control-h); }
.r-btn--circle.r-btn--small { width: var(--control-h-sm); height: var(--control-h-sm); }

/* Type variants - default */
.r-btn--default { background: var(--bg-card); border-color: var(--border-default); color: var(--text-primary); }
.r-btn--default:hover:not(:disabled) { color: var(--color-primary); border-color: var(--color-primary); }

/* Type variants - primary */
.r-btn--primary { background: var(--color-primary); border-color: var(--color-primary); color: var(--text-inverse); }
.r-btn--primary:hover:not(:disabled) { background: var(--color-primary-hover); border-color: var(--color-primary-hover); }

/* Type variants - success */
.r-btn--success { background: var(--color-success); border-color: var(--color-success); color: var(--text-inverse); }
.r-btn--success:hover:not(:disabled) { opacity: 0.85; }

/* Type variants - warning */
.r-btn--warning { background: var(--color-warning); border-color: var(--color-warning); color: var(--text-inverse); }
.r-btn--warning:hover:not(:disabled) { opacity: 0.85; }

/* Type variants - danger */
.r-btn--danger { background: var(--color-danger); border-color: var(--color-danger); color: var(--text-inverse); }
.r-btn--danger:hover:not(:disabled) { opacity: 0.85; }

/* Type variants - info */
.r-btn--info { background: var(--color-info); border-color: var(--color-info); color: var(--text-inverse); }
.r-btn--info:hover:not(:disabled) { opacity: 0.85; }

/* Plain variants */
.r-btn--plain { background: transparent; }
.r-btn--default.r-btn--plain:hover:not(:disabled) { color: var(--color-primary); border-color: var(--color-primary); background: var(--color-primary-bg); }
.r-btn--primary.r-btn--plain { color: var(--color-primary); border-color: var(--color-primary-border); background: var(--color-primary-bg); }
.r-btn--primary.r-btn--plain:hover:not(:disabled) { background: var(--color-primary); border-color: var(--color-primary); color: var(--text-inverse); }
.r-btn--success.r-btn--plain { color: var(--color-success); border-color: var(--color-success-border); background: var(--color-success-bg); }
.r-btn--success.r-btn--plain:hover:not(:disabled) { background: var(--color-success); border-color: var(--color-success); color: var(--text-inverse); }
.r-btn--warning.r-btn--plain { color: var(--color-warning); border-color: var(--color-warning-border); background: var(--color-warning-bg); }
.r-btn--warning.r-btn--plain:hover:not(:disabled) { background: var(--color-warning); border-color: var(--color-warning); color: var(--text-inverse); }
.r-btn--danger.r-btn--plain { color: var(--color-danger); border-color: var(--color-danger-border); background: var(--color-danger-bg); }
.r-btn--danger.r-btn--plain:hover:not(:disabled) { background: var(--color-danger); border-color: var(--color-danger); color: var(--text-inverse); }

/* Text button */
.r-btn--text { background: transparent; border-color: transparent; }
.r-btn--text.r-btn--default { color: inherit; }
.r-btn--text:hover:not(:disabled) { background: var(--bg-hover); }
.r-btn--active.r-btn--text { background: var(--bg-hover); font-weight: 600; }
.r-btn--primary.r-btn--text { color: var(--color-primary); }
.r-btn--success.r-btn--text { color: var(--color-success); }
.r-btn--warning.r-btn--text { color: var(--color-warning); }
.r-btn--danger.r-btn--text { color: var(--color-danger); }
.r-btn--info.r-btn--text { color: var(--color-info); }

/* Link button */
.r-btn--link { background: transparent; border-color: transparent; padding: 0; height: auto; color: var(--color-primary); }
.r-btn--link:hover:not(:disabled) { text-decoration: underline; }

/* Loading spinner */
.r-btn-spinner { animation: r-btn-spin 1s linear infinite; }
@keyframes r-btn-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

.r-btn-icon { display: inline-flex; align-items: center; }
</style>
