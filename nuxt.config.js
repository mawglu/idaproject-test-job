export default {
    ssr: true,
    components: true,
    head: {
        title: 'my website title',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {
                hid: 'description',
                name: 'description',
                content: 'my website description'
            }
        ],
        link: [{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}]
    },
    modules: [
        ['nuxt-vuex-localstorage', {
            localStorage: [
                'content',
            ],
        }
        ],
        '@nuxtjs/axios',
        '@nuxtjs/style-resources',
        '@/modules/svg-sprite-inject.js',
    ],
    plugins: [
        '@plugins/v-mask.js',
        '@plugins/vuelidate.js',
        '@/plugins/svg-sprite-extract.js',
    ],
    styleResources: {
        scss: [
            '@/assets/css/_mixins/*.scss',
            '@/assets/css/_vars/*.scss',
        ],
    },
    css: [
        '@/assets/css/index.scss',
    ],
    build: {
        extend(config, ctx) {
            // Find existing rule for images and svg files
            const svgRule = config.module.rules.find((rule) => rule.test.test('.svg'))

            // Replace regex pattern of existing rule to match only images
            svgRule.test = /\.(png|jpe?g|gif|webp)$/

            // Add new rule for svg files
            config.module.rules.push({
                test: /\.svg$/,
                loader: 'raw-loader',
                options: {
                    esModule: false
                }
            })
        }
    }
}