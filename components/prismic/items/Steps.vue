<template>
  <div id="steps__wrapper" class="steps__wrapper">
    <div class="steps__wrapper--title">
      <h2 class="title" v-text="$prismic.asText(slice.primary.title1)" />
    </div>


    <div class="steps__wrapper--description">
      <div
        class="description"
        v-html="$prismic.asText(slice.primary.description)"
      />
    </div>

    <div class="curve-wrap">
      <div id="wrapper" class="steps__wrapper--content">
        <div id="step-0" class="step-item" />
        <div
          :id="'step-' + (index + 1)"
          class="step-item"
          :class="'step-' + (index + 1)"
          v-for="(item, index) in slice.items"
          :key="'step' + index"
        >
          <div class="step-item__wrapper">
            <div
              :id="'step-circle-' + (index + 1)"
              class="step-item__wrapper--circle"
            />
            <div class="step-item__wrapper--content">
              <div class="number" v-text="$prismic.asText(item.step)" />
              <div class="title" v-html="$newline($prismic.asText(item.step_title))" />
              <div
                class="description"
                v-html="$prismic.asText(item.step_description)"
              />
            </div>
          </div>
        </div>
      </div>

        <div class="curve--mobile">

          <svg 
            class="svg-bg"
            width="32" height="2551" viewBox="0 0 32 2551" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M31.2813 0.5V2534.84C31.2813 2538.99 29.7008 2542.98 26.8877 2545.91C24.0747 2548.85 20.2595 2550.5 16.2813 2550.5C12.303 2550.5 8.48756 2548.85 5.67451 2545.91C2.86146 2542.98 1.28125 2538.99 1.28125 2534.84V2530.74" stroke="#ffffff" stroke-miterlimit="10"/>
          </svg>

          <svg 
            class="svg-redline"
            width="32" height="2551" viewBox="0 0 32 2551" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              id="curve-line-color--mobile"
              d="M31.2813 0.5V2534.84C31.2813 2538.99 29.7008 2542.98 26.8877 2545.91C24.0747 2548.85 20.2595 2550.5 16.2813 2550.5C12.303 2550.5 8.48756 2548.85 5.67451 2545.91C2.86146 2542.98 1.28125 2538.99 1.28125 2534.84V2530.74" stroke="#E8543B" stroke-miterlimit="10"/>
          </svg>

           <svg
              class="arrow"
              width="38"
              height="22"
              viewBox="0 0 38 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="curve-arrow-color--mobile"
                d="M1.08008 20.7822L19.1245 2.29199L37.1821 20.7822"
                stroke="#ffffff"
                stroke-width="2"
                stroke-miterlimit="10"
              />
            </svg>
          
        </div>

        <div class="curve--desktop">

          <svg
            id="curve-svg"
            class="svg-bg"
            viewBox="0 0 1024 1257"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M496 1H814C869.475 1 922.677 23.0372 961.903 62.2635C1001.13 101.49 1023.17 154.692 1023.17 210.167C1023.17 265.641 1001.13 318.843 961.903 358.07C922.677 397.296 869.475 419.333 814 419.333H209.984C154.51 419.333 101.308 441.371 62.0812 480.597C22.8549 519.823 0.817749 573.025 0.817749 628.5C0.817749 683.974 22.8549 737.177 62.0812 776.403C101.308 815.629 154.51 837.667 209.984 837.667H814C869.475 837.667 922.677 859.704 961.903 898.93C1001.13 938.157 1023.17 991.359 1023.17 1046.83C1023.17 1102.31 1001.13 1155.51 961.903 1194.74C922.677 1233.96 869.475 1256 814 1256H209.984C154.51 1256 101.308 1233.96 62.0812 1194.74C22.8549 1155.51 0.817749 1102.31 0.817749 1046.83"
              stroke="#ffffff"
              stroke-miterlimit="10"
            />
          </svg>
          <svg
            viewBox="0 0 1024 1257"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="svg-redline"
          >
            <path
              id="curve-line-color"
              d="M496 1H814C869.475 1 922.677 23.0372 961.903 62.2635C1001.13 101.49 1023.17 154.692 1023.17 210.167C1023.17 265.641 1001.13 318.843 961.903 358.07C922.677 397.296 869.475 419.333 814 419.333H209.984C154.51 419.333 101.308 441.371 62.0812 480.597C22.8549 519.823 0.817749 573.025 0.817749 628.5C0.817749 683.974 22.8549 737.177 62.0812 776.403C101.308 815.629 154.51 837.667 209.984 837.667H814C869.475 837.667 922.677 859.704 961.903 898.93C1001.13 938.157 1023.17 991.359 1023.17 1046.83C1023.17 1102.31 1001.13 1155.51 961.903 1194.74C922.677 1233.96 869.475 1256 814 1256H209.984C154.51 1256 101.308 1233.96 62.0812 1194.74C22.8549 1155.51 0.817749 1102.31 0.817749 1046.83"
              stroke="#e8543b"
              stroke-miterlimit="15"
            />
          </svg>
            <svg
              class="arrow"
              width="38"
              height="22"
              viewBox="0 0 38 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="curve-arrow-color"
                d="M1.08008 20.7822L19.1245 2.29199L37.1821 20.7822"
                stroke="#ffffff"
                stroke-width="2"
                stroke-miterlimit="10"
              />
            </svg>
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
      windowWidth: 0,
      isMobile: false
    };
  },
  methods: {
    animateTimeline() {
      if (this.windowWidth > 991) {
        var curve_line = document.getElementById("curve-line-color");
        var arrow_line = document.getElementById("curve-arrow-color");

        var section = document.getElementById("steps__wrapper");

        var length = curve_line.getTotalLength();
        curve_line.style.strokeDasharray = length;

        var circle_1 = document.getElementById("step-circle-1");
        var circle_2 = document.getElementById("step-circle-2");
        var circle_3 = document.getElementById("step-circle-3");
        var circle_4 = document.getElementById("step-circle-4");
        var circle_5 = document.getElementById("step-circle-5");
        var circle_6 = document.getElementById("step-circle-6");
        var circle_7 = document.getElementById("step-circle-7");

        window.addEventListener("scroll", () => {
          if (this.windowWidth > 991) {
            var circle_1_percent = 0.017853500914010043;
            var circle_2_percent = 0.23676123073300592;
            var circle_3_percent = 0.3167283414299808;
            var circle_4_percent = 0.5246140075803968;
            var circle_5_percent = 0.4492523416088584;
            var circle_6_percent = 0.7427441565873063;
            var circle_7_percent = 0.8193618631020123;
          }

          var elementHeight = section.getBoundingClientRect().height;
          var elementTop = section.getBoundingClientRect().top;
          var scrollPercent = (elementTop / elementHeight) * - 1.7;
          curve_line.style.strokeDashoffset = length - scrollPercent * 5000;

          if (scrollPercent > circle_1_percent) {
            circle_1.style.backgroundColor = "#E8543B";
          } else {
            circle_1.style.backgroundColor = "#ffffff";
          }

          if (scrollPercent > circle_2_percent) {
            circle_2.style.backgroundColor = "#E8543B";
          } else {
            circle_2.style.backgroundColor = "#ffffff";
          }

          if (scrollPercent > circle_3_percent) {
            circle_3.style.backgroundColor = "#E8543B";
          } else {
            circle_3.style.backgroundColor = "#ffffff";
          }

          if (scrollPercent > circle_5_percent) {
            circle_4.style.backgroundColor = "#E8543B";
          } else {
            circle_4.style.backgroundColor = "#ffffff";
          }

          if (scrollPercent > circle_4_percent) {
            circle_5.style.backgroundColor = "#E8543B";
          } else {
            circle_5.style.backgroundColor = "#ffffff";
          }

          if (scrollPercent > circle_6_percent) {
            circle_6.style.backgroundColor = "#E8543B";
          } else {
            circle_6.style.backgroundColor = "#ffffff";
          }

          if (scrollPercent > circle_7_percent) {
            circle_7.style.backgroundColor = "#E8543B";
          } else {
            circle_7.style.backgroundColor = "#ffffff";
          }

          if (scrollPercent > 0.9) {
            arrow_line.style.stroke = "#E8543B";
          } else {
            arrow_line.style.stroke = "#ffffff";
          }
        });
      }
    },
    animateTimelineMobile() {
      if (this.windowWidth < 992) {
        var curve_line = document.getElementById("curve-line-color--mobile");
        var section = document.getElementById("steps__wrapper");
        var arrow_line = document.getElementById("curve-arrow-color--mobile");


        var length = curve_line.getTotalLength();
        curve_line.style.strokeDasharray = length;

        var circle_1 = document.getElementById("step-circle-1");
        var circle_2 = document.getElementById("step-circle-2");
        var circle_3 = document.getElementById("step-circle-3");
        var circle_4 = document.getElementById("step-circle-4");
        var circle_5 = document.getElementById("step-circle-5");
        var circle_6 = document.getElementById("step-circle-6");
        var circle_7 = document.getElementById("step-circle-7");

        window.addEventListener("scroll", () => {
          if (this.windowWidth < 992) {
            var circle_1_percent = 0.011853500914010043;
            var circle_2_percent = 0.2613179571663921;
            var circle_3_percent = 0.5542339373970345;
            var circle_4_percent = 0.81670510708401978;
            var circle_5_percent = 1.0113179571663922;
            var circle_6_percent = 1.2202471169686984;
            var circle_7_percent = 1.4325370675453049;
          } 

          var elementHeight = section.getBoundingClientRect().height;
          var elementTop = section.getBoundingClientRect().top;
          var scrollPercent = (elementTop / elementHeight) * - 1.7;

          curve_line.style.strokeDashoffset = length - scrollPercent * 1700;  

          if (scrollPercent > circle_1_percent) {
            circle_1.style.backgroundColor = "#E8543B";
          } else {
            circle_1.style.backgroundColor = "#ffffff";
          }

          if (scrollPercent > circle_2_percent) {
            circle_2.style.backgroundColor = "#E8543B";
          } else {
            circle_2.style.backgroundColor = "#ffffff";
          }

          if (scrollPercent > circle_3_percent) {
            circle_3.style.backgroundColor = "#E8543B";
          } else {
            circle_3.style.backgroundColor = "#ffffff";
          }

          if (scrollPercent > circle_4_percent) {
            circle_4.style.backgroundColor = "#E8543B";
          } else {
            circle_4.style.backgroundColor = "#ffffff";
          }

          if (scrollPercent > circle_5_percent) {
            circle_5.style.backgroundColor = "#E8543B";
          } else {
            circle_5.style.backgroundColor = "#ffffff";
          }

          if (scrollPercent > circle_6_percent) {
            circle_6.style.backgroundColor = "#E8543B";
          } else {
            circle_6.style.backgroundColor = "#ffffff";
          }

          if (scrollPercent > circle_7_percent) {
            circle_7.style.backgroundColor = "#E8543B";
          } else {
            circle_7.style.backgroundColor = "#ffffff";
          }

          if (scrollPercent > 1.52) {
            arrow_line.style.stroke = "#E8543B";
          } else {
            arrow_line.style.stroke = "#ffffff";
          }     

        });
      }
    },
    onResize() {
      this.windowWidth = window.innerWidth;
      this.animateTimelineMobile();
      this.animateTimeline();
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
      this.windowWidth = window.innerWidth;
    });

    this.windowWidth = window.innerWidth;

    this.animateTimelineMobile();
    this.animateTimeline();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>