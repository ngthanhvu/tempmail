<script setup lang="ts">
interface Props {
  loading?: boolean
  canDelete?: boolean
}

defineProps<Props>()

defineEmits<{
  refresh: []
  generate: []
  delete: []
  custom: []
}>()
</script>

<template>
  <div class="grid grid-cols-2 gap-2">
    <UiButton variant="outline" size="sm" :disabled="loading" @click="$emit('refresh')">
      <LucideRefreshCw class="h-4 w-4" />
      refresh
    </UiButton>
    <UiButton variant="default" size="sm" :disabled="loading" @click="$emit('generate')">
      <LucidePlus class="h-4 w-4" />
      Mới
    </UiButton>
  </div>
  <div class="grid grid-cols-2 gap-2">
    <UiButton variant="outline" size="sm" :disabled="loading" @click="$emit('custom')">
      <LucidePencil class="h-4 w-4" />
      Tuỳ chỉnh
    </UiButton>
    <UiButton variant="destructive" size="sm" :disabled="!canDelete || loading" @click="$emit('delete')">
      <LucideTrash2 class="h-4 w-4" />
      Xóa
    </UiButton>
  </div>
</template>
