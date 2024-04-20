<template>
  <span v-if="writtenOn" class="block italic text-dim">
    Written on {{ writtenOn }}
    <span v-if="author">by {{ author?.firstName }}</span>
  </span>
</template>

<script lang="ts" setup>
import type { PopulatedFieldType } from '#pruvious'

const props = defineProps<{
  author?: PopulatedFieldType['posts']['author']
  publishDate?: PopulatedFieldType['posts']['publishDate']
}>()

const writtenOn = props.publishDate
  ? new Date(props.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  : null
</script>
