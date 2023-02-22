<template>
  <div class="link-component__wrapper">
    <a
      v-if="linkObject.link.link_type === 'Web' && !linkObject.link_calendar"
      class="link-component__wrapper--link"
      :href="linkObject.link.url"
      target="_blank"
      :id="'nelly_btn_'+ linkObject.link.id"
    >
      {{ $prismic.asText(linkObject.link_title) }}
    </a>

    <nuxt-link
      v-if="
        linkObject.link.link_type === 'Document' && !linkObject.link_calendar && !linkObject.category
      "
      class="link-component__wrapper--link"
      :to="$prismic.linkResolver(linkObject.link, null, linkObject.scroll_id)"
      :id="'nelly_btn_'+ linkObject.link.id"
    >
      {{ $prismic.asText(linkObject.link_title) }}
    </nuxt-link>
    <nuxt-link
      v-if="
        linkObject.link.link_type === 'Document' && linkObject.category
      "
      class="link-component__wrapper--link"
      :to="$prismic.linkResolver(linkObject.link, linkObject.category)"
      :id="'nelly_btn_'+ linkObject.link.id"
    >
      {{ $prismic.asText(linkObject.link_title) }}
    </nuxt-link>
    <a
      v-if="linkObject.link_calendar && !linkObject.category"
      class="link-component__wrapper--link"
      @click="openCalendar(linkObject.link_calendar)"
      :id="'nelly_btn_'+ calendarClickId"
    >
      {{ $prismic.asText(this.linkObject.link_title) }}
    </a>
  </div>
</template>
<script>
export default {
  props: {
    linkObject: {
      type: Object,
    },
  },
  data() {
    return {
      calendarClickId: ''
    };
  },
  mounted(){
    var page = 'homepage';
    if(this.linkObject.id){
      if(this.$nuxt.$route.path != '/'){
        page = this.$nuxt.$route.path.replaceAll('/', '_');

      }
      this.calendarClickId = page +'_'+ this.linkObject.id +'_'+ this.$prismic.asText(this.linkObject.link_title);
    } else{
      this.calendarClickId = page +'_'+ this.$prismic.asText(this.linkObject.link_title);
    }
    if(this.linkObject.dropdown_menu){
      this.calendarClickId = 'header_'+ this.$prismic.asText(this.linkObject.link_title);
    }


    this.calendarClickId = this.calendarClickId.replaceAll(' ', '_').toLowerCase();
  },
  methods: {
    openCalendar(url) {
      this.$store.commit("setBookingLink", url);
      this.$store.commit("setBooking", true);
    },
  },
};
</script>
