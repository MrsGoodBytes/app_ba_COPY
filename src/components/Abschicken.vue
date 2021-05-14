<template>
  <div id="Nachweise">
    <h2 class="py-3">Anträge absenden</h2>
    <h5 class="pb-3">Bitte prüfen Sie die Angaben auf ihre Richtigkeit!</h5>

    <v-row>
      <h4>
        Antragsteller Daten
        <v-btn @click="funcShowAntragstellerDaten"
          ><v-icon color="accent" v-bind="attrs" v-on="on"
            >mdi-pencil</v-icon
          ></v-btn
        >
      </h4>
    </v-row>
    <v-row>
      <v-col cols="3" class="text-left">
        <h6 class="text--disabled">Antragsteller/in</h6>
        <h5>{{ this.name }}</h5>
        <h6 class="text--disabled" v-if="this.$store.state.geCheck">
          Geburtsdatum
        </h6>
        <h5 v-if="this.$store.state.geCheck">{{ this.date }}</h5>
      </v-col>
      <v-col cols="4" class="text-left">
        <h6 class="text--disabled">Anschrift</h6>
        <h5>{{ this.adress }}</h5>
      </v-col>
      <v-col cols="4" class="text-left">
        <h6 class="text--disabled">E-Mail</h6>
        <h5>{{ this.email }}</h5>
        <h6 class="text--disabled">Telefonnummer</h6>
        <h5>{{ this.tel }}</h5>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="3" class="text-left">
        <h6 class="text--disabled">Antragsgrundlage</h6>
        <h5 v-if="this.antragsgrundlage === 1">Privatinsolvenz</h5>
        <h5 v-else-if="this.antragsgrundlage === 2">Einkommen</h5>
        <h5 v-else-if="this.antragsgrundlage === 3">
          Bezug von Sozialleistungen
        </h5>
        <h5 v-else>
          <v-btn @click="funcShowAntragstellerDaten"
            ><v-icon color="secondary" v-bind="attrs" v-on="on"
              >mdi-pencil</v-icon
            ></v-btn
          >
          Antragsgrundlage wählen!
        </h5>
      </v-col>
      <v-col cols="4" class="text-left">
        <h6 class="text--disabled">weitere im Haushalt lebende Personen</h6>
        <h5>{{ this.person }}</h5>
      </v-col>
      <v-col cols="4" class="text-left"> </v-col>
    </v-row>
    <v-divider class="my-8"></v-divider>
    <v-row>
      <h4>
        Kind/er Daten
        <v-btn @click="funcShowKindDaten"
          ><v-icon color="accent" v-bind="attrs" v-on="on"
            >mdi-pencil</v-icon
          ></v-btn
        >
      </h4>
    </v-row>

    <v-row>
      <v-col cols="3" class="text-left">
        <h6 class="text--disabled">Kind</h6>
        <h5>{{ this.child_name }}</h5>
      </v-col>
      <v-col cols="4" class="text-left">
        <h6 class="text--disabled">Geburtstag</h6>
        <h5>{{ this.child_date }}</h5>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3" class="text-left">
        <h6 class="text--disabled">Betreuungsform</h6>
        <h5 v-if="this.betreuung === 0">Krippe</h5>
        <h5 v-else-if="this.betreuung === 1">Elementar</h5>
        <h5 v-else-if="this.betreuung === 2">Hort</h5>
        <h5 v-else-if="this.betreuung === 3">Tagespflege</h5>
        <h5 v-else-if="this.betreuung === 4">Ganztags an Schulen</h5>
      </v-col>
      <v-col cols="4" class="text-left">
        <h6 class="text--disabled">Betreuungseinrichtung</h6>
        <h5 v-if="this.betreuung === 3">{{ this.tagespflege }}</h5>
        <h5 v-else>{{ this.betreuungseinrichtung }}</h5>
      </v-col>
      <v-col cols="4" class="text-left">
        <h6 class="text--disabled">Ermäßigungsantrag im Vorjahr gestellt:</h6>
        <h5 v-if="this.vorjahr === true">ja</h5>
        <h5 v-else>nein</h5>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-if="this.$store.state.entCheck" cols="4" class="text-left">
        <h6 class="text--disabled">Betreuungsbeginn</h6>
        <h5>{{ this.betreuungsbeginn }}</h5>
      </v-col>
      <v-col cols="4" class="text-left">
        <h6 class="text--disabled">Betreuungsentgelt</h6>
        <h5>{{ this.betreuungsentgelt }}</h5>
      </v-col>
      <v-col cols="4" v-if="this.radioGroupBetreuungsform === 3" class="text-left">
        <h6 class="text--disabled">Elternbeitrag</h6>
        <h5>{{ this.elternbeitrag }}</h5>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3" class="text-left">
        <h6 class="text--disabled">Essensgeld</h6>
        <h5>{{ this.essensgeld }}</h5>
      </v-col>
      <v-col cols="3" class="text-left">
        <h6 class="text--disabled">Betreuungsumfang</h6>
        <h5>{{ this.betreuungsumfang }}</h5>
      </v-col>
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
    this.name = this.$store.state.firstname + " " + this.$store.state.lastname;
    this.date = this.$store.state.date;
    this.adress =
      this.$store.state.street +
      " " +
      this.$store.state.number +
      ", " +
      this.$store.state.postcode +
      " " +
      this.$store.state.town;
    this.email = this.$store.state.email;
    this.tel = this.$store.state.tel;
    this.person =
      this.$store.state.firstname_person +
      " " +
      this.$store.state.lastname_person +
      " " +
      this.$store.state.date_p +
      " " +
      this.$store.state.verwandtschaft_p;
    this.child_name =
      this.$store.state.child_firstname +
      " " +
      this.$store.state.child_lastname;
    this.child_date = this.$store.state.date_child;
    this.betreuung = this.$store.state.radioGroupBetreuungsform;
    this.antragsgrundlage = this.$store.state.radioGroupAntragsgrundlage;
    this.tagespflege =
      this.$store.state.tagespflegename +
      " " +
      this.$store.state.institutionstreet +
      " " +
      this.$store.state.institutionnumber +
      ", " +
      this.$store.state.institutionpostcode +
      " " +
      this.$store.state.institutiontown;
    this.betreuungseinrichtung = this.$store.state.institutionname;
    this.vorjahr = this.$store.state.vorjahr_checkbox;
    this.elternbeitrag = this.$store.state.elternbeitrag;
  },

  watch: {},

  methods: {
    funcShowAntragstellerDaten() {
      this.$parent.funcShowAntragstellerDaten();
    },
    funcShowKindDaten() {
      this.$parent.funcShowKindDaten();
    },
  },
};
</script>
