<template>
  <div>
    <Container class="space-y-6 ph:space-y-5">
      <h2
        class="relative before:absolute before:right-full before:top-1/2 before:mr-3 before:h-2 before:w-2 before:-translate-y-1/2 before:rounded-full before:bg-heading before:transition before:duration-300 dark:before:bg-white ph:before:mr-2.5 ph:before:h-1 ph:before:w-1"
      >
        {{ title }}
      </h2>

      <div class="grid grid-cols-3 gap-5 tp:grid-cols-2 ph:grid-cols-1">
        <button
          v-for="({ image, caption }, i) of gallery"
          @click="
            () => {
              sliderVisible = true
              activeSlide = i
            }
          "
          aria-label="Open image"
          class="group relative overflow-hidden rounded-md"
        >
          <!-- @see https://pruvious.com/docs/components#pruviouspicture -->
          <PruviousPicture :image="image" />

          <span
            class="absolute inset-0 flex flex-col gap-4 bg-heading/70 p-8 text-white opacity-0 transition duration-300 group-hocus:opacity-100 ph:p-6"
          >
            <span
              v-if="caption"
              class="-translate-y-3 text-left font-heading font-medium transition duration-300 group-hocus:translate-y-0"
            >
              {{ caption }}
            </span>

            <IconSearch
              class="ml-auto mt-auto h-6 w-6 translate-y-3 transition duration-300 group-hocus:translate-y-0"
            />
          </span>
        </button>
      </div>
    </Container>

    <Transition>
      <LazySlider
        v-if="sliderVisible && gallery"
        :active="activeSlide"
        :slides="gallery"
        @close="sliderVisible = false"
      />
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { defineBlock, imageSubfield, repeaterField, textField, textSubfield } from '#pruvious'

/**
 * @see https://pruvious.com/docs/blocks#defineblock
 */
defineBlock({
  icon: 'Photo',
  description: 'A portfolio block with a gallery of images that can be clicked to open a full-screen view.',
})

defineProps({
  /**
   * @see https://pruvious.com/docs/fields/text
   */
  title: textField({
    description: 'The title of the portfolio block',
  }),

  /**
   * @see https://pruvious.com/docs/fields/repeater
   */
  gallery: repeaterField({
    description: 'The gallery of images',
    subfields: {
      /**
       * @see https://pruvious.com/docs/fields/image
       */
      image: imageSubfield({
        description: 'The image to display',
        required: true,
        minWidth: 1024,
        minHeight: 1024,
        sources: [
          { format: 'webp', width: 1920, height: 1920, resize: 'inside', withoutEnlargement: true },
          { format: 'jpeg', width: 1920, height: 1920, resize: 'inside', withoutEnlargement: true },
        ],
      }),

      /**
       * @see https://pruvious.com/docs/fields/text
       */
      caption: textSubfield({
        description: 'An optional caption to display',
      }),
    },
  }),
})

const sliderVisible = ref(false)
const activeSlide = ref(0)
</script>

<style lang="postcss" scoped>
.v-enter-active {
  @apply transition-opacity duration-300;
}

.v-enter-from {
  @apply opacity-0;
}
</style>
