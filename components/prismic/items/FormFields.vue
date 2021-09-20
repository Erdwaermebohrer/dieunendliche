<template>
  <div class="form-fields__wrapper">
    <div class="form-fields__wrapper--title">
      <h2 class="title" v-text="$prismic.asText(slice.primary.title1)" />
    </div>
    <div class="form-fields__wrapper--content">
      <div class="fields__wrapper">
        <div
          class="fields__wrapper--item"
          v-for="(field, index) in slice.items"
          :key="'index' + index"
        >
          <input
            class="input"
            type="text"
            v-model="formFields[field.field_title[0].text]"
          />
          <label
            class="label"
            v-text="$prismic.asText(field.field_placeholder)"
          />
        </div>
        <div class="validation__wrapper">
          <div
            class="validation__wrapper--error"
            v-if="showErrorMessage"
            v-text="$prismic.asText(slice.primary.error_message)"
          />
          <div
            class="validation__wrapper--success"
            v-if="showSuccessMessage"
            v-text="$prismic.asText(slice.primary.success_message)"
          />
        </div>
      </div>
      <div class="link__wrapper">
        <img
          class="link__wrapper--icon"
          src="~assets/svg/arrow-right-white.svg"
        />
        <a
          class="link__wrapper--link"
          v-text="$prismic.asText(slice.primary.link_title)"
          @click="checkFields(formFields)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    slice: {
      type: Object,
    },
    formFields: {
      type: Object,
      default: () => {
        return {};
      },
    },
    sendingForm: {
      type: Function,
    },
  },
  data() {
    return {
      showErrorMessage: false,
      showSuccessMessage: false,
    };
  },
  methods: {
    checkFields(formFields) {
      this.sendingForm(formFields);

      //Here should come Validation

      //After Validation reset the form

      // this.resetFields();
    },
    resetFields() {
      this.formFields = {};
    },
  },
};
</script>