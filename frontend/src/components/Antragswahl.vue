<template>
  <div id="antrag_auswahl">
    <h2 class="text-base font-semibold">{{ msg }}</h2>
    <v-container class="pb-0">
      <v-row justify="space-around">
        <v-checkbox v-model="ge_checkbox" ref="ge_check"
          ><template v-slot:label>
            <div>
              {{ geErm }}
              <v-tooltip class="mx-auto" max-width="600" bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    class="my-auto"
                    color="accent"
                    v-bind="attrs"
                    v-on="on"
                    >mdi-information</v-icon
                  >
                </template>
                <span
                  >Der Elternbeitrag wird auf Antrag ermäßigt, wenn:
                  <ul><li>
                  mehrere Kinder einer Familie mit Hauptwohnung in einem Haushalt leben
                  </li>
                  <li>
                  UND diese Kinder eine öffentlich geförderte
                  Kindertageseinrichtung oder Kindertagespflegestelle oder eine
                  Ganztagsbetreuung an Schulen (mit einer Nachmittagsbetreuung an
                  mindestens 3 Tagen pro Woche für mindestens 70 EUR) besuchen.
                  </li>
                  </ul>
                  <br />
                  <ul
                    ><li>
                      Für das älteste Kind ist der Elternbeitrag in voller Höhe
                      zu entrichten.
                    </li>
                    <li>
                      Für das nächstjüngere Kind ermäßigt sich der Elternbeitrag
                      um 50%,
                    </li>
                    <li>Für jedes weitere jüngere Kind um 100%.</li> </ul
                  ><br />
                  Ermäßigung erfolgt unabhängig vom Einkommen und muss nur erneut gestellt werden, sollten Sie diese für weitere Kinder in Anspruch nehmen wollen.
                  Anspruchsberechtigt sind Familien, die in Lübeck gemeldet
                  sind. Familien aus anderen Gemeinden melden sich bitte bei der
                  für sie zuständigen Gemeindeverwaltung.</span
                >
              </v-tooltip>
            </div></template
          >
        </v-checkbox>
        <v-checkbox
          v-model="ent_checkbox"
          ref="ent_check"
        ><template v-slot:label>
            <div>
              {{entErm}}
              <v-tooltip class="mx-auto" max-width="600" bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    class="my-auto"
                    color="accent"
                    v-bind="attrs"
                    v-on="on"
                    >mdi-information</v-icon
                  >
                </template>
                <span
                  >Von der Entgeltermäßigung ausgenommen sind Kinder in einer Betreuung im Rahmen der Ganztagsschule.<br /><br />
                  Für Entgeltermäßigung sind Sie berechtigt, sofern Sie Sozialleistungen beziehen oder unterhalb der Einkommengrenze liegen. Wenn Sie sich nicht sicher sind, nutzen Sie unseren Test auf Berechitigung am Anfang dieser Seite.</span
                >
              </v-tooltip>
            </div></template
          ></v-checkbox>
        <v-checkbox
          v-model="bifo_checkbox"
          ref="bifo_check"
        ><template v-slot:label>
            <div>
              {{ bifoErm }}
              <v-tooltip class="mx-auto" max-width="600" bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    class="my-auto"
                    color="accent"
                    v-bind="attrs"
                    v-on="on"
                    >mdi-information</v-icon
                  >
                </template>
                <span
                  >Die Kosten für Mittagessen können bei Berechtigung für Kinder in der Tagespflege übernommen werden. 
                  Eine Übernahme von Kosten für ein- oder mehrtätige Ausflüge ist nicht möglich, wenn sich das Kind in einem Betreuungsverhältnis in einer Tagespflege befindet.<br /><br />
                  Für Mittel aus dem Bildungsfond sind Sie berechtigt, sofern Sie Sozialleistungen beziehen, privatinsolvent gemeldet sind oder wegen geringem Einkommen als bedürftig eingestuft werden. Wenn Sie sich nicht sicher sind, nutzen Sie unseren Test auf Berechitigung am Anfang dieser Seite.</span
                >
              </v-tooltip>
            </div></template
          ></v-checkbox>
      </v-row>
      <p class="caption pt-0">
        Es ist möglich die Auswahl jederzeit zu ändern.
      </p>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Antragswahl",
  props: {
    msg: String,
    geErm: String,
    entErm: String,
    bifoErm: String,
  },
  data() {
    return {
      ge_checkbox: false,
      ent_checkbox: false,
      bifo_checkbox: false,
    };
  },

  watch: {
    ge_checkbox: function (val) {
      this.$store.commit("setGeCheck", val);
      this.$parent.setGeCheck(val);
    },
    ent_checkbox: function (val) {
      this.$store.commit("setEntCheck", val);
      this.$parent.setEntCheck(val);
    },
    bifo_checkbox: function (val) {
      this.$store.commit("setBifoCheck", val);
      this.$parent.setBifoCheck(val);
    },
  },

  created() {
    this.ge_checkbox = this.$store.state.geCheck;
    this.ent_checkbox = this.$store.state.entCheck;
    this.bifo_checkbox = this.$store.state.bifoCheck;
  },

  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
