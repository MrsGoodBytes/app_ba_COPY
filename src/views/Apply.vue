<template>
  <div id="antrag_auswahl">
    <v-container>
      <Antragswahl msg="Welche Anträge möchtest du stellen?" />
      <v-tabs fixed-tabs background-color="indigo" dark>
        <v-tab
          class="pa-4"
          color="primary"
          tile
          @click="funcShowAntragstellerDaten"
          >Antragsteller/in
        </v-tab>
        <v-tab class="pa-4" color="primary" tile @click="funcShowKindDaten"
          >Kind/er
        </v-tab>
        <v-tab class="pa-4" color="primary" tile @click="funcShowNachweise"
          >Nachweise
        </v-tab>
        <v-tab class="pa-4" color="primary" tile @click="funcShowAbschicken"
          >Abschicken
        </v-tab>
      </v-tabs>

      <Antragsteller v-if="AntragstellerDaten" />
      <!-- <neueperson
        v-if="AntragstellerDaten && this.$store.state.entCheck"
        msg="im Haushalt lebt:"
        :personlist="person_list"
      />
      <v-btn
        v-if="AntragstellerDaten && this.$store.state.entCheck"
        class="bg-purple-600 text-white text-base font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
        v-on:click="addPerson"
      >
        im Haushalt lebende Person hinzufügen
        <v-icon> mdi-plus </v-icon>
      </v-btn> --><!-- 
      <einkommensnachweis
        v-if="
          AntragstellerDaten &&
          this.$store.state.entCheck &&
          this.$store.state.radioGroupAntragsgrundlage == 1
        "
        msg="MSG EINKOMMENS"
      /> -->
      <Kind v-if="KindDaten" />
      <geschwisterkind
        v-if="this.$store.state.geCheck"
        msg="Geschwisterkind"
        :childlist="child_list"
      />
      <v-btn
        v-if="KindDaten && this.$store.state.geCheck"
        class="bg-purple-600 text-white text-base font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
        v-on:click="addChild"
      >
        Geschwisterkind hinzufügen
        <v-icon> mdi-plus </v-icon>
      </v-btn>
      <Nachweise v-if="Nachweise" />
    </v-container>
  </div>
</template>

<script>
import Antragswahl from "@/components/Antragswahl.vue";
import Antragsteller from "@/components/Antragsteller.vue";
import Kind from "@/components/Kind.vue";
import Nachweise from "@/components/Nachweise.vue";
import geschwisterkind from "@/components/geschwisterkind.vue";/* 
import neueperson from "@/components/neueperson.vue";
import einkommensnachweis from "@/components/einkommensnachweis.vue"; */

export default {
  name: "Apply",
  components: {
    Antragswahl,
    Antragsteller,
    Kind,
    Nachweise,
    geschwisterkind,/* 
    neueperson,
    einkommensnachweis, */
  },
  data() {
    return {
      AntragstellerDaten: true,
      KindDaten: false,
      Nachweise: false,
      Abschicken: false,

      child_list: [],/* 
      person_list: [], */
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
    },

    funcShowKindDaten() {
      this.AntragstellerDaten = false;
      this.KindDaten = true;
      this.Nachweise = false;
      this.Abschicken = false;
    },

    funcShowNachweise() {
      this.AntragstellerDaten = false;
      this.KindDaten = false;
      this.Nachweise = true;
      this.Abschicken = false;
    },

    funcShowAbschicken() {
      this.AntragstellerDaten = false;
      this.KindDaten = false;
      this.Nachweise = false;
      this.Abschicken = true;
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
      } else {
        // vermeide Duplikate
        geschwisterkind.id = this.child_list[this.child_list.length - 1].id + 1;
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
    /* addPerson() {
      // neues todo erzeugen
      var neueperson = new Object();

      //ans Ende der Liste anfügen indem die richtige ID ermittelt wird
      if (this.person_list.length == 0) {
        neueperson.id = 0;
      } else {
        // vermeide Duplikate
        neueperson.id = this.person_list[this.person_list.length - 1].id + 1;
      }

      //eintragen des neuen Geschwisterkinds in das Array

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
    save_p(date_p) {
      this.$refs.menu_p.save(date_p);
    }, */
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

