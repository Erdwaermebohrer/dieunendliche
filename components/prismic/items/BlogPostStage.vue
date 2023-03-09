<template>
  <div :id="slice.primary.id" class="blog-post-stage__wrapper">
    <div class="blog-post-stage__wrapper--back-button">
      <nuxt-link
        class="link"
        :to="$prismic.linkResolver(link1)"
        v-text="'← Zurück zur Übersicht'"
      />
    </div>
    <headline-component :inputData="slice.primary.title1" :className="['h3', currentResolution < 900 ? 'hyphens' : '']" />
    <div class="blog-post-stage__wrapper--content">
      <div
        v-if="page.data.category.uid"
        class="blog-author-title"
        v-text="getCategory(page.data.category.uid)"
      />
      <div
        class="blog-author-date"
        v-text="$moment(page.data.publish_date).format('DD.MM.YYYY')"
      />
      <div
        v-if="page && author"
        class="blog-author-author"
        v-text="$prismic.asText(author.data.name)"
      />
    </div>
  </div>
</template>

<script>
import HeadlineComponent from "../custom/HeadlineComponent.vue";

export default {
  props: {
    page: {
      type: Object,
    },
    slice: {
      type: Object,
    },
  },
  components: {
    HeadlineComponent,
  },
  watch: {
		currentResolution(resolution) {
			this.currentResolution = resolution;
		},
  },
  data() {
    return {
      currentResolution: 0,
      author: null,
      lang: null,
      link1: {
        isBroken: false,
        link_type: "Document",
        lang: 'de-de',
        slug: 'blog',
        type: 'blog',
        uid: 'blog'
      }
    };
  },
  methods: {
    getCurrentResolution() {
			this.currentResolution = window.innerWidth;
		},
    getCategory(slug) {
      var words = slug.split("-");

      for (var i = 0; i < words.length; i++) {
        var word = words[i];
        words[i] = word.charAt(0).toUpperCase() + word.slice(1);
      }

      return words.join(" ");
    },
  },
  async fetch() {
    var id = this.page.data.author.id;

    try {
      const result = await this.$prismic.api.getByID(id);
      this.author = result;
    } catch (e) {
      console.log(e);
    }
  },
  beforeMount() {
		this.$nextTick(() => {
			window.addEventListener("load", this.getCurrentResolution);
			window.addEventListener("resize", this.getCurrentResolution);
		});
	},
	beforeDestroy() {
		window.removeEventListener("resize", this.getCurrentResolution);
		window.removeEventListener("load", this.getCurrentResolution);
	},
};
</script>
