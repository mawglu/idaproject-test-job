<template>
    <div :class="$style.basket" @click="toggleBasket">
        <svg :class="$style.icon">
            <use :class="$style.iconSvg" xlink:href="#basket"/>
        </svg>
        <div :class="$style.cnt"><span>{{ cnt }}</span></div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex';

    export default {
        name: "BasketIcon",
        methods: {
            ...mapActions({
                toggleBasket: 'content/toggleBasket',
            }),
        },
        computed: {
            ...mapState({
                cnt: state => state.content.basket.length,
            })
        }
    }
</script>

<style lang="scss" module>
    .basket {
        position: relative;
        cursor: pointer;

        .icon {
            width: 24px;
            height: 26.4px;

            .iconSvg {
                fill: $dark;
            }
        }

        .cnt {
            position: absolute;
            width: 12px;
            height: 12px;
            background: $grey-light;
            border-radius: 50%;
            top: -4px;
            right: -6px;

            font-style: normal;
            font-weight: bold;
            font-size: 8px;
            line-height: 10px;
            color: #FFFFFF;

            display: flex;

            span {
                margin: auto;
            }
        }
    }
</style>