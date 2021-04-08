<template>
  <div id="Geschwisterkind">
    <v-row v-for="item in childlist" :key="item.id">
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
      <v-col>
          <button class="button is-small is-danger has-text-centered" v-on:click="deleteChild(item.id)">x</button>
      </v-col>
    </v-row>
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
      date_child: null,
      menu_child: false,
    };
  },

  watch: {
      date_child: function (val) {
      this.$store.commit("setDate_child", val);
    },
    menu_child(val) {
      val && setTimeout(() => (this.$refs.picker_child.activePicker = "YEAR"));
    },
  },

  methods: {  
    updateStatus(index, newStatus) {
      this.$parent.updateStatus(index, newStatus);
    },
    deleteChild(deleteID) {
      this.$parent.deleteChild(deleteID);
    },
    save_child(date_child) {
      this.$refs.menu_child.save(date_child);
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
