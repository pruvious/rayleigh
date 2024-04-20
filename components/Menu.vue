<template>
  <nav
    v-if="menu.length"
    class="relative tp:fixed tp:inset-0 tp:z-20 tp:flex tp:overflow-y-auto tp:bg-white/75 tp:backdrop-blur tp:backdrop-filter tp:transition-all tp:duration-300 tp:dark:bg-heading/80"
    :class="{ 'tp:invisible tp:opacity-0': !mobileMenuVisible }"
  >
    <ul @mouseleave="updateDotPosition()" class="flex gap-15 tp:m-auto tp:flex-col tp:p-6 tp:text-center">
      <li v-for="({ label, link }, i) of menu" ref="menuItemEls">
        <NuxtLink
          :to="link"
          @click="mobileMenuVisible = false"
          @mouseenter="updateDotPosition(i)"
          class="text-sm font-bold text-heading transition dark:text-white"
          :class="{ 'tp:underline tp:decoration-2 tp:underline-offset-4': i === activeMenuIndex }"
        >
          {{ label }}
        </NuxtLink>
      </li>
    </ul>

    <span
      v-if="dotPosition !== null"
      class="absolute top-1/2 -ml-3.5 mt-px h-1.5 w-1.5 rounded-full bg-heading transition duration-300 dark:bg-white tp:hidden"
      :style="{ transform: `translate3d(${dotPosition}px, -50%, 0)` }"
    ></span>
  </nav>
</template>

<script lang="ts" setup>
import { getCollectionData } from '#pruvious/client'
import { useEventListener } from '@vueuse/core'

// Fetch menu data from the Settings collection
const { menu } = await getCollectionData('settings')

const mobileMenuVisible = useMobileMenuVisible()
const menuItemEls = ref<HTMLElement[]>([])
const dotPosition = ref<number | null>(null)
const route = useRoute()

let activeMenuIndex = 0

onMounted(() => {
  activeMenuIndex = menu.findIndex(({ link }) => link === route.path || route.path.startsWith(`${link}/`))
  updateDotPosition()
})

useEventListener('resize', () => updateDotPosition())

function updateDotPosition(index?: number) {
  if (activeMenuIndex > -1) {
    menuItemEls.value[index ?? activeMenuIndex].offsetLeft
    dotPosition.value = menuItemEls.value[index ?? activeMenuIndex].offsetLeft
  }
}
</script>
