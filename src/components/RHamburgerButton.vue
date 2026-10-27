<template>
  <button
    type="button"
    class="r-hamburger"
    :class="{ 'r-hamburger--open': open }"
    :aria-label="open ? '关闭菜单' : '打开菜单'"
    :aria-expanded="open"
    @click="emit('toggle')"
  >
    <span class="r-hamburger-line" />
    <span class="r-hamburger-line" />
    <span class="r-hamburger-line" />
  </button>
</template>

<script setup lang="ts">
defineOptions({ name: 'RHamburgerButton' })

withDefaults(defineProps<{ open?: boolean }>(), { open: false })

const emit = defineEmits<{ (e: 'toggle'): void }>()
</script>

<style scoped>
.r-hamburger {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--space-1);
  width: var(--control-h);
  height: var(--control-h);
  padding: var(--space-2);
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  cursor: pointer;
  transition: background var(--motion-base) var(--motion-ease);
}

.r-hamburger:hover {
  background: var(--bg-subtle);
}

.r-hamburger:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.r-hamburger-line {
  display: block;
  width: 20px;
  height: 2px;
  background: var(--text-primary);
  border-radius: var(--radius-full);
  transition: transform var(--motion-base) var(--motion-ease), opacity var(--motion-fast) var(--motion-ease);
}

.r-hamburger--open .r-hamburger-line:nth-child(1) {
  transform: translateY(var(--space-2)) rotate(45deg);
}

.r-hamburger--open .r-hamburger-line:nth-child(2) {
  opacity: 0;
}

.r-hamburger--open .r-hamburger-line:nth-child(3) {
  transform: translateY(calc(var(--space-2) * -1)) rotate(-45deg);
}
</style>
