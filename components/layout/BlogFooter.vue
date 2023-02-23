<template>
      <div class="blog-footer__wrapper">
      <div class="blog-footer__wrapper--top">
        <div class="images__wrapper">
          <div class="images__wrapper--item">
            <img v-if="blog_images.image_left" v-lazy-load :data-src="blog_images.image_left.url" width="630" height="349" />
          </div>
          <div class="images__wrapper--item">
            <img v-if="blog_images.image_right" v-lazy-load :data-src="blog_images.image_right.url" width="630" height="349" />
          </div>
        </div>
      </div>
      <div class="blog-footer__wrapper--blocks">
        <div class="block__wrapper">
          <div
            class="block__wrapper--item"
            v-for="(item, key) in categories_blocks"
            :key="key"
          >
            <headline-component
              :inputData="item.primary.title"
              :className="'h2'"
            />

            <div class="link__wrapper">
              <div
                v-for="(element, index) in item.items"
                :key="'item-' + index"
              >
                <a
                  class="content__wrapper--link"
                  :href="
                    $prismic.linkResolver(
                      {
                        type: 'blog_post',
                        uid: element.article.blog_post.uid,
                        isBroken: false,
                      },
                      element.article.blog_post.data.category
                    )
                  "
                >
                  <span>→</span>
                  <div v-text="$prismic.asText(element.article.blog_post.data.title)" class="h2 headline-title link-item" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import HeadlineComponent from "../../components/prismic/custom/HeadlineComponent.vue";
import LinkComponent from "../../components/prismic/custom/LinkComponent.vue";

export default {
  components: {
    HeadlineComponent,
    LinkComponent
  },
  data() {
    return {
      blog_images: {},
      categories_blocks: []
    };
  },
  async fetch() {
    const blog_footer = await this.$prismic.api.getSingle("blog_footer");
    this.blog_images = blog_footer.data;
    

    const categoriesBlocks=JSON.parse(JSON.stringify(blog_footer.data.body));


    for(let i=0;i<categoriesBlocks.length;i++) {
      for(let j=0;j<categoriesBlocks[i].items.length;j++) {
        categoriesBlocks[i].items[j].article.blog_post = await this.$prismic.api.getByUID("blog_post", categoriesBlocks[i].items[j].article.uid);
      }
    }

    this.categories_blocks = categoriesBlocks;
  }
};
</script>
