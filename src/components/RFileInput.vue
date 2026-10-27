<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'

defineOptions({ name: 'RFileInput' })

const props = withDefaults(defineProps<{
  accept?: string
  multiple?: boolean
  disabled?: boolean
  placeholder?: string
}>(), {
  accept: '',
  multiple: false,
  disabled: false,
  placeholder: '',
})

const emit = defineEmits<{
  change: [files: FileList | null]
}>()

const inputRef = useTemplateRef<HTMLInputElement>('inputRef')
const fileNames = ref<string[]>([])

function handleChange(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (files) {
    fileNames.value = Array.from(files).map(f => f.name)
  } else {
    fileNames.value = []
  }
  emit('change', files)
}

function handleTrigger() {
  if (props.disabled) return
  inputRef.value?.click()
}

function triggerClick(e: MouseEvent) {
  e.preventDefault()
  handleTrigger()
}
</script>

<template>
  <div class="r-file-input" :class="{ 'r-file-input--disabled': disabled }">
    <div class="r-file-input__wrapper" @click="triggerClick">
      <slot name="trigger" :trigger="handleTrigger">
        <span class="r-file-input__trigger">{{ placeholder || '选择文件' }}</span>
      </slot>
    </div>
    <input
      ref="inputRef"
      type="file"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      class="r-file-input__native"
      @change="handleChange"
    />
    <div v-if="fileNames.length" class="r-file-input__list">
      <div v-for="(name, idx) in fileNames" :key="idx" class="r-file-input__item">
        <slot name="file" :name="name" :index="idx">
          <span class="r-file-input__name">{{ name }}</span>
        </slot>
      </div>
    </div>
    <slot />
  </div>
</template>

<style scoped>
.r-file-input {
  display: inline-flex;
  flex-direction: column;
  gap: var(--space-2);
}
.r-file-input--disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
.r-file-input__wrapper {
  display: inline-flex;
}
.r-file-input__trigger {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-sm);
  background: var(--color-primary);
  color: var(--text-inverse);
  font-size: var(--font-base);
  font-weight: 600;
  cursor: pointer;
  transition: background var(--motion-base) var(--motion-ease);
  user-select: none;
}
.r-file-input__trigger:hover {
  background: var(--color-primary-hover);
}
.r-file-input--disabled .r-file-input__trigger {
  background: var(--border-default);
  cursor: not-allowed;
}
.r-file-input__native {
  display: none;
}
.r-file-input__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}
.r-file-input__item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-1) var(--space-2);
  background: var(--bg-subtle);
  border-radius: var(--radius-sm);
  font-size: var(--font-sm);
}
.r-file-input__name {
  color: var(--text-secondary);
  word-break: break-all;
}
</style>
