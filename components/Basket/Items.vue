<template>
    <div>
        <div :class="[$style.item, 'bg-base', 'bs-base', 'br-base', 'mn-b-sm']" v-for="row in basket" :key="row.id">
            <div :class="[$style.itemHeader, 'mn-r-lg', ]">
                <img :class="$style.itemImage" :src="'https://frontend-test.idaproject.com' + row.photo"
                     :alt="row.name">
            </div>
            <div :class="[$style.itemBody, 'mn-t-a', 'mn-b-a']">
                <div class="fs-sm cr-grey mn-b-esm">{{row.name | capitalize}}</div>
                <div class="fs-sm fw-b cr-dark mn-b-bs" v-html="row.price.toLocaleString() + '&#32;&#8381;'"/>
                <Rating :rating="row.rating"/>
            </div>
            <div :class="[$style.itemFooter, 'mn-l-a', 'mn-t-a', 'mn-b-a']">
                <svg width="20px" height="20px" :class="$style.bucket" @click="removeFromBasket(row)">
                    <use :class="$style.bucketSvg" xlink:href="#bucket"/>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex';

    export default {
        name: "BasketItems",
        filters: {
            capitalize: function (value) {
                if (!value) return '';
                value = value.toLowerCase().toString();
                return value.replace(/(^|\s)\S/g, function (str) {
                    return str.toUpperCase()
                })
            }
        },
        methods: {
            ...mapActions({
                removeFromBasket: 'content/removeFromBasket',
            })
        },
        computed: {
            ...mapState({
                basket: state => state.content.basket,
            })
        },
        components: {
            Rating: () => import(/* webpackChunkName : "rating" */ '../Rating/Index'),
        },
    }
</script>

<style lang="scss" module>
    .item {
        padding: 15px 25px;
        display: flex;
        flex-wrap: wrap;

        .itemHeader {
            .itemImage {
                max-width: 70px;
            }
        }

        .bucket {
            cursor: pointer;

            .bucketSvg {
                fill: $grey-light;
            }

            &:hover {
                .bucketSvg {
                    fill: $dark;
                }
            }
        }
    }

</style>