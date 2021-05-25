<template>
  <div id="Kind" class="pb-10">
    <h2 class="pt-3">Kind/er</h2>

    <h5
      class="pb-3"
      v-if="this.$store.state.geCheck && !this.$store.state.entCheck"
    >
      Bitte tragen Sie hier das jüngste Kind ein, für das die
      Geschwisterermäßigung
      <span v-if="this.$store.state.bifoCheck">
        und/oder Hilfe aus dem Bildungsfond</span
      >
      beantragt werden soll.
      <v-tooltip max-width="600" bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon color="accent" v-bind="attrs" v-on="on"
            >mdi-information</v-icon
          >
        </template>
        <span
          >Werden mehrere in einem Haushalt lebende Kinder einer Familie
          gleichzeitig in anerkannten Kindertageseinrichtungen,
          Kindertagespflegestellen oder an Lübecker Schulen nach dem Modell
          „Ganztag an Schule“ betreut, übernimmt die Hansestadt Lübeck den
          Elternbeitrag: - für das zweitälteste Kind zur Hälfte - für jedes
          weitere jüngere Kind vollständig. Die
          <span class="font-weight-bold">Geschwisterermäßigung</span> erfolgt
          unabhängig vom Einkommen.</span
        >
      </v-tooltip>
    </h5>

    <h5
      class="pb-3"
      v-if="this.$store.state.geCheck && this.$store.state.entCheck"
    >
      Bitte tragen Sie hier das jüngste Kind ein, für das die
      Geschwisterermäßigung<span v-if="this.$store.state.bifoCheck">
        und/oder Mittel aus dem Bildungsfond</span
      >
      sowie eine Entgeltermäßigung beantragt werden soll.
      <v-tooltip max-width="600" bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon color="accent" v-bind="attrs" v-on="on"
            >mdi-information</v-icon
          >
        </template>
        <span
          >Werden mehrere in einem Haushalt lebende Kinder einer Familie
          gleichzeitig in anerkannten Kindertageseinrichtungen,
          Kindertagespflegestellen oder an Lübecker Schulen nach dem Modell
          „Ganztag an Schule“ betreut, übernimmt die Hansestadt Lübeck den
          Elternbeitrag: - für das zweitälteste Kind zur Hälfte - für jedes
          weitere jüngere Kind vollständig. Die
          <span class="font-weight-bold">Geschwisterermäßigung</span> erfolgt
          unabhängig vom Einkommen.</span
        >
        <p v-if="this.$store.state.entCheck">
          Von der
          <span class="font-weight-bold">Entgeltermäßigung</span> ausgenommen
          sind Kinder, welche in einem Betreuungsverhältnis in einer Betreuten
          Grundschule stehen.
        </p>
      </v-tooltip>
    </h5>

    <h5
      class="pb-3"
      v-if="!this.$store.state.geCheck && this.$store.state.entCheck"
    >
      Bitte tragen Sie im folgenden alle Kinder ein, für die eine
      Entgeltermäßigung<span v-if="this.$store.state.bifoCheck">
        und/oder Hilfe aus dem Bildungsfond</span
      >
      beantragt werden soll.
      <v-tooltip max-width="600" bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon color="accent" v-bind="attrs" v-on="on"
            >mdi-information</v-icon
          >
        </template>
        <span
          >Von der Entgeltermäßigung ausgenommen sind Kinder, welche in einem
          Betreuungsverhältnis in einer Betreuten Grundschule stehen.</span
        >
      </v-tooltip>
    </h5>

    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row class="my-0 py-0"
        ><!-- v-for="n in childList" :key="n" -->
        <v-col cols="12" sm="4">
          <v-text-field
            outlined
            v-model="child_firstname"
            label="Vorname des Kindes"
            :rules="nameRules"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field
            outlined
            v-model="child_lastname"
            label="Nachname des Kindes"
            :rules="nameRules"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field
            outlined
            v-model="date_child"
            label="Geburtsdatum"
            prepend-icon="mdi-calendar"
            :rules="dateRules"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <h3 class="text-left py-3">Folgeantrag</h3>
      <v-row class="my-0 py-0">
        <v-col
          v-if="this.$store.state.entCheck"
          class="d-flex my-0 py-0"
          cols="12"
          sm="12"
        >
          <v-checkbox
            class="my-0 py-0"
            v-model="vorjahr_checkbox"
            ref="vorjahr_check"
            :label="'Für das Kind wurde im VORJAHR ein Antrag auf Entgelt-Ermäßigung gestellt:'"
          ></v-checkbox
          ><v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span
              >Gilt auch, wenn der Antrag für eine andere Einrichtung gestellt
              wurde.</span
            >
          </v-tooltip>
        </v-col>
        <p v-else></p>
      </v-row>
      <v-divider></v-divider>
      <h3 class="text-left py-3">Betreuung</h3>
      <h4
        v-if="
          this.valid != true && this.$store.state.radioGroupBetreuungsform == 0
        "
        class="text-left error--text"
      >
        <v-icon color="secondary">mdi-alert</v-icon>
        Bitte wählen Sie eine Betreuungsform aus!
      </h4>
      <v-row>
        <v-col
          v-if="
            this.$store.state.bifoCheck &&
            !this.$store.state.entCheck &&
            !this.$store.state.geCheck
          "
          class="d-flex"
          cols="12"
          sm="4"
        >
          <v-radio-group v-model="radioGroupBetreuungsform">
            <v-radio
              v-model="betreuungsform"
              ref="betreuungsform"
              v-for="n in radioListBetreuungsform_bifo"
              :key="n"
              :label="`${n}`"
              :value="n"
            ></v-radio>
          </v-radio-group>
        </v-col>

        <v-col v-else class="d-flex" cols="12" sm="4">
          <v-radio-group v-model="radioGroupBetreuungsform">
            <v-radio class="d-none"> </v-radio>
            <v-radio
              v-model="betreuungsform"
              ref="betreuungsform"
              v-for="n in radioListBetreuungsform"
              :key="n"
              :label="`${n}`"
              :value="n"
            ></v-radio>
          </v-radio-group>
        </v-col>

        <v-col v-if="radioGroupBetreuungsform === 1" cols="12" sm="8">
          <v-text-field
            outlined
            v-model="tagespflegename"
            label="Name der Tagespflegeperson"
            :rules="nameRules"
            required
          ></v-text-field>
          <v-text-field
            outlined
            v-model="institutionstreet"
            label="Straße der Tagespflege"
            :rules="nameRules"
            required
          ></v-text-field>
          <v-text-field
            outlined
            v-model="institutionnumber"
            label="Hausnummer der Tagespflege"
            :rules="numberRules"
            required
          ></v-text-field>
          <v-text-field
            outlined
            v-model="institutionpostcode"
            label="PLZ der Tagespflege"
            :rules="nameRules"
            required
          ></v-text-field>
          <v-text-field
            outlined
            v-model="institutiontown"
            label="Ort der Tagespflege"
            :rules="nameRules"
            required
          ></v-text-field>
        </v-col>
        <v-col v-else-if="radioGroupBetreuungsform != 0">
          <v-text-field
            outlined
            v-model="institutionname"
            label="Name der Betreuungseinrichtung"
            :rules="nameRules"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          v-if="
            this.$store.state.geCheck ||
            this.$store.state.radioGroupBetreuungsform === 1
          "
          class="d-flex"
          cols="12"
          md="3"
          sm="6"
        >
          <v-text-field
            outlined
            v-model="date_bb"
            label="Betreuungsbeginn"
            prepend-icon="mdi-calendar"
            :rules="dateRules"
            required
          ></v-text-field>
        </v-col>
        <p v-else></p>

        <v-col
          v-if="
            (this.$store.state.geCheck &&
              this.radioGroupBetreuungsform === 1) ||
            (this.$store.state.entCheck && this.radioGroupBetreuungsform === 1)
          "
          class="d-flex"
          cols="12"
          md="3"
          sm="6"
        >
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span>Stunden in der Woche</span>
          </v-tooltip>
          <v-text-field
            outlined
            v-model="betreuungsumfang"
            :rules="moneyRules"
            label="Betreuungsumfang"
            prefix="Std."
            required
          ></v-text-field>
        </v-col>
        <p v-else></p>

        <v-col
          v-if="this.$store.state.entCheck"
          class="d-flex"
          cols="12"
          md="3"
          sm="6"
        >
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span
              >Das Betreuungsentgelt ist die zu entrichtende Summe OHNE Abzüge
              und Ermäßigungen.</span
            >
          </v-tooltip>
          <v-text-field
            outlined
            v-model="betreuungsentgelt"
            prefix="€"
            :rules="moneyRules"
            label="Betreuungsentgelt"
            required
          ></v-text-field>
        </v-col>
        <p v-else></p>

        <v-col
          v-if="this.$store.state.geCheck"
          class="d-flex"
          cols="12"
          md="3"
          sm="6"
        >
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span
              >Der Elternbeitrag ist das Betreuungsentgelt abzüglich ggf. vom Träger gewährter Geschwisterermäßigung.</span
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
        <p v-else></p>
      </v-row>

      <v-divider></v-divider>

      <h3 v-if="this.$store.state.bifoCheck" class="text-left py-3">
        Mittel aus dem Bildungsfond
      </h3>
      <v-row
        v-if="
          this.$store.state.bifoCheck &&
          this.$store.state.radioGroupBetreuungsform === 1
        "
      >
        <v-col class="text-left" cols="4">
          <h4
            v-if="
              this.$store.state.bifoCheck &&
              this.$store.state.radioGroupBetreuungsform === 1
            "
            class="text-left"
          >
            Kostenerstattung Mittagessen
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="accent" v-bind="attrs" v-on="on"
                  >mdi-information</v-icon
                >
              </template>
              <span
                >Kann nur für Kinder beantragt werden, welche in einer
                Tagespflegeeinrichtung betreut werden.</span
              >
            </v-tooltip>
          </h4>
          <h5
            v-if="
              this.$store.state.bifoCheck &&
              this.$store.state.radioGroupBetreuungsform === 1
            "
          >
            Für Beantragung von Mitteln aus dem Bildungsfond zur
            <span class="text-decoration-underline"
              >Kostenerstattung des Mittagessens</span
            >
            bitte angeben:
          </h5>
        </v-col>
        <v-col class="d-flex" cols="12" sm="4">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span>monatlicher Betrag</span>
          </v-tooltip>
          <v-text-field
            outlined
            v-model="essensgeld"
            :rules="moneyNotReqRules"
            label="Essensgeld"
            prefix="€"
          ></v-text-field>
        </v-col>
        <v-col class="d-flex" cols="12" sm="4">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span>Gültig ab sofort wenn kein Datum angegeben</span>
          </v-tooltip>
          <v-text-field
            outlined
            v-model="gueltig"
            label="Gültig ab"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row
        v-if="
          this.$store.state.bifoCheck &&
          this.$store.state.radioGroupBetreuungsform === 1
        "
      >
        <v-col class="text-left" cols="12" sm="4">
          <h5>Ermäßigung des Essensgeldes bitte überweisen an:</h5>
        </v-col>
        <v-col cols="12" sm="8">
          <v-text-field
            outlined
            v-model="kontoinhaber"
            :rules="nameRules"
            label="Kontoinhaber/in"
            disabled
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
          <v-text-field outlined v-model="bank" label="Bank"></v-text-field>
        </v-col>
      </v-row>
      <h4
        v-if="
          this.$store.state.bifoCheck &&
          this.$store.state.radioGroupBetreuungsform === 2
        "
        class="text-left"
      >
        Anteilige Kostenerstattung Ausflüge
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon color="accent" v-bind="attrs" v-on="on"
              >mdi-information</v-icon
            >
          </template>
          <span
            >Kann nur für Kinder beantragt werden, die
            <span class="text-decoration-underline font-weight-bold"
              >nicht</span
            >
            in einer Tagespflege-Einrichtung betreut werden.</span
          >
        </v-tooltip>
      </h4>
      <v-row
        v-if="
          this.$store.state.bifoCheck &&
          this.$store.state.radioGroupBetreuungsform === 2
        "
      >
        <v-col class="d-flex pt-0" cols="12" sm="8">
          <v-checkbox
            v-model="kostenerstattung"
            ref="vorjahr_check"
            :label="'Wir beantragen eine anteiligeKostenerstattung für ein- und mehrtägig  Ausflüge durch Mittel aus dem Bildungsfond.'"
          ></v-checkbox>
        </v-col>
        <v-col class="d-flex align-center" cols="12" sm="4">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span>Gültig ab sofort wenn kein Datum angegeben</span>
          </v-tooltip>
          <v-text-field
            outlined
            v-model="gueltig"
            :rules="dateRules"
            label="Gültig ab"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <p v-else></p>

      <h4 v-if="this.$store.state.bifoCheck" class="text-left">Aktiv-Pass</h4>
      <v-row v-if="this.$store.state.bifoCheck">
        <v-col class="text-left" cols="4">
          <h5>
            Um an einer Aktivität des Aktiv-Passes teilnehmen zu können, wird
            die Kostenerstattung für fol- gende Anschaffung beantragt:
          </h5>
        </v-col>
        <v-col cols="8">
          <h5 class="text-left">
            Ausführliche Begründung zur Notwendigkeit der Anschaffung und
            weshalb die Anschaffung nicht -endgültig- aus eigenen Mitteln
            finanziert werden kann:
          </h5>
          <v-textarea v-model="bifo_begr" outlined></v-textarea>
        </v-col>
      </v-row>
      <p v-else></p>

      <v-divider></v-divider>

      <div id="Geschwisterkind">
        <h3 class="my-3">Geschwisterkind/er</h3>

        <h5 v-if="this.$store.state.geCheck && !this.$store.state.entCheck">
          Bitte tragen Sie hier Ihre älteren Kinder ein, die sich ebenfalls in
          einem Betreuungsverhältnis befinden<span
            v-if="this.$store.state.bifoCheck"
          >
            und/oder für welche Mittel aus dem Bildungsfond beantragt werden
            sollen</span
          >.
        </h5>
        <h5
          v-else-if="this.$store.state.entCheck && !this.$store.state.geCheck"
        >
          Bitte tragen Sie hier alle Ihre Kinder ein, für die Sie eine
          Entgeltermäßigung<span v-if="this.$store.state.bifoCheck">
            und/oder Mittel aus dem Bildungsfond</span
          >
          beantragen möchten. Ausgenommen von der Entgeltermäßigung ist eine
          Betreuung in der betreuten Grundschule.
        </h5>
        <h5 v-else-if="this.$store.state.entCheck && this.$store.state.geCheck">
          Bitte tragen Sie hier alle Ihre Kinder ein, die sich ebenfalls in
          einem Betreuungsverhältnis befinden<span
            v-if="this.$store.state.bifoCheck"
            >, für die Sie Mittel aus dem Bildungsfond
          </span>
          und/oder für die Sie eine Entgeltermäßigung beantragen möchten.
          Ausgenommen für die Entgeltermäßigung ist eine Betreuung in der
          betreuten Grundschule.
        </h5>

        <v-card
          v-for="item in childlist"
          :key="item.id"
          class="pa-8 my-6"
          color="#F5F5F5"
        >
          <v-row class="mb-0 px-3">
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
          <v-divider></v-divider>
          <h4 class="text-left py-3">Folgeantrag</h4>
          <v-row class="my-0 py-0">
            <v-col
              v-if="item.entCheck"
              class="d-flex my-0 py-0"
              cols="12"
              sm="12"
            >
              <v-checkbox
                class="my-0 py-0"
                v-model="item.vorjahr_checkbox"
                ref="vorjahr_check"
                :label="'Für das Kind wurde im VORJAHR ein Antrag auf Entgelt-Ermäßigung gestellt.'"
              ></v-checkbox
              ><v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon color="accent" v-bind="attrs" v-on="on"
                    >mdi-information</v-icon
                  >
                </template>
                <span
                  >Gilt auch, wenn der Antrag für eine andere Einrichtung
                  gestellt wurde.</span
                >
              </v-tooltip>
            </v-col>
            <p v-else></p>
          </v-row>
          <v-divider></v-divider>

          <h4 class="text-left pt-3">
            Betreuung
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="accent" v-bind="attrs" v-on="on"
                  >mdi-information</v-icon
                >
              </template>
              <span
                >Offene Ganztagsschule mit einer Nachmittagsbetreuung an mindestens 3
                Tagen pro Woche für mindestens 70 EURO monatlich (die 70 EUR
                beziehen sich auf den Grundbetrag ohne Abzug jeglicher
                Ermäßigungen)</span
              >
            </v-tooltip>
          </h4>
          <h5 v-if="valid_sibling" class="text-left error--text">
            <v-icon color="secondary">mdi-alert</v-icon>
            Bitte wählen Sie eine Betreuungsform aus!
          </h5>
          <v-row class="px-3">
            <v-col v-if="item.geCheck" class="d-flex" cols="12" sm="3">
              <v-radio-group v-model="item.radioGroupBetreuungsform_sibling">
                <v-radio class="d-none"> </v-radio>
                <v-radio
                  v-model="item.betreuungsform"
                  ref="betreuungsform"
                  v-for="n in radioListBetreuungsform_ganz"
                  :key="n"
                  :label="`${n}`"
                  :value="n"
                ></v-radio>
              </v-radio-group>
            </v-col>
            <v-col v-else-if="item.bifoCheck" class="d-flex" cols="12" sm="3">
              <v-radio-group v-model="item.radioGroupBetreuungsform_sibling">
                <v-radio class="d-none"> </v-radio>
                <v-radio
                  v-model="item.betreuungsform"
                  ref="betreuungsform"
                  v-for="n in radioListBetreuungsform_bifo"
                  :key="n"
                  :label="`${n}`"
                  :value="n"
                ></v-radio>
              </v-radio-group>
            </v-col>
            <v-col v-else class="d-flex" cols="12" sm="3">
              <v-radio-group v-model="item.radioGroupBetreuungsform_sibling">
                <v-radio class="d-none"> </v-radio>
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
            <v-col v-if="item.radioGroupBetreuungsform_sibling === 1">
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

              <h5
                class="text-left mt-0 pt-0"
                v-if="item.radioGroupBetreuungsform_sibling === 5"
              >
                <v-icon>mdi-alert</v-icon>Für Kinder in der Grundschulbetreuung
                wird kein Antrag auf Ermäßigung gestellt.
              </h5>
            </v-col>
          </v-row>

          <v-row>
            <v-col
              v-if="
                item.geCheck ||
                (item.bifoCheck && item.radioGroupBetreuungsform_sibling === 1)
              "
              class="d-flex"
              cols="12"
              sm="4"
            >
              <v-text-field
                outlined
                v-model="item.date_bb"
                label="Betreuungsbeginn"
                prepend-icon="mdi-calendar"
                :rules="dateRules"
                required
              ></v-text-field>
            </v-col>
            <p v-else></p>
            <v-col
              v-if="item.geCheck || item.entCheck"
              class="d-flex"
              cols="12"
              sm="4"
            >
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon color="accent" v-bind="attrs" v-on="on"
                    >mdi-information</v-icon
                  >
                </template>
                <span
                  >Das Betreuungsentgelt ist die zu entrichtende Summe OHNE
                  Abzüge und Ermäßigungen.</span
                >
              </v-tooltip>
              <v-text-field
                outlined
                v-model="item.betreuungsentgelt"
                prefix="€"
                :rules="moneyRules"
                label="Betreuungsentgelt"
                required
              ></v-text-field>
            </v-col>
            <p v-else></p>
            <v-col v-if="item.entCheck" class="d-flex" cols="12" sm="4">
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
                v-model="item.elternbeitrag"
                prefix="€"
                :rules="moneyRules"
                label="Elternbeitrag"
                required
              ></v-text-field>
            </v-col>
            <p v-else></p>
          </v-row>

          <v-divider></v-divider>

          <h4 v-if="item.bifoCheck" class="text-left py-3">
            Mittel aus dem Bildungsfond
          </h4>
          <h4
            v-if="item.bifoCheck && item.radioGroupBetreuungsform_sibling === 1"
            class="text-left"
          >
            Kostenerstattung Mittagessen
          </h4>
          <v-row
            v-if="item.bifoCheck && item.radioGroupBetreuungsform_sibling === 1"
          >
            <v-col cols="4" class="text-left">
              <h5>
                Für Beantragung von Mitteln aus dem Bildungsfond zur
                <span class="text-decoration-underline"
                  >Kostenerstattung des Mittagessens</span
                >
                bitte angeben:
              </h5>
            </v-col>
            <v-col class="d-flex" cols="12" sm="4">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon color="accent" v-bind="attrs" v-on="on"
                    >mdi-information</v-icon
                  >
                </template>
                <span>monatlicher Betrag</span>
              </v-tooltip>
              <v-text-field
                outlined
                v-model="item.essensgeld"
                :rules="MoneyNoReqRules"
                label="Essensgeld"
                prefix="€"
              ></v-text-field>
            </v-col>
            <v-col class="d-flex" cols="12" sm="4">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon color="accent" v-bind="attrs" v-on="on"
                    >mdi-information</v-icon
                  >
                </template>
                <span>Gültig ab sofort wenn kein Datum angegeben</span>
              </v-tooltip>
              <v-text-field
                outlined
                v-model="item.gueltig"
                label="Gültig ab"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <h4
            v-if="item.bifoCheck && item.radioGroupBetreuungsform_sibling === 2"
            class="text-left"
          >
            Anteilige Kostenerstattung Ausflüge
          </h4>
          <v-row
            v-if="item.bifoCheck && item.radioGroupBetreuungsform_sibling === 2"
          >
            <v-col class="d-flex pt-0" cols="12" sm="8">
              <v-checkbox
                v-model="item.kostenerstattung"
                ref="vorjahr_check"
                :label="'Wir beantragen eine anteilige Kostenerstattung für ein- und mehrtägig Ausflüge durch Mittel aus dem Bildungsfond.'"
              ></v-checkbox>
            </v-col>
            <v-col class="d-flex align-center" cols="12" sm="4">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon color="accent" v-bind="attrs" v-on="on"
                    >mdi-information</v-icon
                  >
                </template>
                <span>Gültig ab sofort wenn kein Datum angegeben</span>
              </v-tooltip>
              <v-text-field
                outlined
                v-model="item.gueltig"
                :rules="dateRules"
                label="Gültig ab"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <h4 v-if="item.bifoCheck" class="text-left">Aktiv-Pass</h4>
          <v-row v-if="item.bifoCheck">
            <v-col class="text-left" cols="4">
              <h5>
                Um an einer Aktivität des Aktiv-Passes teilnehmen zu können,
                wird die Kostenerstattung für folgende Anschaffung beantragt:
              </h5>
            </v-col>
            <v-col cols="8">
              <h5 class="text-left">
                Ausführliche Begründung zur Notwendigkeit der Anschaffung und
                weshalb die Anschaffung nicht - endgültig - aus eigenen Mitteln
                finanziert werden kann:
              </h5>
              <v-textarea v-model="item.bifo_begr" outlined></v-textarea>
            </v-col>
          </v-row>
          <p v-else></p>

          <v-row>
            <v-col class="pt-0">
              <v-btn
                class="ma-0"
                text
                outlined
                color="secondary"
                @click="deleteChild(item.id)"
              >
                Einträge dieses Kindes löschen
                <v-icon> mdi-alert </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
        <v-btn class="my-4" @click="addChild">
          Geschwisterkind hinzufügen
          <v-icon> mdi-plus </v-icon>
        </v-btn>
      </div>
    </v-form>
    <v-btn
      class="d-block mx-auto my-6"
      @click="funcShowNachweise"
      :disabled="!valid"
      color="accent"
    >
      weiter
      <v-icon> mdi-arrow-right-bold-circle-outline </v-icon>
    </v-btn>

    <v-btn class="d-block mx-auto my-6" @click="funcShowAntragstellerDaten">
      <v-icon> mdi-arrow-left-bold-circle-outline </v-icon>
      Antragsteller/in
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "Kind",
  props: {
    childlist: Array,
  },
  data() {
    return {
      valid: false,
      valid_sibling: false,

      child_firstname: "",
      child_lastname: "",

      elternbeitrag: "",
      date_bb: "",
      betreuungsentgelt: "",

      essensgeld: "",
      kostenerstattung: false,
      gueltig: "",
      bifo_begr: "",

      tagespflegename: "",
      institutionstreet: "",
      institutionnumber: "",
      institutionpostcode: "",
      institutiontown: "",
      institutionname: "",

      vorjahr_checkbox: false,
      sibling_ent_checkbox: false,
      sibling_bifo_checkbox: false,

      betreuungsform: "",
      betreuungsumfang: "",
      radioGroupBetreuungsform: 0,
      radioGroupBetreuungsform_sibling: 0,
      radioListBetreuungsform: ["Tagespflege", "Krippe", "Elementar", "Hort"],
      radioListBetreuungsform_bifo: ["Tagespflege", "Kindertageseinrichtung"],
      radioListBetreuungsform_ganz: [
        "Tagespflege",
        "Krippe",
        "Elementar",
        "Hort",
        "Ganztags an Schule",
      ],
      bank: "",
      kontoinhaber: "",
      iban: "",
      bic: "",

      //RULES
      nameRules: [(value) => !!value || "Pflichtfeld. Bitte ausfüllen!"],
      moneyRules: [
        ((value) => !!value && /^\d+$/.test(value)) ||
          "Wollen Sie dieses Feld wirklich leer lassen?",
      ],
      moneyNotReqRules: [
        (value) => /^\d+$/.test(value) || "Wert muss eine Zahl sein.",
      ],
      telRules: [
        (value) => !!value || "Pflichtfeld. Bitte ausfüllen!",
        (value) =>
          (value && value.length >= 9 && /^\d+$/.test(value)) ||
          "Pflichtfeld. Bitte gültige Telefonnummer eingeben! Darf keine Buchstaben enthalten.",
      ],
      dateRules: [(value) => !!value || "Pflichtfeld. Bitte ausfüllen!"],
      ibanRules: [
        (value) => !!value || "Pflichtfeld. Bitte ausfüllen!",
        (value) =>
          (value && value.length >= 22) ||
          "Pflichtfeld. Bitte gültige IBAN eingeben!",
      ],
      numberRules: [
        (value) => !!value || "Pflichtfeld. Bitte ausfüllen!",
        (value) =>
          /(?=.*\d)/.test(value) ||
          "Pflichtfeld. Hausnummer muss mindestens eine Zahl enthalten!",
      ],
      plzRules: [
        (value) => !!value || "Pflichtfeld. Bitte ausfüllen!",
        (value) =>
          value.length === 5 || "Postleitzahl sollte genau 5 Ziffern lang sein",
      ],
      emailRules: [
        (value) => !!value || "Pflichtfeld. Bitte ausfüllen!",
        (value) =>
          /.+@.+\..+/.test(value) || "Bitte geben Sie eine gülitge E-mail an!",
      ],
    };
  },

  watch: {
    child_firstname: function (val) {
      this.$store.commit("setChildFirstname", val);
    },
    child_lastname: function (val) {
      this.$store.commit("setChildLastname", val);
    },

    date_bb: function (val) {
      this.$store.commit("setChildBB", val);
    },
    elternbeitrag: function (val) {
      this.$store.commit("setElternbeitrag", val);
    },
    betreuungsentgelt: function (val) {
      this.$store.commit("setBetreuungsentgelt", val);
    },
    essensgeld: function (val) {
      this.$store.commit("setEssensgeld", val);
    },
    betreuungsumfang: function (val) {
      this.$store.commit("setBetreuungsumfang", val);
    },

    tagespflegename: function (val) {
      this.$store.commit("setTagespflegeName", val);
    },
    institutionstreet: function (val) {
      this.$store.commit("setInstitutionStreet", val);
    },
    institutionnumber: function (val) {
      this.$store.commit("setInstitutionNumber", val);
    },
    institutionpostcode: function (val) {
      this.$store.commit("setInstitutionPostcode", val);
    },
    institutiontown: function (val) {
      this.$store.commit("setInstitutionTown", val);
    },
    institutionname: function (val) {
      this.$store.commit("setInstitutionName", val);
    },

    vorjahr_checkbox: function (val) {
      this.$store.commit("setVorjahrCheck", val);
    },

    kostenerstattung: function (val) {
      this.$store.commit("setKostenerstattung", val);
    },
    gueltig: function (val) {
      this.$store.commit("setGueltig", val);
    },
    bifo_begr: function (val) {
      this.$store.commit("setBifoBegr", val);
    },

    radioGroupBetreuungsform: function (val) {
      this.$store.commit("setBetreuungsform", val);
    },
    bank: function (val) {
      this.$store.commit("setBank", val);
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
  //load previus values from store
  created() {
    this.child_firstname = this.$store.state.child_firstname;
    this.child_lastname = this.$store.state.child_lastname;
    this.date_child = this.$store.state.date_child;

    this.institutionname = this.$store.state.institutionname;
    this.institutionstreet = this.$store.state.institutionstreet;
    this.institutionnumber = this.$store.state.institutionnumber;
    this.institutionpostcode = this.$store.state.institutionpostcode;
    this.institutiontown = this.$store.state.institutiontown;
    this.tagespflegename = this.$store.state.tagespflegename;

    this.elternbeitrag = this.$store.state.elternbeitrag;
    this.betreuungsentgelt = this.$store.state.betreuungsentgelt;
    this.date_bb = this.$store.state.date_bb;

    this.radioGroupBetreuungsform = this.$store.state.radioGroupBetreuungsform;

    this.essensgeld = this.$store.state.essensgeld;
    this.betreuungsumfang = this.$store.state.betreuungsumfang;
    this.vorjahr_checkbox = this.$store.state.vorjahr_checkbox;
    this.kostenerstattung = this.$store.state.kostenerstattung;
    this.gueltig = this.$store.state.kostenerstattung;
    this.bifo_begr = this.$store.state.bifo_begr;

    this.kontoinhaber =
      this.$store.state.firstname + " " + this.$store.state.lastname;
    this.iban = this.$store.state.iban;
    this.bic = this.$store.state.bic;
    this.bank = this.$store.state.bank;
  },

  methods: {
    funcShowNachweise() {
      if (this.$refs.form.validate() == true) {
        this.$parent.funcShowNachweise();
      } else {
        this.valid = false;
      }
    },
    funcShowAntragstellerDaten() {
      this.$parent.funcShowAntragstellerDaten();
    },

    deleteChild(deleteID) {
      this.$parent.deleteChild(deleteID);
    },
    addChild() {
      this.$parent.addChild();
    },
  },
};
</script>