<template>
  <PruviousPicture :image="image" />
</template>

<script lang="ts" setup>
import { defineBlock, imageField } from '#pruvious'

defineBlock({
  icon: 'Photo',
})

defineProps({
  image: imageField({
    required: true,
  }),
})
</script>
