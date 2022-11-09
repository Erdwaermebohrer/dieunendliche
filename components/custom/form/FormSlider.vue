<template>
	<div class="form-slider__wrapper">
		<form
			novalidate
			id="multi-step-form"
			name="Multi Step Form"
			data-netlify="true"
			netlify
		>
			<input type="hidden" name="form-name" value="Multi Step Form" />
			<div class="swiper" v-show="showSlider">
				<div
					class="form-slider__wrapper__section"
					v-for="(step, index) in steps"
					:key="index"
					:data-section="index"
					:style="checkStatus(index)"
				>
					<div class="form-step__wrapper">
						<div
							class="form-step__wrapper--top"
							:class="{ 'modified-top': index === 3 }"
						>
							<div
								class="title"
								v-text="$prismic.asText(step.primary.title)"
							></div>
							<div
								class="description"
								v-html="$prismic.asHtml(step.primary.description)"
							></div>
						</div>

						<div class="form-step__wrapper--bottom">
							<div
								v-if="index !== 1"
								class="block-title"
								v-text="$prismic.asText(step.primary.block_title)"
							/>
							<div v-if="index === 0" class="fields__wrapper">
								<div
									class="fields__wrapper--item"
									v-for="(value, key) in step.items"
									:key="key"
									v-show="key < 5"
									@click="nextSlide(value.field_id, value.field_placeholder)"
								>
									<label
										class="custom-radio"
										:class="{
											'selector-active':
												value.field_placeholder === formFields[value.field_id],
										}"
										v-if="value.field_type === 'radio'"
									>
										<input
											type="radio"
											v-if="value.field_type === 'radio'"
											class="selector-field"
											:value="value.field_placeholder"
											:name="$prismic.asText(step.primary.block_title)"
										/>
										{{ value.field_placeholder }}
									</label>
								</div>
							</div>
							<div v-if="index === 0" class="fields__wrapper">
								<div
									class="fields__wrapper--item"
									v-for="(value, key) in step.items"
									:key="key"
									v-show="key > 4"
									@click="nextSlide(value.field_id, value.field_placeholder)"
								>
									<label
										class="custom-radio"
										:class="{
											'selector-active':
												value.field_placeholder === formFields[value.field_id],
										}"
										v-if="value.field_type === 'radio'"
									>
										<input
											type="radio"
											class="selector-field"
											:value="value.field_placeholder"
											:name="$prismic.asText(step.primary.block_title)"
										/>
										{{ value.field_placeholder }}
									</label>
								</div>
							</div>
							<div v-if="index === 1" class="fields__wrapper">
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
									<label
										class="custom-radio"
										:class="{
											'selector-active':
												value.field_placeholder === formFields[value.field_id],
										}"
										v-if="value.field_type === 'radio'"
									>
										<input
											type="radio"
											v-if="value.field_type === 'radio'"
											class="selector-field"
											:value="value.field_placeholder"
											:name="$prismic.asText(inputData.block_title_a)"
										/>
										{{ value.field_placeholder }}
									</label>
								</div>
							</div>
							<div v-if="index === 1" class="fields__wrapper">
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
									<label
										class="custom-radio"
										:class="{
											'selector-active':
												value.field_placeholder === formFields[value.field_id],
										}"
										v-if="value.field_type === 'radio'"
									>
										<input
											type="radio"
											v-if="value.field_type === 'radio'"
											class="selector-field"
											:value="value.field_placeholder"
											:name="$prismic.asText(inputData.block_title_b)"
										/>
										{{ value.field_placeholder }}
									</label>
								</div>
							</div>
							<div v-if="index === 1" class="fields__wrapper full-width">
								<div
									class="block-title"
									v-text="$prismic.asText(step.primary.block_title)"
								/>
								<div
									v-for="(value, key) in step.items"
									:key="key"
									class="fields__wrapper--item textarea"
								>
									<textarea
										v-if="value.field_type === 'textarea'"
										v-model="formFields[value.field_id]"
										:name="value.field_id"
										:placeholder="value.field_placeholder"
										class="input"
									/>
								</div>
							</div>
							<div v-if="index === 2" class="fields__wrapper horizontal">
								<div
									class="fields__wrapper--item"
									v-for="(value, key) in step.items"
									:key="key"
									@click="nextSlide(value.field_id, value.field_placeholder)"
								>
									<label
										class="custom-radio"
										:class="{
											'selector-active':
												value.field_placeholder === formFields[value.field_id],
										}"
										v-if="value.field_type === 'radio'"
									>
										<input
											type="radio"
											v-if="value.field_type === 'radio'"
											class="selector-field"
											:value="value.field_placeholder"
											:name="$prismic.asText(step.primary.block_title)"
										/>
										{{ value.field_placeholder }}
									</label>
								</div>
							</div>
							<div v-if="index === 3" class="step-4__wrapper">
								<div
									v-for="(value, key) in step.items"
									:key="key"
									class="step-4__wrapper--item"
								>
									<label
										class="input-label"
										:for="value.field_placeholder"
										v-text="value.field_placeholder"
									>
									</label>
									<div class="file__wrapper" v-if="value.field_type === 'file'">
										<span
											class="file__wrapper--placeholder"
											v-text="
												'Hier bitte Ihre Dateien per Drag & Drop uploaden '
											"
										/>
										<input
											v-if="value.field_type === 'file'"
											:type="value.field_type"
											ref="file"
											accept="application/pdf,image/jpeg,image/png"
											@change="onDocumentChange($event, value.field_id + '1')"
											max-size="20"
											:name="value.field_id + '1'"
											placeholder=""
										/>
									</div>
									<div
										v-show="files.showFileTwo"
										class="file__wrapper"
										v-if="value.field_type === 'file'"
									>
										<span
											class="file__wrapper--placeholder"
											v-text="
												'Hier bitte Ihre Dateien per Drag & Drop uploaden '
											"
										/>
										<input
											v-if="value.field_type === 'file'"
											:type="value.field_type"
											ref="file"
											accept="application/pdf,image/jpeg,image/png"
											@change="onDocumentChange($event, value.field_id + '2')"
											max-size="20"
											:name="value.field_id + '2'"
											placeholder=""
										/>
									</div>
									<div
										v-show="files.showFileThree"
										class="file__wrapper"
										v-if="value.field_type === 'file'"
									>
										<span
											class="file__wrapper--placeholder"
											v-text="
												'Hier bitte Ihre Dateien per Drag & Drop uploaden '
											"
										/>
										<input
											v-if="value.field_type === 'file'"
											:type="value.field_type"
											ref="file"
											accept="application/pdf,image/jpeg,image/png"
											@change="onDocumentChange($event, value.field_id + '3')"
											max-size="20"
											:name="value.field_id + '3'"
											placeholder=""
										/>
									</div>
									<div
										v-if="value.field_type === 'file'"
										class="file__wrapper--bottom"
									>
										<div class="top">
											<div @click="addFileField" class="icon" v-text="'+'" />
										</div>
										<div class="bottom">
											<div class="format" v-text="'*PDF, JPG oder PNG'" />
											<div class="file-names__wrapper">
												<div
													class="file-names"
													v-for="(fileName, index) in fileNames"
													:key="index"
												>
													<div
														@click="removeFileField(fileName.id)"
														class="delete-icon"
													>
														X
													</div>
													<div class="name">{{ fileName.name }}</div>
												</div>
											</div>
										</div>
									</div>
									<textarea
										v-if="value.field_type === 'textarea'"
										v-model="formFields[value.field_id]"
										:name="value.field_id"
										:placeholder="'Ihre Nachricht an uns ...'"
										class="text-area"
									/>
								</div>
							</div>
							<div v-if="index === 4" class="step-5__wrapper">
								<div
									v-for="(value, key) in step.items"
									:key="key"
									class="step-5__wrapper--item"
								>
									<label
										v-if="
											value.field_type === 'text' ||
											value.field_type === 'number' ||
											value.field_type === 'email'
										"
										:for="value.field_label"
										class="input-label"
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
										class="text-input"
										:type="value.field_type"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="swiper-pagination">
					<div
						class="swiper-pagination-progressbar"
						:style="barStatus(steps.length)"
					></div>
				</div>
			</div>
		</form>
		<div class="pagination__wrapper">
			<button
				v-if="buttonPrevLabel && buttonPrevLabel.length > 0"
				@click="prevSlide"
			>
				<span>{{ $prismic.asText(buttonPrevLabel) }}</span>
			</button>
			<div class="wrapper">
				<div v-if="!isStepValidated" class="warning">
					Bitte füllen sie alle Felder vollständig aus
				</div>
				<button
					v-if="buttonNextLabel && buttonNextLabel.length > 0"
					@click="validateStep"
					class="btn-next"
				>
					<span>{{ $prismic.asText(buttonNextLabel) }}</span>
				</button>
			</div>
		</div>
	</div>
