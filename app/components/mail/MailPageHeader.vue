<script setup lang="ts">
interface Props {
  showActions?: boolean
}

defineProps<Props>()
defineEmits<{
  refresh: []
  generate: []
}>()
</script>

<template>
  <header class="relative z-20 border-b bg-card shrink-0">
    <div class="w-full px-4 py-3 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <span
          class="inline-flex items-center justify-center h-9 w-9 rounded-lg border bg-neutral-900 shadow-sm">
          <span class="font-display font-black text-white text-base">@</span>
        </span>
        <span class="font-display font-black text-lg tracking-tight">TEMP MAIL</span>
      </div>
      <div v-if="showActions" class="flex items-center gap-2">
        <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium text-neutral-900 transition-all outline-none hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-neutral-950/20 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9"
          @click="$emit('refresh')">
          <LucideRefreshCw class="h-4 w-4" />
          refresh
        </button>
        <button
          class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all outline-none hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-neutral-950/20 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9"
          @click="$emit('generate')">
          <LucidePlus class="h-4 w-4" />
          MỚI
        </button>
      </div>
    </div>
  </header>
</template>
