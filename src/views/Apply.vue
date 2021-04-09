<template>
    <div id="antrag_auswahl">
      <v-container>
        <Antragswahl msg="Welche Anträge möchtest du stellen?" />
        <div class="pa-10">
          <v-btn
            class="bg-purple-600 text-white text-base font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
            color="primary"
            tile
            @click="funcShowAntragstellerDaten"
            >Antragsteller/in</v-btn
          >
          <v-btn
            class="bg-purple-600 text-white text-base font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
            color="primary"
            tile
            @click="funcShowKindDaten"
            >Kind/er</v-btn
          >
          <v-btn
            class="bg-purple-600 text-white text-base font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
            color="primary"
            tile
            @click="funcShowNachweise"
            >Nachweise</v-btn
          >
          <v-btn
            class="bg-purple-600 text-white text-base font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
            color="primary"
            tile
            @click="funcShowAbschicken"
            >Abschicken</v-btn
          >
        </div>
        <Antragsteller v-if="AntragstellerDaten" />
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
          weiteres Kind erfassen
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
import geschwisterkind from "@/components/geschwisterkind.vue";

export default {
  name: "Apply",
  components: {
    Antragswahl,
    Antragsteller,
    Kind,
    Nachweise,
    geschwisterkind,
  },
  data() {
    return {
      AntragstellerDaten: true,
      KindDaten: false,
      Nachweise: false,
      Abschicken: false,

      child_list: [],
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
    updateStatus(index, newStatus) {
      console.log(status, index);
      // Überschreibe den Status des Todos mit der übergebenen id
      var i = 0;
      for (i; i < this.child_list.length; i++) {
        if (this.child_list[i].id == index) {
          this.child_list[i].status = newStatus;
        }
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

