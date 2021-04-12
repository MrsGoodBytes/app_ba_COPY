<template>
  <div id="Antragsteller" class="px-10">
    <!-- Daten Antragsteller -->

    <h2 class="py-3">Zur Person</h2>
    <v-row>
      <v-col>
        <v-text-field
          outlined
          v-model="firstname"
          :rules="nameRules"
          label="Vorname"
          required
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          outlined
          v-model="lastname"
          :rules="nameRules"
          label="Nachname"
          required
        ></v-text-field>
      </v-col>
      <v-col v-if="this.$store.state.geCheck">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Geburtsdatum"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-card
            v-picker--date
            ref="picker"
            v-model="date"
            :max="new Date().toISOString().substr(0, 10)"
            min="1960-01-01"
            @change="save"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <p v-else></p>
    </v-row>
    <v-divider></v-divider>
    <h3 class="py-3 text-left">Anschrift</h3>
    <v-row>
      <v-col cols="12" sm="4">
        <v-text-field
          outlined
          v-model="street"
          :rules="nameRules"
          label="Straße"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="2">
        <v-text-field
          outlined
          v-model="number"
          :rules="numberRules"
          label="Hausnummer"
          min="0"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="2">
        <v-text-field
          outlined
          v-model="postcode"
          :rules="plzRules"
          label="Postleitzahl"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          outlined
          v-model="town"
          :rules="nameRules"
          label="Ort"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <h3 class="py-3 text-left">Kontakt</h3>
    <v-row>
      <v-col>
        <v-text-field
          outlined
          v-model="email"
          :rules="emailRules"
          label="E-Mail"
          required
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          outlined
          v-model.number="tel"
          :rules="telRules"
          label="Telefonnummer"
          required
        ></v-text-field>
      </v-col>
    </v-row>

    <!-- Daten weiterer Personen -->
    <v-divider></v-divider>
    <div id="weiterePersonen" v-if="this.$store.state.entCheck">
      <h3 class="py-3 text-left">Zum Haushalt gehörende Personen</h3>
      <v-row v-for="item in person_list" :key="item.id">
        <v-col>
          <v-text-field
            outlined
            v-model="firstname_person"
            :rules="nameRules"
            label="Vorname"
            required
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            outlined
            v-model="lastname_person"
            :rules="nameRules"
            label="Nachname"
            required
          ></v-text-field>
        </v-col>
        <v-col>
          <v-menu
            ref="menu_p"
            v-model="menu_p"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date_p"
                label="Geburtsdatum"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-card
              v-picker--date
              ref="picker_p"
              v-model="date_p"
              locale="de"
              locale-first-day-of-year="1"
              :max="new Date().toISOString().substr(0, 10)"
              min="1960-01-01"
              @change="save_p"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col>
          <button
            class="button is-small is-danger has-text-centered"
            v-on:click="deletePerson(item.id)"
          >
            x
          </button>
        </v-col>
      </v-row>
      <v-btn
        class="bg-purple-600 text-white text-base font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
        v-on:click="addPerson"
      >
        im Haushalt lebende Person hinzufügen
        <v-icon> mdi-plus </v-icon>
      </v-btn>
      <!-- <v-btn
      v-if="this.$store.state.entCheck"
      class="bg-purple-600 text-white text-base font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
    >
      weitere Person erfassen <v-icon>mdi-plus</v-icon></v-btn
    > -->
      <!-- Antragsgrundlate und Bankverbindung -->
    </div>
    <v-divider></v-divider>
    <h3
      class="font-weiht-black py-3 text-left"
      v-if="this.$store.state.entCheck || this.$store.state.bifoCheck"
    >
      Antragsgrundlage
    </h3>
    <v-row v-if="this.$store.state.entCheck || this.$store.state.bifoCheck">
      <v-col>
        <v-radio-group v-model="radioGroupAntragsgrundlage">
          <v-radio
            v-model="antragsgrundlage"
            ref="antragsgrundlage"
            v-for="n in radioListAntragsgrundlage"
            :key="n"
            :label="`${n}`"
            :value="n"
          ></v-radio>
        </v-radio-group>
      </v-col>
      <!-- <v-col class="d-flex" cols="12" sm="6">
        <v-select
          v-model="antragsgrundlage"
          label="Antragsgundlage wählen"
          :items="auswahlMoeglichkeiten"
          outlined
        ></v-select>
      </v-col> -->

      <!-- Einkommensnachweise ohne Sozialleistungen -->

      <v-col v-if="radioGroupAntragsgrundlage === 1">
        <h4>Familieneinkommen, Belastungen, Einkommensgrenze</h4>
        <p>Die im Haushalt lebenden Personen erzielen folgendes Einkommen:</p>
      </v-col>
      <v-col v-else-if="radioGroupAntragsgrundlage === 0">
        <p>
          Im Falle der Privatinsolvenz muss die Entscheidung durch das
          Amtsgericht unter der Rubrik "Nachweise" angefügt werden.
        </p>
      </v-col>
      <v-col v-else-if="radioGroupAntragsgrundlage === 2">
        <p>
          Wenn Sie Sozialleistungen beziehen, sind Sie für die Entgeltermäßigung
          berechtigt. Die entsprechenden Bescheide sollten unter der Rubrik
          "Nachweise" angefügt werden.
        </p>
      </v-col>
      <p v-else></p>
    </v-row>
    <v-row v-if="radioGroupAntragsgrundlage === 1">
      <p>
        Um eine zügige Bearbeitung zu gewährleisten, sind die erforderlichen
        Nachweise unt derm dem Punkt "Nachweise" anzufügen. Kontoauszüge können
        NICHT als Nachweis berücksichtigt werden.
      </p>
    </v-row>
    <v-row v-if="this.$store.state.entCheck">
      <v-col>
        <v-radio-group v-model="radioGroupErmaeßigung">
          <v-radio
            v-model="bankverbindung_checkbox"
            ref="bank_check"
            v-for="n in radioList"
            :key="n"
            :label="`Ermäßigung überweisen an ${n}`"
            :value="n"
          ></v-radio>
        </v-radio-group>
      </v-col>
      <v-col v-if="radioGroupErmaeßigung == 1">
        <v-text-field
          outlined
          v-model="kontoinhaber"
          :rules="nameRules"
          label="Kontoinhaber/in"
          required
        ></v-text-field>
        <v-text-field
          outlined
          v-model="iban"
          :rules="ibanRules"
          label="IBAN"
          required
        ></v-text-field>
        <v-text-field
          outlined
          v-model="bic"
          :rules="nameRules"
          label="BIC"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <p v-else></p>
    <div id="einkommensnachweis">
      <h4 class="pb-8">
        Angaben zur Ermittlung des durchschnittlichen monatlichen
        Familieneinkommens in €
      </h4>
      <v-row class="pb-10">
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
  </div>
