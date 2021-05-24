export const state = () => ({
    products: [],
    basket: [],
    category: 1,
    basketShow: false,
});

export const actions = {
    async getProducts({commit, state}) {
        const data = await this.$axios.$get(`https://frontend-test.idaproject.com/api/product?category=${state.category}`);
        commit('SET_PRODUCTS', data);
    },
    async sortByCategory({commit}, category) {
        commit('SORT_BY_CATEGORY', category);
    },
    async sortByParam({commit}, {sortToMax = true, param}) {
        commit('SORT_BY_PARAM', {sortToMax: sortToMax, param: param})
    },
    async addToBasket({commit}, product) {
        commit('ADD_TO_BASKET', product);
    },
    async removeFromBasket({commit}, product) {
        commit('REMOVE_FROM_BASKET', product)
    },
    async toggleBasket({commit}, value) {
        commit('TOGGLE_BASKET', value)
    },
    async cleanBasket({commit}) {
        commit('CLEAN_BASKET')
    },
};

export const mutations = {
    /**
     * @param state
     * @param data
     * @constructor
     *
     * Записываем в state.products полученный массив data
     */
    SET_PRODUCTS(state, data) {
        state.products = data;
    },
    /**
     * @param state
     * @param category
     * @constructor
     *
     * Записываем в state.category полученную category
     */
    SORT_BY_CATEGORY(state, category) {
        state.category = category;
    },
    /**
     * @param state
     * @param sortToMax
     * @param param
     * @constructor
     *
     * Сортировка по полученному param
     */
    SORT_BY_PARAM(state, {sortToMax = true, param}) {
        if (typeof state.products[0][param] === 'undefined') {
            console.error('products not have ' + param + ' field :(');
            return;
        }

        if (sortToMax) {
            state.products.sort((a, b) => a[param] - b[param]);
        } else {
            state.products.sort((a, b) => b[param] - a[param]);
        }
    },
    /**
     * @param state
     * @param product
     * @constructor
     *
     * Добавляем в конец массива state.basket полученный product
     */
    ADD_TO_BASKET(state, product) {
        state.basket.push(product);
    },
    /**
     * @param state
     * @param product
     * @constructor
     *
     * Удаляем из массива полученный product
     */
    REMOVE_FROM_BASKET(state, product) {
        state.basket.splice(state.basket.indexOf(product), 1)
    },
    /**
     * @param state
     * @param value
     * @constructor
     *
     * Зписываем полученное значение (true/false) в  state.basketShow
     * Переключаем отображение корзины
     */
    TOGGLE_BASKET(state, value) {
        state.basketShow = value;

        document.body.style.overflowY = state.basketShow ? 'hidden' : 'scroll';
    },
    /**
     * @param state
     * @constructor
     *
     * Записываем пустой массив в state.basket
     */
    CLEAN_BASKET(state) {
        state.basket = [];
    },
};
