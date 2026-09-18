<template>
  <div class="shrink-0 bg-border" :class="orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px'">
  </div>
</template>
s
<script setup lang="ts">
interface Props {
  orientation?: 'horizontal' | 'vertical'
}

withDefaults(defineProps<Props>(), {
  orientation: 'horizontal',
})
</script>
