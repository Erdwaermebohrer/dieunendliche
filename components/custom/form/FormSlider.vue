<template>
	<div class="form-slider__wrapper">
		<swiper class="swiper" ref="formSwiper" :options="swiperOption">
			<swiper-slide v-for="(step, index) in steps" :key="index">
				<form
          novalidate
          id="multi-step-form"
					name="Multi Step Form"
					data-netlify="true"
          netlify
				>
					<form-step v-if="step" :step="step" @handle-click="nextSlide"/>
				</form>
			</swiper-slide>
			<div class="swiper-pagination" slot="pagination"></div>
		</swiper>
		<!-- {{ currentIndex }} -->
		<button v-if="buttonPrevLabel.length > 0" @click="prevSlide">
			{{ $prismic.asText(buttonPrevLabel) }}
		</button>
		<button v-if="buttonNextLabel.length > 0" @click="nextSlide">
			{{ $prismic.asText(buttonNextLabel) }}
		</button>
    {{ multiForm}}
	</div>
</template>
<script>
import { mapFields } from "../../../store/index";
import "swiper/dist/css/swiper.css";
import FormStep from "@/components/custom/form/FormStep.vue";
export default {
	name: "FormSlider",
	props: {
		steps: {
			type: Array
		}
	},
	components: {
		FormStep
	},
	computed: {
    ...mapFields(["multiForm"]),
		buttonPrevLabel() {
			if (this.steps[this.currentIndex]) {
				return this.steps[this.currentIndex].primary.button_label_back;
			} else {
				return null;
			}
		},
		buttonNextLabel() {
			if (this.steps[this.currentIndex]) {
				return this.steps[this.currentIndex].primary.button_label_next;
			} else {
				return null;
			}
		},
		swiper() {
			if (this.$refs.formSwiper) {
				return this.$refs.formSwiper.swiper;
			} else {
				return null;
			}
		}
	},
	data() {
		return {
			currentIndex: 0,
			swiperOption: {
				allowTouchMove: false,
				autoHeight: true,
				pagination: {
					el: ".swiper-pagination",
					type: "progressbar"
				},
				simulateTouch: false,
				slidesPerView: 1,
				spaceBetween: 25,
				speed: 700
			}
		};
	},
	methods: {
		nextSlide() {
			if (this.currentIndex < this.steps.length - 1) {
				this.currentIndex += 1;
				this.swiper.slideNext();
			} else {
				alert("Submit");
			}
		},
		prevSlide() {
			if (this.currentIndex > 0) {
				this.currentIndex -= 1;
				this.swiper.slidePrev();
			}
		}
	}
};
</script>