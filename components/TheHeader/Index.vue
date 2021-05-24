<template>
    <header :class="$style.header">
        <nav :class="$style.nav">
            <NuxtLink to="/" :class="$style.brand">
                TestList
            </NuxtLink>
            <BasketIcon/>
        </nav>
    </header>
</template>

<script>
    export default {
        name: "Index",
        components: {
            BasketIcon: () => import(/* webpackChunkName : "basket" */ '../Basket/Icon'),
        },
    }
</script>

<style lang="scss" module>
    .header {
        background: #FFFFFF;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
        border-radius: 0 0 8px 8px;
        padding: 18px 108px 20px 88px;
        @include md-desktop {
            padding: 18px 68px 20px 44px;
        }
        @include sm-mobile {
            padding: 14px 24px;
        }

        .nav {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            .brand {
                font-style: normal;
                font-weight: bold;
                font-size: $font-size-large;
                line-height: $line-height-large;
                color: $grey;
                margin: auto 0;
            }
        }
    }
</style>