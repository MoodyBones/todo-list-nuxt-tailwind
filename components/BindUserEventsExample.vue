<template>
  <div
    class="
      py-36
      px-10
      flex flex-col
      gap-12
      font-bold
      text-4xl text-yellow-600 text-center
    "
  >
    <input
      v-model="message"
      class="
        bg-gray-200
        appearance-none
        border-2 border-gray-200
        rounded
        w-full
        py-2
        px-4
        text-gray-700
        leading-tight
        focus:outline-none focus:bg-white focus:border-yellow-600
        text-center
      "
    />

    <button
      class="
        border-2 border-yellow-600
        rounded-full
        px-6
        py-4
        uppercase
        font-bold
        text-2xl text-yellow-600
        hover:text-white hover:bg-yellow-600
        transition-all
        ease-out
        shadow-sm
      "
      @click="reverseMessage"
    >
      Reverse Message
    </button>

    <span>
      {{ message }}
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello Vue.js',
    }
  },

  methods: {
    reverseMessage() {
      this.message = this.message.split('').reverse().join('')
    },
  },
}
</script>

<style lang="scss">
/* boop */
</style>
