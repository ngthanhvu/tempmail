<template>
  <input
    v-model="model"
    :class="classes"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const model = defineModel<string>()

interface Props {
  error?: boolean
}

const { error = false } = defineProps<Props>()

const classes = computed(() => {
  const base =
    'flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm outline-none transition-all placeholder:text-neutral-400 hover:border-neutral-300 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-950/10 disabled:cursor-not-allowed disabled:opacity-50'
  const invalid =
    'border-red-500 focus:border-red-500 focus:ring-red-500/10'
  const normal = 'border-neutral-200'
  return `${base} ${error ? invalid : normal}`
})
</script>
