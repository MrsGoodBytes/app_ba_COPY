import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    firstname: "",
    lastname: "",
    street: "",
    number: "",
    postcode: "",
    town: "",
    email: "",
    tel: "",
    date: "",
    date_p: "",
    date_child: "",
    date_bb: "",
    geCheck: false,
    entCheck: false,
    bifoCheck: false,
    radioGroupAntragsgrundlage: 0,
    radioGroupErmaeßigung: 0,
    nettoeinkommen: "",
    selbstständigkeiteinkommen: "",
    kontoinhaber: "",
    iban: "",
    bic: "",
  },
  mutations: {
    //write value of textfield into variable firstname
    setFirstname(state, value) {
      state.firstname = value;
    },
    setLastname(state, value) {
      state.lastname = value;
    },
    setStreet(state, value) {
      state.street = value;
    },
    setNumber(state, value) {
      state.number = value;
    },
    setPostcode(state, value) {
      state.postcode = value;
    },
    setTown(state, value) {
      state.town = value;
    },
    setMail(state, value) {
      state.email = value;
    },
    setTel(state, value) {
      state.tel = value;
    },
    setDate(state, value) {
      state.date = value;
    },
    setDate_p(state, value) {
      state.date_p = value;
    },
    setDate_child(state, value) {
      state.date_child = value;
    },
    setDate_bb(state, value) {
      state.date_bb = value;
    },
    setGeCheck(state, value) {
      state.geCheck = value;
    },
    setEntCheck(state, value) {
      state.entCheck = value;
    },
    setBifoCheck(state, value) {
      state.bifoCheck = value;
    },
    setAntragsgrundlageCheck(state, value) {
      state.radioGroupAntragsgrundlage = value;
    },
    setErmaeßigungCheck(state, value) {
      state.radioGroupErmaeßigung = value;
    },
    setNettoeinkommen(state, value) {
      state.nettoeinkommen = value;
    },
    setSelbstständigkeitEinkommen(state, value) {
      state.selbstständigkeiteinkommen = value;
    },
    setKontoinhaber(state, value) {
      state.kontoinhaber = value;
    },
    setIban(state, value) {
      state.iban = value;
    },
    setBic(state, value) {
      state.bic = value;
    }
  },
  actions: {
  },
  modules: {
  }
})
