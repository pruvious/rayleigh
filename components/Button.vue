<template>
  <NuxtLink
    v-if="to"
    :to="to"
    class="group relative inline-flex h-4 items-center pl-6 font-heading text-sm text-heading transition dark:text-white"
  >
    <span
      class="absolute left-0 top-0 h-4 w-4 rounded-full bg-heading transition group-hocus:scale-75 dark:bg-white"
    ></span>
    <span class="mt-px">
      <slot />
    </span>
  </NuxtLink>
</template>

<script lang="ts" setup>
defineProps({
  to: String,
})
</script>
