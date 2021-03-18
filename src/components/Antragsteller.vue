<template>
  <div id="Antragsteller">
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
          label="PLZ"
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
          v-model="mail"
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
    <v-divider></v-divider>
    <h3 v-if="this.$store.state.entCheck">Zum Haushalt gehörende Personen</h3>
    <v-row v-if="this.$store.state.entCheck">
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
        <v-text-field
          outlined="true"
          v-model="vorname_person"
          :rules="nameRules"
          label="Vorname"
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
              :max="new Date().toISOString().substr(0, 10)"
              min="1960-01-01"
              @change="save_p"
            ></v-date-picker>
          </v-menu>
        </v-app>
      </v-col>
    </v-row>
    <v-btn>weitere Person hinzufügen</v-btn>
    <v-divider></v-divider>
    <h3 v-if="this.$store.state.geCheck">Antragsgrundlage</h3>
    <v-row v-if="this.$store.state.geCheck">
      <v-col class="d-flex" cols="12" sm="6">
        <!-- <select
          v-model="antragsgrundlage"
          label="Antragsgundlage wählen"
          outlined
        >
          <option
            v-for="meineAuswahl in auswahlMoeglichkeiten"
            :value="meineAuswahl"
            :key="meineAuswahl"
          >
            {{ meineAuswahl.text }}
          </option>
        </select>
        <v-col v-if="antragsgrundlage.value == 1">
          <p>Zeige nötigen zusätzlichen Textfelder hier an.</p>
        </v-col>
        <p v-else></p> -->
      
        <v-select
          v-model="antragsgrundlage"
          label="Antragsgundlage wählen"
          :items="auswahlMoeglichkeiten"
          outlined
        ></v-select>
      </v-col>
      <v-col v-if="antragsgrundlage === 'Privatinsolvenz'">
        <p>Zeige nötigen zusätzlichen Textfelder hier an.</p>
      </v-col>
      <p v-else></p>
    </v-row>
    <v-row v-if="this.$store.state.entCheck">
      <v-col>
        <v-radio-group v-model="radioGroup">
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
      <v-col v-if="radioGroup">
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
      auswahlMoeglichkeiten: ["Privatinsolvenz", "Keine Sozialleistungen", "Bezug von Sozialleistungen"],
      
      firstname_person: "",
      lastname_person: "",
      birthdate_person: "",

      menu: false,
      date: null,

      radioGroup: 0, //wählt aus welcher Radiobutton default gewählt ist
      radioList: ["Kita", "Antragsteller/in"],

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
    this.firstname = this.$store.state.firstname;
    this.lastname = this.$store.state.lastname;
    this.lastname = this.$store.state.lastname;
    this.lastname = this.$store.state.lastname;
    this.lastname = this.$store.state.lastname;
    this.lastname = this.$store.state.lastname;
    this.lastname = this.$store.state.lastname;
    this.lastname = this.$store.state.lastname;
  },

  watch: {
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
    },
    date: function (val) {
      this.$store.commit("setDate", val);
    },
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },

  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
  },
};
</script>