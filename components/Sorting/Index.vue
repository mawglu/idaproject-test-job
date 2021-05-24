<template>
    <div>
        <div :class="$style.dropdown">
            <div :class="show === true ? [$style.toggle, $style.active] : $style.toggle" @click="menuToggle">
                <span class="cr-dark">Сортировать по: &#32;</span>
                <span class="cr-grey">{{ sortBy }}</span>
            </div>
            <div :class="[$style.menu, 'bg-base', 'bs-base', 'br-base']" v-show="show" @mouseleave="menuHide">
                <div :class="$style.item" @click="sortByPrice">По цене</div>
                <div :class="$style.item" @click="sortByRating">По популярности</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: "SortingIndex",
        data() {
            return {
                priceToMax: true,
                ratingToMax: true,
                sortBy: 'цене',
                show: false,
            }
        },
        methods: {
            ...mapActions({
                sortByParam: 'content/sortByParam',
            }),
            sortByPrice() {
                this.sortByParam({sortToMax: this.priceToMax, param: 'price'});
                this.priceToMax = !this.priceToMax;
                this.sortBy = 'цене';
            },
            sortByRating() {
                this.sortByParam({sortToMax: this.ratingToMax, param: 'rating'});
                this.ratingToMax = !this.ratingToMax;
                this.sortBy = 'популярности';
            },
            menuToggle() {
                this.show = !this.show;
            },
            menuHide() {
                this.show = false;
            }
        }
    }
</script>

<style lang="scss" module>
    .dropdown {
        cursor: pointer;
        position: relative;

        .toggle {
            padding: 0 9px 0 0;
            position: relative;

            &:after {
                content: '';
                width: 0;
                height: 0;
                border-left: 2.5px solid transparent;
                border-right: 2.5px solid transparent;
                border-top: 2.5px solid $grey;
                position: absolute;
                top: calc(50% - 1.25px);
                right: 0;
                transition: all .3s ease;
            }

            &.active {
                &:after {
                    transform: rotate(180deg);
                }
            }
        }

        .menu {
            background: $white;
            padding: 8px 0 12px 0;
            margin: 6px 0 0 0;
            max-width: 160px;
            width: 100%;
            position: absolute;
            right: 0;
            z-index: 10;

            .item {
                font-size: $font-size-small;
                line-height: $line-height-small;
                color: $grey-light;
                padding: 4px 12px;

                &:hover {
                    color: $dark;
                    background: $grey-extra-light;
                }
            }
        }
    }
</style>