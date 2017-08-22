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
        <select class="form-control"
          :id="name"
          :name="name"
          :required="required"
          v-on:change="updateValue($event.target.value)">
          <option v-if="placeholder"
            value=""
            disabled
            readonly
            v-text="placeholder"
            :selected="value == null || value == ''"></option>
          <option v-for="option in options"
            :value="option[keyName]"
            v-text="option[labelName]"
            v-bind:key="option[keyName]"
            :selected="option[keyName] == value"></option>
        </select>
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
      name: {
        type: String,
        required: true
      },
      label: {
        type: String
      },
      labelName: {
        type: String,
        default: () => {
          return 'label'
        }
      },
      keyName: {
        type: String,
        default: () => {
          return 'id'
        }
      },
      options: {
        type: Array,
        required: true,
      },
      helper: String,
      value: [
        String,
        Number
      ],
      stacked: Boolean,
      required: Boolean,
      placeholder: String,
      showError: Boolean,
      errorMessage: String
    },
    methods: {
      slotExists(name) {
        return (name in this.$slots)
      },
      updateValue(value) {
        this.$emit('input', value)
      }
    },
    computed: {
      usingAddons() {
        return !(Object.keys(this.$slots).length === 0 && this.$slots.constructor === Object)
      }
    },
    updated() {
      if (this.options.length) {
        let element = document.getElementById(this.name)

        if (element.options[element.selectedIndex]) {
          this.updateValue(element.options[element.selectedIndex].value)
        }
      }
    }
  }
</script>
