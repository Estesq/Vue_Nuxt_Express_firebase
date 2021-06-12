const state = () => ({
  data: null,
})
const getters = {}
const actions = {
  async register ({ commit }, data) {
    const logResult = await this.$axios.post(
      'http://localhost:8989/auth/register',
      {
        email: data.email,
        password: data.password,
      }
    )
    commit('addUser', logResult)
    return logResult
  },
}
const mutations = {
  addUser (state, login) {
    state.data = login
  },
}
export default {
  state,
  getters,
  actions,
  mutations,
}
