<template>
  <component :is="as" :class="classes" v-bind="$attrs">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  as?: string
}

const { variant = 'default', size = 'default', as = 'button' } = defineProps<Props>()

const classes = computed(() => {
  const base = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950/20 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer'
  const variants: Record<string, string> = {
    default: 'bg-neutral-900 text-white hover:bg-neutral-800',
    destructive: 'bg-red-600 text-white hover:bg-red-700',
    outline: 'border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-100',
    secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200',
    ghost: 'text-neutral-900 hover:bg-neutral-100',
    link: 'text-neutral-900 underline-offset-4 hover:underline',
  }
  const sizes: Record<string, string> = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3 text-xs',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10',
  }
  return `${base} ${variants[variant]} ${sizes[size]}`
})
</script>
