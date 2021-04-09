<template>
    <div id="Geschwisterkind">
      <div v-for="item in childlist" :key="item.id">
        <h5>{{ msg }}</h5>
        <v-row>
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
            <v-menu
            ref="menu_sibling"
            v-model="menu_sibling"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date_sibling"
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
              ref="picker_sibling"
              v-model="date_sibling"
              :max="new Date().toISOString().substr(0, 10)"
              min="2000-01-01"
              @change="save_sibling"
            ></v-date-picker>
          </v-menu>
          </v-col>
          <v-col>
            <v-btn
            class="bg-purple-600 text-white text-base font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
            color="primary"
            tile
            v-on:click="deleteChild(item.id)"
            >Entfernen</v-btn
          >
          </v-col>
        </v-row>
      </div>
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
    };
  },

  watch: {
    date_sibling: function (val) {
      this.$store.commit("setDate_sibling", val);
    },
    menu_sibling(val) {
      val && setTimeout(() => (this.$refs.picker_sibling.activePicker = "YEAR"));
    },
  },

  methods: {
    updateStatus(index, newStatus) {
      this.$parent.updateStatus(index, newStatus);
    },
    deleteChild(deleteID) {
      this.$parent.deleteChild(deleteID);
    },
    save_sibling(date_sibling) {
      this.$refs.menu_sibling.save(date_sibling);
    },
  },

  created() {
    this.date_sibling = this.$store.state.date_sibling;
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
  max-width: 1024px;
}
li {
  display: block;
  margin-bottom: 5px;
}
a {
  color: #42b983;
}
table {
  margin: auto;
}
</style>
