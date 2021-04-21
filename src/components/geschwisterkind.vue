<template>
  <div id="Geschwisterkind" v-if="this.$parent.KindDaten && this.$store.state.geCheck && !this.$store.state.entCheck">
    <v-card v-for="item in childlist" :key="item.id">
    <v-row class="my-3 px-3">
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

      sibling_firstname: "",
      sibling_lastname: "",
      date_sibling: "",
//RULES
      nameRules: [(value) => !!value || "Pflichtfeld. Bitte ausfüllen!"],
      dateRules: [(value) => !!value || "Pflichtfeld. Bitte ausfüllen!"],
    };
  },

  watch: {/* 
    date_sibling: function (val) {
      this.$store.commit("setDateSibling", val);
    }, */
  },

  created() {
    /* this.date_sibling = this.$store.state.date_sibling; */
  },

  methods: {
    updateStatus(index, newStatus) {
      this.$parent.updateStatus(index, newStatus);
    },
    deleteChild(deleteID) {
      this.$parent.deleteChild(deleteID);
    },
  },
};
</script>
