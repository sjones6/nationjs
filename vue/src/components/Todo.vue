<template>
  <div class="todo" :class='{"hidden": (!text.length || deleted)}'>
    <h4 @click="complete" :class='{"completed": completed}'>{{text}} </h4> <span class="delete" @click="deleteTodo">X</span>
    <h6>{{ createdAt }}</h6>
  </div>
</template>

<script>
export default {
  name: 'demo',
  props: {
    todoKey: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    created: '',
    completed: {
      type: Boolean,
      default: false
    },
    deleted: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      $todo: null
    }
  },
  computed: {
    createdAt () {
      return this.created ? (new Date(this.created)).toLocaleTimeString() : ''
    }
  },
  methods: {
    complete () {
      this.$todo.put({completed: Boolean(!this.completed)})
    },
    deleteTodo () {
      console.log('Deleting todo!')
      this.$todo.put({deleted: true})
    }
  },
  mounted () {
    if (this.todoKey) {
      var $todos = this.$gun.get('todos')
      this.$todo = $todos.get(this.todoKey)
    }
  }
}
</script>

<style scoped>

h4, span {
  display: inline-block;
}

h4 {
  margin-bottom: 5px;
  font-weight: 600;
}

h6 {
  color: #666;
  margin: 0;
}

.delete {
  color: red;
  font-weight: 600;
}

.hidden {
  display: none;
}

.completed {
    text-decoration: line-through;
}
</style>
