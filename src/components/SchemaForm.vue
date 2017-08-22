<template>
  <div class="container">
    <div v-if="schema.title" class="page-header">
      <h1>{{ schema.title }}</h1>
      <p>{{ schema.description }}</p>
    </div>
    <div v-if="error" class="alert alert-danger" role="alert">
      <h3 v-if="title">{{ title }}</h3>
      <p>{{ error }}</p>
    </div>
    <form v-if="fields.length"
      class="clearfix"
      ref="__form"
      :autocomplete="autocomplete"
      :novalidate="novalidate"
      @invalid="invalid"
      @submit.stop.prevent="submit">
      <div class="vjf-form-controls">
        <div v-for="field in fields" class="vjf-field-wrapper" v-bind:key="field.type">
          <toggle-switch
            v-if="field.type === 'checkbox'"
            class="vjf-checkbox-field"
            :id="field.id"
            :name="field.name"
            :label="field.label"
            :labels="field.labels"
            :helper="field.description"
            :placeholder="field.placeholder"
            :stacked="field.stacked"
            v-model="value[field.name]"
            @change="changed"></toggle-switch>
          <select-list
            v-else-if="field.type === 'select'"
            class="vjf-select-field"
            :name="field.name"
            :label="field.label"
            :options="field.items"
            :helper="field.description"
            :placeholder="field.placeholder"
            :stacked="field.stacked"
            :required="field.required"
            :keyName="field.keyName"
            v-model="value[field.name]"
            @change="changed"></select-list>
          <text-area
            v-else-if="field.type === 'textarea'"
            class="vjf-textarea-field"
            :id="field.id"
            :name="field.name"
            :label="field.label"
            :helper="field.description"
            :placeholder="field.placeholder"
            :stacked="field.stacked"
            :required="field.required"
            v-model="value[field.name]"
            @change="changed"></text-area>
          <input-box
            v-else
            class="vjf-input-field"
            :id="field.id"
            :name="field.name"
            :type="field.type"
            :label="field.label"
            :helper="field.description"
            :placeholder="field.placeholder"
            :stacked="field.stacked"
            :required="field.required"
            :readonly="field.readonly"
            v-model="value[field.name]"
            @change="changed"></input-box>
        </div>
      </div>
      <!-- Use this slot to override the default form button -->
      <slot>
        <button type="submit" class="btn btn-primary">Submit</button>
      </slot>
    </form>
  </div>
</template>

<script>
  import Vue from 'vue'
  import * as utils from './utils.js';
  import InputBoxComponent from './form-elements/InputBox.vue';
  import SwitchComponent from './form-elements/Switch.vue';
  import TextAreaComponent from './form-elements/TextArea.vue';
  import ListComponent from './form-elements/List.vue';

  export default {
    name: 'schema-form',
    components: {
      'input-box': InputBoxComponent,
      'text-area': TextAreaComponent,
      'toggle-switch': SwitchComponent,
      'select-list': ListComponent
    },
    props: {
      /**
       * The JSON Schema object. Use the `v-if` directive to load asynchronous schema.
       */
      schema: { type: Object, required: true },

      /**
       * The UI Schema object.
       */
      uiSchema: { type: Object, default: () => ({}) },

      /**
       * Use this directive to create two-way data bindings with the component. It automatically picks the correct way to update the element based on the input type.
       * @model
       */
      value: { type: Object, default: () => ({}) },

      /**
       * This property indicates whether the value of the control can be automatically completed by the browser. Possible values are: `off` and `on`.
       */
      autocomplete: { type: String },

      /**
       * This Boolean attribute indicates that the form is not to be validated when submitted.
       */
      novalidate: { type: Boolean }
    },
    data: () => ({
      default: {},
      fields: [],
      error: null
    }),
    created () {
      utils.loadFields(this, utils.clone(this.schema))
      this.default = utils.clone(this.value)
    },
    mounted () {
      this.reset()
    },
    methods: {
      /**
       * @private
       */
      changed (e) {
        /**
         * Fired when an form input value is changed.
         */
        this.$emit('change', e)
      },

      /**
       * Get a form input component
       */
      input (name) {
        if (!this.$refs[name]) {
          throw new Error(`Undefined input reference '${name}'`)
        }

        return this.$refs[name][0]
      },

      /**
       * @private
       */
      invalid (e) {
        /**
         * Fired when a submittable element has been checked and doesn't satisfy its constraints. The validity of submittable elements is checked before submitting their owner form.
         */
        this.$emit('invalid', e)
      },

      /**
       * Reset the value of all elements of the parent form.
       */
      reset () {
        for (let key in this.default) {
          this.$set(this.value, key, this.default[key])
        }
      },

      /**
       * Send the content of the form to the server
       */
      submit () {
        if (this.$refs.__form.checkValidity()) {
          /**
           * Fired when a form is submitted
           */
          this.$emit('submit')
        }
      },

      /**
       * Set a message error.
       */
      setErrorMessage (message) {
        this.error = message
      },

      /**
       * clear the message error.
       */
      clearErrorMessage () {
        this.error = null
      }
    }
  }
</script>

<style scoped>
.vjf-form-controls {
  margin-bottom: 30px;
  text-align: left;
}
</style>
