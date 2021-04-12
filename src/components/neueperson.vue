<template>
  <div id="Person">
    <v-divider></v-divider>
    <h3 class="py-3 text-left">
      Zum Haushalt gehörende Personen
    </h3>
    <v-row v-for="item in personlist" :key="item.id">
      <v-col>
        <v-text-field
          outlined
          v-model="firstname_person"
          :rules="nameRules"
          label="Vorname"
          required
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          outlined
          v-model="lastname_person"
          :rules="nameRules"
          label="Nachname"
          required
        ></v-text-field>
      </v-col>
      <v-col>
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
      </v-col>
      <v-col>
        <button
          class="button is-small is-danger has-text-centered"
          v-on:click="deletePerson(item.id)"
        >
          x
        </button>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "neueperson",
  props: {
    msg: String,
    personlist: Array,
  },

  data() {
    return {
      // Index des zu löschenden Eintrags übergeben
      deleteID: "",

      firstname_person: "",
      lastname_person: "",
      date_p: null,
      menu_p: false,
    };
  },

  watch: {
    date_p: function (val) {
      this.$store.commit("setDate_p", val);
    },
    menu_p(val) {
      val &&
        setTimeout(() => (this.$refs.picker_p.activePicker = "YEAR"));
    },
  },

  created() {
    this.lastname_person = this.$store.state.lastname_person;
    this.firstname_person = this.$store.state.firstname_person;
    this.date_p = this.$store.state.date_p;
  },

  methods: {
    deletePerson(deleteID) {
      this.$parent.deletePerson(deleteID);
    },
  },
};
</script>

