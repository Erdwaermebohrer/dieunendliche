<template>
	<div class="form-step__wrapper">
		<div class="form-step__wrapper--top">
			<div v-text="$prismic.asText(step.primary.title)"></div>
			<div v-html="$prismic.asHtml(step.primary.description)"></div>
		</div>
		<div class="form-step__wrapper--bottom">
			<div class="fields__wrapper">
				<div
					v-for="(value, key) in step.items"
					:key="key"
					class="fields__wrapper--item"
				>
					<div
						class="radio__wrapper"
            :class="{'radio-active': value.field_placeholder === multiForm[value.field_id] }"
						v-if="value.field_type === 'radio'"
						@click="handleClick(value.field_id, value.field_placeholder)"
					>
						<div class="radio__wrapper--text">
							{{ value.field_placeholder }}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapFields } from "../../../store/index";
export default {
	name: "form-step",
	props: {
		step: {
			type: Object
		}
	},
  computed: {
    ...mapFields(["multiForm"]),
  },
	methods: {
		handleClick(field_id, value) {
      this.multiForm[field_id] = value
			this.$emit("handle-click");
		}
	}
};
</script>

<style lang="scss">
.form-step__wrapper {
	min-height: 500px;

	&--top {
	}

	&--bottom {
		.fields__wrapper {
			&--item {
				.radio__wrapper {
					width: 340px;
					height: 35px;
					display: flex;
					justify-content: center;
					background: transparent;
					border: 1px solid #857373;
					cursor: pointer;
					transition: 0.4s all ease-in;

					&--text {
						font-size: 22px;
						font-weight: 500;
						line-height: 27.9px;
						text-align: center;
						color: #857373;
						transition: 0.4s all ease-in;
					}

					&:hover {
						background: #857373;

						.radio__wrapper--text {
							color: white;
						}
					}
				}

        .radio-active {
          background: #857373!important;

          .radio__wrapper--text {
            color: white;
          }
        }
			}
		}
	}
}
</style>