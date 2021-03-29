<template>
  <div id="Antragsteller">
    <!-- Daten Antragsteller -->

    <h3>Zur Person</h3>
    <v-row>
      <v-col>
        <v-text-field
          outlined="true"
          v-model="firstname"
          :rules="nameRules"
          label="Vorname"
          required
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          outlined="true"
          v-model="lastname"
          :rules="nameRules"
          label="Nachname"
          required
        ></v-text-field>
      </v-col>
      <v-col v-if="this.$store.state.geCheck">
        <v-app id="datepicker">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Geburtsdatum"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-card
              v-picker--date
              ref="picker"
              v-model="date"
              :max="new Date().toISOString().substr(0, 10)"
              min="1960-01-01"
              @change="save"
            ></v-date-picker>
          </v-menu>
        </v-app>
      </v-col>
      <p v-else></p>
    </v-row>
    <v-divider></v-divider>
    <h3>Anschrift</h3>
    <v-row>
      <v-col cols="12" sm="4">
        <v-text-field
          outlined="true"
          v-model="street"
          :rules="nameRules"
          label="Straße"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="2">
        <v-text-field
          outlined="true"
          v-model="number"
          :rules="numberRules"
          label="Hausnummer"
          min="0"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="2">
        <v-text-field
          outlined="true"
          v-model.number="postcode"
          :rules="plzRules"
          v-validate="'digits:5'"
          label="Postleitzahl"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          outlined="true"
          v-model="town"
          :rules="nameRules"
          label="Ort"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <h3>Kontakt</h3>
    <v-row>
      <v-col>
        <v-text-field
          outlined="true"
          v-model="email"
          :rules="emailRules"
          label="E-Mail"
          required
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          outlined="true"
          v-model.number="tel"
          :rules="telRules"
          label="Telefonnummer"
          required
        ></v-text-field>
      </v-col>
    </v-row>

    <!-- Daten weiterer Personen -->

    <v-divider></v-divider>
    <h3 v-if="this.$store.state.entCheck">Zum Haushalt gehörende Personen</h3>
    <v-row v-if="this.$store.state.entCheck">
      <v-col>
        <v-text-field
          outlined="true"
          v-model="vorname_person"
          :rules="nameRules"
          label="Vorname"
          required
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          outlined="true"
          v-model="name_person"
          :rules="nameRules"
          label="Nachname"
          required
        ></v-text-field>
      </v-col>
      <v-col>
        <v-app id="datepicker_p">
          <v-menu
            ref="menu_p"
            v-model="menu_p"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date_p"
                label="Geburtsdatum"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-card
              v-picker--date
              ref="picker_p"
              v-model="date_p"
              locale="de"
              locale-first-day-of-year="1"
              :max="new Date().toISOString().substr(0, 10)"
              min="1960-01-01"
              @change="save_p"
            ></v-date-picker>
          </v-menu>
        </v-app>
      </v-col>
    </v-row>
    <v-btn
      v-if="this.$store.state.entCheck"
      class="bg-purple-600 text-white text-base font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
    >
      weitere Person erfassen <v-icon>mdi-plus</v-icon></v-btn
    >
    <!-- Antragsgrundlate und Bankverbindung -->

    <v-divider></v-divider>
    <h3
      class="font-weiht-black"
      v-if="this.$store.state.entCheck || this.$store.state.bifoCheck"
    >
      Antragsgrundlage
    </h3>
    <v-row v-if="this.$store.state.entCheck || this.$store.state.bifoCheck">
      <v-col>
        <v-radio-group v-model="radioGroupAntragsgrundlage">
          <v-radio
            v-model="antragsgrundlage"
            ref="antragsgrundlage"
            v-for="n in radioListAntragsgrundlage"
            :key="n"
            :label="`${n}`"
            :value="n"
          ></v-radio>
        </v-radio-group>
      </v-col>
      <!-- <v-col class="d-flex" cols="12" sm="6">
        <v-select
          v-model="antragsgrundlage"
          label="Antragsgundlage wählen"
          :items="auswahlMoeglichkeiten"
          outlined
        ></v-select>
      </v-col> -->

      <!-- Einkommensnachweise ohne Sozialleistungen -->

      <v-col v-if="radioGroupAntragsgrundlage === 1">
        <h4>Familieneinkommen, Belastungen, Einkommensgrenze</h4>
        <p>Die im Haushalt lebenden Personen erzielen folgendes Einkommen:</p>
      </v-col>
      <v-col v-else-if="radioGroupAntragsgrundlage === 0">
        <p>
          Im Falle der Privatinsolvenz muss die Entscheidung durch das
          Amtsgericht unter der Rubrik "Nachweise" angefügt werden.
        </p>
      </v-col>
      <v-col v-else-if="radioGroupAntragsgrundlage === 2">
        <p>
          Wenn Sie Sozialleistungen beziehen, sind Sie für die Entgeltermäßigung
          berechtigt. Die entsprechenden Bescheide sollten unter der Rubrik
          "Nachweise" angefügt werden.
        </p>
      </v-col>
      <p v-else></p>
    </v-row>
    <h5 v-if="radioGroupAntragsgrundlage === 1">
      Angaben zur Ermittlung des durchschnittlichen monatlichen
      Familieneinkommens in €
    </h5>
    <v-row v-if="radioGroupAntragsgrundlage === 1">
      <v-col
        ><v-text-field
          outlined="true"
          v-model="nettoeinkommen"
          :rules="nameRules"
          label="Nettoarbeitseinkommen aus nichtselbstständiger Arbeit der letzten 12
        Monate (inkl. Weihnachts- und Urlaubsgeld)"
          required
        ></v-text-field>
      </v-col>
      <v-col
        ><v-text-field
          outlined="true"
          v-model="selbstständigkeiteinkommen"
          :rules="nameRules"
          label="Einkommen aus Selbstständigkeit"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="radioGroupAntragsgrundlage === 1">
      <p>
        Um eine zügige Bearbeitung zu gewährleisten, sind die erforderlichen
        Nachweise unt derm dem Punkt "Nachweise" anzufügen. Kontoauszüge können
        NICHT als Nachweis berücksichtigt werden.
      </p>
    </v-row>
    <v-row v-if="this.$store.state.entCheck">
      <v-col>
        <v-radio-group v-model="radioGroupErmaeßigung">
          <v-radio
            v-model="bankverbindung_checkbox"
            ref="bank_check"
            v-for="n in radioList"
            :key="n"
            :label="`Ermäßigung überweisen an ${n}`"
            :value="n"
          ></v-radio>
        </v-radio-group>
      </v-col>
      <v-col v-if="radioGroupErmaeßigung">
        <v-text-field
          outlined="true"
          v-model="kontoinhaber"
          :rules="nameRules"
          label="Kontoinhaber/in"
          required
        ></v-text-field>
        <v-text-field
          outlined="true"
          v-model="iban"
          :rules="ibanRules"
          label="IBAN"
          required
        ></v-text-field>
        <v-text-field
          outlined="true"
          v-model="bic"
          :rules="nameRules"
          label="BIC"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <p v-else></p>
  </div>
