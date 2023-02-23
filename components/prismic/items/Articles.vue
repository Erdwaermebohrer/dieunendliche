<template>
  <div :id="slice.primary.id" class="all-articles__wrapper">
    <headline-component :inputData="slice.primary.title" :className="'h2'" />
    <div class="all-articles__wrapper--categories">
      <div class="categories__wrapper">
        <nuxt-link
          class="categories__wrapper--item"
          v-for="(category, key) in categories"
          :key="key"
          :to="$prismic.linkResolver(category, null, null, 1)"
        >
          <div v-text="$prismic.asText(category.data.title)" />
        </nuxt-link>
      </div>
    </div>
    <div class="all-articles__wrapper--posts">
      <div class="posts__wrapper">
        <div
          class="posts__wrapper--item"
          v-for="(post, key) in posts"
          :key="key"
        >
          <div class="image__wrapper">
            <a
              class="image__wrapper--item"
              :href="
                $prismic.linkResolver(
                  {
                    type: 'blog_post',
                    uid: post.uid,
                    isBroken: false,
                  },
                  post.data.category
                )
              "
            >
              <img v-lazy-load :data-src="post.data.image.url" :alt="post.data.image.alt">
            </a>
          </div>
          <div class="category__wrapper">
            <div
              class="category__wrapper--title"
              v-text="getCategory(post.data.category.uid)"
            />
            <div
              class="category__wrapper--date"
              v-text="$moment(post.data.publish_date).format('DD.MM.YYYY')"
            />
          </div>
          <div class="content__wrapper">
            <a
              class="content__wrapper--link"
              :href="
                $prismic.linkResolver(
                  {
                    type: 'blog_post',
                    uid: post.uid,
                    isBroken: false,
                  },
                  post.data.category
                )
              "
            >
              <div v-text="$prismic.asText(post.data.title)" class="h2 headline-title" />
            </a>
            <div
              class="content__wrapper--description"
              v-html="$prismic.asHtml(post.data.short_description)"
            />
            <div class="link-component__wrapper">
              <nuxt-link
                class="link-component__wrapper--link"
                :to="
                  $prismic.linkResolver(
                    {
                      type: 'blog_post',
                      uid: post.uid,
                      isBroken: false,
                    },
                    post.data.category
                  )
                "
              >
                <span>→</span>
                <span>{{ $prismic.asText(post.data.link_title) }}</span>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeadlineComponent from "../custom/HeadlineComponent.vue";
import LinkComponent from "../custom/LinkComponent.vue";

export default {
  props: {
    slice: {
      type: Object,
    },
  },
  components: {
    HeadlineComponent,
    LinkComponent,
  },
  data() {
    return {
      categories: [],
      posts: [],
    };
  },
  methods: {
    getCategory(slug) {
      var words = slug.split("-");

      for (var i = 0; i < words.length; i++) {
        var word = words[i];
        words[i] = word.charAt(0).toUpperCase() + word.slice(1);
      }

      return words.join(" ");
    },
  },
  async beforeMount() {
    try {
      const categories = await this.$prismic.api.query(
        this.$prismic.predicates.at("document.type", "blog_category")
      );

      const posts = await this.$prismic.api.query(
        this.$prismic.predicates.at("document.type", "blog_post"),
        {
          orderings: "[my.blog_post.publish_date desc]",
          pageSize: 1000
        }
      );

      this.categories = categories.results;
      this.posts = posts.results;
    } catch (e) {
      console.log(e);
    }
  },
};
</script>
