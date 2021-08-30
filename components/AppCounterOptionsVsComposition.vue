<template>
  <BaseMain>
    <div class="flex flex-col items-center border-b-2 pb-10 border-indigo-100">
      <h1 class="text-center text-indigo-900 mb-4">
        Options API <br />VS. <br />Composition API
      </h1>
      <BaseH2> Composition API </BaseH2>
      <div class="grid grid-cols-3 items-center">
        <BaseButton @btn-clicked="incrementCountComposition">Add</BaseButton>
        <p class="col-span-2 mx-auto">{{ currentCountComposition }}</p>
      </div>
    </div>
    <div class="flex flex-col items-center">
      <BaseH2> Options API </BaseH2>
      <div class="grid grid-cols-3 items-center">
        <!-- custom events @when-this-is-updated="callMethod" -->
        <BaseButton @btn-clicked="incrementCount">Add</BaseButton>
        <p class="col-span-2 mx-auto">{{ currentCountOptions }}</p>
      </div>
    </div>
  </BaseMain>
</template>

<script>
// import helper methods
import { reactive, toRefs } from '@nuxtjs/composition-api'

export default {
  setup() {
    const state = reactive({ currentCountComposition: 3 })

    // const currentCountReferenced = ref(5)

    const incrementCountComposition = () => {
      state.currentCountComposition++
      // currentCountReferenced.value++
    }

    return {
      // currentCountReferenced,
      ...toRefs(state),
      incrementCountComposition,
    }
  },

  data: () => ({
    currentCountOptions: 1,
  }),

  methods: {
    incrementCount() {
      this.currentCountOptions++
    },
  },
}
</script>

<style lang="scss" scoped></style>
