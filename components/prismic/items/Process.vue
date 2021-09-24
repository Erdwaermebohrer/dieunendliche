<template>
  <div class="process__wrapper">
    <div class="process__wrapper--title">
      <h2 class="title" v-text="$prismic.asText(slice.primary.title)" />
    </div>
    <div class="process__wrapper--content">
      <div class="content__wrapper">
        <div
          class="content__wrapper--item"
          v-for="(item, index) in slice.items"
          :key="'item-' + index"
          v-elementshow
        >
          <div class="item__left">
            <div class="item__left--number" v-text="index" />
            <div
              class="item__left--title"
              v-text="$prismic.asText(item.title)"
            />
          </div>
          <transition name="fade">
            <div :id="'item-' + index" class="item__right">
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
import Vue from "vue";

Vue.directive("elementshow", {
  inViewport(el) {
    var rect = el.getBoundingClientRect();
    return !(rect.top -100 > rect.height - 100 );
  },

  bind(el, binding) {
    el.childNodes[2].classList.add("before-enter");
    el.$onScroll = function () {
      if (binding.def.inViewport(el)) {
        el.childNodes[0].classList.add("left-item");
        el.childNodes[0].childNodes[0].classList.add("left-number");
        el.childNodes[0].childNodes[2].classList.add("left-title");
        el.childNodes[2].classList.add("enter");
        el.childNodes[2].classList.remove("before-enter");
      } else {
        el.childNodes[0].classList.remove("left-item");
        el.childNodes[0].childNodes[0].classList.remove("left-number");
        el.childNodes[0].childNodes[2].classList.remove("left-title");
        el.childNodes[2].classList.add("before-enter");
        el.childNodes[2].classList.remove("enter");
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
});

export default {
  props: {
    slice: {
      type: Object,
    },
  },
  data() {
    return {
      activeItem: null,
    };
  },
};
</script>