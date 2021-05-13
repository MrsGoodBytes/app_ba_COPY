<template>
  <div id="antrag_auswahl">
    <v-container>
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
      <v-tabs fixed-tabs background-color="indigo" dark v-model="activeTab">
        <v-tab
          class="pa-4"
          color="primary"
          tile
          @click="funcShowAntragstellerDaten"
          :key="tabs[0]"
          >Antragsteller/in
        </v-tab>
        <v-tab
          class="pa-4"
          color="primary"
          tile
          @click="funcShowKindDaten"
          :key="tabs[1]"
          >Kind/er
        </v-tab>
        <v-tab
          class="pa-4"
          color="primary"
          tile
          @click="funcShowNachweise"
          :key="tabs[2]"
          >Nachweise
        </v-tab>
        <v-tab
          class="pa-4"
          color="primary"
          tile
          @click="funcShowAbschicken"
          :key="tabs[3]"
          >Abschicken
        </v-tab>
      </v-tabs>

      <Antragsteller v-if="AntragstellerDaten" :personlist="person_list" />

      <Kind v-if="KindDaten" />
      <!-- nur wenn KEIN Entgeltantrag aber Geschwisterermäßigung -->
      <geschwisterkind msg="Geschwisterkind" :childlist="child_list" />
      <v-btn
        v-if="
          KindDaten && this.$store.state.geCheck && !this.$store.state.entCheck
        "
        class="mt-6"
        justify="center"
        v-on:click="addChild"
      >
        Geschwisterkind hinzufügen
        <v-icon> mdi-plus </v-icon>
      </v-btn>

      <!-- wenn nur oder auch Entgeltantrag -->
      <entgeltkind msg="Entgeltkind" :entgeltkindlist="entgeltkind_list" />
      <v-btn
        v-if="KindDaten && this.$store.state.entCheck"
        class="mt-6"
        justify="center"
        v-on:click="addEntgeltkind"
      >
        Geschwisterkind hinzufügen
        <v-icon> mdi-plus </v-icon>
      </v-btn>
      <v-btn
        v-if="KindDaten"
        class="d-block mx-auto my-6"
        @click="funcShowNachweise"
      >
        weiter
        <v-icon> mdi-arrow-right-bold-circle-outline </v-icon>
      </v-btn>

      <Nachweise v-if="Nachweise" />
      <v-btn
        v-if="Nachweise"
        class="my-6"
        justify="center"
        @click="funcShowAbschicken"
      >
        weiter
        <v-icon> mdi-arrow-right-bold-circle-outline </v-icon>
      </v-btn>

      <Abschicken v-if="Abschicken" />
    </v-container>
  </div>
</template>


<script>
import Antragswahl from "@/components/Antragswahl.vue";
import Antragsteller from "@/components/Antragsteller.vue";
import Kind from "@/components/Kind.vue";
import Nachweise from "@/components/Nachweise.vue";
import Abschicken from "@/components/Abschicken.vue";
import geschwisterkind from "@/components/geschwisterkind.vue";
import entgeltkind from "@/components/entgeltkind.vue";

export default {
  name: "Apply",
  components: {
    Antragswahl,
    Antragsteller,
    Kind,
    Nachweise,
    Abschicken,
    geschwisterkind,
    entgeltkind,
  },
  data() {
    return {
      AntragstellerDaten: true,
      KindDaten: false,
      Nachweise: false,
      Abschicken: false,

      person_list: [],
      child_list: [],
      entgeltkind_list: [],
      tabs: [0, 1, 2, 3],
      activeTab: 0,
    };
  },

  watch: {},

  methods: {
    testFunktion() {
      this.test = !this.test;
      this.test2 = !this.test2;
    },

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
      // neues todo erzeugen
      var geschwisterkind = new Object();

      //ans Ende der Liste anfügen indem die richtige ID ermittelt wird
      if (this.child_list.length == 0) {
        geschwisterkind.id = 0;
        geschwisterkind.sibling_firstname = "";
        geschwisterkind.sibling_lastname = "";
        geschwisterkind.date_sibling = "";
      } else {
        // vermeide Duplikate
        geschwisterkind.id = this.child_list[this.child_list.length - 1].id + 1;
        geschwisterkind.sibling_firstname = "";
        geschwisterkind.sibling_lastname = "";
        geschwisterkind.date_sibling = "";
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

    addEntgeltkind() {
      // neues todo erzeugen
      var entgeltkind = new Object();

      //ans Ende der Liste anfügen indem die richtige ID ermittelt wird
      if (this.entgeltkind_list.length == 0) {
        entgeltkind.id = 0;
        entgeltkind.firstname = "";
        entgeltkind.lastname = "";
        entgeltkind.date = "";
      } else {
        // vermeide Duplikate
        entgeltkind.id =
          this.entgeltkind_list[this.entgeltkind_list.length - 1].id + 1;
        entgeltkind.firstname = "";
        entgeltkind.lastname = "";
        entgeltkind.date = "";
      }

      //eintragen des neuen Geschwisterkinds in das Array

      this.entgeltkind_list.push(entgeltkind);
    },
    deleteEntgeltkind(id) {
      // Suche nach ID im Todo-Array und entferne das Element
      // https://love2dev.com/blog/javascript-remove-from-array/
      // Am einfachsten geht das über array.filter()deleteTodo(id) {
      this.entgeltkind_list = this.entgeltkind_list.filter(
        (entgeltkind) => entgeltkind.id !== id
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

