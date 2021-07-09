<template>
  <form
    class="
      flex flex-col
      justify-between
      gap-6
      pb-6
      border-b-2 border-indigo-100
    "
    @submit.prevent="onSubmit"
  >
    <div class="flex-grow">
      <label class="sr-only">Edit Name for &quot;{{ label }}&quot;</label>
      <input
        :id="id"
        ref="labelInput"
        v-model.lazy.trim="newLabel"
        type="text"
        autocomplete="off"
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
          focus:outline-none
        "
      />
    </div>
    <div class="flex-shrink self-end flex gap-4">
      <button
        type="button"
        class="
          border-2 border-indigo-600
          rounded
          px-4
          py-4
          uppercase
          font-bold
          text-lg text-indigo-600
          hover:text-white hover:bg-indigo-600
          transition-all
          ease-out
          shadow-sm
        "
        @click="onCancel"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
        <span class="sr-only">Cancel editing {{ label }}</span>
      </button>
      <button
        type="submit"
        class="
          border-2 border-green-600
          rounded
          px-4
          py-4
          uppercase
          font-bold
          text-lg text-green-600
          hover:text-white hover:bg-green-600
          transition-all
          ease-out
          shadow-sm
        "
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
        <span class="sr-only">Save edit for {{ label }}</span>
      </button>
    </div>
  </form>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      newLabel: this.label,
    }
  },
  mounted() {
    // we don't need to use $nextTick because the component has already been added to the DOM when mounted() is called.
    const labelInputRef = this.$refs.labelInput
    labelInputRef.focus()
  },
  methods: {
    onSubmit() {
      if (this.newLabel && this.newLabel !== this.label) {
        this.$emit('item-edited', this.newLabel)
      }
    },
    onCancel() {
      this.$emit('edit-cancelled')
    },
  },
}
</script>
<style scoped></style>
