<script setup lang="ts">
const searchAddress = defineModel<string>('searchAddress', { required: true })
defineEmits<{
  submit: []
}>()
</script>

<template>
  <div class="rounded-xl border bg-card p-3 md:p-4 shrink-0 shadow-sm">
    <label class="block text-sm font-medium text-neutral-900 mb-2">TÌM LẠI INBOX</label>
    <form class="flex flex-col md:flex-row gap-2" @submit.prevent="$emit('submit')">
      <input v-model="searchAddress" type="text" placeholder="nhập địa chỉ email..."
        class="flex h-10 w-full flex-1 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm outline-none transition-all placeholder:text-neutral-400 hover:border-neutral-300 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-950/10 disabled:cursor-not-allowed disabled:opacity-50 font-mono" />
      <button type="submit"
        class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all outline-none hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-neutral-950/20 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 w-full md:w-auto">
        <LucideInbox class="h-4 w-4" />
        MỞ INBOX
      </button>
    </form>
  </div>
</template>
