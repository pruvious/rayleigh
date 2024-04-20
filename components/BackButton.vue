<template>
  <NuxtLink v-if="to" :to="to" class="group inline-flex items-center gap-2 font-heading text-sm">
    <IconChevronLeft class="h-3.5 w-3.5 transition-transform group-hocus:-translate-x-0.5" />
    <span>
      <slot />
    </span>
  </NuxtLink>
</template>

<script lang="ts" setup>
defineProps({
  to: String,
})
</script>
