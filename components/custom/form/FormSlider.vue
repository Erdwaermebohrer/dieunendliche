<template>
	<div class="form-slider__wrapper">
		<div class="logo__wrapper">
			<img class="logo__wrapper--image" src="~assets/svg/new-logo.svg" />
			<div class="logo__wrapper--text">
				<div class="text-title">Dein Partner</div>
        <div class="text-title">für Die Unendliche Energie</div>
			</div>
		</div>
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
							<div v-if="index === 0" class="fields__wrapper second-wrapper">
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
							<div
								v-if="index === 1"
								class="fields__wrapper second-step-second-wrapper"
							>
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
											:name="value.field_label"
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

									<div class="file-names__wrapper" v-if="value.field_placeholder == 'Datenupload'">
										<div
											class="file-names"
											v-for="(fileName, index) in fileNames"
											:key="index"
											:class="{'active':(fileNames.length - 1) == index}"
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


									<div class="file__wrapper" v-if="value.field_type === 'file' && !files.showFileFour">
										<span
											class="file__wrapper--placeholder"
											v-text="'+ Datei hochladen'"
										/>
										<input
											v-show="!files.showFileTwo"
											:type="value.field_type"
											ref="file"
											accept="application/pdf,image/jpeg,image/png"
											@change="onDocumentChange($event, value.field_id + '1')"
											max-size="20"
											:name="value.field_id + '1'"
											placeholder=""
										/>

										<input
											v-show="files.showFileTwo && !files.showFileThree"
											:type="value.field_type"
											ref="file"
											accept="application/pdf,image/jpeg,image/png"
											@change="onDocumentChange($event, value.field_id + '2')"
											max-size="20"
											:name="value.field_id + '2'"
											placeholder=""
										/>

										<input
											v-show="files.showFileThree && !files.showFileFour"
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
										
										<div class="bottom">
											<div class="format" v-text="'*PDF, JPG oder PNG'" />
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
			<div class="swiper" v-if="submitted">
				<div
					class="form-slider__wrapper__section"
					v-for="(step, index) in steps"
					:key="index"
					:data-section="index"
					:style="checkStatus(index)"
				>
					<div class="form-step__wrapper submitted__wrapper">
						<div class="form-step__wrapper--top">
							<div class="title" v-text="'Vielen Dank für Ihre Anfrage!'"></div>
							<div
								class="description"
								v-html="'Wir werden uns bald bei Ihnen melden.'"
							></div>
						</div>
					</div>
				</div>
			</div>
		</form>
		<div v-if="!submitted" class="pagination__wrapper">
			<button
				v-if="buttonPrevLabel && buttonPrevLabel.length > 0"
				@click="prevSlide"
				class="btn-prev"
			>
				<img
					v-if="!isMobile"
					class="rotate"
					src="~assets/svg/arrow-slider.svg"
				/>
				<img v-else class="rotate" src="~assets/svg/arrow-slider-white.svg" />
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
					<img
						v-if="!isMobile"
						class="rotate"
						src="~assets/svg/arrow-slider.svg"
					/>
					<img v-else class="rotate" src="~assets/svg/arrow-slider-white.svg" />
				</button>
			</div>
		</div>
		<div v-else class="pagination__wrapper">
			<button @click="navigateToHomePage()" class="btn-prev">
				<img class="rotate" src="~assets/svg/arrow-slider.svg" />
				<span>zurück zur Website</span>
			</button>
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
		isMobile() {
			return this.currentResolution <= 990;
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
				// if (!this.formFields.sonstige_informationen) {
				// 	return false;
				// }
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
			currentResolution: 1200,
			files: {
				showFileTwo: false,
				showFileThree: false,
				showFileFour: false
			},
			fileNames: [],
			formFields: {},
			showSlider: true,
			submitted: false,
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
			} else if (this.files.showFileThree && !this.files.showFileFour) {
				this.files.showFileFour = true;
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
		getCurrentResolution() {
			this.currentResolution = innerWidth;
		},
		navigateToHomePage() {
			this.$router.push("/");
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
				this.addFileField()
			} else {
				this.fileNames.push(obj);
				this.addFileField()
			}
		},
		prevSlide() {
			if (this.currentIndex === 0) {
				this.$router.push("/");
			}
			if (this.currentIndex > 0) {
				this.currentIndex -= 1;
			}
		},
		removeFileField(id) {
			const arr = this.fileNames.filter(elem => {
				return elem.id !== id;
			});

			this.fileNames = arr;

			if (id === "datenupload-11") {
				this.files.showFileTwo = false;
				this.files.showFileThree = false;
				this.files.showFileFour = false;
			} else if (id === "datenupload-12") {
				this.files.showFileTwo = true;
				this.files.showFileThree = false;
				this.files.showFileFour = false;
			} else if (id === "datenupload-13") {
				this.files.showFileTwo = true;
				this.files.showFileThree = true;
				this.files.showFileFour = false;
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
						this.initStep = true;
						this.showSlider = false;
						this.submitted = true;
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
	},
	beforeMount() {
		window.addEventListener("load", this.getCurrentResolution);
		window.addEventListener("resize", this.getCurrentResolution);
	},
	beforeDestroy() {
		window.removeEventListener("load", this.getCurrentResolution);
		window.removeEventListener("resize", this.getCurrentResolution);
	}
};
</script>