<template>
  <div class="connector">
    <h1 v-show="peer.length">Currently connected to {{ connectionName }}</h1>
    <select @change="connect" v-model="connection" v-show="!peer.length">
      <option value='9000'>Washington</option>
      <option value='9001'>London</option>
      <option value='9002'>Sydney</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'connector',
  data () {
    return {
      connection: '',
      peer: ''
    }
  },
  computed: {
    connectionName () {
      let name = ''
      switch (parseInt(this.connection)) {
        case 9000:
          name = 'DC'
          break
        case 9001:
          name = 'London'
          break
        case 9002:
          name = 'Sydney'
          break
      }
      return name
    }
  },
  methods: {
    connect () {
      if (this.connection && !this.peer) {
        this.peer = `http://localhost:${this.connection}/gun`
        console.log(`Attempting to connect to ${this.peer}`)
        this.$gun.opt({
          peers: [this.peer]
        })
        this.$emit('connected')
      }
    }
  }
}
</script>

<style scoped>
h1 {
  color: green;
}
</style>

