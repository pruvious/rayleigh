<template>
  <Container class="space-y-23">
    <div v-for="{ author, description, headline, path, publishDate, sharingImage } of data?.records" :key="path">
      <div class="flex items-center gap-8 tp:flex-col">
        <PruviousPicture :image="sharingImage" :imgAttrs="{ class: 'w-95 h-auto shrink-0 rounded-md tp:w-full' }" />
        <div class="flex-1">
          <h2>
            <NuxtLink :to="path">{{ headline }}</NuxtLink>
          </h2>
          <WrittenOn :author="author" :publishDate="publishDate" class="text-vs mt-2" />
          <div v-if="description" class="prose mt-4">
            <p>{{ description }}</p>
          </div>
          <Button :to="path" class="mt-6">Read more</Button>
        </div>
      </div>
    </div>

    <div v-if="data && data.total > data.perPage" class="flex gap-8">
      <Button v-if="data.currentPage > 1" :to="`${route.path}?page=${data.currentPage - 1}`">Previous page</Button>
      <Button
        v-if="data.lastPage > data.currentPage"
        :to="`${route.path}?page=${data.currentPage + 1}`"
        class="ml-auto"
      >
        Next page
      </Button>
    </div>
  </Container>
</template>

<script lang="ts" setup>
import { defineBlock, type PaginateResult, type PopulatedFieldType } from '#pruvious'

defineBlock({
  icon: 'List',
})

const route = useRoute()
const page = computed(() => (route.query.page ? Number(route.query.page) : 1))

const { data } = await useFetch<
  PaginateResult<
    Pick<PopulatedFieldType['posts'], 'author' | 'description' | 'headline' | 'path' | 'publishDate' | 'sharingImage'>
  >
>('/api/posts', { query: { page } })

if (!data.value?.records.length && (page.value !== 1 || data.value?.total)) {
  if (process.server) {
    throw createError({ statusCode: 404 })
  } else {
    showError({ statusCode: 404 })
  }
}
</script>
