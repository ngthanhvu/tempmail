<script setup lang="ts">
const mail = useMailStore()
const router = useRouter()
const showCustomForm = ref(false)

function goToInbox() {
  const address = mail.searchAddress.trim().toLowerCase()
  if (!address) return
  router.push(`/mail/${encodeURIComponent(address)}`)
}

function deleteSelected() {
  if (!mail.selected) return
  if (!confirm('Xóa email đang chọn?')) return
  mail.deleteEmail(mail.selected)
}

function removeIdentity() {
  if (!mail.emailAddress) return
  if (!confirm('Xóa địa chỉ email này khỏi danh sách?')) return
  mail.removeIdentity(mail.emailAddress)
}

async function generateCustom({ username, domain }: { username: string; domain: string }) {
  try {
    await mail.generateCustomEmail(username, domain)
    showCustomForm.value = false
  } catch (e) {
    alert('Không thể tạo email tuỳ chỉnh. Vui lòng thử lại.')
  }
}

function selectIdentity(address: string) {
  mail.selectIdentity(address)
}

onMounted(() => {
  mail.loadIdentities()
  mail.fetchDomains()
  const interval = setInterval(() => mail.fetchInbox(undefined, true), 5000)
  onUnmounted(() => clearInterval(interval))
})

useHead({
  title: 'Temp Mail - Tạo email tạm thời'
})
</script>

<template>
  <MailShell>
    <template #header>
      <MailPageHeader />
    </template>

    <template #left>
      <div class="relative flex flex-col h-full p-4 lg:p-5 gap-4 overflow-y-auto">
        <template v-if="!showCustomForm">
          <MailIdentitySelector
            :identities="mail.identities"
            :model-value="mail.emailAddress"
            @update:model-value="selectIdentity"
            @copy="mail.copyEmail"
          />
          <MailActions
            :loading="mail.loading"
            :can-delete="!!mail.emailAddress"
            @refresh="mail.fetchInbox"
            @generate="mail.generateEmail"
            @delete="removeIdentity"
            @custom="showCustomForm = true"
          />
        </template>
        <div v-else class="absolute inset-0 z-10 bg-card p-4 lg:p-5 overflow-y-auto">
          <MailCustomGenerator
            :domains="mail.domains"
            :loading="mail.loading"
            @generate="generateCustom"
            @close="showCustomForm = false"
          />
        </div>
      </div>
    </template>

    <template #middle>
      <MailInboxList :emails="mail.emails" :selected="mail.selected" :address="mail.emailAddress"
        :loading="mail.loading" @select="mail.selectEmail" />
    </template>

    <template #right>
      <div v-if="mail.generated" class="h-full min-h-0">
        <MailEmailDetail :email="mail.selectedEmail" :address="mail.emailAddress" />
      </div>
      <SkeletonEmailDetail v-else aria-busy="true" aria-label="Đang tải email" />
    </template>

    <template #footer>
      <MailPageFooter />
    </template>
  </MailShell>
</template>
