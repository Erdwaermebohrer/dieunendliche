<template>
  <div class="accordion__wrapper" :style="'background-color:' + slice.primary.color">
    <h2 class="accordion__wrapper--title" v-text="$prismic.asText(slice.primary.title)" />
    <ul class="accordion__wrapper--list">
      <li class="list-item" v-for="(item, index) in slice.items" :key="'list-item-' + index">
        <div class="list-item__title" v-text="$prismic.asText(item.title)" />
        <a class="list-item__icon" v-text="index === selectedItemIndex ? '-' : '+'" @click="selectItemIndex(index)" />
        <transition name="accordion-item" mode="out-in">
          <div v-if="index === selectedItemIndex" class="list-item__description" v-text="$prismic.asText(item.description)"/>
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
    }
  },
  data() {
    return {
      selectedItemIndex: null
    }
  },
  methods: {
    selectItemIndex(index) {
      this.selectedItemIndex === index ? this.selectedItemIndex = null : this.selectedItemIndex = index;      
    }
  }
};
</script>