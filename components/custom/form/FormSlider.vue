<template>
	<div class="form-slider__wrapper">
		<swiper
			v-show="showSlider"
			class="swiper"
			ref="formSwiper"
			:options="swiperOption"
		>
			<swiper-slide v-for="(step, index) in steps" :key="index">
				<form
					novalidate
					id="multi-step-form"
					name="Multi Step Form"
					data-netlify="true"
					netlify
				>
					<input type="hidden" name="form-name" value="Multi Step Form" />
					<form-step v-if="step" :formFields="formFields" :step="step">
            <template v-slot:fields>
						<div v-show="currentIndex === 0">
							<div
								class="block-title"
								v-text="$prismic.asText(step.primary.block_title)"
							/>
							<div class="fields__wrapper">
								<div
									class="fields__wrapper--item"
									v-for="(value, key) in step.items"
									:key="key"
									v-show="key < 5"
									@click="nextSlide(value.field_id, value.field_placeholder)"
								>
									<input
										type="text"
										v-if="value.field_type === 'radio'"
										class="selector-field"
										:class="{
											'selector-active':
												value.field_placeholder === formFields[value.field_id],
										}"
										:name="value.field_id"
										:placeholder="value.field_placeholder"
										disabled
									/>
								</div>
							</div>
							<div class="fields__wrapper">
								<div
									class="fields__wrapper--item"
									v-for="(value, key) in step.items"
									:key="key"
									v-show="key > 4"
									@click="nextSlide(value.field_id, value.field_placeholder)"
								>
									<input
										type="text"
										v-if="value.field_type === 'radio'"
										class="selector-field"
										:class="{
											'selector-active':
												value.field_placeholder === formFields[value.field_id],
										}"
										:name="value.field_id"
										:placeholder="value.field_placeholder"
										disabled
									/>
								</div>
							</div>
						</div>
						<div v-show="currentIndex === 1">
							<div class="fields__wrapper">
								<div
									class="block-title"
									v-text="$prismic.asText(inputData.block_title_a)"
								/>
								<div
									class="fields__wrapper--item"
									v-for="(value, key) in inputData.step_2_repeatable_a"
									:key="key"
									@click="selectItem(value.field_id, value.field_placeholder)"
								>
									<input
										type="text"
										v-if="value.field_type === 'radio'"
										class="selector-field"
										:class="{
											'selector-active':
												value.field_placeholder === formFields[value.field_id],
										}"
										:name="value.field_id"
										:placeholder="value.field_placeholder"
										disabled
									/>
								</div>
							</div>
							<div class="fields__wrapper">
								<div
									class="block-title"
									v-text="$prismic.asText(inputData.block_title_b)"
								/>
								<div
									class="fields__wrapper--item"
									v-for="(value, key) in inputData.step_2_repeatable_b"
									:key="key"
									@click="selectItem(value.field_id, value.field_placeholder)"
								>
									<input
										type="text"
										v-if="value.field_type === 'radio'"
										class="selector-field"
										:class="{
											'selector-active':
												value.field_placeholder === formFields[value.field_id],
										}"
										:name="value.field_id"
										:placeholder="value.field_placeholder"
										disabled
									/>
								</div>
							</div>
							<div class="fields__wrapper">
								<div
									class="block-title"
									v-text="$prismic.asText(step.primary.block_title)"
								/>
								<div
									v-for="(value, key) in step.items"
									:key="key"
									class="fields__wrapper--item"
								>
									<input
                    type="text"
                    class="input"
										v-model="formFields[value.field_placeholder]"
										:name="value.value.field_placeholder"
										:placeholder="value.field_placeholder"
										@input="validationFields[currentIndex].input = true"
									/>
								</div>
							</div>
						</div>
						<div v-show="currentIndex === 2">
							<div class="fields__wrapper horizontal">
								<div
									class="fields__wrapper--item"
									v-for="(value, key) in step.items"
									:key="key"
									@click="nextSlide(value.field_id, value.field_placeholder)"
								>
									<input
										type="text"
										v-if="value.field_type === 'radio'"
										class="selector-field"
										:class="{
											'selector-active':
												value.field_placeholder === formFields[value.field_id],
										}"
										:name="value.field_id"
										:placeholder="value.field_placeholder"
										disabled
									/>
								</div>
							</div>
						</div>
						<div v-show="currentIndex === 3">
							<div class="fields__wrapper horizontal">
								<div
									v-for="(value, key) in step.items"
									:key="key"
									class="fields__wrapper--item"
								>
									<label
										v-if="
											value.field_type === 'text' ||
											value.field_type === 'number' ||
											value.field_type === 'email' ||
											value.field_type === 'textarea' ||
											value.field_type === 'file'
										"
										:for="value.field_placeholder"
										v-text="value.field_placeholder + '*'"
									>
									</label>
									<input
										v-if="value.field_type === 'file'"
										:type="value.field_type"
										ref="file"
										accept="application/pdf"
										v-on:change="validateSize"
										max-size="20"
										name="cv"
										placeholder=""
									/>
									<input
										v-if="
											value.field_type === 'text' ||
											value.field_type === 'number' ||
											value.field_type === 'email'
										"
										@paste.prevent
										v-model="formFields[value.field_id]"
										:name="value.field_id"
										:placeholder="value.field_placeholder"
										class="input"
										:type="value.field_type"
									/>
									<textarea
										v-if="value.field_type === 'textarea'"
										@paste.prevent
										v-model="formFields[value.field_placeholder]"
										:name="value.field_placeholder"
										:placeholder="value.field_placeholder"
										class="input"
										:type="value.field_type"
										@input="validationFields[currentIndex].input = true"
									/>
								</div>
							</div>
						</div>
						<div v-show="currentIndex === 4">
							<div class="fields__wrapper horizontal">
								<div
									v-for="(value, key) in step.items"
									:key="key"
									class="fields__wrapper--item"
								>
									<label
										v-if="
											value.field_type === 'text' ||
											value.field_type === 'number' ||
											value.field_type === 'email'
										"
										:for="value.field_label"
										v-text="value.field_label"
									>
									</label>
									<input
										v-if="
											value.field_type === 'text' ||
											value.field_type === 'number' ||
											value.field_type === 'email'
										"
										@paste.prevent
										v-model="formFields[value.field_id]"
										:name="value.field_id"
										:placeholder="value.field_placeholder"
										class="input"
										:type="value.field_type"
										@input="
											validationFields[currentIndex][value.field_label] = true
										"
									/>
								</div>
							</div>
						</div>
            </template>
					</form-step>
				</form>
			</swiper-slide>
			<div class="swiper-pagination" slot="pagination"></div>
		</swiper>
		<div class="pagination__wrapper">
			<button
				v-if="buttonPrevLabel && buttonPrevLabel.length > 0"
				@click="prevSlide"
			>
				<span>{{ $prismic.asText(buttonPrevLabel) }}</span>
			</button>
			<button
				v-if="buttonNextLabel && buttonNextLabel.length > 0"
				@click="handleNextSlide"
			>
				<span>{{ $prismic.asText(buttonNextLabel) }}</span>
			</button>
		</div>
		<div v-if="!isStepValidated" class="pagination__wrapper">
			Warning Message
		</div>
	</div>
