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
    <svg
      id="curve-svg"
      viewBox="0 0 1024 1257"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="curve-line"
        d="M496 1H814C869.475 1 922.677 23.0372 961.903 62.2635C1001.13 101.49 1023.17 154.692 1023.17 210.167C1023.17 265.641 1001.13 318.843 961.903 358.07C922.677 397.296 869.475 419.333 814 419.333H209.984C154.51 419.333 101.308 441.371 62.0812 480.597C22.8549 519.823 0.817749 573.025 0.817749 628.5C0.817749 683.974 22.8549 737.177 62.0812 776.403C101.308 815.629 154.51 837.667 209.984 837.667H814C869.475 837.667 922.677 859.704 961.903 898.93C1001.13 938.157 1023.17 991.359 1023.17 1046.83C1023.17 1102.31 1001.13 1155.51 961.903 1194.74C922.677 1233.96 869.475 1256 814 1256H209.984C154.51 1256 101.308 1233.96 62.0812 1194.74C22.8549 1155.51 0.817749 1102.31 0.817749 1046.83"
        stroke="#ffffff"
        stroke-miterlimit="10"
      />
    </svg>
    <svg
      id="curve-svg"
      viewBox="0 0 1024 1257"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="curve-line-color"
        d="M496 1H814C869.475 1 922.677 23.0372 961.903 62.2635C1001.13 101.49 1023.17 154.692 1023.17 210.167C1023.17 265.641 1001.13 318.843 961.903 358.07C922.677 397.296 869.475 419.333 814 419.333H209.984C154.51 419.333 101.308 441.371 62.0812 480.597C22.8549 519.823 0.817749 573.025 0.817749 628.5C0.817749 683.974 22.8549 737.177 62.0812 776.403C101.308 815.629 154.51 837.667 209.984 837.667H814C869.475 837.667 922.677 859.704 961.903 898.93C1001.13 938.157 1023.17 991.359 1023.17 1046.83C1023.17 1102.31 1001.13 1155.51 961.903 1194.74C922.677 1233.96 869.475 1256 814 1256H209.984C154.51 1256 101.308 1233.96 62.0812 1194.74C22.8549 1155.51 0.817749 1102.31 0.817749 1046.83"
        stroke="#E8543B"
        stroke-miterlimit="15"
      />
    </svg>
    <svg
      id="curve-svg-mobile"
      width="42"
      height="2417"
      viewBox="0 0 32 1517"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="curve-line-mobile"
        d="M30.6501 0.5V1499.9C30.6501 1504.05 29.0683 1508.04 26.2528 1510.97C23.4373 1513.91 19.6188 1515.56 15.6371 1515.56C11.6554 1515.56 7.8366 1513.91 5.0211 1510.97C2.20561 1508.04 0.624023 1504.05 0.624023 1499.9V1495.8"
        stroke="#857373"
        stroke-miterlimit="10"
      />
    </svg>
    <svg
      id="curve-svg-mobile"
      width="42"
      height="2417"
      viewBox="0 0 32 1517"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="curve-line-mobile-color"
        d="M30.6501 0.5V1499.9C30.6501 1504.05 29.0683 1508.04 26.2528 1510.97C23.4373 1513.91 19.6188 1515.56 15.6371 1515.56C11.6554 1515.56 7.8366 1513.91 5.0211 1510.97C2.20561 1508.04 0.624023 1504.05 0.624023 1499.9V1495.8"
        stroke="#E8543B"
        stroke-miterlimit="10"
      />
    </svg>

    <div id="wrapper" class="steps__wrapper--content">
      <div id="step-0" class="step-item" />
      <div
        :id="'step-' + (index + 1)"
        class="step-item"
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
            <div class="title" v-text="$prismic.asText(item.step_title)" />
            <div
              class="description"
              v-text="$prismic.asText(item.step_description)"
            />
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
      windowWidth: 0,
      isMobile: false,
    };
  },
  methods: {
    swapChildElements() {
      var el1 = document.getElementById("wrapper");
      el1.childNodes[0].parentNode.insertBefore(
        el1.childNodes[2],
        el1.childNodes[0]
      );
    },
    animateTimeline() {
      var curve_line = document.getElementById("curve-line-color");
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

      var circle_1_percent = 0.017853500914010043;
      var circle_2_percent = 0.23676123073300592;
      var circle_3_percent = 0.3167283414299808;
      var circle_4_percent = 0.5246140075803968;
      var circle_5_percent = 0.4492523416088584;
      var circle_6_percent = 0.7427441565873063;
      var circle_7_percent = 0.8193618631020123;

      window.addEventListener("scroll", function () {
        var elementHeight = section.getBoundingClientRect().height;
        var elementTop = section.getBoundingClientRect().top;
        var scrollPercent = (elementTop / elementHeight) * -1.4;
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
      });
    },
    animateTimelineMobile() {
      if (this.isMobile) {
        var curve_line = document.getElementById("curve-line-mobile-color");
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

        var circle_1_percent = 0.011853500914010043;
        var circle_2_percent = 0.12676123073300592;
        var circle_3_percent = 0.2667283414299808;
        var circle_4_percent = 0.4046140075803968;
        var circle_5_percent = 0.5492523416088584;
        var circle_6_percent = 0.6827441565873063;
        var circle_7_percent = 0.8093618631020123;

        window.addEventListener("scroll", function () {
          var elementHeight = section.getBoundingClientRect().height;
          var elementTop = section.getBoundingClientRect().top;
          var scrollPercent = (elementTop / elementHeight) * -1.4;
          curve_line.style.strokeDashoffset = length - scrollPercent * 1700;

          // if (scrollPercent > circle_1_percent) {
          //   circle_1.style.backgroundColor = "#E8543B";
          // } else {
          //   circle_1.style.backgroundColor = "#857373";
          // }

          // if (scrollPercent > circle_2_percent) {
          //   circle_2.style.backgroundColor = "#E8543B";
          // } else {
          //   circle_2.style.backgroundColor = "#857373";
          // }

          // if (scrollPercent > circle_3_percent) {
          //   circle_3.style.backgroundColor = "#E8543B";
          // } else {
          //   circle_3.style.backgroundColor = "#857373";
          // }

          // if (scrollPercent > circle_4_percent) {
          //   circle_4.style.backgroundColor = "#E8543B";
          // } else {
          //   circle_4.style.backgroundColor = "#857373";
          // }

          // if (scrollPercent > circle_5_percent) {
          //   circle_5.style.backgroundColor = "#E8543B";
          // } else {
          //   circle_5.style.backgroundColor = "#857373";
          // }

          // if (scrollPercent > circle_6_percent) {
          //   circle_6.style.backgroundColor = "#E8543B";
          // } else {
          //   circle_6.style.backgroundColor = "#857373";
          // }

          // if (scrollPercent > circle_7_percent) {
          //   circle_7.style.backgroundColor = "#E8543B";
          // } else {
          //   circle_7.style.backgroundColor = "#857373";
          // }
        });
      }
    },
    onResize() {
      this.windowWidth = window.innerWidth;
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
      this.windowWidth = window.innerWidth;
    });

    this.animateTimelineMobile();
    this.animateTimeline();
    this.swapChildElements();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>