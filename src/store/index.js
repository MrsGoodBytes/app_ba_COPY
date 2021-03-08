import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    firstname: "",
    lastname: "",
  },
  mutations: {
  //write value of textfield into variable firstname
    setFirstname(state,value)
    {
      state.firstname = value;
    },
    setLastname(state,value)
    {
      state.lastname = value;
    },   
  },
  actions: {
  },
  modules: {
  }
})
