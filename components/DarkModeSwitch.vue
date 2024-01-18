<template>
  <div class="relative h-5 w-5">
    <ClientOnly>
      <button
        :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        @click="
          () => {
            colorMode.preference = isDark ? 'light' : 'dark'
            clickCount++
          }
        "
      >
        <span
          class="absolute bottom-0 left-0 h-9 w-9 transition duration-300"
          :style="{ transform: `rotate(${rotation}deg)` }"
        >
          <IconSun
            class="absolute bottom-0 left-0 text-heading transition duration-300 dark:text-white"
            :class="{ 'h-5 w-5': !isDark, 'h-4 w-4 opacity-25': isDark }"
          />
          <IconMoon
            class="absolute right-0 top-0 text-heading transition duration-300 dark:text-white"
            :class="{ 'h-5 w-5 -rotate-180': isDark, 'h-4 w-4 opacity-25': !isDark }"
          />
        </span>
      </button>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
const colorMode = useColorMode()
const isDark = computed(
  () =>
    colorMode.preference === 'dark' ||
    (colorMode.preference === 'system' && window?.matchMedia?.('(prefers-color-scheme: dark)').matches),
)
const clickCount = ref(0)
const initialRotation = isDark.value ? 180 : 0
const rotation = computed(() => initialRotation + clickCount.value * 180)
</script>