</template>
<script>
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
			if (this.initStep) {
				return true;
			}

			if (this.currentIndex === 1) {
				if (
					!this.validationFields[this.currentIndex].Gebäudetyp ||
					!this.validationFields[this.currentIndex].Bauvorhaben ||
					!this.formFields.Addresse
				) {
					return false;
				}
			}
			if (this.currentIndex === 3) {
				if (!this.formFields.sonstige_informationen) {
					return false;
				}
			}
			if (this.currentIndex === 4) {
				if (
					!this.formFields.name ||
					!this.formFields.telefonnummer ||
					!this.formFields.email
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
			files: {
				showFileTwo: false,
				showFileThree: false
			},
			fileNames: [],
			formFields: {},
			showSlider: true,
			validationFields: {
				1: {
					Gebäudetyp: false,
					Bauvorhaben: false
				},
				3: {
					file: true
				}
			},
			initStep: true
		};
	},
	methods: {
		addFileField() {
			if (!this.files.showFileTwo) {
				this.files.showFileTwo = true;
			} else if (this.files.showFileTwo && !this.files.showFileThree) {
				this.files.showFileThree = true;
			}
		},
		barStatus(total) {
			var barWidth = (this.currentIndex / (total - 1)) * 100;
			return "width:" + barWidth + "%";
		},
		checkStatus(index) {
			if (index == this.currentIndex) {
				return "display:block;";
			}
			return "display:none;";
		},
		encode(data) {
			return Object.keys(data)
				.map(
					key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
				)
				.join("&");
		},
		nextSlide(field_id, value) {
			this.initStep = true;
			this.formFields[field_id] = value;
			if (this.currentIndex < this.steps.length - 1) {
				this.currentIndex += 1;
			}
		},
		onDocumentChange(event, id) {
			const obj = {
				id,
				name: event.target.files[0].name
			};

			const exist = this.fileNames.some(elem => {
				return elem.id === id;
			});

			if (exist) {
				const arr = this.fileNames.filter(elem => {
					return elem.id !== id;
				});

				this.fileNames = arr;
				this.fileNames.push(obj);
			} else {
				this.fileNames.push(obj);
			}
		},
		prevSlide() {
			if (this.currentIndex > 0) {
				this.currentIndex -= 1;
			}
		},
		removeFileField(id) {
			const arr = this.fileNames.filter(elem => {
				return elem.id !== id;
			});

			this.fileNames = arr;

			if (id === "datenupload-12") {
				this.files.showFileTwo = false;
			} else if (id === "datenupload-13") {
				this.files.showFileThree = false;
			}
		},
		selectItem(field_id, value) {
			this.formFields[field_id] = value;

			if (this.currentIndex === 1) {
				this.validationFields[this.currentIndex][field_id] = true;
				this.showSlider = false;
				this.$nextTick(() => {
					this.showSlider = true;
				});
			}
		},
		validateStep() {
			this.initStep = false;
			if (!this.isStepValidated) {
				return;
			}

			if (this.currentIndex < this.steps.length - 1) {
				this.currentIndex += 1;
				this.initStep = true;
			} else {
				let myForm = document.getElementById("multi-step-form");
				let formData = new FormData(myForm);

				fetch("/", {
					body: formData,
					method: "POST"
				})
					.then(res => {
						this.formFields = {};
						this.initStep = true;
						setTimeout(() => {
							this.currentIndex = 0;
						}, 1000);
					})
					.catch(error => console.log(error));
			}
		},
		validateSize(e) {
			// if(this.$refs['file'].files[0].size > 1000000){
			//    alert("File is too big – Max 1 MB");
			//    this.$refs['file'].value = "";
			// };
		}
	}
};
</script>
<style lang="scss">
.swiper {
	position: relative;
}