</template>

<script>
export default {
  name: "Antragsteller",
  props: {},
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

      radioGroupErmaeßigung: 0, //wählt aus welcher Radiobutton default gewählt ist
      radioList: ["Kita", "Antragsteller/in"],

      nettoeinkommen: "",
      selbstständigkeiteinkommen: "",

      kontoinhaber: "",
      iban: "",
      bic: "",

      menu: false,
      date: null,

      deleteID: "",

      firstname_person: "",
      lastname_person: "",
      date_p: null,
      menu_p: false,
      person_list: [],

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

  created() {
    this.firstname = this.$store.state.firstname;
    this.lastname = this.$store.state.lastname;
    this.date = this.$store.state.date;
    this.street = this.$store.state.street;
    this.number = this.$store.state.number;
    this.postcode = this.$store.state.postcode;
    this.town = this.$store.state.town;
    this.email = this.$store.state.email;
    this.tel = this.$store.state.tel;

    this.radioGroupAntragsgrundlage = this.$store.state.radioGroupAntragsgrundlage;
    this.radioGroupErmaeßigung = this.$store.state.radioGroupErmaeßigung;

    this.nettoeinkommen = this.$store.state.nettoeinkommen;
    this.selbstständigkeiteinkommen = this.$store.state.selbstständigkeiteinkommen;

    this.kontoinhaber = this.$store.state.kontoinhaber;
    this.iban = this.$store.state.iban;
    this.bic = this.$store.state.bic;
  },

  watch: {
    //input executes function which is defiened index.js
    firstname: function (val) {
      this.$store.commit("setFirstname", val);
    },
    lastname: function (val) {
      this.$store.commit("setLastname", val);
    },
    date: function (val) {
      this.$store.commit("setDate", val);
    },
    street: function (val) {
      this.$store.commit("setStreet", val);
    },
    number: function (val) {
      this.$store.commit("setNumber", val);
    },
    postcode: function (val) {
      this.$store.commit("setPostcode", val);
    },
    town: function (val) {
      this.$store.commit("setTown", val);
    },
    email: function (val) {
      this.$store.commit("setMail", val);
    },
    tel: function (val) {
      this.$store.commit("setTel", val);
    },
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
    date_p: function (val) {
      this.$store.commit("setDate_p", val);
    },
    menu_p(val) {
      val && setTimeout(() => (this.$refs.picker_p.activePicker = "YEAR"));
    },
    radioGroupAntragsgrundlage: function (val) {
      this.$store.commit("setAntragsgrundlageCheck", val);
    },
    radioGroupErmaeßigung: function (val) {
      this.$store.commit("setErmaeßigungCheck", val);
    },
    nettoeinkommen: function (val) {
      this.$store.commit("setNettoeinkommen", val);
    },
    selbstständigkeiteinkommen: function (val) {
      this.$store.commit("setSelbstständigkeitEinkommen", val);
    },
    kontoinhaber: function (val) {
      this.$store.commit("setKontoinhaber", val);
    },
    iban: function (val) {
      this.$store.commit("setIban", val);
    },
    bic: function (val) {
      this.$store.commit("setBic", val);
    },
  },

  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    addPerson() {
      // neues todo erzeugen
      var neueperson = new Object();

      //ans Ende der Liste anfügen indem die richtige ID ermittelt wird
      if (this.person_list.length == 0) {
        neueperson.id = 0;
      } else {
        // vermeide Duplikate
        neueperson.id = this.person_list[this.person_list.length - 1].id + 1;
      }

      //eintragen des neuen Geschwisterkinds in das Array

      this.person_list.push(neueperson);
    },
    deletePerson(id) {
      // Suche nach ID im Todo-Array und entferne das Element
      // https://love2dev.com/blog/javascript-remove-from-array/
      // Am einfachsten geht das über array.filter()deleteTodo(id) {
      this.person_list = this.person_list.filter(
        (neueperson) => neueperson.id !== id
      );
    },
    save_p(date_p) {
      this.$refs.menu_p.save(date_p);
    },
  },
};
</script>