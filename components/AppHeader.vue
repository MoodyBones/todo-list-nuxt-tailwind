<template>
  <nav
    class="
      p-4
      text-indigo-600
      font-medium
      text-3xl
      sticky
      inset-0
      border border-gray-200
      bg-white
    "
  >
    <div class="max-w-4xl mx-auto flex justify-between items-center gap-4">
      <NuxtLink to="/" class="flex items-end gap-2 tracking">
        <svg
          class="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
          ></path>
        </svg>
        <h1>MicroTask</h1>
      </NuxtLink>
      <NuxtLink
        v-for="item in nav"
        :key="item"
        :to="`/${item}`"
        class="text-gray-600 text-xl uppercase tracking-wide"
      >
        {{ item }}
      </NuxtLink>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      nav: ['counter'],
    }
  },
}
</script>

<style lang="scss" scoped></style>
