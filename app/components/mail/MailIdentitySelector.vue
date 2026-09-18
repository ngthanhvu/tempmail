<script setup lang="ts">
interface Props {
  identities: string[]
  modelValue: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  copy: []
}>()

const selected = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const hasIdentities = computed(() => props.identities.length > 0)
</script>

<template>
  <div class="rounded-2xl border bg-card p-4 md:p-5 shadow-sm space-y-3">
    <div class="flex items-center gap-2 text-xs font-semibold text-neutral-900 uppercase tracking-widest">
      <span class="h-2 w-2 rounded-full bg-neutral-900"></span>
      Email của bạn
    </div>

    <div class="flex items-center gap-2">
      <select v-model="selected"
        class="h-10 w-full min-w-0 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm outline-none transition-all hover:border-neutral-300 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-950/10 disabled:cursor-not-allowed disabled:opacity-50 truncate"
        :disabled="!hasIdentities">
        <option v-for="identity in identities" :key="identity" :value="identity">
          {{ identity }}
        </option>
      </select>
      <button
        class="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-neutral-900 px-3 text-sm font-medium text-white shadow-sm transition-all outline-none hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-neutral-950/20 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10"
        :disabled="!modelValue" @click="$emit('copy')">
        <LucideCopy class="h-4 w-4" />
      </button>
    </div>

    <p v-if="!hasIdentities" class="text-xs text-neutral-500">
      Chưa có email nào. Nhấn nút bên dưới để tạo.
    </p>
  </div>
</template>
