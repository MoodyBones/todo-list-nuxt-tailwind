<template>
  <button
    class="
      border-2 border-indigo-600
      rounded
      px-3
      py-2
      uppercase
      font-bold
      text-lg text-indigo-600
      hover:text-white hover:bg-indigo-600
      transition-all
      ease-out
      shadow-sm
    "
    @click="$emit('btn-clicked')"
  >
    <!-- @event="$emit('when-this-is-updated', 'plus optional prop/arg to be passed into parent method')" -->
    <slot></slot>
  </button>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
