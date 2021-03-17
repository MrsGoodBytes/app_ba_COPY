<template>
  <div id="antrag_auswahl">
    <v-container>
      <Antragswahl msg="Welche Anträge möchtest du stellen?" />
      <v-row>
        <v-btn class="bg-purple-600 text-white text-base font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200" color="primary" tile @click="funcShowAntragstellerDaten"
          >Antragsteller/in</v-btn
        >
        <v-btn tile @click="funcShowKindDaten">Kind/er</v-btn>
        <v-btn tile @click="funcShowNachweise">Nachweise</v-btn>
        <v-btn tile @click="funcShowAbschicken">Abschicken</v-btn>
      </v-row>
      <Antragsteller v-if="AntragstellerDaten" />
      <Kind v-if="KindDaten" />
    </v-container>
  </div>
</template>

<script>
import Antragswahl from "@/components/Antragswahl.vue";
import Antragsteller from "@/components/Antragsteller.vue";
import Kind from "@/components/Kind.vue";

export default {
  name: "Apply",
  components: {
    Antragswahl,
    Antragsteller,
    Kind,
  },
  data() {
    return {
      AntragstellerDaten: true,
      KindDaten: false,
      Nachweise: false,
      Abschicken: false,
    };
  },

  watch: {
  },

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
    } 
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