.swiper-pagination {
	position: absolute;
	top: -30px;
	left: 0;
	width: 100%;
	height: 5px;
	overflow: hidden;
	&:after {
		background: #618787;
		width: 100%;
		top: 50%;
		left: 0;
		height: 2px;
		transform: translateY(-1px);
		position: absolute;
		content: "";
	}
	&-progressbar {
		background: #618787;
		width: 0%;
		top: 0;
		left: 0;
		height: 100%;
		position: absolute;
		transition: 0.4s all ease-in;
	}
}

.form-step__wrapper {
	min-height: 480px;

	.modified-top {
		height: 290px;
	}

	&--top {
		height: 200px;
		margin-top: 60px;

		.title {
			font-size: 46px;
			font-weight: 300;
			line-height: 58px;
			color: #857373;
		}

		.description {
			font-size: 22px;
			font-weight: 400;
			line-height: 27.9px;
			color: #857373;

			p {
				max-width: 620px;
			}

			p,
			ul,
			li {
				font-size: 22px;
				font-weight: 400;
				line-height: 27.9px;
				color: #857373;
			}
		}
	}

	&--bottom {
		position: relative;
		display: flex;
	}
}

.full-width {
	width: 100%;

	.textarea {
		width: 100% !important;
	}
}

.block-title {
	position: absolute;
	top: -10px;
	font-size: 14px;
	line-height: 17px;
	letter-spacing: 0.05em;
	font-weight: 600;
	text-transform: uppercase;
	color: #857373;
}

