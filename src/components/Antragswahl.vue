<template>
  <div id="antrag_auswahl">
    <h1 class="text-base font-semibold">{{ msg }}</h1>
    <v-container>
      <v-row>
        <v-col>
          <v-checkbox
            v-model="ge_checkbox"
            ref="ge_check"
            :label="`Geschwisterermäßigung: ${ge_checkbox.toString()}`"
          ></v-checkbox>
        </v-col>
        <v-col>
          <v-checkbox
            v-model="ent_checkbox"
            ref="ent_check"
            :label="`Entgeltermäßigung: ${ent_checkbox.toString()}`"
          ></v-checkbox>
        </v-col>
        <v-col>
          <v-checkbox
            v-model="bifo_checkbox"
            ref="bifo_check"
            :label="`Bildungsfond: ${bifo_checkbox.toString()}`"
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-alert v-if="!(this.$store.state.geCheck || this.$store.state.entCheck || this.$store.state.bifoCheck)" type="warning">Um fortzufahren bitte mindestens einen Antrag auswählen.</v-alert>
      <p v-else></p>
      <p>
        Es ist möglich die Auswahl jederzeit durch Auswahl der Checkboxen zu
        ändern.
      </p>
    </v-container>
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
      ge_checkbox: false,
      ent_checkbox: false,
      bifo_checkbox: false,
    };
  },

  watch: {
    ge_checkbox: function (val)
    {
      this.$store.commit("setGeCheck", val);
    },
    ent_checkbox: function (val)
    {
      this.$store.commit("setEntCheck", val);
    },
    bifo_checkbox: function (val)
    {
      this.$store.commit("setBifoCheck", val);
    },
  },

  created() 
  {
    this.ge_checkbox = this.$store.state.geCheck;
    this.ent_checkbox = this.$store.state.entCheck;
    this.bifo_checkbox = this.$store.state.bifoCheck;
  },

  methods: {

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
