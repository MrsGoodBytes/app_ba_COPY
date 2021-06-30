<template>
  <div id="antrag_auswahl">
    <v-container>
      <v-card color="#F5F5F5" class="mb-8">
        <v-row class="py-6"
          ><v-col class="text-left pl-16">
            <h1 class="mb-2">Willkommen liebe Eltern!</h1>
            <h4>
              Stellen Sie Anträge auf
              <h3>
                Entgeltermäßigung, Geschwisterermäßigung <br />und Mittel aus
                dem Bildungsfond
              </h3>
              jetzt vollständig digital.
            </h4>
          </v-col>
          <v-col cols="12" md="7">
            <v-card outlined class="mx-8 pa-6" color="#E8EAF6">
              <h3 class="">Falls Sie unsicher sind</h3>
              <p>hilft Ihnen unser Test auf Berechtigung weiter:</p>
              <router-link :to="{ name: 'Check' }" href="#" class=""
                ><v-btn color="accent" class="mb-3 text-button"
                  >Förderberechtigung feststellen</v-btn
                ></router-link
              >
            </v-card>
          </v-col>
        </v-row>
      </v-card>
      <v-card class="mx-auto pa-5 my-8" outlined>
        <h4 class="text-left">
          <v-icon>mdi-file</v-icon> Anträge müssen jedes Jahr erneut gestellt
          werden. Denken Sie daran, am Ende der Antragstellung Ihre Daten
          herunterzuladen, um sie beim nächsten Antrag zu importieren. Sie haben
          bereits eine Datei mit Ihren gespeicherten Daten? Dann können Sie
          diese hier hochladen und wiederherstellen!
        </h4>
        <v-row>
          <v-col cols="12" md="8" sm="12">
            <v-file-input
              accept="json/*"
              label="JSON-Datei hochladen"
              v-model="upload"
              chips
              show-size
              counter
              multiple
              truncate-length="23"
            ></v-file-input>
          </v-col>
          <v-col cols="12" md="4" sm="12">
            <v-btn class="mb-3 text-button" @click="load_data" color="primary"
              >Daten übernehmen</v-btn
            >
          </v-col>
        </v-row>
      </v-card>
      <Antragswahl msg="Welche Anträge möchten Sie stellen?" geErm="Geschwisterermäßigung" entErm="Entgeltermäßigung" bifoErm="Bildungsfond" :key="antragswahlKey"/>
      <v-alert
        v-if="
          !(
            this.$store.state.geCheck ||
            this.$store.state.entCheck ||
            this.$store.state.bifoCheck
          )
        "
        type="warning"
        class="pa-2 text-button"
        >Bitte wählen Sie mindestens einen Antrag aus.</v-alert
      >
      <p v-else></p>

      <v-tabs fixed-tabs color="#fff" v-model="activeTab">
        <v-tab
          class="pa-4"
          tile
          @click="funcShowAntragstellerDaten"
          :key="tabs[0]"
          >Antragsteller/in
        </v-tab>
        <v-tab class="pa-4" tile @click="funcShowKindDaten" :key="tabs[1]"
          >Kind/er
        </v-tab>
        <v-tab class="pa-4" tile @click="funcShowNachweise" :key="tabs[2]"
          >Nachweise
        </v-tab>
        <v-tab class="pa-4" tile @click="funcShowAbschicken" :key="tabs[3]"
          >Abschicken
        </v-tab>
      </v-tabs>

      <Antragsteller
        v-if="AntragstellerDaten"
        :personlist="person_list"
        :key="antragstellerKey"
      />

      <Kind v-if="KindDaten" :childlist="child_list" :key="kindKey"/>

      <Nachweise v-if="Nachweise" :key="nachweiseKey" />
      <v-btn
        v-if="Nachweise"
        class="mt-6"
        justify="center"
        @click="funcShowAbschicken"
        color="accent"
      >
        weiter
        <v-icon> mdi-arrow-right-bold-circle-outline </v-icon>
      </v-btn>

      <v-btn
        v-if="Nachweise"
        class="d-block mx-auto my-8"
        @click="funcShowKindDaten"
      >
        <v-icon> mdi-arrow-left-bold-circle-outline </v-icon>
        Kind/er
      </v-btn>

      <Abschicken
        v-if="Abschicken"
        :child_list="this.child_list"
        :person_list="this.person_list"
        :key="abschickenKey"
      />
    </v-container>
  </div>
</template>


<script>
import Antragswahl from "@/components/Antragswahl.vue";
import Antragsteller from "@/components/Antragsteller.vue";
import Kind from "@/components/Kind.vue";
import Nachweise from "@/components/Nachweise.vue";
import Abschicken from "@/components/Abschicken.vue";

var data_upload;