</template>
<script>
import "swiper/dist/css/swiper.css";
import FormStep from "@/components/custom/form/FormStep.vue";
export default {
	name: "FormSlider",
	props: {
		inputData: {
			type: Object
		},
		steps: {
			type: Array
		}
	},
	components: {
		FormStep
	},
	computed: {
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
		isStepValidated() {
			if (this.currentIndex === 1) {
				if (
					!this.validationFields[this.currentIndex].Gebäudetyp ||
					!this.validationFields[this.currentIndex].Bauvorhaben ||
					!this.validationFields[this.currentIndex].input
				) {
					return false;
				}
			}
			if (this.currentIndex === 3) {
				if (!this.validationFields[this.currentIndex].input) {
					return false;
				}
			}
			if (this.currentIndex === 4) {
				if (
					!this.validationFields[this.currentIndex].Name ||
					!this.validationFields[this.currentIndex].Telefonnummer ||
					!this.validationFields[this.currentIndex].Email
				) {
					return false;
				}
			}
			return true;
		}
	},
	data() {
		return {
			currentIndex: 0,
			formFields: {},
			showSlider: true,
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
			},
			validationFields: {
				1: {
					Gebäudetyp: false,
					Bauvorhaben: false,
					input: false
				},
				3: {
					file: true,
					input: false
				},
				4: {
					Name: false,
					Telefonnummer: false,
					Email: false
				}
			}
		};
	},
	methods: {
		prevSlide() {
			if (this.currentIndex > 0) {
				this.currentIndex -= 1;
				this.$refs.formSwiper.swiper.slidePrev();
			}
		},
		handleNextSlide() {
			if (!this.isStepValidated) {
				return;
			}

			if (this.currentIndex < this.steps.length - 1) {
				this.currentIndex += 1;
				this.$refs.formSwiper.swiper.slideNext();
			} else {
				fetch("/", {
					method: "POST",
					headers: { "Content-Type": "application/x-www-form-urlencoded" },
					body: this.encode({
						"form-name": "Multi Step Form",
						...this.formFields
					})
				})
					.then(() => {
						this.formFields = {};
					})
					.catch(error => alert(error));
			}
		},
		encode(data) {
			return Object.keys(data)
				.map(
					key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
				)
				.join("&");
		},
		nextSlide(field_id, value) {
			this.formFields[field_id] = value;

			if (this.currentIndex < this.steps.length - 1) {
				this.currentIndex += 1;
				this.$refs.formSwiper.swiper.slideNext();
			}
		},
		selectItem(field_id, value) {
			this.formFields[field_id] = value;

			if (this.currentIndex === 1) {
				this.showSlider = false;
				this.validationFields[this.currentIndex][field_id] = true;
				this.$nextTick(() => {
					this.showSlider = true;
				});
			}
		},
		validateSize(e) {
			// if(this.$refs['file'].files[0].size > 1000000){
			//    alert("File is too big – Max 1 MB");
			//    this.$refs['file'].value = "";
			// };
		},
		formSubmit(e) {
			let myForm = document.getElementById("multi-step-form");
			let formData = new FormData(myForm);
			console.log(e.target);
			fetch("/", {
				body: new FormData(e.target),
				method: "POST"
			})
				.then(res => {
					console.log(res);
					this.formSuccess = true;
				})
				.catch(error => alert(error));
		}
	}
};
</script>
<style lang="scss">
.swiper-pagination-progressbar .swiper-pagination-progressbar-fill {
	background: #618787;
}

