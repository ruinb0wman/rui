<script setup lang="ts">
import { computed } from 'vue'
import { resolveIcon } from '../icons'

defineOptions({ name: 'RLucideIcon' })

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 20 },
  color: { type: String, default: 'currentColor' },
  strokeWidth: { type: [Number, String], default: 2 },
})

const warned = new Set<string>()
const icon = computed(() => {
  const hit = resolveIcon(props.name)
  if (!hit && !warned.has(props.name)) {
    warned.add(props.name)
    console.warn(`[RLucideIcon] 图标「${props.name}」未登记:入口调 registerIcons({ ${props.name} }) 登记它`)
  }
  return hit
})
</script>

<template>
  <component
    v-if="icon"
    :is="icon"
    :size="size"
    :color="color"
    :stroke-width="strokeWidth"
  />
  <span v-else class="lucide-icon-fallback">{{ name }}</span>
</template>
