<template>
  <input
    type="checkbox"
    class="h-4 w-4 cursor-pointer rounded border border-neutral-300 bg-white text-neutral-900 accent-neutral-900 outline-none transition-all focus:ring-2 focus:ring-neutral-950/10 disabled:cursor-not-allowed disabled:opacity-50"
    :checked="modelValue"
    @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
  />
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
}

const { modelValue } = defineProps<Props>()
const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>()
</script>
