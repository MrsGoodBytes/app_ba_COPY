<template>
  <div id="Geschwisterkind" v-if="this.$parent.KindDaten && this.$store.state.geCheck && !this.$store.state.entCheck">
    <v-card v-for="item in childlist" :key="item.id" class="pa-10">
    <v-row
      ><!-- v-for="n in childList" :key="n" -->
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
      <v-col v-if="this.$store.state.geCheck">
        <v-text-field
          outlined
          v-model="item.date_sibling"
          label="Geburtsdatum"
          prepend-icon="mdi-calendar"
          :rules="dateRules"
          required
        ></v-text-field>
      </v-col>
      <p v-else></p>
    </v-row>
    <v-row>
      <v-col
        v-if="this.$store.state.Check || this.$store.state.entCheck"
        class="d-flex"
        cols="12"
        sm="3"
      >
        <h4>Betreuung</h4>
        <v-radio-group v-model="radioGroupBetreuungsform_sibling">
          <v-radio
            v-model="betreuungsform_sibling"
            ref="betreuungsform"
            v-for="n in radioListBetreuungsform_sibling"
            :key="n"
            :label="`${n}`"
            :value="n"
          ></v-radio>
        </v-radio-group>
      </v-col>
      <p v-else></p>
      <v-col v-if="radioGroupBetreuungsform_sibling === 3">
        <v-text-field
          outlined
          v-model="tagespflegename_sibling"
          label="Name der Tagespflegeperson"
          :rules="nameRules"
          required
        ></v-text-field>
        <v-text-field
          outlined
          v-model="institutionstreet_sibling"
          label="Straße der Tagespflege"
          :rules="nameRules"
          required
        ></v-text-field>
        <v-text-field
          outlined
          v-model="institutionnumber_sibling"
          label="Hausnummer der Tagespflege"
          :rules="numberRules"
          required
        ></v-text-field>
        <v-text-field
          outlined
          v-model="institutionpostcode_sibling"
          label="PLZ der Tagespflege"
          :rules="nameRules"
          required
        ></v-text-field>
        <v-text-field
          outlined
          v-model="institutiontown_sibling"
          label="Ort der Tagespflege"
          :rules="nameRules"
          required
        ></v-text-field>
      </v-col>
      <v-col v-else>
        <v-text-field
          outlined
          v-model="institutionname_sibling"
          label="Name der Betreuungseinrichtung"
          :rules="nameRules"
          required
        ></v-text-field>
      </v-col>
      <v-col v-if="this.$store.state.entCheck" class="d-flex" cols="12" sm="12">
        <v-checkbox
          v-model="vorjahr_checkbox_sibling"
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
          outlined
          v-model="date_bb_sibling"
          label="Betreuungsbeginn"
          prepend-icon="mdi-calendar"
          :rules="dateRules"
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
        <v-text-field
          outlined
          v-model="betreuungsentgelt_sibling"
          prefix="€"
          :rules="moneyRules"
          label="Betreuungsentgelt"
          required
        ></v-text-field>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon color="accent" v-bind="attrs" v-on="on"
              >mdi-information</v-icon
            >
          </template>
          <span
            >Das Betreuungsentgeld  ist der Beitrag ohne Abzug der
            Geschwisterermäßigung.</span
          >
        </v-tooltip>
      </v-col>
      <p v-else></p>
      <v-col v-if="this.$store.state.geCheck" class="d-flex" cols="12" sm="3">
        <v-text-field
          outlined
          v-model="elternbeitrag_sibling"
          prefix="€"
          :rules="moneyRules"
          label="Elternbeitrag"
          required
        ></v-text-field>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon color="accent" v-bind="attrs" v-on="on"
              >mdi-information</v-icon
            >
          </template>
          <span
            >Der Elternbeitrag ist das Betreuungsgeld abzüglich der
            Geschwisterermäßigung.</span
          >
        </v-tooltip>
      </v-col>
      <p v-else></p>
      
      <v-col v-if="this.$store.state.geCheck" class="d-flex" cols="12" sm="3">
        <v-text-field
          outlined
          v-model="betreuungsumfang_sibling"
          :rules="moneyRules"
          label="Betreuungsumfang"
          required
        ></v-text-field>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon color="accent" v-bind="attrs" v-on="on"
              >mdi-information</v-icon
            >
          </template>
          <span>Stunden in der Woche</span>
        </v-tooltip>
      </v-col>
      <p v-else></p>
      <v-row>
        <v-col cols="6">
          <h4>
            Da eine Abrechnung direkt mit der Kindertagesstätte erfolgt,
            erhalten Sie keine Eingangsbestätigung und auch keinen Bescheid. Die
            Kindertagesstätte wird von Ihnen nur noch den reduzierten
            Elternbeitrag fordern.
          </h4>
        </v-col>
      </v-row>
    </v-row>


    <v-row class="my-3 px-3">
      
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

      elternbeitrag_sibling: "",
      betreuungsbeginn_sibling: "",
      betreuungsentgelt_sibling: "",

      tagespflegename_sibling: "",
      institutionstreet_sibling: "",
      institutionnumber_sibling: "",
      institutionpostcode_sibling: "",
      institutiontown_sibling: "",
      institutionname_sibling: "",

      vorjahr_checkbox_sibling: false,

      betreuungsform_sibling: "",
      betreuungsumfang_sibling: "",
      radioGroupBetreuungsform_sibling: 0,
      radioListBetreuungsform_sibling: [
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
