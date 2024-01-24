<template>
  <Container>
    <div class="max-w-content space-y-2">
      <h1>{{ title }}</h1>
      <p v-if="kicker" class="text-sm">{{ kicker }}</p>
    </div>
  </Container>
</template>

<script lang="ts" setup>
import { defineBlock, textField } from '#pruvious'

defineBlock({
  icon: 'H1',
})

defineProps({
  title: textField({ required: true }),
  kicker: textField(),
})
</script>
