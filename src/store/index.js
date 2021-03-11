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
    setStreet(state,value)
    {
      state.street = value;
    },
    setNumber(state,value)
    {
      state.street = value;
    },
    setPostcode(state,value)
    {
      state.street = value;
    },
    setTown(state,value)
    {
      state.street = value;
    },
    setMail(state,value)
    {
      state.street = value;
    }, 
    setTel(state,value)
    {
      state.street = value;
    },  
  },
  actions: {
  },
  modules: {
  }
})
