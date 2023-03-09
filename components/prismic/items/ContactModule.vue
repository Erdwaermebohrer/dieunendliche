<template>
  <div class="contact-module__wrapper">
    <div class="contact-module__wrapper--left">
      <div class="title">
        <headline-component :inputData="slice.primary.title" />
      </div>
      <div class="subtitle">
        <headline-component :inputData="slice.primary.subtitle" />
      </div>
    </div>
    <div class="contact-module__wrapper--right">
      <form class="form-fields__wrapper--content"
        :name="slice.primary.id"
        :id="slice.primary.id"
        data-netlify="true"
        @submit.prevent="checkFields(formFields)">
        <input type="hidden" name="form-name" :value="slice.primary.id" />
        <div class="fields__wrapper">
          <div
            class="fields__wrapper--item"
            v-for="(field, index) in slice.items"
            :key="'index' + index"
          >
            <label
              class="label"
              v-text="$prismic.asText(field.field_placeholder)"
            />
            <input v-if="field.type != 'textarea'"
              class="input"
              :type="field.type"
              value=""
              :name="$prismic.asText(field.field_title)"
              :placeholder="$prismic.asText(field.field_placeholder)"
              v-model="formFields[$prismic.asText(field.field_title)]"
            />
            <textarea v-if="field.type == 'textarea'"
              class="textarea"
              :name="$prismic.asText(field.field_title)"
              v-model="formFields[$prismic.asText(field.field_title)]"
            />

          </div>
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
        <div class="link__wrapper">
          <button
            class="link__wrapper--link"
            v-text="'Anfrage versenden'"
          />
          <img
            class="link__wrapper--icon"
            src="~assets/svg/arrow-right-white.svg"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import HeadlineComponent from "../custom/HeadlineComponent.vue";
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
  },
  components: {
    HeadlineComponent
  },
  data() {
    return {
      showErrorMessage: false,
      showSuccessMessage: false,
      fieldCounts: this.slice.items.length,
      initialFormFields: {}
    };
  },
  mounted(){
    // Set up initial form
    for (var i = this.slice.items.length - 1; i >= 0; i--) {
      var item = this.$prismic.asText(this.slice.items[i].field_title);
      this.initialFormFields[item] = {"value": "", "mandatory": this.slice.items[i].mandatory};
    }
  },
  methods: {
    checkFields(formFields) {
      this.showErrorMessage = false;

      // Push values to the initial form fields
      for (const [key, value] of Object.entries(this.formFields)) {
        this.initialFormFields[key]['value'] = value;
      }
      // check for correct values
      for (const [key, value] of Object.entries(this.initialFormFields)) {
        if(this.initialFormFields[key]['mandatory'] == true && this.initialFormFields[key]['value'] == ''){
          this.showErrorMessage = true;
        } 
      }

      if(!this.showErrorMessage){

       let myForm = document.getElementById(this.slice.primary.id);
        let formData = new FormData(myForm);
        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "multipart/form-data" },
          body: new URLSearchParams(formData).toString(),
        })
          .then(res => {
            this.showSuccessMessage = true;
            this.resetFields();
          })
          .catch((error) => alert(error));
      }
    },
    resetFields() {
      this.formFields = {};
    },
  },
};
</script>