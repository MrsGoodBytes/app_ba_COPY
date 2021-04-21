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
        vorjahr_checkbox: false,

        radioGroupAntragsgrundlage: 0,
        radioGroupErmaeßigung: 0,
        radioGroupBetreuungsform: 0,

        nettoeinkommen: "",
        selbstständigkeiteinkommen: "",
        kontoinhaber: "",
        iban: "",
        bic: "",

        child_firstname: "",
        child_lastname: "",
        institutionstreet: "",
        institutionnumber: "",
        institutionpostcode: "",
        institutiontown: "",
        institutionname: "",
        tagespflegename: "",

        essensgeld: "",
        elternbeitrag: "",
        betreuungsbeginn: "",
        betreuungsentgelt: "",

        firstname_sibling: "",
        lastname_sibling: "",
        date_sibling: "",

    },
    mutations: {
        //write value of textfield into variable firstname

        //Antragsteller
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
        },
        //Kind
        setChildFirstname(state, value) {
            state.child_firstname = value;
        },
        setChildLastname(state, value) {
            state.child_lastname = value;
        },
        setDate_child(state, value) {
            state.date_child = value;
        },
        /* 
                setFirstnameSibling(state, value) {
                    state.firstname_sibling = value;
                },
                setLastnameSibling(state, value) {
                    state.lastname_sibling = value;
                },
                setDateSibling(state, value) {
                    state.date_sibling = value;
                }, */

        //BETREUUNG
        setElternbeitrag(state, value) {
            state.elternbeitrag = value;
        },
        setBetreuungsentgelt(state, value) {
            state.betreuungsentgelt = value;
        },
        setEssensgeld(state, value) {
            state.essensgeld = value;
        },
        setBetreuungsumfang(state, value) {
            state.betreuungsumfang = value;
        },
        setInstitutionStreet(state, value) {
            state.institutionstreet = value;
        },
        setInstitutionNumber(state, value) {
            state.institutionnumber = value;
        },
        setInstitutionPostcode(state, value) {
            state.institutionpostcode = value;
        },
        setInstitutionTown(state, value) {
            state.institutiontown = value;
        },
        setTagespflegeName(state, value) {
            state.tagespflegename = value;
        },
        setInstitutionName(state, value) {
            state.institutionname = value;
        },
        setVorjahrCheck(state, value) {
            state.vorjahr_checkbox = value;
        },
        setEigentumCheck(state, value) {
            state.eigentum_checkbox = value;
        },
        setBetreuungsform(state, value) {
            state.radioGroupBetreuungsform = value;
        },
        setDate_bb(state, value) {
            state.date_bb = value;
        },
    },
    actions: {},
    modules: {}
})