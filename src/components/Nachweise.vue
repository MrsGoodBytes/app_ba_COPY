<template>
  <div id="Nachweise">
    <h2 class="py-3">Nachweise</h2>
    <h5 class="pb-3">
      Auf Grund Ihrer Angaben werden folgende Nachweise benötigt:
    </h5>
    <h5 class="warning mb-5">
      <v-icon>mdi-alert</v-icon>HINWEIS: Wählen Sie zum Uload mehrere Dateien
      gleichzeitg aus.
    </h5>

    <h3>Allgemeine Nachweise</h3>
    <v-row justify="space-around">
      <v-col cols="4" class="my-auto">
        <h4 class="text-left">
          Betreuungsverträge der im Antrag genannten Kinder
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" dark v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span
              >Betreuungsvertäge sind die Verträge, die mit der
              Betreuungseinrichtung geschlossen wurden und nachweisen, dass das
              Kind diese Einrichtung besucht.</span
            >
          </v-tooltip>
        </h4>
      </v-col>
      <v-col cols="8"
        ><v-file-input
          accept="image/*"
          label="Betreuungsverträge"
          chips
          show-size
          counter
          multiple
          truncate-length="23"
        ></v-file-input>
      </v-col>
    </v-row>

    <v-divider class="my-3"></v-divider>
    <h3
      class="my-6"
      v-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 2
      "
    >
      Nachweise zur Ermittlung des durchschnittlichen monatlichen
      Familieneinkommens
    </h3>
    <h3
      class="pb-3"
      v-else-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 3
      "
    >
      Nachweise über den Empfang von Sozialleistungen
    </h3>
    <h3
      class="pb-3"
      v-else-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 1
      "
    >
      Nachweise über Privatinsolvenz
    </h3>

    <!-- NACHWEIS PRIVATINSOLVENZ -->
    <v-row
      justify="space-around"
      v-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 1
      "
    >
      <v-col cols="4" class="my-auto">
        <h4 class="text-left">
          Privatinsolvenzbescheid
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" dark v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span
              >Im Falle der Privatinsolvenz ist die Entscheidung durch das
              Amtsgerichts vorzulegen.</span
            >
          </v-tooltip>
        </h4>
      </v-col>
      <v-col cols="8"
        ><v-file-input
          accept="image/*"
          label="Nachweis Privatinsolvenz"
          chips
          show-size
          counter
          multiple
          truncate-length="23"
        ></v-file-input>
      </v-col>
    </v-row>

    <!-- NACHWEIS SOZIALLEISTUNGEN -->
    <v-row
      justify="space-around"
      v-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 3
      "
    >
      <v-col cols="4" class="my-auto">
        <h4 class="text-left">
          Bezogene Sozialleistungen
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" dark v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span
              >Zu Sozialleistungen zählen Arbeitslosengeld II (ALGII),
              Grundsicherung, Asylbewerberleistungsgesetz, Kinderzuschlag der
              Familienkasse oder Wohngeld. Das Nachweis über eine der hier
              aufgeführten Leistungen reicht aus.</span
            >
          </v-tooltip>
        </h4>
      </v-col>
      <v-col cols="8"
        ><v-file-input
          accept="image/*"
          label="Nachweis Sozialleistungen"
          chips
          show-size
          counter
          multiple
          truncate-length="23"
        ></v-file-input>
      </v-col>
    </v-row>

    <!-- NACHWEIS EINKOMMEN -->
    <v-row
      justify="space-around"
      v-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 2 &&
        (this.$store.state.elternteil1.netto != 0 ||
          this.$store.state.elternteil2.netto != 0)
      "
    >
      <v-col cols="4" class="my-auto">
        <h4 class="text-left">
          Einkommen
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" dark v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span>Nachweise über das Einkommen der Eltern</span>
          </v-tooltip>
        </h4>
      </v-col>
      <v-col cols="8"
        ><v-file-input
          accept="image/*"
          label="Einkommensnachweise"
          chips
          show-size
          counter
          multiple
          truncate-length="23"
        ></v-file-input>
        <div class="text-right">
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="accent" text dark v-bind="attrs" v-on="on">
                <v-icon>mdi-file-find</v-icon> Beispielnachweis
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="headline grey lighten-2">
                <v-icon>mdi-file-find</v-icon> Beispielnachweis
                <v-btn
                  color="accent"
                  @click="dialog = false"
                  class="align-right"
                >
                  x
                </v-btn>
              </v-card-title>

              <v-card-text>
                <v-img :src="require('/src/img/einkommen.jpg')" />
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-col>
    </v-row>

    <!-- NACHWEIS SELBSTSTAENDIGKEIT -->
    <v-row
      justify="space-around"
      v-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 2 &&
        (this.$store.state.elternteil1.selbst != 0 ||
          this.$store.state.elternteil2.selbst != 0)
      "
    >
      <v-col cols="4" class="my-auto">
        <h4 class="text-left">
          Einkommen aus Selbstständigkeit
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" dark v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span>Nachweise über Einkommen aus selbstständiger Arbeit</span>
          </v-tooltip>
        </h4>
      </v-col>
      <v-col cols="8"
        ><v-file-input
          accept="image/*"
          label="Einkommensnachweise Selbstständigkeit"
          chips
          show-size
          counter
          multiple
          truncate-length="23"
        ></v-file-input>
      </v-col>
    </v-row>

    <!-- NACHWEIS KINDERGELD -->
    <v-row
      justify="space-around"
      v-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 2 &&
        (this.$store.state.elternteil1.kindergeld != 0 ||
          this.$store.state.elternteil2.kindergeld != 0)
      "
    >
      <v-col cols="4" class="my-auto">
        <h4 class="text-left">
          Kindergeld
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" dark v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span
              >Geben Sie hier an, wieviel Kindergeld dieses Elternteil
              bezieht.</span
            >
          </v-tooltip>
        </h4>
      </v-col>
      <v-col cols="8"
        ><v-file-input
          accept="image/*"
          label="Kindergeldnachweise"
          chips
          show-size
          counter
          multiple
          truncate-length="23"
        ></v-file-input>
      </v-col>
    </v-row>

    <!-- NACHWEIS ARBEITSLOSENGELD 1 -->
    <v-row
      justify="space-around"
      v-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 2 &&
        (this.$store.state.elternteil1.alg1 != 0 ||
          this.$store.state.elternteil2.alg1 != 0)
      "
    >
      <v-col cols="4" class="my-auto">
        <h4 class="text-left">
          ALG1 oder Existenzgründerzuschuss
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" dark v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span
              >Die Nachweise über Arbeitslosengeld 1 oder
              Existenzgründerzuschuss hier anfügen.</span
            >
          </v-tooltip>
        </h4>
      </v-col>
      <v-col cols="8"
        ><v-file-input
          accept="image/*"
          label="Nachweis Bescheid ALG1 / Existenzgründerzuschuss"
          chips
          show-size
          counter
          multiple
          truncate-length="23"
        ></v-file-input>
        <div class="text-right">
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="accent" text dark v-bind="attrs" v-on="on">
                <v-icon>mdi-file-find</v-icon> Beispielnachweis
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="headline grey lighten-2">
                <v-icon>mdi-file-find</v-icon> Beispielnachweis
                <v-btn
                  color="accent"
                  @click="dialog = false"
                  class="align-right"
                >
                  x
                </v-btn>
              </v-card-title>

              <v-card-text>
                <v-img :src="require('/src/img/alg1.jpg')" />
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-col>
    </v-row>

    <!-- NACHWEIS KRANKENGELD -->
    <v-row
      justify="space-around"
      v-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 2 &&
        (this.$store.state.elternteil1.existenz != 0 ||
          this.$store.state.elternteil2.existenz != 0)
      "
    >
      <v-col cols="4" class="my-auto">
        <h4 class="text-left">
          Krankengeld
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" dark v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span>Nachweise über Krankengeld</span>
          </v-tooltip>
        </h4>
      </v-col>
      <v-col cols="8"
        ><v-file-input
          accept="image/*"
          label="Nachweise Krankengeld"
          chips
          show-size
          counter
          multiple
          truncate-length="23"
        ></v-file-input>
      </v-col>
    </v-row>

    <!-- NACHWEIS RENTEN -->
    <v-row
      justify="space-around"
      v-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 2 &&
        (this.$store.state.elternteil1.rente != 0 ||
          this.$store.state.elternteil2.rente != 0)
      "
    >
      <v-col cols="4" class="my-auto">
        <h4 class="text-left">
          Renteneinkünfte
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" dark v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span>Nachweise über Einkünfte aus gesetzlicher Rente</span>
          </v-tooltip>
        </h4>
      </v-col>
      <v-col cols="8"
        ><v-file-input
          accept="image/*"
          label="Rentennachweise"
          chips
          show-size
          counter
          multiple
          truncate-length="23"
        ></v-file-input>
      </v-col>
    </v-row>

    <!-- NACHWEIS UNTERHALT -->
    <v-row
      justify="space-around"
      v-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 2 &&
        (this.$store.state.elternteil1.unterhaltseinkunft != 0 ||
          this.$store.state.elternteil2.unterhaltseinkunft != 0)
      "
    >
      <v-col cols="4" class="my-auto">
        <h4 class="text-left">
          Empfangene Unterhaltszahlungen
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" dark v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span
              >Nachweise über Einkünfte aus empfangenen
              Unterhaltszahlungen</span
            >
          </v-tooltip>
        </h4>
      </v-col>
      <v-col cols="8"
        ><v-file-input
          accept="image/*"
          label="Unterhaltsnachweise"
          chips
          show-size
          counter
          multiple
          truncate-length="23"
        ></v-file-input>
      </v-col>
    </v-row>

    <!-- NACHWEIS AUSBILDUNGSVERGUETUNG -->
    <v-row
      justify="space-around"
      v-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 2 &&
        (this.$store.state.elternteil1.ausbildungsvergütung != 0 ||
          this.$store.state.elternteil2.ausbildungsvergütung != 0)
      "
    >
      <v-col cols="4" class="my-auto">
        <h4 class="text-left">
          Ausbildungsvergütung
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" dark v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span>Nachweise über Einkommen durch eine Ausbildung</span>
          </v-tooltip>
        </h4>
      </v-col>
      <v-col cols="8"
        ><v-file-input
          accept="image/*"
          label="Einkommensnachweise"
          chips
          show-size
          counter
          multiple
          truncate-length="23"
        ></v-file-input>
      </v-col>
    </v-row>

    <!-- NACHWEIS AUSBILDUNGSFOERDERUNG -->
    <v-row
      justify="space-around"
      v-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 2 &&
        (this.$store.state.elternteil1.bafög != 0 ||
          this.$store.state.elternteil2.bafög != 0)
      "
    >
      <v-col cols="4" class="my-auto">
        <h4 class="text-left">
          Ausbildungsförderung
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" dark v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span>Nachweise über z.B. BAFÖG Leistungen</span>
          </v-tooltip>
        </h4>
      </v-col>
      <v-col cols="8"
        ><v-file-input
          accept="image/*"
          label="Einkommensnachweise"
          chips
          show-size
          counter
          multiple
          truncate-length="23"
        ></v-file-input>
      </v-col>
    </v-row>

    <!-- NACHWEIS ELTERNGELD -->
    <v-row
      justify="space-around"
      v-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 2 &&
        (this.$store.state.elternteil1.elterngeld != 0 ||
          this.$store.state.elternteil2.elterngeld != 0)
      "
    >
      <v-col cols="4" class="my-auto">
        <h4 class="text-left">
          Ausbildungsförderung
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" dark v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span>z.B.</span>
          </v-tooltip>
        </h4>
      </v-col>
      <v-col cols="8"
        ><v-file-input
          accept="image/*"
          label="Nachweise Ausbildungsförderung"
          chips
          show-size
          counter
          multiple
          truncate-length="23"
        ></v-file-input>
      </v-col>
    </v-row>

    <!-- NACHWEIS KINDERZUSCHLAG -->
    <v-row
      justify="space-around"
      v-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 2 &&
        (this.$store.state.elternteil1.kinderzuschlag != 0 ||
          this.$store.state.elternteil2.kinderzuschlag != 0)
      "
    >
      <v-col cols="4" class="my-auto">
        <h4 class="text-left">
          Kinderzuschlag der Familienkasse
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" dark v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span>z.B.</span>
          </v-tooltip>
        </h4>
      </v-col>
      <v-col cols="8"
        ><v-file-input
          accept="image/*"
          label="Nachweise Kinderzuschlag"
          chips
          show-size
          counter
          multiple
          truncate-length="23"
        ></v-file-input>
      </v-col>
    </v-row>

    <!-- NACHWEIS WEITERE EINNAHMEN -->
    <v-row
      justify="space-around"
      v-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 2 &&
        (this.$store.state.elternteil1.weitere != 0 ||
          this.$store.state.elternteil2.weitere != 0)
      "
    >
      <v-col cols="4" class="my-auto">
        <h4 class="text-left">
          weiter Einnahmen
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" dark v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span>z.B.</span>
          </v-tooltip>
        </h4>
      </v-col>
      <v-col cols="8"
        ><v-file-input
          accept="image/*"
          label="Nachweise weiterer Einnahmen"
          chips
          show-size
          counter
          multiple
          truncate-length="23"
        ></v-file-input>
      </v-col>
    </v-row>

    <!-- NACHWEIS KITAZUSCHUSS -->
    <v-row
      justify="space-around"
      v-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 2 &&
        (this.$store.state.elternteil1.zuschussKita != 0 ||
          this.$store.state.elternteil2.zuschussKita != 0)
      "
    >
      <v-col cols="4" class="my-auto">
        <h4 class="text-left">
          Kitazuschuss
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" dark v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span>z.B.</span>
          </v-tooltip>
        </h4>
      </v-col>
      <v-col cols="8"
        ><v-file-input
          accept="image/*"
          label="Nachweise Zuschuss Betreuungskosten"
          chips
          show-size
          counter
          multiple
          truncate-length="23"
        ></v-file-input>
      </v-col>
    </v-row>

    <!-- NACHWEIS WEITERE EINKOMMEN -->
    <v-row
      justify="space-around"
      v-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 2 &&
        (this.$store.state.elternteil1.haushaltseinkommen != 0 ||
          this.$store.state.elternteil2.haushaltseinkommen != 0)
      "
    >
      <v-col cols="4" class="my-auto">
        <h4 class="text-left">
          Einkommen weiterer Haushaltsmitglieder
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" dark v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span>z.B.</span>
          </v-tooltip>
        </h4>
      </v-col>
      <v-col cols="8"
        ><v-file-input
          accept="image/*"
          label="Nachweise weiterer Einkommen"
          chips
          show-size
          counter
          multiple
          truncate-length="23"
        ></v-file-input>
      </v-col>
    </v-row>

    <v-divider
      v-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 2
      "
      class="my-3"
    ></v-divider>

    <h3
      class="my-6"
      v-if="
        (this.$store.state.radioGroupAntragsgrundlage === 2 &&
          (this.$store.state.elternteil1.arbeitsmittel != 0 ||
            this.$store.state.elternteil2.arbeitsmittel)) ||
        this.$store.state.elternteil1.fahrtkosten != 0 ||
        this.$store.state.elternteil2.fahrtkosten != 0
      "
    >
      Nachweise über anrechenbare Belastungen
    </h3>
    <!-- NACHWEIS ARBEITSMITTEL -->
    <v-row
      justify="space-around"
      v-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 2 &&
        (this.$store.state.elternteil1.arbeitsmittel != 0 ||
          this.$store.state.elternteil2.arbeitsmittel != 0)
      "
    >
      <v-col cols="4" class="my-auto">
        <h4 class="text-left">
          Arbeitsmittel
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" dark v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span>z.B.</span>
          </v-tooltip>
        </h4>
      </v-col>
      <v-col cols="8"
        ><v-file-input
          accept="image/*"
          label="Nachweise über Arbeitsmittel"
          chips
          show-size
          counter
          multiple
          truncate-length="23"
        ></v-file-input>
      </v-col>
    </v-row>

    <!-- NACHWEIS FAHRTKOSTEN -->
    <v-row
      justify="space-around"
      v-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 2 &&
        (this.$store.state.elternteil1.fahrtkosten != 0 ||
          this.$store.state.elternteil2.fahrtkosten != 0)
      "
    >
      <v-col cols="4" class="my-auto">
        <h4 class="text-left">
          <v-icon>mdi-minus</v-icon> Fahrtkosten
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" dark v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span>z.B.</span>
          </v-tooltip>
        </h4>
      </v-col>
      <v-col cols="8"
        ><v-file-input
          accept="image/*"
          label="Nachweise Fahrtkosten"
          chips
          show-size
          counter
          multiple
          truncate-length="23"
        ></v-file-input>
      </v-col>
    </v-row>

    <v-divider
      v-if="
        (this.$store.state.radioGroupAntragsgrundlage === 2 &&
          (this.$store.state.elternteil1.arbeitsmittel != 0 ||
            this.$store.state.elternteil2.arbeitsmittel)) ||
        this.$store.state.elternteil1.fahrtkosten != 0 ||
        this.$store.state.elternteil2.fahrtkosten != 0
      "
      class="my-3"
    ></v-divider>

    <h3
      class="my-6"
      v-if="
        (this.$store.state.radioGroupAntragsgrundlage === 2 &&
          (this.$store.state.elternteil1.haftpflicht != 0 ||
            this.$store.state.elternteil2.haftpflicht)) ||
        this.$store.state.elternteil1.hausrat != 0 ||
        this.$store.state.elternteil2.hausrat != 0 ||
        this.$store.state.elternteil1.freiwilligekrankenundpflege != 0 ||
        this.$store.state.elternteil2.freiwilligekrankenundpflege != 0 ||
        this.$store.state.elternteil1.freiwilligerente != 0 ||
        this.$store.state.elternteil2.freiwilligerente != 0 ||
        this.$store.state.elternteil1.riester != 0 ||
        this.$store.state.elternteil2.riester != 0 ||
        this.$store.state.elternteil1.lebens != 0 ||
        this.$store.state.elternteil2.lebens != 0 ||
        this.$store.state.elternteil1.kfzhaftpflicht != 0 ||
        this.$store.state.elternteil2.kfzhaftpflicht != 0 ||
        this.$store.state.elternteil1.unfall != 0 ||
        this.$store.state.elternteil2.unfall != 0 ||
        this.$store.state.elternteil1.berufsunfähigkeits != 0 ||
        this.$store.state.elternteil2.berufsunfähigkeits != 0 ||
        this.$store.state.elternteil1.gewerkschaft != 0 ||
        this.$store.state.elternteil2.gewerkschaft != 0
      "
    >
      Nachweise über Verischerungsbeiträge
    </h3>
    <!-- NACHWEIS HAFTPFLICH -->
    <v-row
      justify="space-around"
      v-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 2 &&
        (this.$store.state.elternteil1.haftpflicht != 0 ||
          this.$store.state.elternteil2.haftpflicht != 0)
      "
    >
      <v-col cols="4" class="my-auto">
        <h4 class="text-left">
          Haftpflichtversicherung
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" dark v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span>z.B.</span>
          </v-tooltip>
        </h4>
      </v-col>
      <v-col cols="8"
        ><v-file-input
          accept="image/*"
          label="Nachweise Haftpflichtverischerung"
          chips
          show-size
          counter
          multiple
          truncate-length="23"
        ></v-file-input>
      </v-col>
    </v-row>

    <!-- NACHWEIS HAUSRAT -->
    <v-row
      justify="space-around"
      v-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 2 &&
        (this.$store.state.elternteil1.hausrat != 0 ||
          this.$store.state.elternteil2.hausrat != 0)
      "
    >
      <v-col cols="4" class="my-auto">
        <h4 class="text-left">
          Hausratsversicherung
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" dark v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span>z.B.</span>
          </v-tooltip>
        </h4>
      </v-col>
      <v-col cols="8"
        ><v-file-input
          accept="image/*"
          label="Nachweise Hausratsversicherung"
          chips
          show-size
          counter
          multiple
          truncate-length="23"
        ></v-file-input>
      </v-col>
    </v-row>

    <!-- NACHWEIS FREIWILLIGE -->
    <v-row
      justify="space-around"
      v-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 2 &&
        (this.$store.state.elternteil1.freiwilligekrankenundpflege != 0 ||
          this.$store.state.elternteil2.freiwilligekrankenundpflege != 0)
      "
    >
      <v-col cols="4" class="my-auto">
        <h4 class="text-left">
          Freiwillige Kranken- und Pflegeversicherung
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" dark v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span>z.B.</span>
          </v-tooltip>
        </h4>
      </v-col>
      <v-col cols="8"
        ><v-file-input
          accept="image/*"
          label="Nachweise freiwillige Kranken- und Pflegevers."
          chips
          show-size
          counter
          multiple
          truncate-length="23"
        ></v-file-input>
      </v-col>
    </v-row>

    <!-- NACHWEIS FREIWILLIGE RENTE -->
    <v-row
      justify="space-around"
      v-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 2 &&
        (this.$store.state.elternteil1.freiwilligerente != 0 ||
          this.$store.state.elternteil2.freiwilligerente != 0)
      "
    >
      <v-col cols="4" class="my-auto">
        <h4 class="text-left">
          Freiwillige Rentenversicherung
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" dark v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span>z.B.</span>
          </v-tooltip>
        </h4>
      </v-col>
      <v-col cols="8"
        ><v-file-input
          accept="image/*"
          label="Nachweise freiwillige Rentenverischerung"
          chips
          show-size
          counter
          multiple
          truncate-length="23"
        ></v-file-input>
      </v-col>
    </v-row>

    <!-- NACHWEIS RIESTER -->
    <v-row
      justify="space-around"
      v-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 2 &&
        (this.$store.state.elternteil1.riester != 0 ||
          this.$store.state.elternteil2.riester != 0)
      "
    >
      <v-col cols="4" class="my-auto">
        <h4 class="text-left">
          Riester-Rente
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" dark v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span>z.B.</span>
          </v-tooltip>
        </h4>
      </v-col>
      <v-col cols="8"
        ><v-file-input
          accept="image/*"
          label="Nachweise Einnahmen Riester"
          chips
          show-size
          counter
          multiple
          truncate-length="23"
        ></v-file-input>
      </v-col>
    </v-row>

    <!-- NACHWEIS LEBENSVERISCHERUNG -->
    <v-row
      justify="space-around"
      v-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 2 &&
        (this.$store.state.elternteil1.lebens != 0 ||
          this.$store.state.elternteil2.lebens != 0)
      "
    >
      <v-col cols="4" class="my-auto">
        <h4 class="text-left">
          Risikolebensverischerung / Sterbegeldversicherung
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" dark v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span>z.B.</span>
          </v-tooltip>
        </h4>
      </v-col>
      <v-col cols="8"
        ><v-file-input
          accept="image/*"
          label="Nachweise Risikolebens-/Sterbegeldversicherung"
          chips
          show-size
          counter
          multiple
          truncate-length="23"
        ></v-file-input>
      </v-col>
    </v-row>

    <!-- NACHWEIS KFZ HAFT -->
    <v-row
      justify="space-around"
      v-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 2 &&
        (this.$store.state.elternteil1.kfzhaftpflicht != 0 ||
          this.$store.state.elternteil2.kfzhaftpflicht != 0)
      "
    >
      <v-col cols="4" class="my-auto">
        <h4 class="text-left">
          KFZ Haftpflichtversicherung
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" dark v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span>z.B.</span>
          </v-tooltip>
        </h4>
      </v-col>
      <v-col cols="8"
        ><v-file-input
          accept="image/*"
          label="Nachweise KFZ-Haftpflicht"
          chips
          show-size
          counter
          multiple
          truncate-length="23"
        ></v-file-input>
      </v-col>
    </v-row>

    <!-- NACHWEIS UNFALLVERSICHERUNG -->
    <v-row
      justify="space-around"
      v-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 2 &&
        (this.$store.state.elternteil1.unfall != 0 ||
          this.$store.state.elternteil2.unfall != 0)
      "
    >
      <v-col cols="4" class="my-auto">
        <h4 class="text-left">
          Unfallversicherung
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" dark v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span>z.B.</span>
          </v-tooltip>
        </h4>
      </v-col>
      <v-col cols="8"
        ><v-file-input
          accept="image/*"
          label="Nachweise Unfallversicherung"
          chips
          show-size
          counter
          multiple
          truncate-length="23"
        ></v-file-input>
      </v-col>
    </v-row>

    <!-- NACHWEIS BERUFSUNF -->
    <v-row
      justify="space-around"
      v-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 2 &&
        (this.$store.state.elternteil1.berufsunfähigkeits != 0 ||
          this.$store.state.elternteil2.berufsunfähigkeits != 0)
      "
    >
      <v-col cols="4" class="my-auto">
        <h4 class="text-left">
          Berufsunfähigkeitsversicherung
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" dark v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span>z.B.</span>
          </v-tooltip>
        </h4>
      </v-col>
      <v-col cols="8"
        ><v-file-input
          accept="image/*"
          label="Nachweise Berufsunfähigkeitsversicherung"
          chips
          show-size
          counter
          multiple
          truncate-length="23"
        ></v-file-input>
      </v-col>
    </v-row>

    <!-- NACHWEIS GEWERKSCH -->
    <v-row
      justify="space-around"
      v-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 2 &&
        (this.$store.state.elternteil1.gewerkschaft != 0 ||
          this.$store.state.elternteil2.gewerkschaft != 0)
      "
    >
      <v-col cols="4" class="my-auto">
        <h4 class="text-left">
          Beiträge zu Berufsverbänden
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" dark v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span>z.B.</span>
          </v-tooltip>
        </h4>
      </v-col>
      <v-col cols="8"
        ><v-file-input
          accept="image/*"
          label="Nachweise Berufsverbandsbeiträge"
          chips
          show-size
          counter
          multiple
          truncate-length="23"
        ></v-file-input>
      </v-col>
    </v-row>
    <v-divider
      class="my-3"
      v-if="
        (this.$store.state.radioGroupAntragsgrundlage === 2 &&
          (this.$store.state.elternteil1.haftpflicht != 0 ||
            this.$store.state.elternteil2.haftpflicht)) ||
        this.$store.state.elternteil1.hausrat != 0 ||
        this.$store.state.elternteil2.hausrat != 0 ||
        this.$store.state.elternteil1.freiwilligekrankenundpflege != 0 ||
        this.$store.state.elternteil2.freiwilligekrankenundpflege != 0 ||
        this.$store.state.elternteil1.freiwilligerente != 0 ||
        this.$store.state.elternteil2.freiwilligerente != 0 ||
        this.$store.state.elternteil1.riester != 0 ||
        this.$store.state.elternteil2.riester != 0 ||
        this.$store.state.elternteil1.lebens != 0 ||
        this.$store.state.elternteil2.lebens != 0 ||
        this.$store.state.elternteil1.kfzhaftpflicht != 0 ||
        this.$store.state.elternteil2.kfzhaftpflicht != 0 ||
        this.$store.state.elternteil1.unfall != 0 ||
        this.$store.state.elternteil2.unfall != 0 ||
        this.$store.state.elternteil1.berufsunfähigkeits != 0 ||
        this.$store.state.elternteil2.berufsunfähigkeits != 0 ||
        this.$store.state.elternteil1.gewerkschaft != 0 ||
        this.$store.state.elternteil2.gewerkschaft != 0
      "
    ></v-divider>

    <h3
      class="my-6"
      v-if="
        this.$store.state.elternteil1.kaltmiete != 0 ||
        this.$store.state.elternteil2.kaltmiete != 0 ||
        this.$store.state.eigentum_checkbox === true ||
        this.$store.state.elternteil1.besondere != 0 ||
        this.$store.state.elternteil2.besondere != 0 ||
        this.$store.state.elternteil1.unterhaltszahlungen != 0 ||
        this.$store.state.elternteil2.unterhaltszahlungen != 0 ||
        this.$store.state.elternteil1.sonstiges != 0 ||
        this.$store.state.elternteil2.sonstiges != 0
      "
    >
      Nachweise zur Ermittlung der Einkommensgrenze
    </h3>

    <!-- NACHWEIS KALTMIETE -->
    <v-row
      justify="space-around"
      v-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 2 &&
        (this.$store.state.elternteil1.kaltmiete != 0 ||
          this.$store.state.elternteil2.kaltmiete != 0)
      "
    >
      <v-col cols="4" class="my-auto">
        <h4 class="text-left">
          Kaltmiete und Betriebskosten
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" dark v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span>z.B.</span>
          </v-tooltip>
        </h4>
      </v-col>
      <v-col cols="8"
        ><v-file-input
          accept="image/*"
          label="Nachweise Kaltmiete/Betriebskosten"
          chips
          show-size
          counter
          multiple
          truncate-length="23"
        ></v-file-input>
      </v-col>
    </v-row>

    <!-- NACHWEIS EIGENTUM -->
    <v-row
      justify="space-around"
      v-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 2 &&
        this.$store.state.eigentum_checkbox === true
      "
    >
      <v-col cols="4" class="my-auto">
        <h4 class="text-left">
          Belastungen bei Wohnungs-/ Hauseigentum
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" dark v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span>z.B.</span>
          </v-tooltip>
        </h4>
      </v-col>
      <v-col cols="8"
        ><v-file-input
          accept="image/*"
          label="Nachweise Belastungen Wohneigentum"
          chips
          show-size
          counter
          multiple
          truncate-length="23"
        ></v-file-input>
      </v-col>
    </v-row>

    <!-- NACHWEIS BESONDERE -->
    <v-row
      justify="space-around"
      v-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 2 &&
        (this.$store.state.elternteil1.besondere != 0 ||
          this.$store.state.elternteil2.besondere != 0)
      "
    >
      <v-col cols="4" class="my-auto">
        <h4 class="text-left">
          Besondere Belastungen
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" dark v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span>z.B.</span>
          </v-tooltip>
        </h4>
      </v-col>
      <v-col cols="8"
        ><v-file-input
          accept="image/*"
          label="Nachweise besonderer Belastungen"
          chips
          show-size
          counter
          multiple
          truncate-length="23"
        ></v-file-input>
      </v-col>
    </v-row>

    <!-- NACHWEIS UNTERHALTSBELASTUNG -->
    <v-row
      justify="space-around"
      v-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 2 &&
        (this.$store.state.elternteil1.unterhaltszahlungen != 0 ||
          this.$store.state.elternteil2.unterhaltszahlungen != 0)
      "
    >
      <v-col cols="4" class="my-auto">
        <h4 class="text-left">
          Belastungen durch Unterhaltszahlungen
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" dark v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span>z.B.</span>
          </v-tooltip>
        </h4>
      </v-col>
      <v-col cols="8"
        ><v-file-input
          accept="image/*"
          label="Nachweise Belastungen Unterhaltszahlungen"
          chips
          show-size
          counter
          multiple
          truncate-length="23"
        ></v-file-input>
      </v-col>
    </v-row>

    <!-- NACHWEIS SONSTIGE -->
    <v-row
      justify="space-around"
      v-if="
        this.$store.state.entCheck &&
        this.$store.state.radioGroupAntragsgrundlage === 2 &&
        (this.$store.state.elternteil1.sonstiges != 0 ||
          this.$store.state.elternteil2.sonstiges != 0)
      "
    >
      <v-col cols="4" class="my-auto">
        <h4 class="text-left">
          Sonstiges
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" dark v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span>z.B.</span>
          </v-tooltip>
        </h4>
      </v-col>
      <v-col cols="8"
        ><v-file-input
          accept="image/*"
          label="Nachweise der Ergänzungen"
          chips
          show-size
          counter
          multiple
          truncate-length="23"
        ></v-file-input>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Nachweise",
  props: {},
  data() {
    return {
      //RULES
      nameRules: [(value) => !!value || "Pflichtfeld. Bitte ausfüllen!"],
      numberRules: [
        (value) => !!value || "Pflichtfeld. Bitte ausfüllen!",
        (value) =>
          /(?=.*\d)/.test(value) ||
          "Pflichtfeld. Hausnummer muss mindestens eine Zahl enthalten!",
      ],
      plzRules: [
        (value) => !!value || "Pflichtfeld. Bitte ausfüllen!",
        (value) =>
          (value && value.length == 5 && /^\d+$/.test(value)) ||
          "Pflichtfeld! Postleitzahl sollte ein fünfstelliger Wert sein und nur aus Ziffern bestehen.",
      ],
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
          (value && value.length >= 22 && /^\d+$/.test(value)) ||
          "Pflichtfeld. Bitte gültige IBAN eingeben!",
      ],
      dialog: false,
    };
  },

  created() {},

  watch: {},

  methods: {},
};
</script>
