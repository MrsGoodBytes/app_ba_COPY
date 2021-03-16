<template>
  <div id="antrag_auswahl" class="hello">
    <h1 class="text-base font-semibold">{{ msg }}</h1>
    <v-container>
      <Antragswahl msg="Welche Anträge möchtest du stellen?" />
      <v-row>
        <v-btn color="purple" tile @click="funcShowAntragstellerDaten"
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
      test: true,
      test2: false,
      AntragstellerDaten: true,
      KindDaten: false,
      Nachweise: false,
      Abschicken: false,

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
          (value && value.length == 5 && /^\d+$/.test(value)) ||
          "Pflichtfeld! Postleitzahl sollte ein fünfstelliger Wert sein und nur aus Ziffern bestehen.",
      ],
      emailRules: [
        (value) => !!value || "Pflichtfeld. Bitte ausfüllen!",
        (value) =>
          /.+@.+\..+/.test(value) || "Bitte geben Sie eine gülitge E-mail an!",
      ],
      telRules: [
        (value) => !!value || "Pflichtfeld. Bitte ausfüllen!",
        (value) =>
          (value && value.length >= 9 && /^\d+$/.test(value)) ||
          "Pflichtfeld. Bitte gültige Telefonnummer eingeben! Darf keine Buchstaben enthalten.",
      ],
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
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
