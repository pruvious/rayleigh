<template>
  <a
    v-if="$config.public.showBanner"
    href="https://pruvious.com"
    target="_blank"
    class="fixed bottom-6 left-1/2 z-10 flex max-w-64 -translate-x-1/2 items-center gap-4 rounded-full border border-transparent bg-white/75 p-4 text-sm shadow-2xl backdrop-blur transition-[background] dark:border-white/15 dark:bg-heading/80 dark:shadow-none ph:hidden"
  >
    <svg
      fill="currentColor"
      height="80"
      viewBox="0 0 73 80"
      width="73"
      xmlns="http://www.w3.org/2000/svg"
      class="h-auto w-8 shrink-0 text-[#0652dd]"
    >
      <path
        clip-rule="evenodd"
        d="M7.3 27.3274C-2.43333 32.9597 -2.43334 47.0403 7.29999 52.6726L51.1 78.0177C60.8333 83.65 73 76.6097 73 65.3452V14.6549C73 3.39035 60.8333 -3.64997 51.1 1.98228L7.3 27.3274ZM25.2088 33.6578C20.2967 36.5002 20.2967 43.606 25.2088 46.4484L47.3135 59.2389C52.2257 62.0812 58.3659 58.5283 58.3659 52.8436V27.2626C58.3659 21.5779 52.2257 18.025 47.3135 20.8673L25.2088 33.6578Z"
        fill-rule="evenodd"
      ></path>
    </svg>

    <span>This website is built with Pruvious, a free CMS for your Nuxt website.</span>
  </a>
</template>
