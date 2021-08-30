import { reactive, toRefs } from '@nuxtjs/composition-api'

export const useCounterMethod = () => {
  const state = reactive({ currentCount: 3 })

  const incrementCount = () => {
    state.currentCount++
  }

  return {
    ...toRefs(state),
    incrementCount,
  }
}
