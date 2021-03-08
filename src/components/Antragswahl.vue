<template>
  <div id="antrag_auswahl" class="hello">
    <h1 class="text-base font-semibold">{{ msg }}</h1>
    <div id="input_checkbox_apply">
      <label class="checkbox"
        ><input
          v-checkbox
          class="rounded text-purple-500"
          type="checkbox"
        />Entgeltermäßigung
      </label>
      <label class="checkbox"
        ><input
          v-checkbox
          class="rounded outline text-purple-500"
          type="checkbox"
        />Geschwisterermäßigung
      </label>
      <label class="checkbox"
        ><input
          v-checkbox
          class="rounded text-purple-500"
          type="checkbox"
        />Bildungsfond
      </label>

      <v-btn text small color="primary" @click="setCheckbox" v-if="showSelect1"
        >Select</v-btn
      >
      <v-btn text small color="primary" @click="setCheckbox" v-if="showSelect1"
        >Deselect</v-btn
      >

      <v-btn
        text
        small
        color="primary"
        @click="checkbox = true"
        v-if="showSelect2"
        >Select2</v-btn
      >
      <v-btn
        text
        small
        color="primary"
        @click="checkbox = false"
        v-if="showSelect2"
        >Deselect2</v-btn
      >
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              outlined="true"
              v-model="firstname"
              :rules="nameRules"
              :counter="10"
              label="Vorname"
              required
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              outlined="true"
              v-model="lastname"
              :rules="nameRules"
              :counter="10"
              label="Nachname"
              required
            ></v-text-field>
          </v-col>
          
        </v-row>
        <v-row>
          <v-col>
            <v-btn text small color="primary" outlined @click="updateData"
              >weiter</v-btn
            >
          </v-col>
        </v-row>
      </v-container>

      <v-text-field
        outlined="true"
        v-model="storeData"
        label="Output"
        required
      ></v-text-field>

      <v-checkbox
        v-model="checkbox"
        :label="`Checky: ${checkbox.toString()}`"
      ></v-checkbox>

      <v-checkbox
        v-model="checkbox"
        :label="`Checky: ${checkbox2.toString()}`"
      ></v-checkbox>

      <router-link
        :to="{ name: 'Apply' }"
        href="#"
        v-if="$route.name !== 'Apply'"
        v-on:click="addTodo"
        class="bg-purple-600 text-white text-base font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
        >Ausgewählte Anträge stellen</router-link
      >
    </div>
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
      checkbox: false,
      checkbox2: false,
      showSelect1: true,
      showSelect2: false,
      firstname: "",
      lastname: "",
      storeData: "",
    };
  },

  watch: {
    firstname: function (val) {
      this.$store.commit("setFirstname", val);
    },
    lastname: function (val) {
      this.$store.commit("setLastname", val);
    },
  },

  methods: {
    setCheckbox() {
      this.checkbox = !this.checkbox;
      this.showSelect1 = false;
      this.showSelect2 = true;
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
