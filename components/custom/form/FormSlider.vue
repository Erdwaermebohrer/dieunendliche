<template>
	<swiper class="swiper" :options="swiperOption">
		<swiper-slide>Slide 1</swiper-slide>
		<swiper-slide>Slide 2</swiper-slide>
		<swiper-slide>Slide 3</swiper-slide>
		<swiper-slide>Slide 4</swiper-slide>
		<swiper-slide>Slide 5</swiper-slide>
		<div class="swiper-pagination" slot="pagination"></div>
		<div class="swiper-button-prev" slot="button-prev"></div>
		<div class="swiper-button-next" slot="button-next"></div>
	</swiper>
</template>
<script>
import 'swiper/dist/css/swiper.css'

export default {
	name: "swiper-example-pagination-progress",
	title: "Progress pagination",
	data() {
		return {
			swiperOption: {
				pagination: {
					el: ".swiper-pagination",
					type: "progressbar"
				},
				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev"
				}
			}
		};
	}
};
</script>