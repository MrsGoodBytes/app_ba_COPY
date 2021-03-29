<template>
  <div id="Kind">
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
      <v-col v-if="this.$store.state.geCheck">
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
          outlined="true"
          v-model="institutionstraße"
          label="Name der Tagespflegeperson"
          :rules="nameRules"
          required
        ></v-text-field>
        <v-text-field
          outlined="true"
          v-model="institutionstraße"
          label="Straße der Tagespflege"
          :rules="nameRules"
          required
        ></v-text-field>
        <v-text-field
          outlined="true"
          v-model="institutionnumber"
          label="Hausnummer der Tagespflege"
          :rules="numberRules"
          required
        ></v-text-field>
        <v-text-field
          outlined="true"
          v-model="institutionplz"
          label="PLZ der Tagespflege"
          :rules="nameRules"
          required
        ></v-text-field>
        <v-text-field
          outlined="true"
          v-model="institutionort"
          label="Ort der Tagespflege"
          :rules="nameRules"
          required
        ></v-text-field>
      </v-col>
      <v-col v-else>
        <v-text-field
          outlined="true"
          v-model="institutionname"
          label="Name der Betreuungseinrichtung"
          :rules="nameRules"
          required
        ></v-text-field>
      </v-col>
      <v-col v-if="this.$store.state.entCheck" class="d-flex" cols="12" sm="12">
        <v-checkbox
          v-model="vorjahr_checkbox"
          ref="vorjahr_check"
          :label="'Für das Kind wurde im VORJAHR ein Ermäßigungsantrag gestellt:'"
        ></v-checkbox>
      </v-col>
      <p v-else></p>
    </v-row>
    <v-row>
      <v-col
        v-if="this.$store.state.geCheck || this.$store.state.entCheck"
        class="d-flex"
        cols="12"
        sm="3"
      >
        <v-app id="datepicker_bb">
          <v-menu
            ref="menu_bb"
            v-model="menu_bb"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date_bb"
                label="Betreuungsbeginn"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-card
              v-picker--date
              ref="picker_bb"
              v-model="date_bb"
              :max="new Date().toISOString().substr(0, 10)"
              min="2000-01-01"
              @change="save_bb"
            ></v-date-picker>
          </v-menu>
        </v-app>
      </v-col>
      <p v-else></p>
      <v-col
        v-if="this.$store.state.geCheck || this.$store.state.entCheck"
        class="d-flex"
        cols="12"
        sm="3"
      >
        <v-text-field
          outlined="true"
          v-model="betreuungsentgelt"
          prefix="€"
          :rules="moneyRules"
          label="Betreuungsentgelt"
          required
        ></v-text-field>
      </v-col>
      <p v-else></p>
      <v-col v-if="this.$store.state.geCheck" class="d-flex" cols="12" sm="3">
        <v-text-field
          outlined="true"
          v-model="elternbeitrag"
          prefix="€"
          :rules="moneyRules"
          label="Elternbeitrag"
          required
        ></v-text-field>
        <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on">This text has a tooltip</span>
        </template>
        <span>Tooltip</span>
      </v-tooltip>
      </v-col>
      <p v-else></p>
      <v-col v-if="this.$store.state.bifoCheck && radioGroupBetreuungsform === 3" class="d-flex" cols="12" sm="3">
        <v-text-field
          outlined="true"
          v-model="essensgeld"
          :rules="moneyRules"
          label="Essensgeld"
          required
        ></v-text-field>
        <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
          >mdi-home</v-icon>
        </template>
        <span>Tooltip</span>
      </v-tooltip>
      </v-col>
      <p v-else></p>      
    </v-row>
    <v-btn
      class="bg-purple-600 text-white text-base font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
    >
      weiteres Kind erfassen
      <v-icon> mdi-plus </v-icon>
    </v-btn>
    <!-- 
        <v-row
            v-for="(n, index) in displayAccounts"
            :key="n"
            no-gutters
            class="archiveRow"
        >
            <v-col cols="12" sm="3">
            <v-card class="archiveCard-start" :key="n">{{ n.username }}</v-card>
            </v-col>
            <v-col cols="12" sm="3">
            <v-card class="archiveCard" :key="n">{{ n.permission }}</v-card>
            </v-col>
            <v-col cols="12" sm="3">
            <v-btn id="readDatabaseButton" @click="changePermission(index)">{{
                content.permission
            }}</v-btn>
            </v-col>
            <v-col cols="12" sm="3">
            <v-btn id="readDatabaseButtonFinal" @click="deleteUser(index)">{{
                content.remove
            }}</v-btn>
            </v-col>
        </v-row> -->
  </div>
</template>

<script>
export default {
  name: "Kind",
  props: {},
  data() {
    return {
      elternbeitrag: "",
      betreuungsbeginn: "",

      date_child: null,
      date_bb: null,
      menu_child: false,
      menu_bb: false,

      betreuungsform: "",
      radioGroupBetreuungsform: 0,
      radioListBetreuungsform: [
        "Krippe",
        "Elementar",
        "Hort",
        "Tagespflege",
        "Ganztags an Schule",
      ],

      //RULES
      nameRules: [(value) => !!value || "Pflichtfeld. Bitte ausfüllen!"],
      moneyRules: [],
      telRules: [
        (value) => !!value || "Pflichtfeld. Bitte ausfüllen!",
        (value) =>
          (value && value.length >= 9 && /^\d+$/.test(value)) ||
          "Pflichtfeld. Bitte gültige Telefonnummer eingeben! Darf keine Buchstaben enthalten.",
      ],
    };
  },

  watch: {
    date_child: function (val) {
      this.$store.commit("setDate_child", val);
    },
    date_bb: function (val) {
      this.$store.commit("setDate_bb", val);
    },
    menu_child(val) {
      val && setTimeout(() => (this.$refs.picker_child.activePicker = "YEAR"));
    },
    menu_bb(val) {
      val && setTimeout(() => (this.$refs.picker_bb.activePicker = "YEAR"));
    },
  },

  created() {},

  methods: {
    save_child(date_child) {
      this.$refs.menu_child.save(date_child);
    },
    save_bb(date_bb) {
      this.$refs.menu_bb.save(date_bb);
    },
  },
};
</script>