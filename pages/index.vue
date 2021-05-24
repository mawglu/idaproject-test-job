<template>
    <main :class="$style.main">
        <Basket/>
        <div :class="$style.header">
            <h1 :class="[$style.title, 'fw-b']">Каталог</h1>
            <Sorting :class="$style.sorting"/>
        </div>
        <div :class="$style.catalog">
            <CatalogNavigation :class="$style.nav"/>
            <Catalog/>
        </div>
    </main>
</template>

<script>
    export default {
        head: {
            title: 'Каталог товаров',
        },
        components: {
            Basket: () => import(/* webpackChunkName : "basket" */ '../components/Basket/Index'),
            Sorting: () => import(/* webpackChunkName : "sorting" */ '../components/Sorting/Index'),
            Catalog: () => import(/* webpackChunkName : "catalog" */ '../components/Catalog/Index'),
            CatalogNavigation: () => import(/* webpackChunkName : "catalog-navigation" */ '../components/Catalog/Navigation'),
        },
    }
</script>
<style lang="scss" module>
    .main {
        padding: 0 88px;
        margin: 32px 0 0 0;
        @include md-desktop {
            padding: 0 44px;
        }
        @include sm-mobile {
            padding: 0 22px;
        }

        .header {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            margin: 0 0 24px 0;
             @include sm-mobile {
                 flex-direction: column;
                 margin: 0;
             }

            .title {
                margin: auto 0;
            }

            .sorting {
                margin: auto 0 auto auto;
                @include sm-mobile {
                    margin: 10px auto auto 0;
                }
            }
        }

        .catalog {
            display: flex;
            flex-direction: row;
            @include sm-mobile {
                flex-direction: column;
            }

            .nav {
                padding: 0 88px 0 0;
                @include md-desktop {
                    padding: 0 44px 0 0;
                }
                @include sm-mobile {
                    padding: 0 22px 0 0;
                }
            }
        }
    }
</style>