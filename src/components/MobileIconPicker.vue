<template>
  <BaseModal
    :visible="isOpen"
    direction="bottom"
    :title="title"
    :max-height="'85vh'"
    @close="handleCancel"
  >
    <div class="m-icons">
      <div class="m-icons-preview">
        <span class="m-icons-preview-label">Preview:</span>
        <div class="m-icons-preview-box" :style="{ backgroundColor: hexWithAlpha(tempColor, 0.12) }">
          <LucideIcon :name="tempIcon" :size="28" :color="tempColor" />
        </div>
        <span class="m-icons-preview-name">{{ tempIcon }}</span>
      </div>

      <BInput v-model="search" placeholder="Search icons..." prefix-icon="Search" />

      <div class="m-icons-group" v-if="colors.length">
        <p class="m-icons-group-title">Icon color</p>
        <div class="m-icons-colors">
          <button
            v-for="color in colors"
            :key="color"
            type="button"
            class="m-icons-color"
            :class="{ 'm-icons-color--active': tempColor === color }"
            :style="{ backgroundColor: color }"
            :aria-label="color"
            :aria-pressed="tempColor === color"
            @click="tempColor = color"
          />
        </div>
      </div>

      <div class="m-icons-group">
        <p class="m-icons-group-title">Icons ({{ filteredIcons.length }})</p>
        <div class="m-icons-grid">
          <button
            v-for="name in filteredIcons"
            :key="name"
            type="button"
            class="m-icons-cell"
            :class="{ 'm-icons-cell--active': tempIcon === name }"
            :aria-label="name"
            :aria-pressed="tempIcon === name"
            @click="tempIcon = name"
          >
            <LucideIcon
              :name="name"
              :size="20"
              :color="tempIcon === name ? tempColor : 'currentColor'"
            />
          </button>
        </div>
        <p v-if="filteredIcons.length === 0" class="m-icons-empty">No matching icons found</p>
      </div>
    </div>

    <template #footer>
      <BButton size="large" @click="handleCancel">Cancel</BButton>
      <BButton type="primary" size="large" @click="handleConfirm">Confirm</BButton>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import BaseModal from './BaseModal.vue'
import BButton from './BButton.vue'
import BInput from './BInput.vue'
import LucideIcon from './LucideIcon.vue'

defineOptions({ name: 'MobileIconPicker' })

/**
 * 通用图标选择器：候选图标名与颜色都由使用方传入，
 * 组件本身不认识「奖励图标」这类业务概念（候选表属于业务数据）。
 */
const props = withDefaults(defineProps<{
  isOpen: boolean
  /** 可选图标名（Lucide 图标名，如 "Gift"） */
  icons: readonly string[]
  /** 可选颜色（CSS 颜色值）；留空则不显示取色区 */
  colors?: readonly string[]
  /** 当前图标 */
  icon: string
  /** 当前颜色；留空则不返回颜色 */
  color?: string
  title?: string
}>(), {
  colors: () => [] as readonly string[],
  color: '',
  title: 'Select icon',
})

const emit = defineEmits<{
  confirm: [icon: string, color: string]
  close: []
}>()

const search = ref('')
const tempIcon = ref(props.icon)
const tempColor = ref(props.color)

// 每次打开都把临时态同步成当前值，避免上次未确认的选择残留
watch(
  () => [props.isOpen, props.icon, props.color] as const,
  () => {
    if (!props.isOpen) return
    tempIcon.value = props.icon
    tempColor.value = props.color
    search.value = ''
  },
  { immediate: true },
)

const filteredIcons = computed(() => {
  const query = search.value.trim().toLowerCase()
  return query ? props.icons.filter((n) => n.toLowerCase().includes(query)) : props.icons
})

/** 预览底色：把任意 CSS 颜色按 12% 透明度铺开 */
function hexWithAlpha(color: string, alpha: number): string {
  const hex = color.trim()
  if (/^#[0-9a-f]{6}$/i.test(hex)) {
    const a = Math.round(alpha * 255).toString(16).padStart(2, '0')
    return `${hex}${a}`
  }
  return `color-mix(in srgb, ${hex} ${Math.round(alpha * 100)}%, transparent)`
}

function handleConfirm() {
  emit('confirm', tempIcon.value, tempColor.value)
  emit('close')
}

function handleCancel() {
  tempIcon.value = props.icon
  tempColor.value = props.color
  search.value = ''
  emit('close')
}
</script>

<style scoped>
.m-icons {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.m-icons-preview {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4);
  border-radius: var(--radius-sm);
  background: var(--bg-page);
}

.m-icons-preview-label,
.m-icons-preview-name {
  font-size: var(--font-base);
  color: var(--text-secondary);
}

.m-icons-preview-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--space-7);
  height: var(--space-7);
  border-radius: var(--radius-sm);
}

.m-icons-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.m-icons-group-title {
  margin: 0;
  font-size: var(--font-base);
  font-weight: 500;
  color: var(--text-primary);
}

.m-icons-colors {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.m-icons-color {
  width: var(--space-6);
  height: var(--space-6);
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: transform var(--motion-fast) var(--motion-ease);
}

.m-icons-color:hover {
  transform: scale(1.1);
}

.m-icons-color--active {
  box-shadow: 0 0 0 2px var(--bg-card), 0 0 0 4px var(--text-primary);
  transform: scale(1.1);
}

.m-icons-color:focus-visible,
.m-icons-cell:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.m-icons-grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: var(--space-2);
}

.m-icons-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  border: none;
  border-radius: var(--radius-sm);
  background: var(--bg-page);
  color: var(--text-secondary);
  cursor: pointer;
  transition: background var(--motion-fast) var(--motion-ease);
}

.m-icons-cell:hover {
  background: var(--bg-elevated);
}

.m-icons-cell--active {
  background: var(--color-primary-bg);
  box-shadow: inset 0 0 0 2px var(--color-primary);
}

.m-icons-empty {
  margin: 0;
  padding: var(--space-6) 0;
  text-align: center;
  color: var(--text-tertiary);
}
</style>
