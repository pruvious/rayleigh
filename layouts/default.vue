<template>
  <Header class="mt-12" />

  <div class="my-23 space-y-23" :class="{ 'border-b pb-23 dark:border-white/10': page?.fields.footerBorder }">
    <!-- Our page blocks will be rendered here -->
    <slot />
  </div>

  <Footer class="mb-23" />
  <PruviousBadge />
</template>

<script lang="ts" setup>
import { usePage } from '#pruvious/client'

const page = usePage()
</script>
