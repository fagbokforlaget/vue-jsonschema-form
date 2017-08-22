<template>
  <div class="form-group" :class="{'has-error': showError }">
    <label v-if="label" class="control-label" :class="{'col-sm-2': !stacked}">
      {{ label }}: <span v-if="required">*</span>
    </label>
    <div class="clearfix" :class="{'col-sm-10': !stacked}">
      <textarea class="form-control"
        rows="8"
        cols="64"
        :id="id"
        :name="name"
        :value="value"
        :required="required"
        :readonly="readonly"
        v-on:input="updateValue($event.target.value)"></textarea>
      <p v-if="showError" class="text-danger" v-text="errorMessage"></p>
      <p v-if="helper" class="help-block" v-text="helper"></p>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      id: String,
      name: {
        type: String,
        required: true
      },
      label: {
        type: String
      },
      helper: String,
      value: [
        String
      ],
      stacked: Boolean,
      required: Boolean,
      readonly: Boolean,
      showError: Boolean,
      errorMessage: String
    },
    methods: {
      updateValue(value) {
        this.$emit('input', value)
      }
    }
  }
</script>
