<template>
  <div id="app">
    <schema-form v-if="schema !== null"
      :schema="schema"
      :messages="messages"
      :autocomplete="autocomplete"
      :error="error"
      :success="success"
      v-model="model">
      <button type="submit" class="btn btn-lg btn-primary pull-right" v-on:click="submitForm">Create account</button>
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
    schema: schema,
    messages: {
      error: {
        header: 'Oh snap!!!',
        info: 'Check the form and try submitting again'
      },
      success: {
        header: 'Well done!!!',
        info: 'Your data has been sent successfully'
      }
    },
    autocomplete: 'off',
    error: false,
    success: false,
    delay: 6000,
    timer: null
  }),
  methods: {
    /**
     * Intercept submit event and validate data
     * Model contains the valid data according to the JSON Schema
     */
    submitForm (event) {
      let form = event.srcElement.parentElement

      Array.from(form.querySelectorAll('[required]')).forEach(field => {
        if (field.value.trim() === '') {
          field.classList.add('invalid')
        } else {
          field.classList.remove('invalid')
        }
      })

      if (form.checkValidity()) {
        this.clearErrorMessage()
        this.setSuccessMessage()
      } else {
        this.setErrorMessage()
        return false
      }

      console.log('Form data:')
      console.log(this.model)
    },

    /**
     * Set error message
     */
    setErrorMessage (message) {
      if (message) {
        this.messages.error.info = message
      }
      this.error = true
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.clearErrorMessage()
      }, this.delay)
    },

    /**
     * Clear error message
     */
    clearErrorMessage () {
      this.error = false
    },

    /**
     * Set success message
     */
    setSuccessMessage (message) {
      if (message) {
        this.messages.success.info = message
      }
      this.success = true
      this.timer = setTimeout(() => {
        this.clearSuccessMessage()
      }, this.delay)
    },

    /**
     * Clear success message
     */
    clearSuccessMessage () {
      this.success = false
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
}

h1 {
  font-weight: normal;
}
</style>
