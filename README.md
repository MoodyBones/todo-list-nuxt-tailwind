# todo-list-nuxt-tailwind

[live](https://micro-task.netlify.app/)

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

# Notes

## Props

- aka Component state
- Props as being similar to inputs in a function.
- The value of a prop gives components an initial state that affects their display.

Two ways to register props

- array of strings
- an object, with each key corresponding to the prop name
  - Listing props as an object allows you to specify **default values**, **mark props as required**, perform basic object typing (specifically around JavaScript primitive types), and perform simple **prop validation**.

## Data object

- a component should never alter the value of its own props - omponents editing props can make debugging a challenge. If a value is passed to multiple children, it could be hard to track where the changes to that value were coming from.
- To work around this, we can manage the done state using Vue’s data property.
- The data property is where you can manage local state in a component, it lives inside the component object alongside the props property and has the following structure:

```html
data() { return { key: value } }
```

### You'll note that the data property is a function.

- This is to keep the data values unique for each instance of a component at runtime — the function is invoked separately for each component instance.
  - If you declared data as just an object, all instances of that component would share the same values. This is a side-effect of the way Vue registers components and something you do not want.
- You use `this` to access a component's props and other properties from inside data,

```jsx
export default {
  props: {
    label: { required: true, type: String },
    done: { default: false, type: Boolean },
  },
  data() {
    return {
      isDone: this.done,
    }
  },
}
```

## Vue binds all props to the component instancce

- We don't have to call `this.props.done`
- It also binds other attributes (data, which you’ve already seen, and others like methods, computed, etc.) directly to the instance.
- This makes them available in your template
  - The down-side to this is that **you need to keep the keys unique across these attributes**. This is why we called our data attribute isDone instead of done.

The v-bind expression looks like this:

```html
v-bind:attribute="expression"
```

## Creating a method & binding it to an event with v-on

- Add a method to the component object, using `methods` property
- For displaying data that comes from calculations, you should use a `computed` property,

```jsx
export default {
  methods: {
    onSubmit() {
      console.log('form submitted')
    },
  },
}
```

### bind method to the form

```html
<form @submit="onSubmit"></form>
```

- When you run this, the app still posts the data to the server, causing a refresh. Since we're doing all of our processing on the client, there's no server to handle the postback.

### Prevent the browser from posting to the server (Event Modifiers)

- we need to stop the event’s default action while bubbling up through the page (Event.preventDefault(), in vanilla JavaScript).
- Vue has a special syntax called **event modifiers**

Modifiers are appended to the end of an event with a dot like so: `@event.modifier`. Here is a list of event modifiers:

- `.stop`: Stops the event from propagating. Equivalent to `[Event.stopPropagation()](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation)` in regular JavaScript events.
- `.prevent`: Prevents the event's default behavior. Equivalent to `[Event.preventDefault()](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)`.
- `.self`: Triggers the handler only if the event was dispatched from this exact element.
- `{.key}`: Triggers the event handler only via the specified key. [MDN has a list of valid key values](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values); multi-word keys just need to be converted to kebab case (e.g. `page-down`).
- `.native`: Listens for a native event on the root (outer-most wrapping) element on your component.
- `.once`: Listens for the event until it's been triggered once, and then no more.
- `.left`: Only triggers the handler via the left mouse button event.
- `.right`: Only triggers the handler via the right mouse button event.
- `.middle`: Only triggers the handler via the middle mouse button event.
- `.passive`: Equivalent to using the `{ passive: true }` parameter when creating an event listener in vanilla JavaScript using `[addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)`.

```html
<form @submit.prevent="onSubmit"></form>
```

## Binding data to inputs with v-model

```jsx
<input
  type="text"
  id="new-todo-input"
  name="new-todo"
  autocomplete="off"
<!-- bind -->
  v-model="label" />

export default {
  methods: {
    onSubmit() {
			// to test
      console.log("submitted:", this.label);
    }
  },
  data() {
    return {
      label: ""
    };
  }
};
```

> Note: You can also sync data with <input> values through a combination of events and v-bind attributes. In fact, this is what v-model does behind the scenes. However, the exact event and attribute combination varies depending on input types and will take more code than just using the v-model shortcut.

### Changing v-model behavior with modifiers

- `.trim`, will remove whitespace from before or after the input. We can add the modifier to our v-model statement like so: v-model.trim="label".
- `.lazy`. This modifier changes when v-model syncs the value for text inputs. v-model syncing works by updating the variable using events.
  - For text inputs, this sync happens using the input event. Often, this means that Vue is syncing the data after every keystroke.
  - The .lazy modifier causes v-model to use the [change event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event) instead. This means that Vue will only sync data when the input loses focus or the form is submitted.
- chain them `v-model.lazy.trim="label"`

## Passing data to parents with custom events ($emit)

- this works very similarly to native events on HTML elements: a child component can emit an event which can be listened to via v-on.

`child`

```jsx
methods: {
    onSubmit() {
      this.$emit('todo-added', this.label)
    },
  },
```

`parent`

```jsx
methods: {
	// toDoLabel param is emitted from the child
  addToDo(toDoLabel) {
    console.log('To-do added:', toDoLabel);
  }
}
```

Add event listener, that calls the parent method when the event fires

```jsx
<ToDoForm @todo-added="addToDo" />
```

### Adding the new todo into our data

```jsx
addToDo(toDoLabel) {
  this.ToDoItems.push({id:uniqueId('todo-'), label: toDoLabel, done: false});
}
```

```jsx
onSubmit() {
	// if empty don't emit
  if (this.label === '') return

	this.$emit('todo-added', this.label);

	// clear label after emit
	this.label = "";
}
```

# Using Vue computed properties

**don't do this**. It would be recalculated on every render. For a small app like this, that probably doesn't matter too much. For bigger apps, or when the expression is more complicated, that could cause a serious performance problem.

```jsx
<h2>
      {{ ToDoItems.filter((item) => item.done).length }} out of
      {{ ToDoItems.length }} items completed
    </h2>
```

use computed - they are cached

add an aria label to `ul`

```jsx
<h2 id="list-summary">{{listSummary}}</h2>
<ul aria-labelledby="list-summary" class="stack-large">
  <li v-for="item in ToDoItems" :key="item.id">
    <to-do-item :label="item.label" :done="item.done" :id="item.id"></to-do-item>
  </li>
</ul>

computed: {
  listSummary() {
    const numberFinishedItems = this.ToDoItems.filter(item =>item.done).length
    return `${numberFinishedItems} out of ${this.ToDoItems.length} items completed`
  }
}
```

### Tracking changes to "done"

- we can attach a @change event handler to each checkbox instead of using v-model.

`child`

```jsx
<input
      :id="id"
      type="checkbox"
      :checked="isDone"
      @change="$emit('checkbox-changed')"
    />
```

`parent` method

```jsx
updateDoneStatus(toDoId) {
      const toDoToUpdate = this.ToDoItems.find((item) => item.id === toDoId)
      toDoToUpdate.done = !toDoToUpdate.done
    },
```

We want to run this method whenever a ToDoItem emits a checkbox-changed event, and pass in its [item.id](http://item.id/) as the parameter.

```jsx
<ToDoItem
          :id="item.id"
          :label="item.label"
          :done="item.done"
          @checkbox-changed="updateDoneStatus(item.id)"
        />
```

## Vue conditional rendering: editing existing todos (v-if v-else)

create an edit component

`ToDoItemEditForm.vue`

```jsx
<template>
  <form class="stack-small" @submit.prevent="onSubmit">
    <div>
      <label class="edit-label">Edit Name for &quot;{{label}}&quot;</label>
      <input :id="id" type="text" autocomplete="off" v-model.lazy.trim="newLabel" />
    </div>
    <div class="btn-group">
      <button type="button" class="btn" @click="onCancel">
        Cancel
        <span class="visually-hidden">editing {{label}}</span>
      </button>
      <button type="submit" class="btn btn__primary">
        Save
        <span class="visually-hidden">edit for {{label}}</span>
      </button>
    </div>
  </form>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      newLabel: this.label
    };
  },
  methods: {
    onSubmit() {
      if (this.newLabel && this.newLabel !== this.label) {
        this.$emit("item-edited", this.newLabel);
      }
    },
    onCancel() {
      this.$emit("edit-cancelled");
    }
  }
};
</script>
<style scoped>
.edit-label {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #0b0c0c;
  display: block;
  margin-bottom: 5px;
}
input {
  display: inline-block;
  margin-top: 0.4rem;
  width: 100%;
  min-height: 4.4rem;
  padding: 0.4rem 0.8rem;
  border: 2px solid #565656;
}
form {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
form > * {
  flex: 0 0 100%;
}
</style>
```

There is a "Save" button and a "Cancel" button:

- When the "Save" button is clicked, the component emits the new label via an `item-edited` event.
- When the "Cancel" button is clicked, the component signals this by emitting an `edit-cancelled` event.

### Modifying our ToDoItem component

update ToDoItem with edit and delete buttons and event listeners

```jsx
<template>
  <div class="flex justify-between gap-6">
    <div class="flex-grow">
      <input
        :id="id"
        type="checkbox"
        :checked="isDone"
        @change="$emit('checkbox-changed')"
      />
      <label :for="id">{{ label }}</label>
    </div>
    <div class="flex-shrink self-start flex gap-4">
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
        @click="toggleToItemEditForm"
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
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          ></path>
        </svg>
        <span class="sr-only">Edit {{ label }}</span>
      </button>
      <button
        type="button"
        class="
          border-2 border-red-600
          rounded
          px-4
          py-4
          uppercase
          font-bold
          text-lg text-red-600
          hover:text-white hover:bg-red-600
          transition-all
          ease-out
          shadow-sm
        "
        @click="deleteToDo"
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
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          ></path>
        </svg>
        <span class="sr-only">Delete {{ label }}</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: { required: true, type: String },
    done: { default: false, type: Boolean },
    id: { required: true, type: String },
  },
  data() {
    return {
      isDone: this.done,
    }
  },
}
</script>

<style lang="scss" scoped></style>
```

We've also added "Edit" and "Delete" buttons:

- The "Edit" button, when clicked, will toggle displaying the `ToDoItemEditForm` component so we can use it to edit our todo item, via an event handler function called `toggleToItemEditForm()`. This handler will set an `isEditing` flag to true. To do that, we'll need to first define it inside our `data()` property.
- The "Delete" button, when clicked, will delete the todo item via an event handler function called `deleteToDo()`. In this handler we’ll emit an `item-deleted` event to our parent component so the list can be updated.

Let's define our click handlers, and the necessary `isEditing` flag.

Add `isEditing` below your existing `isDone` data point:

```jsx
data() {
  return {
    isDone: this.done,
    isEditing: false
  };
}
```

add methods

```jsx
methods: {
    deleteToDo() {
      this.$emit('item-deleted');
    },
    toggleToItemEditForm() {
      this.isEditing = true;
    }
  }
```

> You can also attach v-if to a <template> tag if you need to conditionally render an entire template.

## Conditionally displaying components via v:if and v:else

add to root div in ToDoItem

```jsx
<div v-if="!isEditing">
```

below the closing div tag add

```jsx
<to-do-item-edit-form v-else :id="id" :label="label"></to-do-item-edit-form>
```

## Get out of edit mode

we need to add an itemEdited() method to our ToDoItem component's methods. This method should take the new item label as an argument, emit an itemEdited event to the parent component, and set isEditing to false.

```jsx
itemEdited(newLabel) {
  this.$emit('item-edited', newLabel);
  this.isEditing = false;
}
```

and add the cancel edit method

```jsx
editCancelled() {
  this.isEditing = false;
}
```

add event handlers for the events emitted by the ToDoItemEditForm

```jsx
<to-do-item-edit-form v-else :id="id" :label="label"
                      @item-edited="itemEdited"
                      @edit-cancelled="editCancelled">
</to-do-item-edit-form>
```

## Updating and deleting todo items

Handle updating the ToDoItems array back in parent

```jsx
deleteToDo(toDoId) {
  const itemIndex = this.ToDoItems.findIndex(item => item.id === toDoId);
  this.ToDoItems.splice(itemIndex, 1);
},
editToDo(toDoId, newLabel) {
  const toDoToEdit = this.ToDoItems.find(item => item.id === toDoId);
  toDoToEdit.label = newLabel;
}
```

Next, we'll add the event listeners for the `item-deleted` and `item-edited` events:

- For `item-deleted`, you'll need to pass the `item.id` to the method.
- For `item-edited`, you'll need to pass the `item.id` and the special `$event` variable. This is a special Vue variable used to pass event data to methods. When using native HTML events (like `click`), this will pass the native event object to your method.

```jsx
<to-do-item :label="item.label" :done="item.done" :id="item.id"
            @checkbox-changed="updateDoneStatus(item.id)"
            @item-deleted="deleteToDo(item.id)"
            @item-edited="editToDo(item.id, $event)">
</to-do-item>
```

## Fixing a small bug with isDone status

try

1. Check (or uncheck) one of the todo checkboxes.
2. Press the "Edit" button for that todo item.
3. Cancel the edit by pressing the "Cancel" button.

This is because the isDone inside data is only given the value this.done on component load.

Fixing this is fortunately quite easy — we can do this by converting our isDone data item into a computed property — another advantage of computed properties is that they preserve reactivity, meaning (among other things) that their state is saved when the template changes like ours is now doing.

remove

```jsx
isDone: this.done,
```

add

```jsx
computed: {
  isDone() {
    return this.done;
  }
},
```

---

## [Understanding the tangle of events](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_conditional_rendering#understanding_the_tangle_of_events)

One of the most potentially confusing parts is the tangle of standard and custom events we've used to trigger all the interactivity in our app. To understand this better, it is a good idea to write out a flow chart, description, or diagram of what events are emitted where, where they are being listened for, and what happens as a result of them firing.

For example:

**App.vue**

`<to-do-form>` listens for:

- `todo-added` event emitted by the `onSubmit()` method inside the `ToDoForm` component when the form is submitted.**Result**: `addToDo()` method invoked to add new todo item to the `ToDoItems` array.

`<to-do-item>` listens for:

- `checkbox-changed` event emitted by the checkbox `<input>` inside the `ToDoItem` component when it is checked or unchecked.**Result**: `updateDoneStatus()` method invoked to update done status of associated todo item.
- `item-deleted` event emitted by the `deleteToDo()` method inside the `ToDoItem` component when the "Delete" button is pressed.**Result**: `deleteToDo()` method invoked to delete associated todo item.
- `item-edited` event emitted by the `itemEdited()` method inside the `ToDoItem` component when the `item-edited` event emitted by the `onSubmit()` method inside the `ToDoItemEditForm` has been successfully listened for. Yes, this is a chain of two different `item-edit` events!**Result**: `editToDo()` method invoked to update label of associated todo item.

**ToDoForm.vue**

`<form>` listens for `submit` event.**Result**: `onSubmit()` method is invoked, which checks that the new label is not empty, then emits the `todo-added` event (which is then listened for inside `App.vue`, see above), and finally clears the new label `<input>`.

**ToDoItem.vue**

`checkbox` `<input>` listens for `change` event.**Result**: `checkbox-changed` event emitted when the checkbox is checked/unchecked (which is then listened for inside `App.vue`; see above).

"Edit" `<button>` listens for `click` event.**Result**: `toggleToItemEditForm()` method is invoked, which toggles `this.isEditing` to `true`, which in turn displays the todo item's edit form on re-render.

"Delete" `<button>` listens for `click` event.**Result**: `deleteToDo()` method is invoked, which emits the `item-deleted` event (which is then listened for inside `App.vue`; see above)

`<to-do-item-edit-form>` listens for:

- `item-edited` event emitted by the `onSubmit()` method inside the `ToDoItemEditForm` component when the form is successfully submitted.**Result**: `itemEdited()` method is invoked, which emits the `item-edited` event (which is then listened for inside `App.vue`, see above), and sets `this.isEditing` back to `false`, so that the edit form is no longer shown on re-render.
- `edit-cancelled` event emitted by the `onCancel()` method inside the `ToDoItemEditForm` component when the "Cancel" button is clicked.**Result**: `editCancelled()` method is invoked, which sets `this.isEditing` back to `false`, so that the edit form is no longer shown on re-render.

**ToDoItemEditForm.vue**

`<form>` listens for `submit` event.**Result**: `onSubmit()` method is invoked, which checks to see if the new label value is not blank, and not the same as the old one, and if so emits the `item-edited` event (which is then listened for inside `ToDoItem.vue`, see above).

"Cancel" `<button>` listens for `click` event.**Result**: `onCancel()` method is invoked, which emits the `edit-cancelled` event (which is then listened for inside `ToDoItem.vue`, see above).

---

next..

[https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_refs_focus_management](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_refs_focus_management)

## Focus management with Vue refs

- how we can improve our app's keyboard accessibility.
- Using Vue refs to handle this — an advanced feature that allows you to have direct access to the underlying DOM nodes below the virtual DOM,

  - **or direct access from one component to the internal DOM structure of a child component.**

  **Objective**: To learn how to handle focus management using Vue refs.

### The focus management problem

- when a user activates the "Edit" Button, we remove the "Edit" Button from the DOM, [
- but we don't move the user's focus anywhere, so in effect it just disappears.
- This can be disorienting for keyboard and non-visual users.
- To give users a better experience, we'll add code to control the focus so that it gets set to the edit field when the edit form is shown.

## Virtual DOM and refs

- Vue, like some other frameworks, uses a virtual DOM (VDOM) to manage elements.
- This means that Vue keeps a representation of all of the nodes in our app in memory.
- Any updates are first performed on the in-memory nodes, and then all the changes that need to be made to the actual nodes on the page are synced in a batch.

Better Performance

- reading and writing actual DOM nodes is often more expensive than virtual nodes

Take care

- it also means you often should not edit your HTML elements directly through native browser APIs (like `Document.getElementById`) when using frameworks, because it results in the VDOM and real DOM going out of sync.

Use Vue refs instead,

- if you need to access the underlying DOM nodes (like when setting focus), you can use [Vue refs](https://vuejs.org/v2/api/#ref)

> To use a ref in a component, you add a ref attribute to the element that you want to access, with a string identifier for the value of the attribute. It's important to note that a ref needs to be **unique** within a component. No two elements rendered at the same time should have the same ref.

Add a ref to edit button

```jsx
<button type="button" class="btn" ref="editButton" @click="toggleToItemEditForm">
  Edit
  <span class="visually-hidden">{{label}}</span>
</button>
```

To access the value associated with our ref, we use the `$refs` property provided on our component instance.

To see the value of the ref when we click our "Edit" button, add a console.log() to our toggleToItemEditForm() method, like so:

```jsx
toggleToItemEditForm() {
  console.log(this.$refs.editButton);
  this.isEditing = true;
}
```

If you activate the "Edit" Button at this point, you should see an HTML <button> element referenced in your console.

## Vue's $nextTick() method

- We want to set focus on the "Edit" Button when a user saves or cancels their edit.
- To do that, we need to handle focus in the `ToDoItem` component’s `itemEdited()` and `editCancelled()` methods.

create a new method which takes no arguments called focusOnEditButton(). Inside it, assign your ref to a variable, and then call the focus() method on the ref.

```jsx
focusOnEditButton() {
  const editButtonRef = this.$refs.editButton;
  editButtonRef.focus();
}
```

Call focusOnEditButton method at the end of the edit and cancel methods

```jsx
itemEdited(newItemName) {
  this.$emit("item-edited", newItemName);
  this.isEditing = false;
  this.focusOnEditButton();
},
editCancelled() {
  this.isEditing = false;
  this.focusOnEditButton();
},
```

Error

- error raised along the lines of "can't access property "focus", editButtonRef is undefined".
- This seems weird. Your button ref was defined when you activated the "Edit" Button, but now it’s not. What is going on?

well..

- when we change `isEditing` to true, we no longer render the section of the component featuring the "Edit" Button. This means there's no element to bind the ref to, so it becomes undefined.

> You might now be thinking "hey, don’t we set isEditing=false before we try to access the ref, so therefore shouldn't the v-if now be displaying the button?” This is where the virtual DOM comes into play. Because Vue is trying to optimize and batch changes, it won't immediately update the DOM when we set isEditing to false. So when we call focusOnEdit(), the "Edit" Button has not been rendered yet.

### We must wait until Vue undergoes the next DOM update cycle.

- using Vue method `$nextTick()`
  - accepts a callback function, which then executes after the DOM updates.

Since the focusOnEditButton() method needs to be invoked after the DOM has updated, we can wrap the existing function body inside a $nextTick() call.

```jsx
focusOnEditButton() {
  this.$nextTick(() => {
    const editButtonRef = this.$refs.editButton;
    editButtonRef.focus();
  });
}
```

## Vue lifecycle methods

- Next, we need to move focus to the edit form’s <input> element when the "Edit" button is clicked.
- However, because our edit form is in a different component to our "Edit" button, we can't just set focus inside the "Edit" button’s click event handler.
- Instead, we can use the fact that we remove and re-mount our ToDoItemEditForm component whenever the "Edit" Button is clicked to handle this.

How does this work?

> Well, Vue components undergo a series of events, known as a **lifecycle**. This lifecycle spans from all the way before elements are created and added to the VDOM (mounted), until they are removed from the VDOM (destroyed).

Vue lets you run methods at various stages of this lifecycle using **lifecycle methods**. This can be useful for things like data fetching, where you may need to get your data before your component renders, or after a property changes. The list of lifecycle methods are below, in the order that they fire.

1. `beforeCreate()` — Runs before the instance of your component is created. Data and events are not yet available.
2. `created()` — Runs after your component is initialized but before the component is added to the VDOM. This is often where data fetching occurs.
3. `beforeMount()` — Runs after your template is compiled, but before your component is rendered to the actual DOM.
4. `mounted()` — Runs after your component is mounted to the DOM. Can access `refs` here.
5. `beforeUpdate()` — Runs whenever data in your component changes, but before the changes are rendered to the DOM.
6. `updated()` — Runs whenever data in your component has changed and after the changes are rendered to the DOM.
7. `beforeDestroy()` — Runs before a component is removed from the DOM.
8. `destroyed()` — Runs after a component has been removed from the DOM
9. `activated()` — Only used in components wrapped in a special `keep-alive` tag. Runs after the component is activated.
10. `deactivated()` — only used in components wrapped in a special `keep-alive` tag. Runs after the component is deactivated.

> Note: [The Vue Docs provide a nice diagram for visualizing when these hooks happen](https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram). This article from the Digital Ocean Community Blog dives into the lifecycle methods more deeply.

### let's use one to trigger focus when our ToDoItemEditForm component is mounted.

attach a ref to ToDoItemEditForm.vue

```jsx
<input :id="id" ref="labelInput" type="text" autocomplete="off" v-model.lazy.trim="newName" />
```

Add a mounted() property just inside your component object

```jsx
mounted() {
   const labelInputRef = this.$refs.labelInput;
   labelInputRef.focus();
}
```

Now when you activate the "Edit" Button with your keyboard, focus should immediately be moved to the edit <input>.

## Handling focus when deleting to-do items

- unlike with the edit form, we don’t have a clear location for focus to move to when an element is deleted.
- We also need a way to provide assistive technology users with information that confirms that an element was deleted.

We're already tracking the number of elements in our list heading — the <h2> in App.vue — and it's associated with our list of to-do items. This makes it a reasonable place to move focus to when we delete a node.

First, we need to add a ref to our list heading. We also need to add a tabindex="-1" to it — this makes the element programmatically focusable (i.e. it can be focused via JavaScript), when by default it is not.

```jsx
<h2 id="list-summary" ref="listSummary" tabindex="-1">
  {{ listSummary }}
</h2>
```

— and it's associated with our list of to-do items. This makes it a reasonable place to move focus to when we delete a node.

> Note: tabindex is a really powerful tool for handling certian accessibility problems. However, it should be used with caution. Over-using tabindex="-1" can cause problems for all sorts of users, so only use it exactly where you need to. You should also almost never use tabindex > = 0, as it can cause problems for users since it can make the DOM flow and the tab-order mismatch, and/or add non-interactive elements to the tab order. This can be confusing to users, especially those using screen readers and other assistive technology.

Now that we have a ref and have let browsers know that we can programmatically focus the <h2>, we need to set focus on it. At the end of deleteToDo(), use the listSummary ref to set focus on the <h2>. Since the <h2> is always rendered in the app, you do not need to worry about using $nextTick of lifecycle methods to handle focusing it.

```jsx
deleteToDo(toDoId) {
    const itemIndex = this.ToDoItems.findIndex(item => item.id === toDoId);
    this.ToDoItems.splice(itemIndex, 1);
    this.$refs.listSummary.focus();
}
```

Now, when you delete an item from your list, focus should be moved up to the list heading. This should provide a reasonable focus experience for all of our users.

## [Further resources](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_resources#further_resources)

Here’s where you should go to learn more about Vue:

- [Vue Docs](https://vuejs.org/) — The main Vue site. Contains comprehensive documentation, including examples, cookbooks, and reference material. This is the best place to start learning Vue in depth.
- [Vue Github Repo](https://github.com/vuejs/vue) — The Vue code itself. This is where you can report issues and/or contribute directly to the Vue codebase. Studying the Vue source code can help you better understand how the framework works, and write better code.
- [Vue Forum](https://forum.vuejs.org/) — The official forum for getting help with Vue.
- [Vue CLI Docs](https://cli.vuejs.org/) — Documentation for the Vue CLI. This contains information on customizing and extending the output you are generating via the CLI.
- [NuxtJS](https://nuxtjs.org/) — NuxtJS is a Server-Side Vue Framework, with some architectural opinions that can be useful to creating maintainable applications, even if you don’t use any of the Server Side Rendering features it provides. This site provides detailed documentation on using NuxtJS.
- [Vue Mastery](https://www.vuemastery.com/courses/) — A paid education platform that specializes in Vue, including some free lessons.
- [Vue School](https://vueschool.io/) — Another paid education platform specializing in Vue.
