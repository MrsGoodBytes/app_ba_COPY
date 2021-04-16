<template>
  <div id="Geschwisterkind">
    <v-card v-for="item in childlist" :key="item.id">
    <v-row class="my-3 px-3">
      <v-col>
        <v-text-field
          outlined
          v-model="item.firstname"
          label="Vorname des Kindes"
          :rules="nameRules"
          required
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          outlined
          v-model="item.lastname"
          label="Nachname des Kindes"
          :rules="nameRules"
          required
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          outlined
          v-model="item.date"
          label="Geburtsdatum"
          prepend-icon="mdi-calendar"
          :rules="dateRules"
          required
        ></v-text-field>
      </v-col>
      <v-col>
        <v-btn class="ma-0" color="secondary" v-on:click="deleteChild(item.id)">
          Einträge dieses Kindes löschen
          <v-icon> mdi-alert </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "geschwisterkind",
  props: {
    msg: String,
    childlist: Array,
  },

  data() {
    return {
      // Index des zu löschenden Eintrags übergeben
      deleteID: "",

      child_firstname: "",
      child_lastname: "",
      date_sibling: null,
      menu_sibling: false,
      tmp: "",
    };
  },

  watch: {
    date_sibling: function (val) {
      this.$store.commit("setDate_sibling", val);
    },
    menu_sibling: function (val) {
      val &&
        setTimeout(() => (this.$refs.picker_sibling.activePicker = "YEAR"));
    },
  },

  created() {
    this.date_sibling = this.$store.state.date_sibling;
  },

  methods: {
    updateStatus(index, newStatus) {
      this.$parent.updateStatus(index, newStatus);
    },
    deleteChild(deleteID) {
      this.$parent.deleteChild(deleteID);
    },
    save_sibling(item) {
      this.$refs.menu_sibling.save(item.date);
    },
  },
};
</script>
