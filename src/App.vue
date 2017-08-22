<template>
  <div id="app">
    <img src="./assets/logo.png" height="100" alt="">
    <schema-form v-if="schema !== null" :schema="schema" v-model="model">
      <button type="submit" class="btn btn-lg btn-primary pull-right" v-on:click="submitForm">Submit</button>
    </schema-form>
  </div>
</template>

<script>
import schema from './schema/demo.json'
import SchemaForm from './components/SchemaForm'

export default {
  name: 'app',
  components: {
    'schema-form': SchemaForm
  },
  data: () => ({
    model: {},
    schema: schema
  }),
  methods: {
    submitForm () {
      // this.model contains the valid data according your JSON Schema.
      // You can submit your model to the server here
      console.log('Form data:')
      console.log(this.model)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1 {
  font-weight: normal;
}
</style>
