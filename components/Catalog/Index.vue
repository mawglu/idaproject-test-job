<template>
    <div :class="$style.wrap">
        <div :class="[$style.item, 'bg-base', 'bs-base', 'br-base']"
             v-for="product in products" :key="product.id">
            <div :class="$style.header">
                <Rating :class="$style.rating" :rating="product.rating" :id="product.id"/>
                <img :class="$style.image" :src="'https://frontend-test.idaproject.com' + product.photo"
                     :alt="product.name">
                <svg :class="$style.toBasket" @click="addToBasket(product)">
                    <use :class="$style.toBasketSvg" xlink:href="#basket"/>
                </svg>
            </div>
            <div :class="$style.body">
                <div :class="$style.name">{{product.name | capitalize}}</div>
                <div :class="$style.price" v-html="product.price.toLocaleString() + '&#32;&#8381;'"/>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'

    export default {
        name: "CatalogIndex",
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
                getProducts: 'content/getProducts',
                addToBasket: 'content/addToBasket',
            }),
        },
        computed: {
            ...mapState({
                products: state => state.content.products,
            }),
        },
        mounted() {
            this.getProducts()
        },
        components: {
            Rating: () => import(/* webpackChunkName : "rating" */ '../Rating/Index'),
        },
    }
</script>

<style lang="scss" module>
    .wrap {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        justify-content: space-between;

        .item {
            width: calc((100% - (34px * 4) - (16px * 3)) / 4);
            margin-bottom: 16px;
            padding: 17.5px 18px 16px 16px;
            @include lg-desktop {
                width: calc((100% - (34px * 3) - (16px * 2)) / 3);
            }
            @include sm-tablets {
                width: calc((100% - (34px * 2) - 16px) / 2);
            }

            .header {
                position: relative;

                .rating {
                    position: absolute;
                    top: 0;
                    left: 0;
                }

                .image {
                    max-width: 100%;
                    height: auto;
                }

                .rating {
                    position: absolute;
                }

                .toBasket {
                    width: 12px;
                    height: 13.2px;
                    position: absolute;
                    top: 0;
                    right: 0;
                    cursor: pointer;

                    .toBasketSvg {
                        fill: $grey-light;
                    }

                    &:hover {
                        .toBasketSvg {
                            fill: $dark;
                        }
                    }
                }
            }

            .body {
                .name {
                    font-size: $font-size-small;
                    line-height: $line-height-small;
                    color: $grey;
                    margin: 0 0 6px 0;
                }

                .price {
                    font-size: $font-size-small;
                    line-height: $line-height-small;
                    font-weight: bold;
                    color: $dark;
                }
            }
        }
    }
</style>
