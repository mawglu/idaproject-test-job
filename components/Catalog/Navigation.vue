<template>
    <ul :class="$style.list">
        <li v-for="li in list" :key="li.id" :class="li.id === category ? [$style.item, $style.active] : $style.item"
            @click="selectCategory(li.id)">
            {{ li.name }}
        </li>
    </ul>
</template>

<script>
    import {mapActions, mapState} from 'vuex'

    export default {
        name: "CatalogNavigation",
        data() {
            return {
                list: [
                    {
                        id: 1,
                        name: 'Рюкзаки',
                    }, {
                        id: 2,
                        name: 'Рубашки',
                    }, {
                        id: 3,
                        name: 'Футболки',
                    }
                ]
            }
        },
        computed: {
            ...mapState({
                category: state => state.content.category,
            }),
        },
        methods: {
            ...mapActions({
                sortByCategory: 'content/sortByCategory',
                getProducts: 'content/getProducts',
            }),
            /**
             * @param category
             *
             * Вызов sortByCategory для записи категории товара
             * Вызов getProducts для записи в массив
             */
            selectCategory(category) {
                this.sortByCategory(category);
                this.getProducts();
            },
        },
    }
</script>

<style lang="scss" module>
    .list {
        list-style: none;
        padding: 0;

        .item {
            font-size: $font-size-base;
            line-height: $line-height-base;
            color: $grey-light;
            text-decoration: none;
            margin: 0 0 16px 0;
            cursor: pointer;
            @include sm-mobile {
                margin: 0 0 10px 0;
            }

            &:hover {
                color: $grey;
            }

            &.active {
                color: $dark;
                text-decoration-line: underline;
            }
        }
    }
</style>