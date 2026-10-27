<script setup lang="ts">
import { computed, useSlots } from 'vue'

defineOptions({ name: 'RCard' })

type ShadowMode = 'always' | 'hover' | 'never'

const props = withDefaults(defineProps<{
  shadow?: ShadowMode
  bodyStyle?: Record<string, string>
  header?: string
}>(), {
  shadow: 'always',
  bodyStyle: () => ({}),
  header: '',
})

defineSlots<{
  header?: (props: {}) => any
  default?: (props: {}) => any
}>()

const slots = useSlots()
const hasHeader = computed(() => !!(slots.header || props.header))
</script>

<template>
  <div class="r-card" :class="[`r-card--shadow-${shadow}`]">
    <div v-if="hasHeader" class="r-card-header">
      <slot name="header">
        <span class="r-card-title">{{ header }}</span>
      </slot>
    </div>
    <div class="r-card-body" :style="bodyStyle">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.r-card {
  background: var(--bg-card);
  border-radius: var(--radius-md);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.r-card--shadow-always { box-shadow: var(--shadow-sm); }
.r-card--shadow-hover { box-shadow: none; transition: box-shadow var(--motion-base) var(--motion-ease); }
.r-card--shadow-hover:hover { box-shadow: var(--shadow-md); }
.r-card--shadow-never { box-shadow: none; }

.r-card-header {
  background: var(--bg-gradient);
  padding: var(--space-3) var(--space-4);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
}

.r-card-title {
  color: white;
  font-size: var(--font-base);
  font-weight: 600;
  margin: 0;
}

.r-card-body {
  padding: var(--space-3);
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style>
