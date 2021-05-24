<template>
    <form class="form-basket" @submit.prevent="submitForm">
        <div class="form-basket--group" :class="{ '_error': $v.name.$error }">
            <input name="name" v-model.trim="$v.name.$model" placeholder="Ваше имя">
            <div class="error" v-if="!$v.name.required">Обязательное поле</div>
        </div>
        <div class="form-basket--group" :class="{ '_error': $v.phone.$error }">
            <input name="phone" v-model.trim="$v.phone.$model"
                   v-mask="'+7 ### ###-##-##'"
                   placeholder="Телефон"
            >
            <div class="error" v-if="!$v.phone.required">Обязательное поле</div>
        </div>
        <div class="form-basket--group" :class="{ '_error': $v.address.$error }">
            <input name="address" v-model.trim="$v.address.$model" placeholder="Адрес">
            <div class="error" v-if="!$v.address.required">Обязательное поле</div>
        </div>
        <div class="form-basket--group">
            <button class="btn _full btn-tmp br-base mn-t-md" :disabled="submitStatus === 'PENDING'">
                Отправить
            </button>
            <p v-if="submitStatus === 'ERROR'">Пожалуйста, заполните форму правильно.</p>
            <p v-if="submitStatus === 'PENDING'">Отправка...</p>
        </div>
    </form>
</template>

<script>
    import {required} from 'vuelidate/lib/validators';
    import {mapActions} from 'vuex';

    /**
     * @event update-form-status
     * @emits update-form-status
     */
    export default {
        name: "Form",
        data() {
            return {
                name: '',
                phone: '',
                address: '',
                submitStatus: null,
            }
        },
        validations: {
            name: {required},
            phone: {required,},
            address: {required},
        },
        methods: {
            ...mapActions({
                formToggle: 'content/formToggle',
                cleanBasket: 'content/cleanBasket'
            }),
            resetForm() {
                this.name = '';
                this.phone = '';
                this.address = '';
            },
            async submitForm() {
                this.$v.$touch();
                if (this.$v.$invalid) {
                    this.submitStatus = 'ERROR'
                } else {
                    this.submitStatus = 'PENDING';
                    setTimeout(() => {
                        this.resetForm();
                        this.$v.$reset();
                        this.cleanBasket();
                        /**
                         * Success event.
                         * @event success
                         * @property {number} newValue true
                         */
                        this.$emit('update-form-status', true);

                    }, 500)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .form-basket {
        &--group {
            margin-bottom: 16px;
            position: relative;

            input {
                background: $grey-extra-light;
                border-radius: 8px;
                border: none;
                padding: 14px 14px 15px 14px;
                color: $dark;
                font-size: $font-size-base;
                line-height: $line-height-base;
                box-sizing: border-box;
                width: 100%;

                &::placeholder {
                    color: $grey;
                }
            }

            .error {
                opacity: 0;
                position: absolute;
                font-size: $font-size-small;
                line-height: $line-height-small;
                color: $grey-light;
                transition: opacity .2s ease;
            }

            &._error {
                .error {
                    opacity: 1;
                }
            }
        }
    }

</style>