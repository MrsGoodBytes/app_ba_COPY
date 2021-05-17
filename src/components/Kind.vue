<template>
  <div id="Kind" class="pb-10">
    <h2 class="pt-3">Kind/er</h2>
    <h5 class="pb-3" v-if="this.$store.state.geCheck">
      Bitte tragen Sie hier das Kind ein, für das eine Geschwisterermäßigung
      beantragt wird.
      <v-tooltip max-width="600" bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon color="accent" v-bind="attrs" v-on="on"
            >mdi-information</v-icon
          >
        </template>
        <span
          >Werden mehrere in einem Haushalt lebende Kinder einer Familie
          gleichzeitig in anerkannten Kindertageseinrichtungen,
          Kindertagespflegestellen oder an Lübecker Schulen nach dem Modell
          „Ganztag an Schule“ betreut, übernimmt die Hansestadt Lübeck den
          Elternbeitrag: - für das zweitälteste Kind zur Hälfte - für jedes
          weitere jüngere Kind vollständig Die Ermäßigung erfolgt unabhängig vom
          Einkommen.</span
        >
      </v-tooltip>
    </h5>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row
        ><!-- v-for="n in childList" :key="n" -->
        <v-col>
          <v-text-field
            outlined
            v-model="child_firstname"
            label="Vorname des Kindes"
            :rules="nameRules"
            required
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            outlined
            v-model="child_lastname"
            label="Nachname des Kindes"
            :rules="nameRules"
            required
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            outlined
            v-model="date_child"
            label="Geburtsdatum"
            prepend-icon="mdi-calendar"
            :rules="dateRules"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          v-if="this.$store.state.geCheck || this.$store.state.entCheck"
          class="d-flex"
          cols="12"
          sm="3"
        >
          <h4>Betreuung</h4>
          <v-radio-group v-model="radioGroupBetreuungsform">
            <v-radio
              v-model="betreuungsform"
              ref="betreuungsform"
              v-for="n in radioListBetreuungsform"
              :key="n"
              :label="`${n}`"
              :value="n"
            ></v-radio>
          </v-radio-group>
        </v-col>
        <p v-else></p>
        <v-col v-if="radioGroupBetreuungsform === 3">
          <v-text-field
            outlined
            v-model="tagespflegename"
            label="Name der Tagespflegeperson"
            :rules="nameRules"
            required
          ></v-text-field>
          <v-text-field
            outlined
            v-model="institutionstreet"
            label="Straße der Tagespflege"
            :rules="nameRules"
            required
          ></v-text-field>
          <v-text-field
            outlined
            v-model="institutionnumber"
            label="Hausnummer der Tagespflege"
            :rules="numberRules"
            required
          ></v-text-field>
          <v-text-field
            outlined
            v-model="institutionpostcode"
            label="PLZ der Tagespflege"
            :rules="nameRules"
            required
          ></v-text-field>
          <v-text-field
            outlined
            v-model="institutiontown"
            label="Ort der Tagespflege"
            :rules="nameRules"
            required
          ></v-text-field>
        </v-col>
        <v-col v-else>
          <v-text-field
            outlined
            v-model="institutionname"
            label="Name der Betreuungseinrichtung"
            :rules="nameRules"
            required
          ></v-text-field>
        </v-col>
        <v-col
          v-if="this.$store.state.entCheck"
          class="d-flex"
          cols="12"
          sm="12"
        >
          <v-checkbox
            v-model="vorjahr_checkbox"
            ref="vorjahr_check"
            :label="'Für das Kind wurde im VORJAHR ein Antrag auf Entgelt-Ermäßigung gestellt:'"
          ></v-checkbox>
        </v-col>
        <p v-else></p>
      </v-row>
      <v-row>
        <v-col v-if="this.$store.state.geCheck" class="d-flex" cols="12" sm="4">
          <v-text-field
            outlined
            v-model="date_bb"
            label="Betreuungsbeginn"
            prepend-icon="mdi-calendar"
            :rules="dateRules"
            required
          ></v-text-field>
        </v-col>
        <p v-else></p>
        <v-col
          v-if="this.$store.state.geCheck || this.$store.state.entCheck"
          class="d-flex"
          cols="12"
          sm="4"
        >
          <v-text-field
            outlined
            v-model="betreuungsentgelt"
            prefix="€"
            :rules="moneyRules"
            label="Betreuungsentgelt"
            required
          ></v-text-field>
        </v-col>
        <p v-else></p>
        <v-col v-if="this.$store.state.geCheck" class="d-flex" cols="12" sm="4">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span
              >der Elternbeitrag ist das Betreuungsgeld abzüglich der
              Ermäßigung</span
            >
          </v-tooltip>
          <v-text-field
            outlined
            v-model="elternbeitrag"
            prefix="€"
            :rules="moneyRules"
            label="Elternbeitrag"
            required
          ></v-text-field>
        </v-col>
        <p v-else></p>
      </v-row>
      <v-row>
        <v-col
          v-if="this.$store.state.bifoCheck"
          class="d-flex"
          cols="12"
          sm="4"
        >
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span>monatlicher Betrag</span>
          </v-tooltip>
          <v-text-field
            outlined
            v-model="essensgeld"
            :rules="moneyRules"
            label="Essensgeld"
            prefix="€"
            required
          ></v-text-field>
        </v-col>
        <v-col
          v-if="
            this.$store.state.geCheck && this.radioGroupBetreuungsform === 3
          "
          class="d-flex"
          cols="12"
          sm="4"
        >
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span>Stunden in der Woche</span>
          </v-tooltip>
          <v-text-field
            outlined
            v-model="betreuungsumfang"
            :rules="moneyRules"
            label="Betreuungsumfang"
            required
          ></v-text-field>
        </v-col>
        <p v-else></p>
      </v-row>
    </v-form>

    <div id="Geschwisterkind">
      <h3>Geschwisterkind/er</h3>
      <h5>
        <span v-if="this.$store.state.geCheck && !this.$store.state.entCheck">
          Bitte tragen Sie hier Ihre älteren Kinder ein, die sich ebenfalls in einem
        Betreuungsverhältnis befinden.</span>
        <span v-else-if="this.$store.state.entCheck && !this.$store.state.geCheck">
          Bitte tragen Sie hier alle Ihre Kinder ein, für die Sie eine Ermäßigung beantragen möchten.
          Ausgenommen ist eine Betreuung in der
        betreuten Grundschule.</span>
        <span v-else-if="this.$store.state.entCheck && this.$store.state.geCheck">
          Bitte tragen Sie hier alle Ihre Kinder ein, die sich ebenfalls in einem
        Betreuungsverhältnis befinden und/oder für die Sie eine Ermäßigung beantragen möchten. Ausgenommen für die Entgeltermäßigung ist eine Betreuung in der
        betreuten Grundschule.</span>
      </h5>
      <v-card
        v-for="item in childlist"
        :key="item.id"
        class="pa-8"
        color="#F5F5F5"
      >
        <v-row class="mb-0 px-3">
          <v-col>
            <v-text-field
              outlined
              v-model="item.sibling_firstname"
              label="Vorname des Kindes"
              :rules="nameRules"
              required
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              outlined
              v-model="item.sibling_lastname"
              label="Nachname des Kindes"
              :rules="nameRules"
              required
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              outlined
              v-model="item.date_sibling"
              label="Geburtsdatum"
              prepend-icon="mdi-calendar"
              :rules="dateRules"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- 
        <v-row class="my-0 px-3">
          <v-checkbox 
            class="my-0"
            v-model="item.sibling_ent_checkbox"
            ref="sib_erm_check"
            :label="'Für dieses Kind soll ebenfalls ein Antrag auf Entgeltermäßigung gestellt werden:'"
          ></v-checkbox
        ></v-row>
        <v-row class="my-0 px-3">
          <v-checkbox
            class="my-0"
            v-model="item.sibling_bifo_checkbox"
            ref="sib_bifo_check"
            :label="'Für dieses Kind soll ebenfalls ein Antrag auf Mittel aus dem Bildungsfond gestellt werden:'"
          ></v-checkbox
        ></v-row> -->

        <v-row class="px-3">
          <v-col v-if="item.geCheck" class="d-flex" cols="12" sm="3">
            <h4>Betreuung</h4>
            <v-radio-group v-model="radioGroupBetreuungsform">
              <v-radio
                v-model="item.betreuungsform"
                ref="betreuungsform"
                v-for="n in radioListBetreuungsform_ganz"
                :key="n"
                :label="`${n}`"
                :value="n"
              ></v-radio>
            </v-radio-group>
          </v-col>
          <v-col v-else class="d-flex" cols="12" sm="3">
            <h4>Betreuung</h4>
            <v-radio-group v-model="radioGroupBetreuungsform">
              <v-radio
                v-model="item.betreuungsform"
                ref="betreuungsform"
                v-for="n in radioListBetreuungsform"
                :key="n"
                :label="`${n}`"
                :value="n"
              ></v-radio>
            </v-radio-group>
          </v-col>
          <v-col v-if="radioGroupBetreuungsform === 3">
            <v-text-field
              outlined
              v-model="item.tagespflegename"
              label="Name der Tagespflegeperson"
              :rules="nameRules"
              required
            ></v-text-field>
            <v-text-field
              outlined
              v-model="item.institutionstreet"
              label="Straße der Tagespflege"
              :rules="nameRules"
              required
            ></v-text-field>
            <v-text-field
              outlined
              v-model="item.institutionnumber"
              label="Hausnummer der Tagespflege"
              :rules="numberRules"
              required
            ></v-text-field>
            <v-text-field
              outlined
              v-model="item.institutionpostcode"
              label="PLZ der Tagespflege"
              :rules="nameRules"
              required
            ></v-text-field>
            <v-text-field
              outlined
              v-model="item.institutiontown"
              label="Ort der Tagespflege"
              :rules="nameRules"
              required
            ></v-text-field>
          </v-col>
          <v-col v-else>
            <v-text-field
              outlined
              v-model="item.institutionname"
              label="Name der Betreuungseinrichtung"
              :rules="nameRules"
              required
            ></v-text-field>
          </v-col>
          <v-col
          v-if="item.geCheck"
          class="d-flex"
          cols="12"
          sm="12"
        >
          <v-checkbox
            v-model="item.vorjahr_checkbox"
            ref="vorjahr_check"
            :label="'Für das Kind wurde im VORJAHR ein Antrag auf Entgelt-Ermäßigung gestellt:'"
          ></v-checkbox>
        </v-col>
        <p v-else></p>
        </v-row>

        <v-row>
          <v-col
            v-if="item.geCheck"
            class="d-flex"
            cols="12"
            sm="4"
          >
            <v-text-field
              outlined
              v-model="item.date_bb"
              label="Betreuungsbeginn"
              prepend-icon="mdi-calendar"
              :rules="dateRules"
              required
            ></v-text-field>
          </v-col>
          <p v-else></p>
          <v-col class="d-flex" cols="12" sm="4">
            <v-text-field
              outlined
              v-model="item.betreuungsentgelt"
              prefix="€"
              :rules="moneyRules"
              label="Betreuungsentgelt"
              required
            ></v-text-field>
          </v-col>
          <v-col class="d-flex" cols="12" sm="4">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="accent" v-bind="attrs" v-on="on"
                  >mdi-information</v-icon
                >
              </template>
              <span
                >der Elternbeitrag ist das Betreuungsgeld abzüglich der
                Ermäßigung</span
              >
            </v-tooltip>
            <v-text-field
              outlined
              v-model="item.elternbeitrag"
              prefix="€"
              :rules="moneyRules"
              label="Elternbeitrag"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="pt-0">
            <v-btn
              class="ma-0"
              text
              outlined
              color="secondary"
              @click="deleteChild(item.id)"
            >
              Einträge dieses Kindes löschen
              <v-icon> mdi-alert </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
      <v-btn class="my-4" @click="addChild">
        Geschwisterkind hinzufügen
        <v-icon> mdi-plus </v-icon>
      </v-btn>
    </div>

    <v-btn
      class="d-block mx-auto my-6"
      @click="funcShowNachweise"
      :disabled="!valid"
    >
      weiter
      <v-icon> mdi-arrow-right-bold-circle-outline </v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "Kind",
  props: {
    childlist: Array,
  },
  data() {
    return {
      valid: false,

      child_firstname: "",
      child_lastname: "",

      elternbeitrag: "",
      betreuungsbeginn: "",
      betreuungsentgelt: "",
      essensgeld: "",

      tagespflegename: "",
      institutionstreet: "",
      institutionnumber: "",
      institutionpostcode: "",
      institutiontown: "",
      institutionname: "",

      vorjahr_checkbox: false,
      sibling_ent_checkbox: false,
      sibling_bifo_checkbox: false,

      betreuungsform: "",
      betreuungsumfang: "",
      radioGroupBetreuungsform: 0,
      radioListBetreuungsform: [
        "Krippe",
        "Elementar",
        "Hort",
        "Tagespflege",
      ],
      radioListBetreuungsform_ganz: [
        "Krippe",
        "Elementar",
        "Hort",
        "Tagespflege",
        "Ganztags an Schule",
      ],

      //RULES
      nameRules: [(value) => !!value || "Pflichtfeld. Bitte ausfüllen!"],
      moneyRules: [(value) => !!value || "Pflichtfeld. Bitte ausfüllen!"],
      telRules: [
        (value) => !!value || "Pflichtfeld. Bitte ausfüllen!",
        (value) =>
          (value && value.length >= 9 && /^\d+$/.test(value)) ||
          "Pflichtfeld. Bitte gültige Telefonnummer eingeben! Darf keine Buchstaben enthalten.",
      ],
      dateRules: [(value) => !!value || "Pflichtfeld. Bitte ausfüllen!"],
      //RULES

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
    };
  },

  watch: {
    child_firstname: function (val) {
      this.$store.commit("setChildFirstname", val);
    },
    child_lastname: function (val) {
      this.$store.commit("setChildLastname", val);
    },

    elternbeitrag: function (val) {
      this.$store.commit("setElternbeitrag", val);
    },
    betreuungsentgelt: function (val) {
      this.$store.commit("setBetreuungsentgelt", val);
    },
    essensgeld: function (val) {
      this.$store.commit("setEssensgeld", val);
    },
    betreuungsumfang: function (val) {
      this.$store.commit("setBetreuungsumfang", val);
    },

    tagespflegename: function (val) {
      this.$store.commit("setTagespflegeName", val);
    },
    institutionstreet: function (val) {
      this.$store.commit("setInstitutionStreet", val);
    },
    institutionnumber: function (val) {
      this.$store.commit("setInstitutionNumber", val);
    },
    institutionpostcode: function (val) {
      this.$store.commit("setInstitutionPostcode", val);
    },
    institutiontown: function (val) {
      this.$store.commit("setInstitutionTown", val);
    },
    institutionname: function (val) {
      this.$store.commit("setInstitutionName", val);
    },

    vorjahr_checkbox: function (val) {
      this.$store.commit("setVorjahrCheck", val);
    },

    radioGroupBetreuungsform: function (val) {
      this.$store.commit("setBetreuungsform", val);
    },
  },
  //load previus values from store
  created() {
    this.child_firstname = this.$store.state.child_firstname;
    this.child_lastname = this.$store.state.child_lastname;
    this.date_child = this.$store.state.date_child;

    this.institutionname = this.$store.state.institutionname;
    this.institutionstreet = this.$store.state.institutionstreet;
    this.institutionnumber = this.$store.state.institutionnumber;
    this.institutionpostcode = this.$store.state.institutionpostcode;
    this.institutiontown = this.$store.state.institutiontown;
    this.tagespflegename = this.$store.state.tagespflegename;

    this.elternbeitrag = this.$store.state.elternbeitrag;
    this.betreuungsentgelt = this.$store.state.betreuungsentgelt;
    this.date_bb = this.$store.state.date_bb;

    this.radioGroupBetreuungsform = this.$store.state.radioGroupBetreuungsform;

    this.essensgeld = this.$store.state.essensgeld;
    this.betreuungsumfang = this.$store.state.betreuungsumfang;
    this.vorjahr_checkbox = this.$store.state.vorjahr_checkbox;
  },

  methods: {
    funcShowNachweise() {
      if (this.$refs.form.validate() == true) {
        this.$parent.funcShowNachweise();
      } else {
        this.valid = false;
      }
    },
    deleteChild(deleteID) {
      this.$parent.deleteChild(deleteID);
    },
    addChild() {
      this.$parent.addChild();
    },
  },
};
</script>