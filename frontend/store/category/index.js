/* eslint-disable prettier/prettier */
const state = () => ({
  category: [],
  message: null,
  error: null,
  counts: 0,
})
const getters = {
  getCategories (state) {
    return state.category
  },
  getCategoryCounts (state) {
    return state.counts ? state.counts : '0'
  },
  getDistinctSubcategories (state) {
    return state.category
      .map(el => el.subcategory)
      .filter(function (item, i, ar) {
        return ar.indexOf(item) === i
      })
  },
  filteredCategory (state, data) {
    console.log(
      state.category
        .filter(el => el.subcategory === data)
        .map(el => el.category)
    )
    return state.category
      .filter(el => el.subcategory === data)
      .map(el => el.category)
  },
}
const actions = {
  async addCategory ({ commit }, data) {
    const logResult = await this.$axios.post(
      'http://localhost:8989/category/add',
      data
    )
    commit('newCategory', logResult.data.message)
    return logResult.data.message
  },
  async myCategories ({ commit }) {
    const result = await this.$axios.get('http://localhost:8989/category/my')
    if (!result.data.error) {
      commit('loadCategories', result.data)
    } else {
      commit('loadCategories', [])
    }
    return result.data
  },
  async removeCategory ({ commit }, index) {
    console.log(index)
    const result = await this.$axios.post(
      'http://localhost:8989/category/delete',
      index
    )
    commit('deleteCategory', result.data)
    return result.data
  },
  async updateCategory ({ commit }, data) {
    const result = await this.$axios.post(
      'http://localhost:8989/category/update',
      { updateId: data.index, category: data.category }
    )
    commit('editCategory', result.data)
    return result.data
  },
}
const mutations = {
  newCategory (state, data) {
    state.message = data
  },
  loadCategories (state, data) {
    state.category = data
    state.counts = data.length
  },
  deleteCategory (state, data) {
    state.message = data
  },
  editCategory (state, data) {
    state.message = data
  },
}
export default {
  state,
  getters,
  actions,
  mutations,
}
