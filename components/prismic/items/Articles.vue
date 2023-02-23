<template>
  <div :id="slice.primary.id" class="all-articles__wrapper">
    <headline-component :inputData="slice.primary.title" :className="'h2'" />
    <div class="all-articles__wrapper--categories">
      <div class="categories__wrapper">
        <a
          v-for="(category, key) in categories"
          :key="key"
          class="categories__wrapper--item"
          :class="{'active': activeCategory === category.id }"
          @click="selectCategory(category.id)"
        >
          <div v-text="$prismic.asText(category.data.title)" />
        </a>
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
    <div v-if="showLoadMoreButton" class="all-articles__wrapper--load-more">
      <button @click="loadMoreItems">Load more</button>
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
      activeCategory: '',
      categories: [],
      posts: [],
      currentPage: 1,
      pageSize: 20,
      showLoadMoreButton: false
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
    loadMoreItems() {
      this.pageSize = this.pageSize + 1;

      if (this.activeCategory === '') {
        this.$prismic.api.query(
        this.$prismic.predicates.at("document.type", "blog_post"),
        {
          orderings: "[my.blog_post.publish_date desc]",
					pageSize: this.pageSize * parseInt(this.currentPage),
        }
        ).then(res => {
          if (res.next_page) {
            this.showLoadMoreButton = true
          } else {
            this.showLoadMoreButton = false
          }
            this.posts = res.results
        });
      } else {
        this.$prismic.api.query(
        this.$prismic.predicates.at("document.type", "blog_post"),
        {
          orderings: "[my.blog_post.publish_date desc]",
					pageSize: this.pageSize * parseInt(this.currentPage),
        }
      ).then(res => {
        this.posts = res.results;
      })
      }
    },
    selectCategory(category) {
      this.currentPage = 1;
      this.pageSize = 20;

      if(this.activeCategory === category) {
        this.activeCategory = ''
      
        this.$prismic.api.query(
        this.$prismic.predicates.at("document.type", "blog_post"),
        {
          orderings: "[my.blog_post.publish_date desc]",
					pageSize: this.pageSize * parseInt(this.currentPage),
        }
      ).then(res => {
        this.posts = res.results;
      })
        return;
      }

      this.activeCategory = category

      this.$prismic.api.query(
				this.$prismic.predicates.at("my.blog_post.category", category),
				{
					pageSize: this.pageSize * parseInt(this.currentPage),
					orderings: "[my.blog_post.publish_date desc]",
				}
			).then(res => {
        this.posts = res.results;
      })
    },
  },
  async beforeMount() {
    try {
      const categories = await this.$prismic.api.query(
        this.$prismic.predicates.at("document.type", "blog_category")
      );

      await this.$prismic.api.query(
        this.$prismic.predicates.at("document.type", "blog_post"),
        {
          orderings: "[my.blog_post.publish_date desc]",
					pageSize: this.pageSize * parseInt(this.currentPage),
        }
      ).then(res => {
        if (res.next_page) {
          this.showLoadMoreButton = true
        }
         this.categories = categories.results;
          this.posts = res.results
      });
    } catch (e) {
      console.log(e);
    }
  },
};
</script>
