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
      <v-col>
        <v-text-field
          outlined="true"
          v-model="institutionname"
          label="Name der Betreuungseinrichtung"
          required
        ></v-text-field>
      </v-col>
      <v-col v-if="this.$store.state.entCheck">
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
        <v-text-field
          outlined="true"
          v-model="betreuungsentgelt"
          :rules="plzRules"
          label="Betreuungsentgelt"
          required
        ></v-text-field>
      </v-col>
      <p v-else></p>
      <v-col v-if="this.$store.state.geCheck" class="d-flex" cols="12" sm="3">
        <v-text-field
          outlined="true"
          v-model="elternbeitrag"
          :rules="nameRules"
          label="Elternbeitrag"
          required
        ></v-text-field>
      </v-col>
      <p v-else></p>
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
      <v-col v-if="this.$store.state.geCheck" class="d-flex" cols="12" sm="3">
        <v-select
          :items="betreuungsform"
          label="Betreuungsform wäheln"
          outlined
        ></v-select>
      </v-col>
      <p v-else></p>
    </v-row>
    <v-btn>Kind hinzufügen</v-btn>
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

      betreuungsform: ["Krippe", "Elementar", "Hort"],
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