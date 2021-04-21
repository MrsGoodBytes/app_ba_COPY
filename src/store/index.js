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

        elternteil1: {
            netto: 0,
            selbst: 0,
            kindergeld: 0,
            alg1: 0,
            existenz: 0,
            krankengeld: 0,
            rente: 0,
            unterhaltseinkunft: 0,
            ausbildungsvergütung: 0,
            bafög: 0,
            elterngeld: 0,
            kinderzuschlag: 0,
            weitere: 0,
            zuschussKita: 0,
            haushaltseinkommen: 0,

            arbeitsmittel: 0,
            fahrtkosten: 0,
            haftpflicht: 0,
            hausrat: 0,
            freiwilligekrankenundpflege: 0,
            freiwilligerente: 0,
            riester: 0,
            lebens: 0,
            kfzhaftpflicht: 0,
            unfall: 0,
            berufsunfähigkeits: 0,
            gewerkschaft: 0,

            kaltmiete: 0,
            eigentum: 0,
            besondere: 0,
            unterhaltszahlungen: 0,
        },

        elternteil2: {
            netto: 0,
            selbst: 0,
            kindergeld: 0,
            alg1: 0,
            existenz: 0,
            krankengeld: 0,
            rente: 0,
            unterhaltseinkunft: 0,
            ausbildungsvergütung: 0,
            bafög: 0,
            elterngeld: 0,
            kinderzuschlag: 0,
            weitere: 0,
            zuschussKita: 0,
            haushaltseinkommen: 0,

            arbeitsmittel: 0,
            fahrtkosten: 0,
            haftpflicht: 0,
            hausrat: 0,
            freiwilligekrankenundpflege: 0,
            freiwilligerente: 0,
            riester: 0,
            lebens: 0,
            kfzhaftpflicht: 0,
            unfall: 0,
            berufsunfähigkeits: 0,
            gewerkschaft: 0,

            kaltmiete: 0,
            eigentum: 0,
            besondere: 0,
            unterhaltszahlungen: 0,
        },
    },
    mutations: {
        //write value of textfield into variable

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

        //EINKOMMEN
        setNetto1(state, value) {
            state.elternteil1.netto = value;
        }
    },
    actions: {},
    modules: {}
})