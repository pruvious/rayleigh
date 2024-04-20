<template>
  <Header class="mt-12" />

  <div class="my-23 space-y-23 border-b pb-23 dark:border-white/10">
    <Container>
      <div class="max-w-content">
        <BackButton :to="blogLandingPage">Blog</BackButton>
        <h1 class="mt-3 text-post-title">{{ page?.fields.headline || page?.title }}</h1>
        <WrittenOn :author="page?.fields.author" :publishDate="page?.publishDate" class="mt-2 text-sm" />
      </div>
    </Container>

    <!-- Our post blocks will be rendered here -->
    <slot />
  </div>

  <Footer class="mb-23" />
</template>

<script lang="ts" setup>
import { defineLayout } from '#pruvious'
import { getCollectionData, usePage } from '#pruvious/client'

defineLayout({
  allowedBlocks: ['Image', 'Prose'],
})

const page = usePage()
const { blogLandingPage } = await getCollectionData('settings')
</script>

<style lang="postcss" scoped>
:deep() .prose > h2 {
  @apply text-2xl;
}

:deep() .prose > h3 {
  @apply text-xl;
}
</style>
