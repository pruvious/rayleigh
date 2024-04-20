<template>
  <Container class="content-block">
    <PruviousHTML :html="text" class="prose max-w-content" />
  </Container>
</template>

<script lang="ts" setup>
import { defineBlock, editorField } from '#pruvious'

defineBlock({
  icon: 'Pencil',
})

defineProps({
  text: editorField({
    required: true,
    toolbar: ['bold', 'italic', 'link', 'heading2', 'heading3', 'paragraph', 'link', 'bulletList'],
  }),
})
</script>
