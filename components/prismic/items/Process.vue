<template>
  <div class="process__wrapper">
   
    <div class="process__wrapper--content">
      <div class="content__wrapper">
        <div class="process__wrapper--title process__wrapper--title--mobile ">
          <h2 class="title" v-text="$prismic.asText(slice.primary.title)" />
        </div>
        <div class="process__wrapper__side">
          <div class="process__wrapper--title">
            <h2 class="title" v-text="$prismic.asText(slice.primary.title)" />
          </div>
          <div
            class="process__wrapper__side--item"
            v-for="(item, index) in slice.items"
            :key="'item-' + index"
            :data-index="index"
            ref="sticky-a"
          >
            <div :id="'item-left-' + index" class="item__left">
              <div class="item__left--number" v-text="index" />
              <div
                class="item__left--title"
                v-text="$prismic.asText(item.title)"
              />
            </div>
          </div>

          <div class="process__wrapper__faker">
            <div class="process__wrapper__faker__inner" ref="sticky-fake"></div>
          </div>
        </div>


        

        <div class="process__wrapper__content">
          <div
            class="process__content--item"
            v-for="(item, index) in slice.items"
            :key="'item-' + index"
            ref="sticky-div"
          >
            <div :id="'item-right-' + index" class="item__right">
              <div
                class="item__right--description"
                v-html="$prismic.asHtml(item.description)"
              />
            </div>
          </div>
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
      sections: {},
      sectionBefore: 0,
      windowWidth: 0
    };
  },
  beforeMount () {
    //this.sections = document.querySelectorAll('.slice-section > section');

    window.addEventListener('scroll', this.scrollDivs);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollDivs);
  },
  mounted(){
    console.log(this.$refs);
    var newscroll =  window.scrollY + 1;
    window.scrollTo(0,newscroll);

    this.$refs['sticky-fake'].innerHTML = this.$refs['sticky-div'][0].innerHTML;
     this.$refs['sticky-a'][0].classList.add('active');
  },
  methods: {
    scrollDivs () {
      // Your scroll handling here
      for (var i = this.$refs['sticky-div'].length - 1; i >= 0; i--) {
        if(this.$refs['sticky-div'][i].getBoundingClientRect().top >= -50 && this.$refs['sticky-div'][i].getBoundingClientRect().top < 50){
            
           var newSection = i;
            if(this.sectionBefore != newSection){
              this.sectionBefore = newSection;
              this.setNavActive(i,this.$refs['sticky-div'][i].innerHTML);
              
            }

        
        } else if(this.$refs['sticky-div'][i].getBoundingClientRect().top > 50 && this.$refs['sticky-div'][i].getBoundingClientRect().top < 150){
          var newSection = i-1;
          if(this.sectionBefore != newSection){
            this.sectionBefore = newSection;
            this.setNavActive(newSection,this.$refs['sticky-div'][i-1].innerHTML);
          }
        }
      }
    },
    setNavActive(index,html){
      for (var i = this.$refs['sticky-a'].length - 1; i >= 0; i--) {
        this.$refs['sticky-a'][i].classList.remove('active');

        if(this.$refs['sticky-a'][i].dataset.index == index){
          if(!this.$refs['sticky-a'][i].classList.contains('active')){
            this.$refs['sticky-a'][i].classList.add('active');
            this.$refs['sticky-fake'].innerHTML = html;

          }
        }
      }
    }
  }
 
};
</script>