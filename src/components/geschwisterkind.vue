<template>
  <div
    id="Geschwisterkind"
    v-if="
      this.$parent.KindDaten &&
      this.$store.state.geCheck &&
      !this.$store.state.entCheck
    "
  >
    <v-card v-for="item in childlist" :key="item.id" class="pa-10" color="#F5F5F5">
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
      </v-row>
      <v-row class="px-3">
        <v-col class="d-flex" cols="12" sm="3">
          <h4>Betreuung</h4>
          <v-radio-group v-model="radioGroupBetreuungsform">
            <v-radio
              v-model="item.betreuungsform"
              ref="betreuungsform"
              v-for="n in radioListBetreuungsform"
              :key="n"
              :label="`${n}`"
              :value="n"
            ></v-radio>
          </v-radio-group>
        </v-col>
        <v-col v-if="radioGroupBetreuungsform === 3">
          <v-text-field
            outlined
            v-model="item.tagespflegename"
            label="Name der Tagespflegeperson"
            :rules="nameRules"
            required
          ></v-text-field>
          <v-text-field
            outlined
            v-model="item.institutionstreet"
            label="Straße der Tagespflege"
            :rules="nameRules"
            required
          ></v-text-field>
          <v-text-field
            outlined
            v-model="item.institutionnumber"
            label="Hausnummer der Tagespflege"
            :rules="numberRules"
            required
          ></v-text-field>
          <v-text-field
            outlined
            v-model="item.institutionpostcode"
            label="PLZ der Tagespflege"
            :rules="nameRules"
            required
          ></v-text-field>
          <v-text-field
            outlined
            v-model="item.institutiontown"
            label="Ort der Tagespflege"
            :rules="nameRules"
            required
          ></v-text-field>
        </v-col>
        <v-col v-else>
          <v-text-field
            outlined
            v-model="item.institutionname"
            label="Name der Betreuungseinrichtung"
            :rules="nameRules"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex" cols="12" sm="4">
          <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon color="accent" v-bind="attrs" v-on="on"
              >mdi-information</v-icon
            >
          </template>
          <span
            >der Elternbeitrag ist das Betreuungsgeld abzüglich der
            Ermäßigung</span
          >
        </v-tooltip>
        <v-text-field
          outlined
          v-model="elternbeitrag"
          prefix="€"
          :rules="moneyRules"
          label="Elternbeitrag"
          required
        ></v-text-field>
        </v-col>

        <v-col class="d-flex"
        cols="12"
        sm="4">
          <v-text-field
            outlined
            v-model="item.betreuungsentgelt"
            prefix="€"
            :rules="moneyRules"
            label="Betreuungsentgelt"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="pt-0">
          <v-btn
            class="ma-0"
            color="secondary"
            v-on:click="deleteChild(item.id)"
          >
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

      tagespflegename: "",
      institutionstreet: "",
      institutionnumber: "",
      institutionpostcode: "",
      institutiontown: "",
      institutionname: "",

      elternbeitrag: "",

      betreuungsform: "",
      betreuungsentgelt: "",
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
      dateRules: [(value) => !!value || "Pflichtfeld. Bitte ausfüllen!"],
    };
  },

  watch: {
    /* 
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
