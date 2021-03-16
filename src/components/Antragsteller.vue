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
    <h3 v-if="this.$store.state.geCheck">Antragsgrundlage</h3>
    <v-row v-if="this.$store.state.geCheck">
      <v-col class="d-flex" cols="12" sm="6">
        <v-select
          :items="antragsgrundlage"
          label="Antragsgundlage wählen"
          outlined
        ></v-select>
      </v-col>
    </v-row>
    <p v-else></p>
  </div>
</template>

<script>
export default {
  name: "Antragsteller",
  props: {
  },
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

      menu: false,
      date: null,
      
      antragsgrundlage: ["Privatinsolvenz", "Keine Sozialleistungen"],
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