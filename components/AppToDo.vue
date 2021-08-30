<template>
  <BaseMain>
    <h1
      class="
        text-7xl
        tracking-widest
        bg-indigo-600
        text-white
        p-4
        rounded
        shadow-sm
        self-center
      "
    >
      TO DO
    </h1>

    <ToDoForm @todo-added="addToDo" />

    <!-- tabindex="-1" makes the element programmatically focusable -->
    <h2
      id="list-summary"
      ref="listSummary"
      tabindex="-1"
      class="
        text-4xl
        tracking-widest
        bg-indigo-600
        text-white
        p-4
        rounded
        shadow-sm
        self-center
        uppercase
        text-center
      "
    >
      {{ listSummary }} <br />items completed
    </h2>
    <ul aria-labelledby="list-summary" class="flex flex-col gap-12 pt-12">
      <li v-for="item in ToDoItems" :key="item.id" class="">
        <ToDoItem
          :id="item.id"
          :label="item.label"
          :done="item.done"
          @checkbox-changed="updateDoneStatus(item.id)"
          @item-deleted="deleteToDo(item.id)"
          @item-edited="editToDo(item.id, $event)"
        />
      </li>
    </ul>
  </BaseMain>
</template>

<script>
// This package exports a function that takes in a string and appends a unique integer to the end of the prefix

import uniqueId from 'lodash.uniqueid'

export default {
  data() {
    return {
      ToDoItems: [
        { id: uniqueId('todo-'), label: 'Learn Vue', done: false },
        {
          id: uniqueId('todo-'),
          label: 'Create a Vue project with the CLI',
          done: true,
        },
        { id: uniqueId('todo-'), label: 'Have fun', done: true },
        { id: uniqueId('todo-'), label: 'Create a to-do list', done: false },
      ],
    }
  },
  computed: {
    listSummary() {
      const numberFinishedItems = this.ToDoItems.filter(
        (item) => item.done
      ).length
      return `${numberFinishedItems} out of ${this.ToDoItems.length}`
    },
  },
  methods: {
    addToDo(toDoLabel) {
      this.ToDoItems.push({
        id: uniqueId('todo-'),
        label: toDoLabel,
        done: false,
      })
    },
    updateDoneStatus(toDoId) {
      const toDoToUpdate = this.ToDoItems.find((item) => item.id === toDoId)
      toDoToUpdate.done = !toDoToUpdate.done
    },
    deleteToDo(toDoId) {
      const itemIndex = this.ToDoItems.findIndex((item) => item.id === toDoId)
      this.ToDoItems.splice(itemIndex, 1)
      this.$refs.listSummary.focus()
    },
    editToDo(toDoId, newLabel) {
      const toDoToEdit = this.ToDoItems.find((item) => item.id === toDoId)
      toDoToEdit.label = newLabel
    },
  },
}
</script>

<style lang="scss">
/* boop */
</style>
