import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        firstname: "Isabella",
        lastname: "Gandl",
        street: "Bahnhofstraße",
        number: "59A",
        postcode: "23936",
        town: "Grevesmühlen",
        email: "isabella.gandl@student.uni-luebeck.de",
        tel: "03881715975",

        date: "06.10.1990",
        date_p: "",
        date_child: "11.07.2019",
        date_bb: "",

        geCheck: false,
        entCheck: false,
        bifoCheck: false,
        vorjahr_checkbox: false,

        radioGroupAntragsgrundlage: 0,
        privatinsolvenz: false,
        radioGroupErmaeßigung: 0,
        radioGroupBetreuungsform: 0,

        nettoeinkommen: "",
        selbstständigkeiteinkommen: "",
        kontoinhaber: "",
        iban: "",
        bic: "",

        child_firstname: "Ilaria",
        child_lastname: "Gandl",
        institutionstreet: "Carl-Gauß-Straße",
        institutionnumber: "15",
        institutionpostcode: "23936",
        institutiontown: "Grevesmühlen",
        institutionname: "Kita Weltendecker",
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
        setElternteil1(state, value) {
            state.elternteil1 = value;
        },
        setElternteil2(state, value) {
            state.elternteil2 = value;
        }
    },
    actions: {},
    modules: {}
})