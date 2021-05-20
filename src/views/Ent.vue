<template>
  <div id="Ent">
      <h2 class="py-3">PDF ENT</h2>
    <h5 class="pb-3">Bitte prüfen Sie die Angaben auf ihre Richtigkeit!</h5>

    <v-row>
      <h4>
        Antragsteller Daten
        <v-btn @click="funcShowAntragstellerDaten"
          ><v-icon color="accent" v-bind="attrs" v-on="on"
            >mdi-pencil</v-icon
          ></v-btn
        >
      </h4>
      <h4 v-if="this.$store.state.valid === false">
        Bitte diesen Bereich Prüfen. Es fehlen Angaben.
      </h4>
    </v-row>
    <v-row>
      <v-col cols="3" class="text-left">
        <h6 class="text--disabled">Antragsteller/in</h6>
        <h5>{{ this.name }}</h5>
        <h6 class="text--disabled" v-if="this.$store.state.geCheck">
          Geburtsdatum
        </h6>
        <h5 v-if="this.$store.state.geCheck">{{ this.date }}</h5>
      </v-col>
      <v-col cols="4" class="text-left">
        <h6 class="text--disabled">Anschrift</h6>
        <h5>{{ this.adress }}</h5>
      </v-col>
      <v-col cols="4" class="text-left">
        <h6 class="text--disabled">E-Mail</h6>
        <h5>{{ this.email }}</h5>
        <h6 class="text--disabled">Telefonnummer</h6>
        <h5>{{ this.tel }}</h5>
      </v-col>
    </v-row>
  </div>
</template>


<script>

export default {
  name: "Ent",
  components: {
  },
  props: {
      child_list: Array,
      person_list: Array,
  },
  data() {
    return {
      firstname: "",
      lastname: "",
      street: "",
      number: "",
      postcode: "",
      town: "",
      email: "",
      tel: "",

      antragsgrundlage: "",
      radioGroupAntragsgrundlage: 0,
      radioListAntragsgrundlage: [
        "Privatinsolvenz",
        "kein Bezug von Sozialleistungen",
        "der Bezug von Sozialleistungen",
      ],
      privatinsolvenz: false,
      sozialleistungen: false,
      ohnesozialleistungen: false,

      nettoeinkommen: "",
      selbstständigkeiteinkommen: "",

      menu: false,
      date: null,

      deleteID: "",

      firstname_person: "",
      lastname_person: "",
      verwandtschaft_p: "",
      date_p: null,

      elternteil1: {
        netto: 0,
        selbst: 0,
        kindergeld: 0,
        alg1: 0,
        existenz: 0,
        krankengeld: 0,
        rente: 0,
        unterhaltseinkunft: 0,
        ausbildungsvergütung: 0,
        bafög: 0,
        elterngeld: 0,
        kinderzuschlag: 0,
        weitere: 0,
        zuschussKita: 0,

        arbeitsmittel: 0,
        fahrtkosten: 0,
        haftpflicht: 0,
        hausrat: 0,
        freiwilligekrankenundpflege: 0,
        freiwilligerente: 0,
        riester: 0,
        lebens: 0,
        kfzhaftpflicht: 0,
        unfall: 0,
        berufsunfähigkeits: 0,
        gewerkschaft: 0,

        kaltmiete: 0,
        eigentum: 0,
        besondere: 0,
        unterhaltszahlungen: 0,
        sonstiges: "",
      },

      elternteil2: {
        netto: 0,
        selbst: 0,
        kindergeld: 0,
        alg1: 0,
        existenz: 0,
        krankengeld: 0,
        rente: 0,
        unterhaltseinkunft: 0,
        ausbildungsvergütung: 0,
        bafög: 0,
        elterngeld: 0,
        kinderzuschlag: 0,
        weitere: 0,
        zuschussKita: 0,

        arbeitsmittel: 0,
        fahrtkosten: 0,
        haftpflicht: 0,
        hausrat: 0,
        freiwilligekrankenundpflege: 0,
        freiwilligerente: 0,
        riester: 0,
        lebens: 0,
        kfzhaftpflicht: 0,
        unfall: 0,
        berufsunfähigkeits: 0,
        gewerkschaft: 0,

        kaltmiete: 0,
        eigentum: 0,
        besondere: 0,
        unterhaltszahlungen: 0,
        sonstiges: "",
      },

      haushaltseinkommen: 0,
      wohnort_checkbox: false,
      wohnort: "",
      eigentum_checkbox: false,

      arbeitgeber_name: "",
      arbeitgeber_street: "",
      arbeitgeber_number: "",
      arbeitgeber_postcode: "",
      arbeitgeber_town: "",

      km: "",
    };
  },

  watch: {},

  methods: {
    
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

