<template>
  <div class="form-fields__wrapper">
    <div class="form-fields__wrapper--title">
      <h2 class="title" v-text="$prismic.asText(slice.primary.title1)" />
    </div>
    {{initialFormFields}}
    <form class="form-fields__wrapper--content"
      name="Contact form Unendliche"
      id="form"
      data-netlify="true"
      v-on:submit.prevent="checkFields(formFields)">
      <input type="hidden" name="form-name" value="Contact form Unendliche" />
      <div class="fields__wrapper">
        <div
          class="fields__wrapper--item"
          v-for="(field, index) in slice.items"
          :key="'index' + index"
        >
          <input v-if="field.type != 'textarea'"
            class="input"
            :type="field.type"
            value=""
            :name="$prismic.asText(field.field_title)"
            v-model="formFields[$prismic.asText(field.field_title)]"
          />
          <textarea v-if="field.type == 'textarea'"
            class="textarea"
            :name="$prismic.asText(field.field_title)"
            v-model="formFields[$prismic.asText(field.field_title)]"
          />
          <label
            class="label"
            v-text="$prismic.asText(field.field_placeholder)"
          />
        </div>

        <div class="fields__wrapper--item" >
          <label class="checkbox">
            <span class="checkbox__box" :class="{'active': formFields['terms']}">
              <input
                class="input"
                type="checkbox"
                v-model="formFields['terms']"
              />
            </span>

            <div v-html="$prismic.asHtml(slice.primary.terms)" />
          </label>
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
        <img
          class="link__wrapper--icon"
          src="~assets/svg/arrow-right-white.svg"
        />
        <button
          class="link__wrapper--link"
          v-text="$prismic.asText(slice.primary.link_title)"
        />
      </div>
    </form>
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
    this.initialFormFields['terms']= {"value": false, "mandatory": true};
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

        // Create final form data
        var formData = new FormData;

        for (const [key, value] of Object.entries(this.initialFormFields)) {
          if(this.initialFormFields[key]['value'] != ''){
            console.log(this.initialFormFields[key]['value'] );
            formData.append(key, this.initialFormFields[key]['value']);
          } else{
            formData.append(key, '–');
          }
          
        }
        
        let myForm = document.getElementById("form");
        let formDatatw = new FormData(myForm);
        console.log(formDatatw);
        console.log(new URLSearchParams(formDatatw).toString());
        //send form data
        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(formDatatw).toString(),
        })
        .then(res => {
          console.log(res);
          this.showSuccessMessage = true;
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