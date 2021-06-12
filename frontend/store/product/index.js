/* eslint-disable prettier/prettier */
const state = () => ({
  product: null,
  message: null,
  counts: 0,
})
const getters = {
  getProducts (state) {
    return state.product
  },
  getProductCounts (state) {
    return state.counts ? state.counts : 0
  },
}
const actions = {
  async addProduct ({ commit }, data) {
    const logResult = await this.$axios.post(
      'http://localhost:8989/product/add',
      data
    )
    commit('newProduct', logResult.data.message)
    return logResult.data.message
  },
  async myProducts ({ commit }) {
    const result = await this.$axios.get('http://localhost:8989/product/my')
    commit('loadProducts', result.data)
    return result.data
  },
}
const mutations = {
  newProduct (state, data) {
    state.message = data
  },
  loadProducts (state, data) {
    state.product = data
    state.counts = data.length
  },
}
export default {
  state,
  getters,
  actions,
  mutations,
}
