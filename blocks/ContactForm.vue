<template>
  <Container ref="container" class="content-block">
    <div v-if="success" class="inline-block rounded-md border border-heading p-4 text-sm dark:border-white">
      Thank you for your message! We'll get back to you as soon as possible.
    </div>

    <form v-if="!success" @submit.prevent="submit" class="space-y-8 transition" :class="{ 'opacity-50': disabled }">
      <div
        v-if="generalError"
        class="inline-block rounded-md border border-red-500 p-4 text-sm text-red-700 transition dark:border-red-400 dark:text-red-400"
      >
        {{ generalError }}
      </div>

      <TextInput :error="fieldErrors.name" autocomplete="name" label="Your name" name="name" />
      <TextInput :error="fieldErrors.email" autocomplete="email" label="Your email address" name="email" type="email" />
      <TextInput :error="fieldErrors.message" label="Message" name="message" type="textarea" />
      <Button type="submit">Send</Button>
    </form>
  </Container>
</template>

<script lang="ts" setup>
import { defineBlock, isObject } from '#pruvious'
import { getCollectionData } from '#pruvious/client'
import type Container from '~/components/Container.vue'

defineBlock({
  icon: 'Forms',
})

const container = ref<InstanceType<typeof Container> | null>(null)
const success = ref(false)
const disabled = ref(false)
const generalError = ref<string>()
const fieldErrors = ref<Record<string, string>>({})
const { recaptcha, recaptchaSiteKey } = await getCollectionData('settings')

if (recaptcha) {
  useHead({
    script: [
      {
        src: `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`,
        async: true,
        defer: true,
      },
    ],
  })
}

async function submit(event: Event) {
  if (disabled.value) {
    return
  }

  disabled.value = true

  const form = event.target as HTMLFormElement
  const formData = new FormData(form)

  if (recaptcha) {
    await new Promise<void>((resolve) => {
      const grecaptcha = (window as any).grecaptcha

      grecaptcha.ready(() => {
        grecaptcha.execute(recaptchaSiteKey, { action: 'submit' }).then((token: string) => {
          formData.set('recaptcha', token)
          resolve()
        })
      })
    })
  }

  const response = await $fetch('/api/submit', {
    method: 'post',
    body: formData,
    onResponseError: ({ response }) => {
      generalError.value = response._data
      fieldErrors.value = {}
      disabled.value = false
    },
  }).catch(() => null)

  if (isObject(response)) {
    if (response.success) {
      success.value = true
    } else {
      generalError.value = response.message
      fieldErrors.value = response.errors
      disabled.value = false
    }
  }

  nextTick(() => container.value?.$el.scrollIntoView({ behavior: 'smooth' }))
}
</script>

<style>
.grecaptcha-badge {
  visibility: hidden;
}
</style>
