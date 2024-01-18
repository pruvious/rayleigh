<template>
  <div>{{ text }}</div>
</template>

<script lang="ts" setup>
import { defineBlock, editorField } from '#pruvious'

defineBlock({
  icon: 'Pencil',
})

defineProps({
  text: editorField({
    required: true,
  }),
})
</script>
