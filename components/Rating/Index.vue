<template>
    <div :class="$style.ratingBlock">
        <svg :class="$style.ratingIcon" enable-background="new 0 0 19.481 19.481" viewBox="0 0 19.481 19.481"
             xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient :id="`grad${id}`" x1="0" x2="0" y1="0" y2="100%">
                    <stop :offset="100 - (rating * 20) + '%'" stop-color="white"/>
                    <stop :offset="rating * 20 + '%'" stop-color="#F2C94C"/>
                </linearGradient>
            </defs>
            <path :fill="`url(#grad${id})`" stroke="#F2C94C" stroke-width="1"
                  d="m10.201,.758l2.478,5.865 6.344,.545c0.44,0.038 0.619,0.587 0.285,0.876l-4.812,4.169 1.442,6.202c0.1,0.431-0.367,0.77-0.745,0.541l-5.452-3.288-5.452,3.288c-0.379,0.228-0.845-0.111-0.745-0.541l1.442-6.202-4.813-4.17c-0.334-0.289-0.156-0.838 0.285-0.876l6.344-.545 2.478-5.864c0.172-0.408 0.749-0.408 0.921,0z"/>
        </svg>

        <div :class="[$style.ratingCnt, 'cr-yellow']">
            {{rating}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "RatingIndex",
        props: {
            rating: {
                type: Number,
                default: 0,
            },
            id: '',
        },
    }
</script>

<style lang="scss" module>
    .ratingBlock {
        display: flex;


        .ratingIcon {
            width: 14px;
            height: 14px;
            margin: auto 0;
        }


        .ratingCnt {
            font-size: 10px;
            line-height: 13px;
            margin: auto 0 auto 4px;
        }
    }

</style>