<template>
<div>
  <div :id="slice.primary.id" class="choose-articles__wrapper">
    <div class="choose-articles__wrapper--top">
      <headline-component :inputData="slice.primary.title1" :className="'h2'" />
    </div>
    <div class="choose-articles__wrapper--bottom">
      <div class="posts__wrapper">
        <div
          class="posts__wrapper--item"
          v-for="(post, key) in allArticles"
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
              <img v-lazy-load :data-src="post.data.image.url" :alt="post.data.image.alt" />
            </a>
          </div>
          <div class="category__wrapper">
            <div
              class="category__wrapper--title"
              v-text="getCategory(post.data.category.uid)"
            />
            <div
              class="category__wrapper--date"
              v-text="$moment(post.last_publication_date).format('DD.MM.YYYY')"
            />
          </div>
          <div class="content__wrapper">
            <div v-text="$prismic.asText(post.data.title)" class="h2 headline-title" />
            <div
              class="content__wrapper--description"
              v-html="$prismic.asHtml(post.data.short_description)"
            />
            <div class="link-component__wrapper">
              <nuxt-link
                class="link-component__wrapper--link"
                :to="
                  $prismic.linkResolver({'type': 'blog_post', 'uid': post.uid, 'isBroken': false }, post.data.category)
                "
              >
                {{ $prismic.asText(post.data.link_title) }}
              </nuxt-link>
            </div>
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
    page: {
      type: Object,
    },
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
      allArticles: [],
      author: null
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
    const result = [];
    for (let i = 0; i < this.slice.items.length; i++) {
      const post = await this.$prismic.api.getByUID(
        "blog_post",
        this.slice.items[i].article.uid
      );
      result.push(post);
    }

    const id = this.page.data.author.id;
    this.author = await this.$prismic.api.getByID(id);
    this.allArticles = result;
  },
};
</script>
