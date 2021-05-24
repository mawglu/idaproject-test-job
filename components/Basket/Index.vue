<template>
    <div>
        <div :class="basketShow ? [$style.basketW, $style.basketActive] : $style.basketW">
            <div :class="[$style.basketC,'br-lt','bs-lt']">
                <div :class="$style.header">
                    <div :class="[$style.title,'h1','fw-b','cr-black','mn-t-a','mn-b-a']">
                        Корзина
                    </div>
                    <svg width="14px" height="14px" :class="[$style.basketClose,'mn-t-a','mn-b-a','mn-l-a']"
                         @click="toggleBasket(false)">
                        <use xlink:href="#close"/>
                    </svg>
                </div>
                <template v-if="basket.length === 0 && !formSend">
                    <div :class="$style.empty">
                        <div class="fs-lg cr-black">Пока что вы ничего не добавили в корзину.</div>
                        <button class="btn _full btn-tmp br-base mn-t-md" @click="toggleBasket(false)">
                            Перейти к выбору
                        </button>
                    </div>
                </template>
                <template v-else-if="basket.length > 0 && !formSend">
                    <div class="filled">
                        <div class="fs-bs cr-grey mn-b-bs">Товары в корзине</div>
                        <Items class="mn-b-lg"/>
                        <div class="fs-bs cr-grey mn-b-bs">Оформить заказ</div>
                        <Form @update-form-status="updateFormStatus"/>
                    </div>
                </template>
                <template v-else-if="formSend">
                    <div :class="$style.success">
                        <svg width="80px" height="80px" class="mn-l-a mn-r-a mn-b-md">
                            <use xlink:href="#success"/>
                        </svg>
                        <div class="fs-elg cr-black ta-c">Заявка успешно отправлена</div>
                        <div class="fs-bs cr-grey ta-c">Вскоре наш менеджер свяжется с Вами</div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'

    export default {
        name: "BasketIndex",
        data() {
            return {
                formSend: false,
            }
        },
        components: {
            Items: () => import(/* webpackChunkName: "basket-items" */ './Items'),
            Form: () => import(/* webpackChunkName : "basket-form" */ './Form'),
        },
        methods: {
            ...mapActions({
                toggleBasket: 'content/toggleBasket',
            }),
            updateFormStatus() {
                this.formSend = true;
            },
        },
        computed: {
            ...mapState({
                basket: state => state.content.basket,
                basketShow: state => state.content.basketShow,
            }),
        },
    }
</script>

<style lang="scss" module>
    .basketW {
        overflow-x: hidden;
        position: absolute;
        top: 0;
        right: 0;
        width: 0;
        height: 100vh;
        background: rgba(255, 255, 255, 0.8);
        z-index: 15;
        display: flex;
        opacity: 0;
        transition: all 0.3s ease-in-out;

        .basketC {
            margin: 0 0 0 auto;
            padding: 52px 48px;
            background: $white;
            overflow-y: scroll;
            max-width: 460px;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;

            position: absolute;
            right: -500px;
            transition: right 0.5s ease-in-out;

            @include md-desktop {
                max-width: 50vw;
                padding: 52px 24px;
            }
            @include sm-mobile {
                max-width: 100%;
            }

            .header {
                display: flex;
                margin: 0 0 24px 0;

                .basketClose {
                    cursor: pointer;
                    margin-right: 5px;
                }
            }

            .empty {
                ._btn {
                    margin: 24px auto 0 auto;
                    width: 100%;
                }
            }

            .success {
                display: flex;
                flex-direction: column;
                margin: auto;
            }

        }

        &.basketActive {
            width: 100%;
            opacity: 1;

            .basketC {
                position: relative;
                right: 0;
            }
        }
    }

</style>