.block-title {
	position: absolute;
	top: 0;
	font-size: 14px;
	line-height: 17px;
	letter-spacing: 0.05em;
	font-weight: 600;
	text-transform: uppercase;
	color: #857373;
}

.fields__wrapper {
	margin: 20px 70px 0 0;

	&--item {
		width: 15vw;
		height: 47px;
		margin: 10px 0;

		.input {
			width: 100%;
			height: 150px;
			padding: 0;
			margin: 0;
			text-align: center;
			background: transparent;
			border: 1px solid #857373;
			transition: 0.4s all ease-in;
			color: #857373;
			font-size: 22px;
			font-weight: 500;

			&::placeholder {
				transition: 0.4s all ease-in;
				font-size: 22px;
				font-weight: 500;
				opacity: 0.5;
			}

			&:focus,
			&:active {
				outline: none;
			}
		}

		.selector-field {
			width: 100%;
			height: 100%;
			padding: 0;
			padding-top: 7px;
			margin: 0;
			text-align: center;
			background: transparent;
			border: 1px solid #857373;
			cursor: pointer !important;
			transition: 0.4s all ease-in;

			&:hover {
				background: #857373;

				&::placeholder {
					color: white;
					opacity: 1; /* Firefox */
				}
			}

			&::placeholder {
				transition: 0.4s all ease-in;
				font-size: 22px;
				font-weight: 500;
			}

			&:focus,
			&:active {
				outline: none;
			}
		}

		.selector-active {
			background: #857373 !important;
			color: white;

			&::placeholder {
				color: white;
				opacity: 1; /* Firefox */
			}
		}
	}
}

.horizontal {
	display: flex;

	.fields__wrapper--item {
		margin-right: 70px;
		width: 12vw;
	}
}

.pagination__wrapper {
	width: 100%;
	display: flex;
	justify-content: space-between;

	button {
		background: none;
		outline: none;
		border: none;
		cursor: pointer;
		transition: 0.4s all ease-in;

		span {
			position: relative;
			color: #9cadbd;
			transition: 0.4s all ease-in;

			&:before {
				content: "";
				width: 100%;
				height: 1px;
				background: #9cadbd;
				position: absolute;
				top: 17px;
			}
		}

		&:hover {
			span {
				color: #857373;
			}
		}
	}
}
</style>