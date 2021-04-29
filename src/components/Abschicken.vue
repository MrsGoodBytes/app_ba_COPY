<template>
  <div id="Nachweise">
    <h2 class="py-3">Anträge absenden</h2>
    <h5 class="pb-3">Bitte prüfen Sie die Angaben auf ihre Richtigkeit!</h5>

    <v-row>
      <v-col>
        <v-text-field
          readonly
          v-model="firstname"
          :rules="nameRules"
          required
        ></v-text-field>
      </v-col>
      <v-col>
          <v-text-field
          readonly
          v-model="adress"
          :rules="nameRules"
          required
        ></v-text-field>
      </v-col>
      <v-col>
      </v-col>
      <v-col></v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Abschicken",
  props: {},
  data() {
    return {
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
      ibanRules: [
        (value) => !!value || "Pflichtfeld. Bitte ausfüllen!",
        (value) =>
          (value && value.length >= 22 && /^\d+$/.test(value)) ||
          "Pflichtfeld. Bitte gültige IBAN eingeben!",
      ],
    };
  },

  created() {
    this.firstname = this.$store.state.firstname + " " + this.$store.state.lastname;
    this.adress = this.$store.state.street + " " + this.$store.state.number + " " + this.$store.state.postcode + " " + this.$store.state.town;
  },

  watch: {},

  methods: {},
};
</script>
