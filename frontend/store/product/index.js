/* eslint-disable prettier/prettier */
const state = () => ({
  product: null,
  message: [],
  counts: 0,
})
const getters = {
  getProducts (state) {
    if (state.product) return state.product
    else return []
  },
  getProductCounts (state) {
    return state.counts ? state.counts : 0
  },
  getProductMessageCounts (state) {
    return state.message.length
  },
}
const actions = {
  async addProduct ({ commit }, data) {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('subcategory', data.subcategory)
    formData.append('category', data.category)
    formData.append('quantity', data.quantity)
    formData.append('price', data.price)
    formData.append('description', data.description)
    data.image.forEach(element => {
      formData.append('files', element)
    })
    console.log(formData)
    const logResult = await this.$axios.post(
      'http://localhost:8989/product/add',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    commit('newProduct', logResult.data.message)
    return logResult.data.message
  },
  async myProducts ({ commit }) {
    const result = await this.$axios.get('http://localhost:8989/product/my')
    if (!result.data.error) {
      commit('loadProducts', result.data)
    } else {
      commit('loadProducts', [])
    }
    return result.data
  },

  async removeProduct ({ commit }, index) {
    console.log(index)
    const result = await this.$axios.post(
      'http://localhost:8989/product/delete',
      index
    )
    commit('deleteProduct', result.data)
    return result.data
  },
  async updateProduct ({ commit }, data) {
    const result = await this.$axios.post(
      'http://localhost:8989/product/update',
      { updateId: data.index, product: data.product }
    )
    commit('editProduct', result.data)
    return result.data
  },
  async removeImage ({ commit }, data) {
    const result = await this.$axios.post(
      'http://localhost:8989/product/update/image',
      { productId: data.id, imageDelete: data.i, images: data.images }
    )
    commit('editProduct', result.data)
    return result.data
  },
  async newImage ({ commit }, data) {
    const formData = new FormData()
    formData.append('productId', data.id)
    formData.append('file', data.image)
    const result = await this.$axios.post(
      'http://localhost:8989/product/add/image',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    commit('editProduct', result.data)
    return result.data
  },
}
const mutations = {
  newProduct (state, data) {
    state.message = { ...state.message, data }
  },
  deleteProduct (state, data) {
    state.message = { ...state.message, data }
  },
  editProduct (state, data) {
    state.message = { ...state.message, data }
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
