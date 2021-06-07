<template>
  <div id="antrag_auswahl">
    <v-container>
      <v-card color="#F5F5F5" class="mb-8">
        <v-row class="py-6"
          ><v-col class="text-left pl-16">
            <h1 class="mb-2">Willkommen</h1>
            <h4>
              Erstellen Sie Anträge auf
                  <h3>Entgeltermäßigung Geschwisterermäßigung <br>und Mittel aus dem Bildungsfond</h3>
              jetzt vollständig digital.
            </h4>
          </v-col>
          <v-col cols="12" md="7">
            <v-card outlined class="mx-8 pa-6" color="#E8EAF6">
              <h3 class="">Falls Sie unsicher sind</h3>
              <p>hilft Ihnen unser Test auf Berechtigung weiter:</p>
              <router-link :to="{ name: 'Check' }" href="#" class=""
                ><v-btn color="accent" class="mb-3 text-button"
                  >Welche Anträge sollte ich stellen?</v-btn
                ></router-link
              >
            </v-card>
          </v-col>
        </v-row>
      </v-card>
      <v-card
          class="mx-auto pa-5 my-8"
          outlined
          >
          <h4 class="text-left"><v-icon>mdi-file</v-icon> Du hast eine Datei mit deinen gespeicherten Daten? Dann lade sie hier hoch!</h4>
          <v-file-input
          accept="json/*"
          label="JSON-Datei hochladen"
          v-model="upload"
          chips
          show-size
          counter
          multiple
          truncate-length="23"></v-file-input>
        </v-card>
      <Antragswahl msg="Welche Anträge möchtest du stellen?" />
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

      <Antragsteller v-if="AntragstellerDaten" :personlist="person_list" />

      <Kind v-if="KindDaten" :childlist="child_list" />

      <Nachweise v-if="Nachweise" />
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

      <Abschicken v-if="Abschicken" :child_list="this.child_list" :person_list="this.person_list" />
      
    </v-container>
  </div>
</template>


<script>
import Antragswahl from "@/components/Antragswahl.vue";
import Antragsteller from "@/components/Antragsteller.vue";
import Kind from "@/components/Kind.vue";
import Nachweise from "@/components/Nachweise.vue";
import Abschicken from "@/components/Abschicken.vue";

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
      tmp: null,
      tmp2: null,
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
    upload: function (val) {
      /*const reader = new FileReader();
      this.tmp = val;

      reader.onload = val => {
        const result = JSON.parse(val);
        const formatted = JSON.stringify(result, null, 2);
        this.tmp2 = formatted;
        this.upload = result;
      }
      reader.readAsText(this.upload);*/
      let file = val[0];
      let fileReader = new FileReader();
      fileReader.readAsText(file);
      
      fileReader.onload = function() {
        //alert(fileReader.result);
        
      };
      fileReader.onerror = function() {
        alert(fileReader.error);
      }
      fileReader.onloadend = function() {
        var test = fileReader.result; 
        this.tmp = test;
      }      
    },

    child_list: function (val) {
      this.$store.commit("setChildList", val);
    },
    geCheck: function (val) {
      for(let i = 0; i < this.child_list.length; i++) {
        this.child_list[i].geCheck = val;
      }
    },
    entCheck: function (val) {
      for(let i = 0; i < this.child_list.length; i++) {
        this.child_list[i].entCheck = val;
      }
    },
    bifoCheck: function (val) {
      for(let i = 0; i < this.child_list.length; i++) {
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
        neueperson.firstname = "";
        neueperson.lastname = "";
        neueperson.date = "";
        neueperson.verwandtschaft = "";
      } else {
        // vermeide Duplikate
        neueperson.id = this.person_list[this.person_list.length - 1].id + 1;
        neueperson.firstname = "";
        neueperson.lastname = "";
        neueperson.date = "";
        neueperson.verwandtschaft = "";
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

