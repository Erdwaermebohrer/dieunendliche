<template>
  <div class="process__wrapper">
    <div class="process__wrapper--title">
      <h2 class="title" v-text="$prismic.asText(slice.primary.title)" />
    </div>
    <div class="process__wrapper--content">
      <div v-elementshow id="scroller" class="scroller" />
      <div class="content__wrapper">
        <div
          class="content__wrapper--item"
          v-for="(item, index) in slice.items"
          :key="'item-' + index"
        >
          <div :id="'item-left-' + index" class="item__left">
            <div class="item__left--number" v-text="index" />
            <div
              class="item__left--title"
              v-text="$prismic.asText(item.title)"
            />
          </div>
          <transition name="fade">
            <div :id="'item-right-' + index" class="item__right">
              <div
                class="item__right--description"
                v-text="$prismic.asText(item.description)"
              />
            </div>
          </transition>
        </div>
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
  },
  directives: {
    elementshow: {
      inViewport(el) {
        var rect = el.getBoundingClientRect();
        return !(rect.top > rect.height);
      },
      bind(el, binding, vnode) {
        el.$onScroll = function () {
          if (binding.def.inViewport(el)) {
            var top = el.getBoundingClientRect().top * -1;
            var page = document.getElementById("page");

            if (this.windowWidth > 991) {
              if (
                top > -700 &&
                top <
                  vnode.context.numberOfElements *
                    vnode.context.scrollPartHeight
              ) {
                page.style.overflow = "visible";
              } else {
                page.style.overflow = "hidden";
              }
            } else {
              page.style.overflow = "hidden";
            }

            for (let i = 0; i < vnode.context.numberOfElements; i++) {
              this["item_l_" + i] = document.getElementById("item-left-" + i);
              this["item_r_" + i] = document.getElementById("item-right-" + i);
            }

            for (let i = 0; i < vnode.context.numberOfElements; i++) {
              if (
                top > i * vnode.context.scrollPartHeight &&
                top < (i + 1) * vnode.context.scrollPartHeight
              ) {
                this["item_l_" + i].classList.add("left-item");
                this["item_l_" + i].childNodes[0].classList.add("left-number");
                this["item_l_" + i].childNodes[2].classList.add("left-title");
                this["item_r_" + i].classList.add("enter");
              } else {
                this["item_l_" + i].classList.remove("left-item");
                this["item_l_" + i].childNodes[0].classList.remove(
                  "left-number"
                );
                this["item_l_" + i].childNodes[2].classList.remove(
                  "left-title"
                );
                this["item_r_" + i].classList.remove("enter");
              }
            }
          }
        };
        document.addEventListener("scroll", el.$onScroll);
      },
      inserted(el, binding) {
        el.$onScroll();
      },
      unbind(el, binding) {
        document.removeEventListener("scroll", el.$onScroll);
        delete el.$onScroll;
      },
    },
  },
  watch: {
    windowWidth: {
      handler(newValue) {
        newValue <= 760 ? (this.isMobile = true) : (this.isMobile = false);
        this.windowWidth = newValue;
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      isMobile: false,
      numberOfElements: null,
      scrollPartHeight: 400,
      windowWidth: 0,
    };
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    setNumberOfElementsOnScroller() {
      this.numberOfElements = this.slice.items.length;
    },
    setScrollerHeight() {
      if (this.windowWidth > 1000) {
        document.getElementById("scroller").style.height =
          this.numberOfElements * this.scrollPartHeight + "px";
      } else {
        this.scrollPartHeight = 100;
        document.getElementById("scroller").style.height =
          this.numberOfElements * this.scrollPartHeight + "px";
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
      this.windowWidth = window.innerWidth;
    });
    this.setNumberOfElementsOnScroller();
    this.setScrollerHeight();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>