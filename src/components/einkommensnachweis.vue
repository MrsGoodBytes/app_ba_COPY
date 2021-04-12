<template>
  <div id="einkommensnachweis">
    <h4>
      Angaben zur Ermittlung des durchschnittlichen monatlichen
      Familieneinkommens in €
    </h4>
    <v-row>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header v-slot="{ open }">
            <v-row no-gutters>
              <v-col cols="4">Nettoeinkommen</v-col>
              <v-col cols="8" class="text--secondary">
                <v-fade-transition leave-absolute>
                  <h5 v-if="open">
                    Nettoarbeitseinkommen aus nichtselbstständiger Arbeit der
                    letzten 12 Monate (inkl. Weihnachts- und Urlaubsgeld)
                  </h5>
                  <v-row v-else no-gutters style="width: 100%">
                    <v-col cols="6">
                      Elternteil 1: {{ elternteil1.netto + "€" || "0€" }}
                    </v-col>
                    <v-col cols="6">
                      Elternteil 2: {{ elternteil2.netto + "€" || "0€" }}
                    </v-col>
                  </v-row>
                </v-fade-transition>
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row d-flex justify="space-around" no-gutters>
              <v-col cols="3">
                <v-menu
                  v
                  ref="nettoElternteil1"
                  :close-on-content-click="false"
                  :return-value.sync="trip.netto1"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="elternteil1.netto"
                      label="Netto Elternteil 1"
                      prefix="€"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                </v-menu>
              </v-col>

              <v-col cols="3">
                <v-menu
                  ref="nettoElternteil2"
                  :close-on-content-click="false"
                  :return-value.sync="elternteil2.netto"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="elternteil2.netto"
                      label="Netto Elternteil 2"
                      prefix="€"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                </v-menu>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-row no-gutters>
              <v-col cols="4">Einkommen aus Selbstständigkeit</v-col>
              <v-col cols="8" class="text--secondary">
                <v-fade-transition leave-absolute>
                  <v-row no-gutters style="width: 100%">
                    <v-col cols="6">
                      Elternteil 1: {{ elternteil1.selbst + "€" || "0€" }}
                    </v-col>
                    <v-col cols="6">
                      Elternteil 2: {{ elternteil2.selbst + "€" || "0€" }}
                    </v-col>
                  </v-row>
                </v-fade-transition>
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row justify="space-around" no-gutters>
              <v-col cols="3">
                <v-menu
                  v
                  ref="selbstElternteil1"
                  :close-on-content-click="false"
                  :return-value.sync="elternteil1.selbst"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="elternteil1.selbst"
                      label="Elternteil 1"
                      prefix="€"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                </v-menu>
              </v-col>

              <v-col cols="3">
                <v-menu
                  ref="selbstElternteil2"
                  :close-on-content-click="false"
                  :return-value.sync="elternteil2.selbst"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="elternteil2.selbst"
                      label="Elternteil 2"
                      prefix="€"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                </v-menu>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-row no-gutters>
              <v-col cols="4">Kindergeld</v-col>
              <v-col cols="8" class="text--secondary">
                <v-fade-transition leave-absolute>
                  <v-row no-gutters style="width: 100%">
                    <v-col cols="6">
                      Elternteil 1: {{ elternteil1.kindergeld + "€" || "0€" }}
                    </v-col>
                    <v-col cols="6">
                      Elternteil 2: {{ elternteil2.kindergeld + "€" || "0€" }}
                    </v-col>
                  </v-row>
                </v-fade-transition>
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row justify="space-around" no-gutters>
              <v-col cols="3">
                <v-menu
                  ref="kindElternteil1"
                  :close-on-content-click="false"
                  :return-value.sync="elternteil1.kindergeld"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="elternteil1.kindergeld"
                      label="Elternteil 1"
                      prefix="€"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                </v-menu>
              </v-col>

              <v-col cols="3">
                <v-menu
                  ref="kindElternteil2"
                  :close-on-content-click="false"
                  :return-value.sync="elternteil2.kindergeld"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="elternteil2.kindergeld"
                      label="Elternteil 2"
                      prefix="€"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                </v-menu>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-row no-gutters>
              <v-col cols="4">Arbeitslosengeld I</v-col>
              <v-col cols="8" class="text--secondary">
                <v-fade-transition leave-absolute>
                  <v-row no-gutters style="width: 100%">
                    <v-col cols="6">
                      Elternteil 1: {{ elternteil1.alg1 + "€" || "0€" }}
                    </v-col>
                    <v-col cols="6">
                      Elternteil 2: {{ elternteil2.alg1 + "€" || "0€" }}
                    </v-col>
                  </v-row>
                </v-fade-transition>
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row justify="space-around" no-gutters>
              <v-col cols="3">
                <v-menu
                  ref="kindElternteil1"
                  :close-on-content-click="false"
                  :return-value.sync="elternteil1.alg1"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="elternteil1.alg1"
                      label="Elternteil 1"
                      prefix="€"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                </v-menu>
              </v-col>

              <v-col cols="3">
                <v-menu
                  ref="alg1Elternteil2"
                  :close-on-content-click="false"
                  :return-value.sync="elternteil2.alg1"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="elternteil2.alg1"
                      label="Elternteil 2"
                      prefix="€"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                </v-menu>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-row no-gutters>
              <v-col cols="4">Existenzgründerzuschuss</v-col>
              <v-col cols="8" class="text--secondary">
                <v-fade-transition leave-absolute>
                  <v-row no-gutters style="width: 100%">
                    <v-col cols="6">
                      Elternteil 1: {{ elternteil1.existenz + "€" || "0€" }}
                    </v-col>
                    <v-col cols="6">
                      Elternteil 2: {{ elternteil2.existenz + "€" || "0€" }}
                    </v-col>
                  </v-row>
                </v-fade-transition>
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row justify="space-around" no-gutters>
              <v-col cols="3">
                <v-menu
                  v
                  ref="kindElternteil1"
                  :close-on-content-click="false"
                  :return-value.sync="elternteil1.existenz"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="elternteil1.existenz"
                      label="Elternteil 1"
                      prefix="€"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                </v-menu>
              </v-col>

              <v-col cols="3">
                <v-menu
                  ref="kindElternteil2"
                  :close-on-content-click="false"
                  :return-value.sync="elternteil2.existenz"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="elternteil2.existenz"
                      label="Elternteil 2"
                      prefix="€"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                </v-menu>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Antragsteller",
  props: {},
  data() {
    return {
      elternteil1: {
        netto: 0,
        selbst: 0,
        kindergeld: 0,
        alg1: 0,
        existenz: 0,
        rente: 0,
        unerhaltseinkunft: 0,
        ausbildungsvergütung: 0,
        bafög: 0,
        elterngeld: 0,
        kinderzuschlag: 0,
        weitere: 0,
        zuschussKita: 0,
        haushaltseinkommen: 0,

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
      },

      elternteil2: {
        netto: 0,
        selbst: 0,
        kindergeld: 0,
        alg1: 0,
        existenz: 0,
        rente: 0,
        unerhaltseinkunft: 0,
        ausbildungsvergütung: 0,
        bafög: 0,
        elterngeld: 0,
        kinderzuschlag: 0,
        weitere: 0,
        zuschussKita: 0,
        haushaltseinkommen: 0,

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
      },

      trip: {
        netto1: 0,
        netto2: 0,
      },

      //RULES
      nameRules: [(value) => !!value || "Pflichtfeld. Bitte ausfüllen!"],
      numberRules: [
        (value) => !!value || "Pflichtfeld. Bitte ausfüllen!",
        (value) =>
          /(?=.*\d)/.test(value) ||
          "Pflichtfeld. Hausnummer muss mindestens eine Zahl enthalten!",
      ],
      plzRules: [(value) => !!value || "Pflichtfeld. Bitte ausfüllen!"],
      emailRules: [
        (value) => !!value || "Pflichtfeld. Bitte ausfüllen!",
        (value) =>
          /.+@.+\..+/.test(value) || "Bitte geben Sie eine gülitge E-mail an!",
      ],
      telRules: [
        (value) => !!value || "Pflichtfeld. Bitte ausfüllen!",
        (value) =>
          (value && value.length >= 9 && /^\d+$/.test(value)) ||
          "Pflichtfeld. Bitte gültige Telefonnummer eingeben! Darf keine Buchstaben enthalten.",
      ],
      ibanRules: [
        (value) => !!value || "Pflichtfeld. Bitte ausfüllen!",
        (value) =>
          (value && value.length >= 22) ||
          "Pflichtfeld. Bitte gültige IBAN eingeben!",
      ],
    };
  },

  created() {},

  watch: {
    //input executes function which is defiened index.js
  },

  methods: {
  },
};
</script>