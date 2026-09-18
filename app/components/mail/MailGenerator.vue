<script setup lang="ts">
interface Props {
  emailAddress: string
  copied: boolean
  loading?: boolean
}

defineProps<Props>()
defineEmits<{
  copy: []
}>()
</script>

<template>
  <div class="rounded-2xl border bg-card p-4 md:p-5 shadow-sm">
    <div v-if="loading" class="space-y-4" aria-busy="true" aria-label="Đang tạo địa chỉ email">
      <div class="flex items-center gap-2">
        <Skeleton width="10px" height="10px" circle class="bg-current/10" />
        <Skeleton width="10px" height="10px" circle class="bg-current/10" />
        <Skeleton width="10px" height="10px" circle class="bg-current/10" />
      </div>
      <div class="flex flex-col gap-3">
        <Skeleton width="100%" height="24px" rounded="lg" class="bg-current/10" />
        <Skeleton width="100%" height="40px" rounded="lg" class="bg-current/10" />
      </div>
    </div>

    <div v-else class="space-y-4">
      <div class="flex items-center gap-2">
        <span class="h-2.5 w-2.5 rounded-full bg-red-500"></span>
        <span class="h-2.5 w-2.5 rounded-full bg-yellow-500"></span>
        <span class="h-2.5 w-2.5 rounded-full bg-green-500"></span>
      </div>

      <div class="flex flex-col gap-3">
        <code class="font-mono text-foreground text-sm md:text-base font-bold break-all">{{ emailAddress }}</code>
        <button
          class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all outline-none hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-neutral-950/20 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 w-full"
          @click="$emit('copy')">
          <LucideCopy class="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
</template>
