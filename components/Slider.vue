<template>
  <div ref="rootEl" class="fixed inset-0 z-20 bg-heading/80" :class="{ 'opacity-0 ': closing }">
    <button
      @click="close()"
      aria-label="Close"
      class="fixed right-6 top-6 z-10 flex h-8 w-8 text-white ph:right-4 ph:top-4"
    >
      <IconX class="m-auto h-6 w-6" />
    </button>

    <!-- @see https://swiperjs.com/get-started -->
    <div ref="containerEl" class="swiper-container h-screen">
      <div class="swiper-wrapper">
        <div
          v-for="({ image, caption }, i) of slides"
          class="swiper-slide !flex flex-col items-center justify-center gap-6 px-20 py-8 ph:px-6 ph:pt-16"
        >
          <div class="overflow-hidden">
            <PruviousPicture :image="image">
              <PruviousImage
                :image="image"
                @load="i === active && resizeNavigation()"
                class="h-auto max-h-full w-auto max-w-full rounded-md"
              />
            </PruviousPicture>
          </div>

          <p v-if="caption" class="text-center text-white">{{ caption }}</p>
        </div>
      </div>

      <div
        class="pointer-events-none fixed left-1/2 top-1/2 z-10 h-8 -translate-x-1/2 -translate-y-1/2 transition-all ph:hidden"
        :style="{ width: `${navigationWidth}px` }"
      >
        <button
          aria-label="Previous slide"
          ref="prevSlideEl"
          class="pointer-events-auto absolute right-full mr-6 flex h-8 w-8 text-white transition disabled:opacity-0"
        >
          <IconChevronLeft class="m-auto h-6 w-6" />
        </button>

        <button
          aria-label="Next slide"
          ref="nextSlideEl"
          class="pointer-events-auto absolute left-full ml-6 flex h-8 w-8 text-white transition disabled:opacity-0"
        >
          <IconChevronRight class="m-auto h-6 w-6" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type Image } from '#pruvious'
import { useEventListener } from '@vueuse/core'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import Swiper from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import { Keyboard, Navigation, Pagination } from 'swiper/modules'

const props = defineProps({
  slides: {
    type: Array as PropType<{ image: Image | null; caption: string }[]>,
    required: true,
  },
  active: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['close'])

const rootEl = ref<HTMLElement>()
const containerEl = ref<HTMLElement>()
const prevSlideEl = ref<HTMLElement>()
const nextSlideEl = ref<HTMLElement>()
const navigationWidth = ref(0)
const focusTrap = useFocusTrap(rootEl, { escapeDeactivates: false, returnFocusOnDeactivate: false })
const closing = ref(false)

let swiper: Swiper | undefined

onMounted(() => {
  // @see https://swiperjs.com/get-started
  swiper = new Swiper(containerEl.value!, {
    modules: [Keyboard, Navigation, Pagination],
    initialSlide: props.active,
    keyboard: {
      enabled: true,
    },
    navigation: {
      prevEl: prevSlideEl.value!,
      nextEl: nextSlideEl.value!,
    },
    on: {
      resize: resizeNavigation,
      slideChange: resizeNavigation,
    },
  })

  // @see https://vueuse.org/integrations/useFocusTrap/
  nextTick(focusTrap.activate)
})

// @see https://vueuse.org/core/useEventListener/
useEventListener(window, 'keydown', (event) => {
  if (event.key === 'Escape') {
    close()
  }
})

onUnmounted(() => {
  swiper?.destroy()
  focusTrap.deactivate()
})

function resizeNavigation() {
  navigationWidth.value = swiper?.slides[swiper.activeIndex].querySelector('img')?.offsetWidth ?? 0
}

function close() {
  closing.value = true
  nextTick(() => emit('close'))
}
</script>
