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
      /* newItemsResult: {
        itemID: null,
        answer: null,
        finalDifficulty: null
      },
      newItemsArray: [newItemsResult,newItemsResult,newItemsResult],
      showChilds: [false,false,false,false,false,false,false,false], */
      test: true,
      test2: false,
      AntragstellerDaten: true,
      KindDaten: false,
      Nachweise: false,
      Abschicken: false,

      /* firstname: "",
      lastname: "",
      street: "",
      number: "",
      postcode: "",
      town: "",
      email: "",
      tel: "", */
      //storeData: "",
      /* elternbeitrag: "",
      betreuungsbeginn: "",
      date: null,
      date_child: null,
      date_bb: null,
      menu: false,
      menu_child: false,
      menu_bb: false, */
/* 
      antragsgrundlage: ["Privatinsolvenz", "Keine Sozialleistungen"], *//* 
      betreuungsform: ["Krippe", "Elementar", "Hort"], */

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

  watch: {/* 
    firstname: function (val) {
      this.$store.commit("setFirstname", val);
    },
    lastname: function (val) {
      this.$store.commit("setLastname", val);
    },
    street: function (val) {
      this.$store.commit("setStreet", val);
    },
    number: function (val) {
      this.$store.commit("setNumber", val);
    },
    postcode: function (val) {
      this.$store.commit("setPostcode", val);
    },
    town: function (val) {
      this.$store.commit("setTown", val);
    }, *//* 
    date: function (val) {
      this.$store.commit("setDate", val);
    },
    date_child: function (val) {
      this.$store.commit("setDate_child", val);
    },
    date_bb: function (val) {
      this.$store.commit("setDate_bb", val);
    },
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
    menu_child(val) {
      val && setTimeout(() => (this.$refs.picker_child.activePicker = "YEAR"));
    },
    menu_bb(val) {
      val && setTimeout(() => (this.$refs.picker_bb.activePicker = "YEAR"));
    }, */
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
    } /* 
    save(date) {
      this.$refs.menu.save(date);
    },
    save_child(date_child) {
      this.$refs.menu_child.save(date_child);
    },
    save_bb(date_bb) {
      this.$refs.menu_bb.save(date_bb);
    }, */,

    /*updateData() {
      this.storeData = this.$store.state.firstname;
    },*/
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
