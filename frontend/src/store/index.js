import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        geCheck: false,
        entCheck: false,
        bifoCheck: false,

        valid: false,
        firstname: "",
        lastname: "",
        street: "",
        number: "",
        postcode: "",
        town: "",
        email: "",
        tel: "",

        date: "",
        date_child: "",
        date_bb: "",
        radioGroupAntragsgrundlage: 0,
        antragsgrundlage: "",
        privatinsolvenz: false,
        radioGroupErmaeßigung: 0,
        radioGroupBetreuungsform: 0,

        vorjahr_checkbox: false,
        eigentum_checkbox: false,

        /*nettoeinkommen: "",
        selbstständigkeiteinkommen: "", */
        kontoinhaber: "",
        iban: "",
        bic: "",
        bank: "",

        child_firstname: "",
        child_lastname: "",
        institutionstreet: "",
        institutionnumber: "",
        institutionpostcode: "",
        institutiontown: "",
        institutionname: "",
        tagespflegename: "",
        betreuungsform: "",

        betreuungsumfang: "",
        betreuungsbeginn: "",
        betreuungsentgelt: "",
        elternbeitrag: "",
        essensgeld: "",

        kostenerstattung: false,
        gueltig: "",
        bifo_begr: "",

        /* firstname_sibling: "",
        lastname_sibling: "",
        date_sibling: "", */
        child_list: [],
        person_list: [],

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
            besondere: 0,
            unterhaltszahlungen: 0,
            sonstiges: "",
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
            besondere: 0,
            unterhaltszahlungen: 0,
            sonstiges: "",
        },

        haushaltseinkommen: 0,
        /* 
                one: true, */
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
        setAntragsgrundlage(state, value) {
            state.radioGroupAntragsgrundlage = value;
        },
        setPrivatinsolvenz(state, value) {
            state.privatinsolvenz = value;
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
        setBank(state, value) {
            state.bank = value;
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
        setChildBB(state, value) {
            state.date_bb = value;
        },
        setChildList(state, value) {
            state.child_list = value;
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
        setKostenerstattung(state, value) {
            state.kostenerstattung = value;
        },
        setGueltig(state, value) {
            state.gueltig = value;
        },
        setBifoBegr(state, value) {
            state.bifo_begr = value;
        },

        //EINKOMMEN
        setElternteil1(state, value) {
            state.elternteil1 = value;
        },
        setElternteil2(state, value) {
            state.elternteil2 = value;
        },

        setVal(state, value) {
            state.valid = value;
        },
    },
    actions: {},
    modules: {}
})