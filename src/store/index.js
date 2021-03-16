import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    firstname: "",
    lastname: "",
    street: "",
    number: "",
    plz: "",
    town: "",
    email: "",
    tel: "",
    date: "",
    date_child: "",
    date_bb: "",
    geCheck: false,
    entCheck: false,
    bifoCheck: false,
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
      state.number = value;
    },
    setPostcode(state,value)
    {
      state.plz = value;
    },
    setTown(state,value)
    {
      state.town = value;
    },
    setMail(state,value)
    {
      state.email = value;
    }, 
    setTel(state,value)
    {
      state.tel = value;
    },
    setDate(state,value)
    {
      state.date = value;
    },
    setDate_child(state, value)
    {
      state.date_child = value;
    },
    setDate_bb(state, value)
    {
      state.date_bb = value;
    },
    setGeCheck(state, value)
    {
      state.geCheck = value;
    },
    setEntCheck(state, value)
    {
      state.entCheck = value;
    },
    setBifoCheck(state, value)
    {
      state.bifoCheck = value;
    },
  },
  actions: {
  },
  modules: {
  }
})