.fields__wrapper {
	margin: 10px 70px 0 0;

	&--item {
		width: 17vw;
		height: 40px;
		margin: 10px 0;

		.input {
			width: 100%;
			height: 100%;
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

		.label {
			top: -5px;
			position: relative;
			font-size: 14px;
			font-weight: 600;
			line-height: 17.75px;
			letter-spacing: 0.05em;
			text-transform: uppercase;
			color: #857373;
		}

		.selector-field {
			width: 100%;
			height: 100%;
			padding: 0;
			padding-top: 2px;
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
				font-size: 1.3vw;
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

	.textarea {
		width: 340px;
		height: 140px;

		.input {
			width: 100%;
			height: 100%;
			padding: 10px;
			font-size: 1.3vw;
			text-align: left;
			resize: none;

			&::placeholder {
				transition: 0.4s all ease-in;
				font-size: 1.3vw;
				font-weight: 300;
				font-style: italic;
				opacity: 0.5;
			}

			&:focus,
			&:active {
				outline: none;
			}
		}
	}
}

.text-field {
	width: 25% !important;
	height: 83px !important;
	margin: 0 !important;

	.input {
		font-size: 18px;

		&::placeholder {
			transition: 0.4s all ease-in;
			font-size: 1.3vw;
			font-weight: 300;
			font-style: italic;
			opacity: 0.5;
		}
	}
}

.horizontal {
	display: flex;

	.fields__wrapper--item {
		margin-right: 70px;
		width: 12vw;
	}

	.textarea {
		width: 100%;
	}
}

.text-field__wrapper {
	justify-content: space-between;
	width: 100%;
}

.horizontal-with-textarea {
	width: 100%;
	margin-right: 0;
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
			font-size: 18px;
			line-height: 22px;
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

	.wrapper {
		margin-right: 70px;
		display: flex;

		.warning {
			margin-right: 35px;
			font-size: 18px;
			line-height: 22px;
			color: #e8543b;
		}
	}
}

.custom-radio {
	position: relative;
	border: 1px solid #857373;
	width: 100%;
	padding: 0 11px;
	height: 40px;
	display: inline-flex;
	align-items: center;
	text-align: center;
	justify-content: center;
	.selector-active {
		background: #857373 !important;
		color: white;

		&::placeholder {
			color: white;
			opacity: 1; /* Firefox */
		}
	}
	input {
		opacity: 0;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 2;
	}
}
</style>