export default {
  name: "Apply",
  components: {
    Antragswahl,
    Antragsteller,
    Kind,
    Nachweise,
    Abschicken,
  },
  data() {
    return {
      antragswahlKey: 0,
      antragstellerKey: 0,
      kindKey: 0,
      nachweiseKey: 0,
      abschickenKey: 0,
      tmp: null,
      upload: null,
      geCheck: false,
      entCheck: false,
      bifoCheck: false,

      AntragstellerDaten: true,
      KindDaten: false,
      Nachweise: false,
      Abschicken: false,

      person_list: [],
      child_list: [],
      tabs: [0, 1, 2, 3],
      activeTab: 0,

      //RULES
      nameRules: [(value) => !!value || "Pflichtfeld. Bitte ausfüllen!"],
      numberRules: [
        (value) => !!value || "Pflichtfeld. Bitte ausfüllen!",
        (value) =>
          /(?=.*\d)/.test(value) ||
          "Pflichtfeld. Hausnummer muss mindestens eine Zahl enthalten!",
      ],
      plzRules: [
        (value) => !!value || "Pflichtfeld. Bitte ausfüllen!",
        (value) =>
          value.length === 5 || "Postleitzahl sollte genau 5 Ziffern lang sein",
      ],
      emailRules: [
        (value) => !!value || "Pflichtfeld. Bitte ausfüllen!",
        (value) =>
          /.+@.+\..+/.test(value) || "Bitte geben Sie eine gülitge E-mail an!",
      ],
      telRules: [
        (value) => !!value || "Pflichtfeld. Bitte ausfüllen!",
        (value) =>
          /^\d+$/.test(value) ||
          "Die Telefonnummer darf nur aus Zahlen bestehen!",
      ],
      ibanRules: [
        (value) => !!value || "Pflichtfeld. Bitte ausfüllen!",
        (value) =>
          (value && value.length >= 22) ||
          "Pflichtfeld. Bitte gültige IBAN eingeben!",
      ],
      dateRules: [(value) => !!value || "Pflichtfeld. Bitte ausfüllen!"],
      radioRules: [(value) => value != 0],
    };
  },

  watch: {
    //JSON UPLOAD
    upload: function (val) {
      let file = val[0];
      let fileReader = new FileReader();
      fileReader.readAsText(file);

      fileReader.onload = function () {
        //alert(fileReader.result);
        data_upload = fileReader.result;
        console.log(data_upload);
      };
    },

    child_list: function (val) {
      this.$store.commit("setChildList", val);
    },
    person_list: function (val) {
      this.$store.commit("setPersonList", val);
    },

    geCheck: function (val) {
      for (let i = 0; i < this.child_list.length; i++) {
        this.child_list[i].geCheck = val;
      }
    },
    entCheck: function (val) {
      for (let i = 0; i < this.child_list.length; i++) {
        this.child_list[i].entCheck = val;
      }
    },
    bifoCheck: function (val) {
      for (let i = 0; i < this.child_list.length; i++) {
        this.child_list[i].bifoCheck = val;
      }
    },
  },

  created() {
    this.geCheck = this.$store.state.geCheck;
    this.entCheck = this.$store.state.entCheck;
    this.bifoCheck = this.$store.state.bifoCheck;
  },

  methods: {
    funcShowAntragstellerDaten() {
      this.AntragstellerDaten = true;
      this.KindDaten = false;
      this.Nachweise = false;
      this.Abschicken = false;
      this.activeTab = 0;
    },

    funcShowKindDaten() {
      this.AntragstellerDaten = false;
      this.KindDaten = true;
      this.Nachweise = false;
      this.Abschicken = false;
      this.activeTab = 1;

      if (this.$store.state.geCheck && this.child_list.length == 0) {
        var geschwisterkind = new Object();
        geschwisterkind.id = 0;
        geschwisterkind.geCheck = this.geCheck;
        geschwisterkind.entCheck = this.entCheck;
        geschwisterkind.bifoCheck = this.bifoCheck;
        geschwisterkind.sibling_firstname = "";
        geschwisterkind.sibling_lastname = "";
        geschwisterkind.date_sibling = "";
        geschwisterkind.date_bb = "";
        geschwisterkind.radioGroupBetreuungsform_sibling = 0;
        geschwisterkind.tagespflegename = "";
        geschwisterkind.institutionstreet = "";
        geschwisterkind.institutionnumber = "";
        geschwisterkind.institutionpostcode = "";
        geschwisterkind.institutiontown = "";
        geschwisterkind.institutionname = "";
        geschwisterkind.betreuungsentgelt = 0;
        geschwisterkind.vorjahr_checkbox = false;
        geschwisterkind.essensgeld = 0;
        geschwisterkind.elternbeitrag = 0;
        geschwisterkind.sibling_ent_checkbox = false;
        geschwisterkind.sibling_bifo_checkbox = false;
        geschwisterkind.essensgeld = 0;
        geschwisterkind.gueltig = "";
        geschwisterkind.kostenerstattung = "";
        geschwisterkind.bifo_begr = "";
        this.child_list.push(geschwisterkind);
      }
    },

    funcShowNachweise() {
      this.AntragstellerDaten = false;
      this.KindDaten = false;
      this.Nachweise = true;
      this.Abschicken = false;
      this.activeTab = 2;
    },

    funcShowAbschicken() {
      this.AntragstellerDaten = false;
      this.KindDaten = false;
      this.Nachweise = false;
      this.Abschicken = true;
      this.activeTab = 3;
    },

    setCheckbox() {
      this.ge_checkbox = !this.ge_checkbox;
    },

    addChild() {
      // neues geKind erzeugen
      var geschwisterkind = new Object();

      //ans Ende der Liste anfügen indem die richtige ID ermittelt wird
      if (this.child_list.length == 0) {
        geschwisterkind.id = 0;
        geschwisterkind.geCheck = this.$store.state.geCheck;
        geschwisterkind.entCheck = this.$store.state.entCheck;
        geschwisterkind.bifoCheck = this.$store.state.bifoCheck;
        geschwisterkind.sibling_firstname = "";
        geschwisterkind.sibling_lastname = "";
        geschwisterkind.date_sibling = "";
        geschwisterkind.date_bb = "";
        geschwisterkind.radioGroupBetreuungsform_sibling = 0;
        geschwisterkind.tagespflegename = "";
        geschwisterkind.institutionstreet = "";
        geschwisterkind.institutionnumber = "";
        geschwisterkind.institutionpostcode = "";
        geschwisterkind.institutiontown = "";
        geschwisterkind.institutionname = "";
        geschwisterkind.betreuungsentgelt = 0;
        geschwisterkind.vorjahr_checkbox = false;
        geschwisterkind.essensgeld = 0;
        geschwisterkind.elternbeitrag = 0;
        geschwisterkind.sibling_ent_checkbox = false;
        geschwisterkind.sibling_bifo_checkbox = false;
        geschwisterkind.essensgeld = 0;
        geschwisterkind.gueltig = "";
        geschwisterkind.bifo_begr = "";
        geschwisterkind.kostenerstattung = "";
      } else {
        // vermeide Duplikate
        geschwisterkind.id = this.child_list[this.child_list.length - 1].id + 1;
        geschwisterkind.geCheck = this.$store.state.geCheck;
        geschwisterkind.entCheck = this.$store.state.entCheck;
        geschwisterkind.bifoCheck = this.$store.state.bifoCheck;
        geschwisterkind.sibling_firstname = "";
        geschwisterkind.sibling_lastname = "";
        geschwisterkind.date_sibling = "";
        geschwisterkind.date_bb = "";
        geschwisterkind.radioGroupBetreuungsform_sibling = 0;
        geschwisterkind.tagespflegename = "";
        geschwisterkind.institutionstreet = "";
        geschwisterkind.institutionnumber = "";
        geschwisterkind.institutionpostcode = "";
        geschwisterkind.institutiontown = "";
        geschwisterkind.institutionname = "";
        geschwisterkind.betreuungsentgelt = 0;
        geschwisterkind.vorjahr_checkbox = false;
        geschwisterkind.essensgeld = 0;
        geschwisterkind.elternbeitrag = 0;
        geschwisterkind.sibling_ent_checkbox = false;
        geschwisterkind.sibling_bifo_checkbox = false;
        geschwisterkind.essensgeld = 0;
        geschwisterkind.gueltig = "";
        geschwisterkind.bifo_begr = "";
        geschwisterkind.kostenerstattung = "";
      }
      //eintragen des neuen Geschwisterkinds in das Array
      this.child_list.push(geschwisterkind);
    },
    deleteChild(id) {
      // Suche nach ID im Todo-Array und entferne das Element
      // https://love2dev.com/blog/javascript-remove-from-array/
      // Am einfachsten geht das über array.filter()deleteTodo(id) {
      this.child_list = this.child_list.filter(
        (geschwisterkind) => geschwisterkind.id !== id
      );
    },

    addPerson() {
      // neues todo erzeugen
      var neueperson = new Object();

      //ans Ende der Liste anfügen indem die richtige ID ermittelt wird
      if (this.person_list.length == 0) {
        neueperson.id = 0;
        neueperson.firstname_person = "";
        neueperson.lastname_person = "";
        neueperson.date_p = "";
        neueperson.verwandtschaft_p = "";
      } else {
        // vermeide Duplikate
        neueperson.id = this.person_list[this.person_list.length - 1].id + 1;
        neueperson.firstname_person = "";
        neueperson.lastname_person = "";
        neueperson.date_p = "";
        neueperson.verwandtschaft_p = "";
      }
      //eintragen der neuen Person in das Array
      this.person_list.push(neueperson);
    },
    deletePerson(id) {
      // Suche nach ID im Todo-Array und entferne das Element
      // https://love2dev.com/blog/javascript-remove-from-array/
      // Am einfachsten geht das über array.filter()deleteTodo(id) {
      this.person_list = this.person_list.filter(
        (neueperson) => neueperson.id !== id
      );
    },
    setGeCheck(state) {
      this.geCheck = state;
    },
    setEntCheck(state) {
      this.entCheck = state;
    },
    setBifoCheck(state) {
      this.bifoCheck = state;
    },
    forceRerender() {
      this.antragswahlKey += 1;
      this.antragstellerKey += 1;
      this.kindKey += 1;
      this.nachweiseKey += 1;
      this.abschickenKey += 1;
    },
    //JSON DATEI UPLOAD
    load_data() {
      this.tmp = data_upload;
      //Daten der hochgeladenen txt Datei in jsondatei umwandeln
      this.tmp = JSON.parse(this.tmp);
      //übernahme der Daten in den Store
      this.person_list = this.tmp.person_list;
      this.child_list = this.tmp.child_list;

      this.$store.state.geCheck = this.tmp.geCheck;
      this.$store.state.entCheck = this.tmp.entCheck;
      this.$store.state.bifoCheck = this.tmp.bifoCheck;

      this.geCheck = this.tmp.geCheck;
      this.entCheck = this.tmp.entCheck;
      this.bifoCheck = this.tmp.bifoCheck;

      this.$store.state.firstname = this.tmp.firstname;
      this.$store.state.lastname = this.tmp.lastname;
      this.$store.state.street = this.tmp.street;
      this.$store.state.number = this.tmp.number;
      this.$store.state.postcode = this.tmp.postcode;
      this.$store.state.town = this.tmp.town;
      this.$store.state.email = this.tmp.email;
      this.$store.state.tel = this.tmp.tel;

      this.$store.state.date = this.tmp.date;
      this.$store.state.date_child = this.tmp.date_child;
      this.$store.state.date_bb = this.tmp.date_bb;
      this.$store.state.radioGroupAntragsgrundlage =
        this.tmp.radioGroupAntragsgrundlage;
      this.$store.state.antragsgrundlage = this.tmp.antragsgrundlage;
      this.$store.state.privatinsolvenz = this.tmp.privatinsolvenz;
      this.$store.state.radioGroupErmaeßigung = this.tmp.radioGroupErmaeßigung;
      this.$store.state.radioGroupBetreuungsform =
        this.tmp.radioGroupBetreuungsform;

      this.$store.state.vorjahr_checkbox = this.tmp.vorjahr_checkbox;
      this.$store.state.eigentum_checkbox = this.tmp.eigentum_checkbox;

      this.$store.state.kontoinhaber = this.tmp.kontoinhaber;
      this.$store.state.iban = this.tmp.iban;
      this.$store.state.bic = this.tmp.bic;
      this.$store.state.bank = this.tmp.bank;

      this.$store.state.child_firstname = this.tmp.child_firstname;
      this.$store.state.child_lastname = this.tmp.child_lastname;
      this.$store.state.institutionstreet = this.tmp.institutionstreet;
      this.$store.state.institutionnumber = this.tmp.institutionnumber;
      this.$store.state.institutionpostcode = this.tmp.institutionpostcode;
      this.$store.state.institutiontown = this.tmp.institutiontown;
      this.$store.state.institutionname = this.tmp.institutionname;
      this.$store.state.tagespflegename = this.tmp.tagespflegename;
      this.$store.state.betreuungsform = this.tmp.betreuungsform;

      this.$store.state.betreuungsumfang = this.tmp.betreuungsumfang;
      this.$store.state.betreuungsbeginn = this.tmp.betreuungsbeginn;
      this.$store.state.betreuungsentgelt = this.tmp.betreuungsentgelt;
      this.$store.state.elternbeitrag = this.tmp.elternbeitrag;
      this.$store.state.essensgeld = this.tmp.essensgeld;

      this.$store.state.kostenerstattung = this.tmp.kostenerstattung;
      this.$store.state.gueltig = this.tmp.gueltig;
      this.$store.state.bifo_begr = this.tmp.bifo_begr;

      this.$store.state.elternteil1 = this.tmp.elternteil1;
      this.$store.state.elternteil2 = this.tmp.elternteil2;

      this.$store.state.haushaltseinkommen = this.tmp.haushaltseinkommen;
      //DATEN IN DER ANZEIGE AKTUALISIEREN
      this.forceRerender();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

