import { defineStore } from 'pinia'
import { useMailApi } from '~/composables/mail/useMailApi'
import { useMailClipboard } from '~/composables/mail/useMailClipboard'
import type { Email } from '~/composables/mail/useMailApi'

export { type Email } from '~/composables/mail/useMailApi'

export const useMailStore = defineStore('mail', {
  state: () => ({
    domains: [] as string[],
    selectedDomain: '',
    emailAddress: '',
    emails: [] as Email[],
    loading: false,
    selected: null as number | null,
    generated: false,
    copied: false,
    searchAddress: '',
    identities: [] as string[],
  }),

  getters: {
    selectedEmail: (state) => {
      if (!state.emails.length || state.selected === null) return null
      return state.emails.find((e) => e.uid === state.selected) || null
    },
  },

  actions: {
    selectEmail(uid: number) {
      this.selected = uid
    },

    async fetchDomains() {
      const api = useMailApi()
      this.loading = true
      try {
        const list = await api.fetchDomains()
        this.domains = list.length > 0 ? list : ['mail.thanhvu.net']
        if (this.domains.length > 0) {
          this.selectedDomain = this.domains[Math.floor(Math.random() * this.domains.length)] || 'mail.thanhvu.net'
          if (!this.emailAddress) {
            await this.generateEmail()
          } else {
            this.addIdentity(this.emailAddress)
            await this.fetchInbox()
          }
        }
      } catch (e) {
        console.error(e)
        if (!this.domains.length) {
          this.domains = ['mail.thanhvu.net']
          if (!this.emailAddress) {
            await this.generateEmail()
          }
        }
      } finally {
        this.loading = false
      }
    },

    async generateEmail() {
      const api = useMailApi()
      this.loading = true
      try {
        const domainList = this.domains.length > 0 ? this.domains : ['mail.thanhvu.net']
        const domain = domainList[Math.floor(Math.random() * domainList.length)] || 'mail.thanhvu.net'
        this.selectedDomain = domain
        this.emailAddress = await api.generateEmail(domain)
        this.addIdentity(this.emailAddress)
        this.generated = true
        this.selected = null
        this.copied = false
        await this.fetchInbox()
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    },

    async fetchInbox(address?: string, silent = false) {
      const api = useMailApi()
      const addr = address || this.emailAddress
      if (!addr) return
      if (!silent) this.loading = true
      try {
        const data = await api.fetchInbox(addr)
        this.emails = data.emails || []
      } catch (e) {
        console.error(e)
      } finally {
        if (!silent) this.loading = false
      }
    },

    async copyEmail() {
      const { copy } = useMailClipboard()
      if (!this.emailAddress) return
      const ok = await copy(this.emailAddress)
      if (ok) {
        this.copied = true
        setTimeout(() => (this.copied = false), 2000)
      }
    },

    async deleteEmail(uid: number) {
      const api = useMailApi()
      this.loading = true
      try {
        await api.deleteEmail(uid)
        this.emails = this.emails.filter((email) => email.uid !== uid)
        if (this.selected === uid) {
          this.selected = null
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    },

    async generateCustomEmail(username: string, domain: string) {
      const api = useMailApi()
      this.loading = true
      try {
        this.emailAddress = await api.generateCustomEmail(username, domain)
        this.addIdentity(this.emailAddress)
        this.generated = true
        this.selected = null
        this.copied = false
        await this.fetchInbox()
      } catch (e) {
        console.error(e)
        throw e
      } finally {
        this.loading = false
      }
    },

    setEmailAddress(address: string) {
      this.emailAddress = address
      this.addIdentity(address)
    },

    loadIdentities() {
      if (typeof window === 'undefined') return
      try {
        const raw = localStorage.getItem('tempmail-identities')
        if (raw) {
          this.identities = JSON.parse(raw)
        }
      } catch (e) {
        console.error(e)
      }
    },

    saveIdentities() {
      if (typeof window === 'undefined') return
      try {
        localStorage.setItem('tempmail-identities', JSON.stringify(this.identities))
      } catch (e) {
        console.error(e)
      }
    },

    addIdentity(address: string) {
      if (!address) return
      if (!this.identities.includes(address)) {
        this.identities.unshift(address)
        this.saveIdentities()
      }
    },

    async removeIdentity(address: string) {
      this.identities = this.identities.filter((a) => a !== address)
      this.saveIdentities()
      if (this.emailAddress === address) {
        this.emailAddress = this.identities[0] || ''
        this.generated = !!this.emailAddress
        this.selected = null
        this.copied = false
        this.emails = []
        if (this.emailAddress) {
          await this.fetchInbox()
        }
      }
    },

    async selectIdentity(address: string) {
      this.emailAddress = address
      this.generated = true
      this.selected = null
      this.copied = false
      await this.fetchInbox()
    },
  },
})