</template>

<script>
export default {
  name: "Antragsteller",
  props: {},
  data() {
    return {
      firstname: "",
      lastname: "",
      street: "",
      number: "",
      postcode: "",
      town: "",
      email: "",
      tel: "",

      antragsgrundlage: "",
      radioGroupAntragsgrundlage: 0,
      radioListAntragsgrundlage: [
        "Privatinsolvenz",
        "kein Bezug von Sozialleistungen",
        "der Bezug von Sozialleistungen",
      ],

      radioGroupErmaeßigung: 0, //wählt aus welcher Radiobutton default gewählt ist
      radioList: ["Kita", "Antragsteller/in"],

      firstname_person: "",
      lastname_person: "",
      date_p: null,
      menu_p: false,

      nettoeinkommen: "",
      selbstständigkeiteinkommen: "",

      kontoinhaber: "",
      iban: "",
      bic: "",

      menu: false,
      date: null,

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
          (value && value.length >= 22) ||
          "Pflichtfeld. Bitte gültige IBAN eingeben!",
      ],
    };
  },

  created() {
    this.firstname = this.$store.state.firstname;
    this.lastname = this.$store.state.lastname;
    this.date = this.$store.state.date;
    this.street = this.$store.state.street;
    this.number = this.$store.state.number;
    this.postcode = this.$store.state.postcode;
    this.town = this.$store.state.town;
    this.email = this.$store.state.email;
    this.tel = this.$store.state.tel;
    this.radioGroupAntragsgrundlage = this.$store.state.radioGroupAntragsgrundlage;
    this.radioGroupErmaeßigung = this.$store.state.radioGroupErmaeßigung;
    this.nettoeinkommen = this.$store.state.nettoeinkommen;
    this.selbstständigkeiteinkommen = this.$store.state.selbstständigkeiteinkommen;
    this.kontoinhaber = this.$store.state.kontoinhaber;
    this.iban = this.$store.state.iban;
    this.bic = this.$store.state.bic;
    this.lastname_person = this.$store.state.lastname_person;
    this.firstname_person = this.$store.state.firstname_person;
    this.date_p = this.$store.state.date_p;
  },

  watch: {
    //input executes function which is defiened index.js
    firstname: function (val) {
      this.$store.commit("setFirstname", val);
    },
    lastname: function (val) {
      this.$store.commit("setLastname", val);
    },
    date: function (val) {
      this.$store.commit("setDate", val);
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
    },
    email: function (val) {
      this.$store.commit("setMail", val);
    },
    tel: function (val) {
      this.$store.commit("setTel", val);
    },
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
    date_p: function (val) {
      this.$store.commit("setDate_p", val);
    },
    menu_p(val) {
      val && setTimeout(() => (this.$refs.picker_p.activePicker = "YEAR"));
    },
    radioGroupAntragsgrundlage: function (val) {
      this.$store.commit("setAntragsgrundlageCheck", val);
    },
    radioGroupErmaeßigung: function (val) {
      this.$store.commit("setErmaeßigungCheck", val);
    },
    nettoeinkommen: function (val) {
      this.$store.commit("setNettoeinkommen", val);
    },
    selbstständigkeiteinkommen: function (val) {
      this.$store.commit("setSelbstständigkeitEinkommen", val);
    },
    kontoinhaber: function (val) {
      this.$store.commit("setKontoinhaber", val);
    },
    iban: function (val) {
      this.$store.commit("setIban", val);
    },
    bic: function (val) {
      this.$store.commit("setBic", val);
    },
  },

  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    save_p(date_p) {
      this.$refs.menu_p.save(date_p);
    },
  },
};
</script>