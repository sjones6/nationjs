<template>
  <div class="todo-input">
      <input type="text" placeholder="Type here ..." v-model="text" @keyup.enter="addTodo">
  </div>
</template>

<script>
export default {
  name: 'todo-input',
  data () {
    return {
      text: ''
    }
  },
  methods: {
    addTodo () {
      let key = this.text.replace(/\W+/g, '').toLowerCase()
      if (key.trim()) {
        // get a reference to a new todo
        var $todo = this.$gun.get(key)

        // set the value on the node
        $todo.put({
          text: this.text,
          created: Date.now(),
          deleted: false,
          completed: null
        })

        // add the new todo to the Todos set
        this.$todos.set($todo)
        this.text = ''
      }
    }
  },
  mounted () {
    this.$todos = this.$gun.get('todos')
  }
}
</script>

<style scoped>

input {
    max-width: 400px;
    padding: .5em;
    border: 1px solid #666;
    font-size: 24px;
    line-height: 1.2;
}
</style>
