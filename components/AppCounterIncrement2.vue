<template>
  <BaseMain>
    <div class="flex flex-col items-center border-b-2 pb-10 border-indigo-100">
      <h1 class="text-center text-indigo-900 mb-4">
        Increment by 2 using destructured module
      </h1>

      <BaseH2> Composition API </BaseH2>
      <div class="grid grid-cols-3 items-center">
        <BaseButton @btn-clicked="incrementCount">Add</BaseButton>
        <p class="col-span-2 mx-auto">{{ currentCount }}</p>
      </div>
    </div>
  </BaseMain>
</template>

<script>
import { useCounterMethod } from '../features/useCounter'

export default {
  setup() {
    // only pull our currentCount
    const { currentCount } = useCounterMethod()

    // because we will create our own incrementCount fn that increments by 2
    const incrementCount = () => {
      currentCount.value += 2
    }

    return { currentCount, incrementCount }
  },
}
</script>

<style lang="scss" scoped></style>
