<template>
  <div
    class="accordion__wrapper"
    :style="'background-color:' + slice.primary.color"
  >
    <h2
      class="accordion__wrapper--title"
      v-text="$prismic.asText(slice.primary.title)"
    />
    <ul class="accordion__wrapper--list">
      <li
        class="list-item"
        v-for="(item, index) in slice.items"
        :key="'list-item-' + index"
        @click="selectItemIndex(index)"
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
    selectItemIndex(index) {
      this.selectedItemIndex === index
        ? (this.selectedItemIndex = null)
        : (this.selectedItemIndex = index);
    },
  },
};
</script>