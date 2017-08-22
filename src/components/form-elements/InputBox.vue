<template>
  <div class="form-group" :class="{'has-error': showError }">
    <label v-if="label" class="control-label" :class="{'col-sm-2': !stacked}">
      {{ label }}: <span v-if="required">*</span>
    </label>
    <div class="clearfix" :class="{'col-sm-10': (!stacked && label)}">
      <div :class="{'input-group': usingAddons}">
        <div v-if="slotExists('leftAddon')" class="input-group-addon">
          <slot name="leftAddon"></slot>
        </div>
        <div v-if="slotExists('leftBtn')" class="input-group-btn">
          <slot name="leftBtn"></slot>
        </div>
        <input class="form-control"
          :id="id"
          :name="name"
          :type="type"
          :value="value"
          :required="required"
          :readonly="readonly"
          :placeholder="placeholder"
          v-on:keyup.enter="enterKeyPressed"
          v-on:input="updateValue($event.target.value)">
        <div v-if="slotExists('rightAddon')" class="input-group-addon">
          <slot name="rightAddon"></slot>
        </div>
        <div v-if="slotExists('rightBtn')" class="input-group-btn">
          <slot name="rightBtn"></slot>
        </div>
      </div>
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
      type: {
        type: String,
        default: () => {
          return 'text'
        }
      },
      label: {
        type: String
      },
      helper: String,
      value: [
        String,
        Number
      ],
      stacked: Boolean,
      required: Boolean,
      readonly: Boolean,
      placeholder: String,
      showError: Boolean,
      errorMessage: String
    },
    computed: {
      usingAddons() {
        return !(Object.keys(this.$slots).length === 0 && this.$slots.constructor === Object)
      }
    },
    methods: {
      enterKeyPressed() {
        this.$emit('enter')
      },
      updateValue(value) {
        this.$emit('input', value)
      },
      slotExists(name) {
        return (name in this.$slots)
      }
    }
  }
</script>
