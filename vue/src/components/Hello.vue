<template>
  <div class="gun-demo">
    <connector @connected="load"></connector>
    <h1>Gun Demo</h1>
    <todo-input></todo-input>
    <todo v-for="(todo, nodeKey) in todos"
      :key="nodeKey"
      :todoKey="nodeKey"
      :text="todo.text"
      :completed="todo.completed"
      :created="todo.created"
      :deleted="todo.deleted"
    ></todo>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'demo',
  data: () => {
    return {
      todos: {},
      $todos: null
    }
  },
  components: {
    'todo': resolve => require(['./Todo.vue'], resolve),
    'todo-input': resolve => require(['./TodoInput.vue'], resolve),
    'connector': resolve => require(['./Connector.vue'], resolve)
  },
  methods: {
    load () {
      setTimeout(() => {
        console.log('attempting to load todos!')

        // Bug in Gun. Doesn't load after connect. Have to fire a val then map
        this.$todos.val()
      }, 300)
    }
  },
  mounted () {
    this.$todos = this.$gun.get('todos')
    this.$todos.map().on((todo, key) => {
      Vue.set(this.todos, key, todo)
    })
    this.load()
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

.warning {
  color: orangered;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
