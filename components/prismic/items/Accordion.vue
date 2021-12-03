<template>
  <div
    class="accordion__wrapper"
    
  >
    <h2
      class="accordion__wrapper--title"
      v-text="$prismic.asText(slice.primary.title)"
    />
    <ul class="accordion__wrapper--list" >
      <li
        class="list-item list-item--spacer"
        v-view="listInView"
        :style="'background-color:' + slice.primary.color" />
      <li
        class="list-item"
        v-for="(item, index) in slice.items"
        :key="'list-item-' + index"
        @click="selectItemIndex(index)"
        v-view="listInView"
        :style="'background-color:' + slice.primary.color"
      >
        <div class="list-item__title" v-text="$prismic.asText(item.title)" />
        <a
          class="list-item__icon"
          v-text="index === selectedItemIndex ? '-' : '+'"
        />
        <transition
          name="accordion"
          @before-enter="beforeEnter"
          @enter="enter"
          @before-leave="beforeLeave"
          @leave="leave"
        >
          <div
            v-if="index === selectedItemIndex"
            class="list-item__description"
            v-text="$prismic.asText(item.description)"
          />
        </transition>
      </li>
    </ul>
  </div>
</template>

<script>
import { gsap } from "gsap/dist/gsap";
import checkView from "vue-check-view";
import Vue from "vue";

Vue.use(checkView);

export default {
  props: {
    slice: {
      type: Object,
    },
  },
  data() {
    return {
      selectedItemIndex: null,
    };
  },
  methods: {
    beforeEnter(el) {
      el.style.height = "0";
      el.style.marginTop = "20px";
    },
    enter(el) {
      el.style.height = el.scrollHeight + "px";
      el.style.marginTop = "20px";
    },
    beforeLeave(el) {
      el.style.height = el.scrollHeight + "px";
      el.style.marginTop = "0px";
    },
    leave(el) {
      el.style.height = "0";
      el.style.marginTop = "0px";
    },
    listInView(e) {
      var opac = 0;
      if(e.percentCenter > 0.3 && e.percentCenter < 0.7){
        if(!e.target.element.classList.contains('active')){
          e.target.element.classList.add('active');
        }
      } else{
        if(e.target.element.classList.contains('active')){
          e.target.element.classList.remove('active');
        }
      }
      
      // if (e.percentInView > 0) {
      //   gsap.to(e.target.element, {
      //     duration: 0.05,
      //     ease: "power3.out",
      //     opacity: opac,
      //   });
      // } else {
      //   e.target.element.style.opacity = 0;
      // }
    },
    selectItemIndex(index) {
      this.selectedItemIndex === index
        ? (this.selectedItemIndex = null)
        : (this.selectedItemIndex = index);
    },
  },
};
</script>