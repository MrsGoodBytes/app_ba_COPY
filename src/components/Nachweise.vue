<template>
  <div id="Nachweise">
    <h2 class="py-3">Nachweise</h2>
    <h3>Auf Grund Ihrer Angaben werden folgende Nachweise benötigt:</h3>

    

    <h4
      v-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 2
      "
    >
      Nachweis Sozialleistungen
    </h4>
    <v-row
      v-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 2
      "
    >
      <v-col
        ><v-file-input
          accept="image/*"
          label="Nachweis über den Empfang von Sozialleistungen"
          chips
          truncate-length="23"
        ></v-file-input>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon color="primary" dark v-bind="attrs" v-on="on"
              >mdi-home Was sind Sozialleistungen?</v-icon
            >
          </template>
          <span>Zu Sozialleistungen zählen Arbeitslosengeld II (ALGII), Grundsicherung, Asylbewerberleistungsgesetz, Kinderzuschlag der Familienkasse oder Wohngeld. Das Nachweis über eine der hier aufgeführten Leistungen reicht aus.</span>
        </v-tooltip>
      </v-col>
    </v-row>
    <h4
      v-else-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 1
      "
    >
      Nachweise Familieneinkommen
    </h4>
    
    <v-row
      v-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 2
      "
    >
      <v-col
        ><v-file-input
          accept="image/*"
          label="Nachweis über den Empfang von Sozialleistungen"
          chips
          truncate-length="23"
        ></v-file-input>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon color="accent" dark v-bind="attrs" v-on="on"
              >mdi-information</v-icon
            >
          </template>
          <span>Zu Sozialleistungen zählen Arbeitslosengeld II (ALGII), Grundsicherung, Asylbewerberleistungsgesetz, Kinderzuschlag der Familienkasse oder Wohngeld. Das Nachweis über eine der hier aufgeführten Leistungen reicht aus.</span>
        </v-tooltip>
      </v-col>
    </v-row><v-row
      v-else-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 1
      "
    >
      <v-col
        ><v-file-input
          accept="image/*"
          label="Einkommen des Mannes oder sowas Liste muss angeschaut werden"
          chips
          truncate-length="23"
        ></v-file-input>
      </v-col>
      <v-col
        ><v-file-input
          accept="image/*"
          label="noch ein NachweisEinkommen des Mannes oder sowas Liste muss angeschaut werden"
          chips
          truncate-length="23"
        ></v-file-input>
      </v-col>
    </v-row>
    <p v-else></p>

    <v-divider></v-divider>

    <h4
      v-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 1
      "
    >
      Nachweise Belastungen
    </h4>
    <v-row
      v-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 1
      "
    >
      <v-col
        ><v-file-input
          accept="image/*"
          label="Einkommen des Mannes oder sowas Liste muss angeschaut werden"
          chips
          truncate-length="23"
        ></v-file-input>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <h4
      v-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 1
      "
    >
      Nachweise Einkommensgrenze
    </h4>
    <v-row
      v-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 1
      "
    >
      <v-col
        ><v-file-input
          accept="image/*"
          label="Einkommen des Mannes oder sowas Liste muss angeschaut werden"
          chips
          truncate-length="23"
        ></v-file-input>
      </v-col>
    </v-row>
    <v-row v-else-if="this.$store.state.bifoCheck">
      <v-col v-if="this.$store.state.radioGroupAntragsgrundlage === 0">
        <v-file-input
          accept="image/*"
          label="Nachweis über Privatinsolvenz hier hochladen"
          chips
          truncate-length="23"
        ></v-file-input>
      </v-col>
      <p v-else></p>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Nachweise",
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

  created() {},

  watch: {},

  methods: {},
};
</script>
