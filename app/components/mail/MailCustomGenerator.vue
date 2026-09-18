<script setup lang="ts">
interface Props {
  domains: string[]
  loading?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  generate: [{ username: string; domain: string }]
  close: []
}>()

const username = ref('')
const selectedDomain = ref('')

watch(
  () => props.domains,
  (domains) => {
    if (
      domains.length > 0 &&
      (!selectedDomain.value || !domains.includes(selectedDomain.value))
    ) {
      selectedDomain.value = domains[0]!
    }
  },
  { immediate: true, deep: true },
)

const canSubmit = computed(() =>
  !!username.value.trim() && !!selectedDomain.value && !props.loading
)

function submit() {
  const name = username.value.trim().toLowerCase().replace(/[^a-z0-9._-]/g, '')
  if (!name || !selectedDomain.value) return
  emit('generate', { username: name, domain: selectedDomain.value })
  username.value = ''
}
</script>

<template>
  <div class="h-full flex flex-col bg-card">
    <div class="flex items-center gap-2 mb-4">
      <button type="button"
        class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-neutral-200 bg-white px-3 text-sm font-medium text-neutral-900 shadow-sm transition-all outline-none hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-neutral-950/20 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 cursor-pointer"
        @click="$emit('close')">
        <LucideArrowLeft class="h-4 w-4" />
        Quay lại
      </button>
      <span class="text-sm font-semibold">Tạo email tuỳ chỉnh</span>
    </div>

    <form class="flex-1 space-y-4 overflow-y-auto" @submit.prevent="submit">
      <div class="space-y-2">
        <UiLabel for="custom-username">Tên người dùng</UiLabel>
        <UiInput id="custom-username" v-model="username" placeholder="username" :disabled="loading"
          @keydown.enter="submit" />
      </div>

      <div class="space-y-2">
        <UiLabel for="custom-domain">Domain</UiLabel>
        <select id="custom-domain" v-model="selectedDomain" :disabled="loading"
          class="h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm outline-none transition-all hover:border-neutral-300 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-950/10 disabled:cursor-not-allowed disabled:opacity-50">
          <option v-for="domain in domains" :key="domain" :value="domain">
            {{ domain }}
          </option>
        </select>
      </div>

      <button type="submit"
        class="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all outline-none hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-neutral-950/20 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 cursor-pointer"
        :disabled="!canSubmit">
        <LucideLoader2 v-if="loading" class="h-4 w-4 animate-spin" />
        <LucideMailPlus v-else class="h-4 w-4" />
        <span>{{ loading ? 'Đang tạo...' : 'Tạo email' }}</span>
      </button>
    </form>
  </div>
</template>
