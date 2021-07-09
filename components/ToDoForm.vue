<template>
  <form
    class="
      flex flex-col
      justify-between
      gap-6
      pb-14
      border-b-2 border-indigo-100
    "
    @submit.prevent="onSubmit"
  >
    <div class="flex-grow">
      <label for="new-todo-input"> What needs to be done? </label>
      <input
        id="new-todo-input"
        v-model.lazy.trim="label"
        class="
          mt-6
          bg-gray-200
          appearance-none
          border-2 border-gray-200
          rounded
          w-full
          py-2
          px-4
          text-gray-700
          leading-tight
          focus:outline-none
        "
        type="text"
        name="new-todo"
        autocomplete="off"
      />
    </div>
    <div class="flex-shrink self-end">
      <button
        class="
          mt-6
          border-2 border-indigo-600
          rounded
          px-6
          py-4
          uppercase
          font-bold
          text-2xl text-indigo-600
          hover:text-white hover:bg-indigo-600
          transition-all
          ease-out
          shadow-sm
        "
        type="submit"
      >
        Add
      </button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      label: '',
    }
  },
  methods: {
    onSubmit() {
      if (this.label === '') return
      this.$emit('todo-added', this.label)
      this.label = ''
    },
  },
}
</script>

<style lang="scss" scoped></style>
