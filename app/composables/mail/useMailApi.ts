export interface DomainListResponse {
  domains: string[]
}

export interface GenerateEmailResponse {
  address: string
}

export interface InboxResponse {
  address: string
  emails: Email[]
  count: number
}

export interface Email {
  uid: number
  subject: string
  from: string
  to: string
  date: string
  text: string
  html: string
  seen: boolean
}

export function useMailApi() {
  async function fetchDomains(): Promise<string[]> {
    const res = await fetch('/api/emails/domains')
    if (!res.ok) {
      throw new Error(`Failed to fetch domains: ${res.status}`)
    }
    return res.json()
  }

  async function generateEmail(domain: string): Promise<string> {
    const res = await fetch(`/api/emails/generate?domain=${encodeURIComponent(domain)}`)
    if (!res.ok) {
      throw new Error(`Failed to generate email: ${res.status}`)
    }
    const data: GenerateEmailResponse = await res.json()
    return data.address
  }

  async function fetchInbox(address: string): Promise<InboxResponse> {
    const res = await fetch(`/api/emails/inbox/${encodeURIComponent(address)}`)
    if (!res.ok) {
      throw new Error(`Failed to fetch inbox: ${res.status}`)
    }
    return res.json()
  }

  async function deleteEmail(uid: number): Promise<void> {
    const res = await fetch(`/api/emails/${uid}`, { method: 'DELETE' })
    if (!res.ok) {
      throw new Error(`Failed to delete email: ${res.status}`)
    }
  }

  async function generateCustomEmail(username: string, domain: string): Promise<string> {
    const res = await fetch('/api/emails/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, domain }),
    })
    if (!res.ok) {
      throw new Error(`Failed to generate custom email: ${res.status}`)
    }
    const data: GenerateEmailResponse = await res.json()
    return data.address
  }

  return {
    fetchDomains,
    generateEmail,
    fetchInbox,
    deleteEmail,
    generateCustomEmail,
  }
}
