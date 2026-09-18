<script setup>
const route = useRoute()
const address = computed(() => decodeURIComponent(route.params.address || ''))

const mail = useMailStore()

onMounted(() => {
  if (address.value) {
    mail.setEmailAddress(address.value)
    mail.fetchInbox(address.value)
  }
    const interval = setInterval(() => {
    if (address.value) mail.fetchInbox(address.value, true)
  }, 5000)
  onUnmounted(() => clearInterval(interval))
})

useHead({
  title: `Inbox ${address.value}`
})
</script>

<template>
  <MailShell>
    <template #header>
      <MailAddressHeader :address="address" />
    </template>

    <template #left>
      <div class="p-4 lg:p-5 space-y-4 overflow-y-auto">
        <div class="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
          <span class="h-2 w-2 rounded-full bg-primary"></span>
          Địa chỉ inbox
        </div>
        <MailGenerator :email-address="address" :copied="mail.copied" :loading="false" @copy="mail.copyEmail" />
      </div>
    </template>

    <template #middle>
      <MailAddressInboxList
        :emails="mail.emails"
        :selected="mail.selected"
        :loading="mail.loading"
        @select="mail.selectEmail"
      />
    </template>

    <template #right>
      <MailAddressEmailDetail :email="mail.selectedEmail" :address="address" />
    </template>

    <template #footer>
      <MailPageFooter />
    </template>
  </MailShell>
</template>
