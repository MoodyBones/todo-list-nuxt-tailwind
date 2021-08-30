<template>
  <BaseMain>
    <div class="flex flex-col items-center border-b-2 pb-10 border-indigo-100">
      <h1 class="text-center text-indigo-900 mb-4">Composition Modules</h1>

      <BaseH2> Composition API </BaseH2>
      <div class="grid grid-cols-3 items-center">
        <BaseButton @btn-clicked="incrementCount">Add</BaseButton>
        <p class="col-span-2 mx-auto">{{ currentCount }}</p>
      </div>
    </div>
  </BaseMain>
</template>

<script>
// import helper methods

import { useCounterMethod } from '../features/useCounter'

export default {
  setup() {
    // const countState = useCounterMethod()

    // destructured countState
    const { currentCount, incrementCount } = useCounterMethod()

    // to see whats in countState
    // console.log(countState)

    return { currentCount, incrementCount }
  },
}
</script>

<style lang="scss" scoped></style>
