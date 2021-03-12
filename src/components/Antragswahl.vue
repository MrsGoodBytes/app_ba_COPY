<template>
  <div id="antrag_auswahl" class="hello">
    <h1 class="text-base font-semibold">{{ msg }}</h1>
    <v-container>
      <v-row>
        <v-col>
          <v-checkbox
            v-model="ge_checkbox"
            :label="`Geschwisterermäßigung: ${ge_checkbox.toString()}`"
          ></v-checkbox>
        </v-col>
        <v-col>
          <v-checkbox
            v-model="ent_checkbox"
            :label="`Entgeltermäßigung: ${ent_checkbox.toString()}`"
          ></v-checkbox>
        </v-col>
        <v-col>
          <v-checkbox
            v-model="bifo_checkbox"
            :label="`Bildungsfond: ${bifo_checkbox.toString()}`"
          ></v-checkbox>
        </v-col>
      </v-row>
      <p>
        Es ist möglich die Auswahl jederzeit durch Auswahl der Checkboxen zu
        ändern.
      </p>
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
        <v-col v-if="ge_checkbox">
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
      <v-app id="anschrift">
        <v-container>
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
        </v-container>
      </v-app>
      <v-divider></v-divider>
      <h3>Kontakt</h3>
      <v-app id="kontak">
        <v-container>
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
        </v-container>
      </v-app>
      <v-divider></v-divider>
      <v-app v-if="bifo_checkbox" id="dropdown">
        <h3>Antragsgrundlage</h3>
        <v-container>
          <v-row>
            <v-col class="d-flex" cols="12" sm="6">
              <v-select
                :items="items"
                label="Antragsgundlage"
                outlined
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-app>
      <p v-else></p>
      <v-row>
        <v-col>
          <v-btn text small color="primary" outlined @click="updateData"
            >DATEN ÜBERNEHMEN</v-btn
          >
        </v-col>
      </v-row>
      <v-text-field
        outlined="true"
        v-model="storeData"
        label="Output"
        required
      ></v-text-field>

      <h2>Kind/er</h2>

      <v-row>
        <v-col>
          <v-text-field
            outlined="true"
            v-model="child_firstname"
            label="Vorname des Kindes"
            :rules="nameRules"
            required
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            outlined="true"
            v-model="child_lastname"
            label="Nachname des Kindes"
            :rules="nameRules"
            required
          ></v-text-field>
        </v-col>
        <v-col v-if="ge_checkbox">
          <v-app id="datepicker_child">
            <v-menu
              ref="menu_child"
              v-model="menu_child"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date_child"
                  label="Geburtsdatum des Kindes"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-card
                v-picker--date
                ref="picker_child"
                v-model="date_child"
                :max="new Date().toISOString().substr(0, 10)"
                min="2000-01-01"
                @change="save_child"
              ></v-date-picker>
            </v-menu>
          </v-app>
        </v-col>
        <p v-else></p>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            outlined="true"
            v-model="institutionname"
            label="Name der Betreuungseinrichtung"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row v-if="ge_checkbox">
        <v-col>
          <v-text-field
            outlined="true"
            v-model="elternbeitrag"
            :rules="nameRules"
            :counter="10"
            label="Elternbeitrag"
            required
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            outlined="true"
            v-model="betreuungsbeginn"
            :rules="nameRules"
            :counter="10"
            label="Betreuungsbeginn"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row v-else></v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Antragswahl",
  props: {
    msg: String,
  },
  data() {
    return {
      ge_checkbox: false,
      ent_checkbox: false,
      bifo_checkbox: false,

      firstname: "",
      lastname: "",
      street: "",
      number: "",
      postcode: "",
      town: "",
      email: "",
      tel: "",
      storeData: "",
      elternbeitrag: "",
      betreuungsbeginn: "",
      date: null,
      date_child: null,
      menu: false,
      menu_child: false,

      items: ["Privatinsolvenz", "Keine Sozialleistungen"],

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
    date_child: function (val) {
      this.$store.commit("setDate_child", val);
    },
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
    menu_child(val) {
      val && setTimeout(() => (this.$refs.picker_child.activePicker = "YEAR"));
    },
  },

  methods: {
    setCheckbox() {
      this.ge_checkbox = !this.ge_checkbox;
    },

    updateData() {
      this.storeData = this.$store.state.firstname;
    },
    save(date) {
      this.$refs.menu.save(date);
    },
    save_child(date_child) {
      this.$refs.menu_child.save_child(date_child);
    },
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
