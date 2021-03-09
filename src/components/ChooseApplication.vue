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
    
    <router-link
      :to="{ name: 'Apply' }"
      href="#"
      v-if="$route.name !== 'Apply'"
      v-on:click="updateData"
      class="bg-purple-600 text-white text-base font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
      >Ausgewählte Anträge stellen</router-link
    >
  </div>
</template>

<script>
export default {
  name: "Choose",
  props: {
    msg: String,
  },

  data() {
    return {
      ge_checkbox: false,
      ent_checkbox: false,
      bifo_checkbox: false,
    };
  },

  watch: {
    firstname: function (val) {
      this.$store.commit("setFirstname", val);
    },
    lastname: function (val) {
      this.$store.commit("setLastname", val);
    },
    ge_checkbox: function (val) {
      this.$store.commit("setGeCheckbox", val)
    }
  },

  methods: {
    setCheckbox() {
      this.ge_checkbox = !this.ge_checkbox;
    },

    updateData() {
      this.storeData = this.$store.state.firstname;
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
