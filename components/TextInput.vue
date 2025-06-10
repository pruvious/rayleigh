<template>
  <div class="flex flex-col gap-1">
    <label :for="id" class="self-start font-heading text-xs font-medium">{{ label }}</label>

    <textarea
      v-if="type === 'textarea'"
      :id="id"
      :name="name"
      rows="12"
      class="min-h-[13.5rem] rounded-md border bg-transparent px-3 py-[0.6875rem] text-sm outline-none"
    ></textarea>

    <input
      v-else
      :autocomplete="autocomplete"
      :id="id"
      :name="name"
      :type="type"
      spellcheck="false"
      class="max-w-95 resize-y rounded-md border bg-transparent px-3 py-[0.6875rem] text-sm outline-none"
    />

    <p v-if="error" class="text-xs font-bold text-red-500 dark:text-red-400">{{ error }}</p>
  </div>
</template>

<script lang="ts" setup>
import type { InputHTMLAttributes } from 'vue'

defineProps({
  label: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String as PropType<'text' | 'email' | 'textarea'>,
    default: 'text',
  },
  autocomplete: String as PropType<InputHTMLAttributes['autocomplete']>,
  error: String,
})

const id = useId()
</script>
