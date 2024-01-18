<template>
  <Container>
    <header class="flex items-center gap-15 ph:gap-8">
      <NuxtLink to="/" class="text-heading transition duration-300 dark:text-white">
        <Logo />
      </NuxtLink>

      <Menu class="ml-auto" />

      <DarkModeSwitch class="tp:ml-auto" />

      <button
        :title="mobileMenuVisible ? 'Close menu' : 'Open menu'"
        @click="toggleMobileMenu()"
        class="z-20 hidden h-8 w-8 tp:block"
        :class="{ 'sticky top-0': mobileMenuVisible, 'relative': !mobileMenuVisible }"
      >
        <span
          v-for="i in 2"
          class="absolute left-1/2 top-1/2 h-[0.078125rem] w-5 -translate-x-1/2 -translate-y-1/2 bg-heading transition-all duration-300 dark:bg-white"
          :class="{
            '-mt-1': i === 1 && !mobileMenuVisible,
            'mt-1': i === 2 && !mobileMenuVisible,
            'rotate-45': i === 1 && mobileMenuVisible,
            '-rotate-45': i === 2 && mobileMenuVisible,
          }"
        ></span>
      </button>
    </header>
  </Container>
</template>

<script lang="ts" setup>
import { useScrollLock } from '@vueuse/core'

const mobileMenuVisible = useMobileMenuVisible()
const isLocked = useScrollLock(document?.body)

function toggleMobileMenu() {
  mobileMenuVisible.value = !mobileMenuVisible.value
  window.scrollTo({ top: 0, behavior: 'smooth' })
  isLocked.value = mobileMenuVisible.value
}
</script>
