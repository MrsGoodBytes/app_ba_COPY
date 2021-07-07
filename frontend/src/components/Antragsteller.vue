<template>
  <div id="Antragsteller" class="px-10">
    <!-- Daten Antragsteller -->

    <h2 class="py-3">Daten Antragsteller/in</h2>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12" md="4" sm="6">
          <v-text-field
            outlined
            v-model="firstname"
            :rules="nameRules"
            label="Vorname"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4" sm="6">
          <v-text-field
            outlined
            v-model="lastname"
            :rules="nameRules"
            label="Nachname"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4" sm="12" v-if="this.$store.state.entCheck">
          <v-text-field
            outlined
            v-model="date"
            label="Geburtsdatum TT.MM.JJJJ"
            prepend-icon="mdi-calendar"
            :rules="dateRules"
            required
          ></v-text-field>
        </v-col>
        <p v-else></p>
      </v-row>
      <v-divider></v-divider>
      <h3 class="py-3 text-left">Anschrift</h3>
      <v-row>
        <v-col cols="12" md="4" sm="8">
          <v-text-field
            outlined
            v-model="street"
            :rules="nameRules"
            label="Straße"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2" sm="4">
          <v-text-field
            outlined
            v-model="number"
            :rules="numberRules"
            label="Hausnummer"
            min="0"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2" sm="4">
          <v-text-field
            outlined
            v-model="postcode"
            :rules="plzRules"
            label="Postleitzahl"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4" sm="8">
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
            v-model="tel"
            :rules="telRules"
            label="Telefonnummer"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- Daten weiterer Personen -->
      <v-divider></v-divider>
      <div id="weiterePersonen" v-if="this.$store.state.entCheck">
        <h3 class="py-3 text-left">
          Zum Haushalt gehörende Personen
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span
              >Bitte
              <span class="text-decoration-underline font-weight-bold"
                >alle</span
              >
              Personen eintragen, die in Ihrem Haushalt leben.<br />
              Einschließlich aller Kinder, unabhängig von Alter oder davon, ob
              Sie für diese Anträge stellen möchten oder nicht.</span
            >
          </v-tooltip>
        </h3>
<!-- EINTRÄGE DER PERSONEN DES HAUSHALTS -->
        <v-card
          v-for="item in personlist"
          :key="item.id"
          cols="12"
          class="mt-1 mb-6 px-3"
        >
          <v-row>
            <v-col class="pb-0" cols="12" md="4" sm="12">
              <v-text-field
                outlined
                v-model="item.firstname_person"
                :rules="nameRules"
                label="Vorname"
                required
              ></v-text-field>
            </v-col>
            <v-col class="pb-0" cols="12" md="4" sm="12">
              <v-text-field
                outlined
                v-model="item.lastname_person"
                :rules="nameRules"
                label="Nachname"
                required
              ></v-text-field>
            </v-col>
            <v-col class="pb-0" cols="12" md="4" sm="12">
              <v-text-field
                outlined
                v-model="item.date_p"
                label="Geburtsdatum TT.MM.JJJJ"
                prepend-icon="mdi-calendar"
                :rules="dateRules"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex py-0" cols="12" sm="12" md="12">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon color="accent" v-bind="attrs" v-on="on"
                    >mdi-information</v-icon
                  >
                </template>
                <span
                  >Bitte den Namen des Kindes mit nennen. Bsp: "Vater von
                  Name-des-Kindes". Bei Geschwistern geben Sie bitte das Verwandtschaftsverhältnis der Kinder untereinander an.</span
                >
              </v-tooltip>
              <v-text-field
                outlined
                v-model="item.verwandtschaft_p"
                label="Verwandtschaft zum Kind"
                required
              ></v-text-field>
            </v-col>
            <v-col class="pt-0">
              <v-btn
                text
                outlined
                color="secondary"
                @click="deletePerson(item.id)"
              >
                Person löschen
                <v-icon> mdi-alert </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>

        <v-btn class="my-4" @click="addPerson">
          im Haushalt lebende Person hinzufügen
          <v-icon> mdi-plus </v-icon>
        </v-btn>
        <!-- Antragsgrundlate und Bankverbindung -->
      </div>
      <v-divider></v-divider>
      <h3
        class="font-weiht-black py-3 text-left"
        v-if="this.$store.state.entCheck || this.$store.state.bifoCheck"
      >
        Antragsgrundlage
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon color="accent" v-bind="attrs" v-on="on"
              >mdi-information</v-icon
            >
          </template>
          <div class="pl-3">
            <p class="text-left">
              Wenn Sie
              <span class="font-weight-bold">Privatinsolvenz</span> angemeldet
              haben, muss hierfür der amtsgerichtliche Bescheid vorliegen.
            </p>
            <p></p>
            <p class="text-left">
              im Fall von <span class="font-weight-bold">Einkommen</span> wird
              anhand der Einkommensgrenze entschieden, ob sie förderungsfähig
              sind.
            </p>
            <p class="text-left">
              Zu <span class="font-weight-bold">Sozialleistungen</span> zählen
              <list class="text-left">
                <li>Leistungen vom Jobcenter (Arbeitslosengeld II)</li>
                <li>Wohngeld nach dem Wohngeldgesetz</li>
                <li>Kinderzuschlag der Familienkassen</li>
                <li>Hilfe zum Lebensunterhalt</li>
                <li>Grundsicherung im Alter und bei Erwerbsminderung</li>
                <li>Leistungen nach dem Asylbewerberleistungsgesetz</li>
              </list>
            </p>
          </div>
        </v-tooltip>
      </h3>
<!-- ANTRAGSGRUNDLAGE -->
      <h4
        v-if="
          (this.$store.state.entCheck || this.$store.state.bifoCheck) &&
          this.$store.state.radioGroupAntragsgrundlage == 0
        "
        class="text-left error--text"
      >
        <v-icon color="secondary">mdi-alert</v-icon>
        Bitte wählen Sie eine Antragsgrundlage aus!
      </h4>
      <v-row v-if="this.$store.state.entCheck || this.$store.state.bifoCheck">
        <v-col class="pb-0">
          <v-radio-group v-model="radioGroupAntragsgrundlage">
            <v-radio class="d-none"> </v-radio>
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
      </v-row>
  <!-- TEXT Antragsgrundlage -->
      <v-row>
        <v-col
          v-if="
            radioGroupAntragsgrundlage === 2 &&
            (this.$store.state.entCheck || this.$store.state.bifoCheck)
          "
          class="text-center"
        >
          <h3>Familieneinkommen, Belastungen, Einkommensgrenze</h3>
          <p>Die im Haushalt lebenden Personen erzielen folgendes Einkommen:</p>
        </v-col>
        <v-col
          v-else-if="
            radioGroupAntragsgrundlage === 1 &&
            (this.$store.state.entCheck || this.$store.state.bifoCheck)
          "
          class="text-left pt-0"
        >
          <p>
            Im Falle der Privatinsolvenz muss die Entscheidung durch das
            Amtsgericht unter der Rubrik "Nachweise" angefügt werden.
          </p>
        </v-col>
        <v-col
          v-else-if="
            radioGroupAntragsgrundlage === 3 &&
            (this.$store.state.entCheck || this.$store.state.bifoCheck)
          "
          class="text-left pt-0"
        >
          <p>
            Wenn Sie Sozialleistungen beziehen, sind Sie für die
            Entgeltermäßigung berechtigt. Die entsprechenden Bescheide sollten
            unter der Rubrik "Nachweise" angefügt werden.
          </p>
        </v-col>
        <v-col
          v-if="radioGroupAntragsgrundlage === 3 && this.$store.state.bifoCheck"
          class="text-left pt-0"
        >
          <p>
            Der Bildungsfonds möchte in erster Linie einfach und zielgerichtet
            finanzielle Unterstützung zur Verfügung stellen. Grundsätzlich
            können Familien Unterstützung erhalten, die:
            <v-list>
              <li>ALG II oder Sozialhilfe beziehen</li>
              <li>oder Kinderzuschlag von der Familienkasse erhalten</li>
              <li>oder Wohngeld erhalten</li>
              <li>
                oder sich aus sonstigen Gründen in finanzieller Not befinden und
                dies in einem vereinfachten Nachweis darlegen.
              </li>
            </v-list>

            Als erste Anlaufstelle sind Mitarbeiterinnen und Mitarbeiter in
            Kindertagesstätten und Lehrkräfte in Schulen für Sie da. Die
            Entscheidung über eine Förderung wird vor Ort getroffen: Bitte
            wenden Sie sich an die Schule oder Kita, die Ihr Kind besucht. Dort
            hilft man Ihnen gerne weiter.
          </p>
        </v-col>
        <p v-else></p>
      </v-row>

  <!-- Einkommensnachweise ohne Sozialleistungen -->
      <div
        id="einkommensnachweis"
        v-if="
          radioGroupAntragsgrundlage === 2 &&
          (this.$store.state.entCheck || this.$store.state.bifoCheck)
        "
      >
        <h4 class="my-4">
          Angaben zur Ermittlung des durchschnittlichen monatlichen
          Familieneinkommens in €
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span
              >Hierbei sind nur leibliche Eltern bzw. Adoptiveltern zu
              berücksichtigen.</span
            >
          </v-tooltip>
        </h4>
        <v-card>
          <v-row
            justify="space-around"
            no-gutters
            style="width: 100%"
            class="d-flex align-center mb-6"
          >
            <v-col cols="4">
              <h4 class="text-left">
                Jahres-Nettoeinkommen der letzten 12 Monate
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon color="accent" v-bind="attrs" v-on="on"
                      >mdi-information</v-icon
                    >
                  </template>
                  <span
                    >Nettoarbeitseinkommen aus nichtselbstständiger Arbeit
                    <span class="text-decoration-underline font-weight-bold"
                      >der letzten 12 Monate</span
                    >
                    (inkl. Weihnachts- und Urlaubsgeld)</span
                  >
                </v-tooltip>
              </h4>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil1.netto"
                label="Netto Elternteil 1"
                prefix="€"
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil2.netto"
                label="Netto Elternteil 2"
                prefix="€"
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
        <v-card>
          <v-row
            justify="space-around"
            no-gutters
            style="width: 100%"
            class="d-flex align-center mb-6"
          >
            <v-col cols="4">
              <h4 class="text-left">Einkommen aus Selbstständigkeit</h4>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil1.selbst"
                label="Selbstständigkeit Elternteil 1"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil2.selbst"
                label="Selbstständigkeit Elternteil 2"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
        <v-card>
          <v-row
            justify="space-around"
            no-gutters
            style="width: 100%"
            class="d-flex align-center mb-6"
          >
            <v-col cols="4">
              <h4 class="text-left">Kindergeld</h4>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil1.kindergeld"
                label="Kindergeld Elternteil 1"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil2.kindergeld"
                label="Kindergeld Elternteil 2"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
          </v-row> </v-card
        ><v-card>
          <v-row
            justify="space-around"
            no-gutters
            style="width: 100%"
            class="d-flex align-center mb-6"
          >
            <v-col cols="4">
              <h4 class="text-left">
                Arbeitslosengeld 1 / Existenzgründerzuschuss
              </h4>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil1.alg1"
                label="ALG1/EGZ Elternteil 1"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil2.alg1"
                label="ALG1/EGZ Elternteil 2"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
          </v-row> </v-card
        ><v-card>
          <v-row
            justify="space-around"
            no-gutters
            style="width: 100%"
            class="d-flex align-center mb-6"
          >
            <v-col cols="4">
              <h4 class="text-left">Krankengeld</h4>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil1.krankengeld"
                label="Krankengeld Elternteil 1"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil2.krankengeld"
                label="Krankengeld Elternteil 2"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
        <v-card>
          <v-row
            justify="space-around"
            no-gutters
            style="width: 100%"
            class="d-flex align-center mb-6"
          >
            <v-col cols="4">
              <h4 class="text-left">
                Renten
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon color="accent" v-bind="attrs" v-on="on"
                      >mdi-information</v-icon
                    >
                  </template>
                  <span
                    >Bitte hier Einkommen aus gesetzlicher Rentenversicherung
                    angeben.</span
                  >
                </v-tooltip>
              </h4>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil1.rente"
                label="Rente Elternteil 1"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil2.rente"
                label="Rente Elternteil 2"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
        <v-card>
          <v-row
            justify="space-around"
            no-gutters
            style="width: 100%"
            class="d-flex align-center mb-6"
          >
            <v-col cols="4">
              <h4 class="text-left">
                Einkommen aus Unterhalt
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon color="accent" v-bind="attrs" v-on="on"
                      >mdi-information</v-icon
                    >
                  </template>
                  <span>auch Unterhaltsvorschuss</span>
                </v-tooltip>
              </h4>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil1.unterhaltseinkunft"
                label="Unterhalt an Elternteil 1"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil2.unterhaltseinkunft"
                label="Unterhalt an Elternteil 2"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
        <v-card>
          <v-row
            justify="space-around"
            no-gutters
            style="width: 100%"
            class="d-flex align-center mb-6"
          >
            <v-col cols="4">
              <h4 class="text-left">Ausbildungsvergütung</h4>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil1.ausbildungsvergütung"
                label="Ausbildungsvergütung Elternteil 1"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil2.ausbildungsvergütung"
                label="Ausbildungsvergütung Elternteil 2"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
        <v-card>
          <v-row
            justify="space-around"
            no-gutters
            style="width: 100%"
            class="d-flex align-center mb-6"
          >
            <v-col cols="4">
              <h4 class="text-left">Ausbildungsförderung nach BAföG/SGB III</h4>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil1.bafög"
                label="BAföG Elternteil 1"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil2.bafög"
                label="BAföG Elternteil 2"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
        <v-card>
          <v-row
            justify="space-around"
            no-gutters
            style="width: 100%"
            class="d-flex align-center mb-6"
          >
            <v-col cols="4">
              <h4 class="text-left">Elterngeld / Betreuungsgeld</h4>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil1.elterngeld"
                label="Elterngeld Elternteil 1"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil2.elterngeld"
                label="Elterngeld Elternteil 2"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
        <v-card>
          <v-row
            justify="space-around"
            no-gutters
            style="width: 100%"
            class="d-flex align-center mb-6"
          >
            <v-col cols="4">
              <h4 class="text-left">Kinderzuschlag der Familienkasse</h4>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil1.kinderzuschlag"
                label="Elternteil 1"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil2.kinderzuschlag"
                label="Elternteil 2"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
        <v-card>
          <v-row
            justify="space-around"
            no-gutters
            style="width: 100%"
            class="d-flex align-center mb-6"
          >
            <v-col cols="4">
              <h4 class="text-left">
                weitere Einnahmen
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon color="accent" v-bind="attrs" v-on="on"
                      >mdi-information</v-icon
                    >
                  </template>
                  <span>z.B. Miet- und Zinseinnahmen</span>
                </v-tooltip>
              </h4>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil1.weitere"
                label="Elternteil 1"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil2.weitere"
                label="Elternteil 2"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
        <v-card>
          <v-row
            justify="space-around"
            no-gutters
            style="width: 100%"
            class="d-flex align-center mb-6"
          >
            <v-col cols="4">
              <h4 class="text-left">
                Zweckgebundener Zuschuss zu den Kinderbetreuungskosten
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon color="accent" v-bind="attrs" v-on="on"
                      >mdi-information</v-icon
                    >
                  </template>
                  <span>z.B. vom Arbeitgeber</span>
                </v-tooltip>
              </h4>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil1.zuschussKita"
                label="Elternteil 1"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil2.zuschussKita"
                label="Elternteil 2"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
        <v-card>
          <v-row
            justify="space-around"
            no-gutters
            style="width: 100%"
            class="d-flex align-center mb-6"
          >
            <v-col cols="4">
              <h4 class="text-left">
                Einkommen von weiteren zum Haushalt gehörenden Personen
              </h4>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="haushaltseinkommen"
                label="weitere"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
            <v-col cols="3"></v-col>
          </v-row>
        </v-card>
        <h4 class="my-4">
          Angaben zur Ermittlung der auf das Einkommen anrechenbaren Belastungen
          in €
        </h4>
        <v-card>
          <v-row
            justify="space-around"
            no-gutters
            style="width: 100%"
            class="d-flex align-center mb-6"
          >
            <v-col cols="4">
              <h4 class="text-left">
                Arbeitsmittel
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon color="accent" v-bind="attrs" v-on="on"
                      >mdi-information</v-icon
                    >
                  </template>
                  <span
                    >Für eine erfolgreiche Antragstellung sind Kosten über 5,20€
                    bitte nachweisen. (z.B. Kosten für Berufsbekleidung)</span
                  >
                </v-tooltip>
              </h4>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil1.arbeitsmittel"
                label="Elternteil 1"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil2.arbeitsmittel"
                label="Elternteil 2"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
        <v-card class="mb-8">
          <v-row
            justify="space-around"
            no-gutters
            style="width: 100%"
            class="d-flex align-center mb-6"
          >
            <v-col cols="4">
              <h4 class="text-left">
                Fahrtkosten zur Arbeitsstätte
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon color="accent" v-bind="attrs" v-on="on"
                      >mdi-information</v-icon
                    >
                  </template>
                  <span
                    >Bei Notwendigkeit der Pkw-Nutzung bitte die km-Zahl einer
                    einfachen Fahrt zwischen Wohnungs- und Arbeitsstätte
                    angeben.</span
                  >
                </v-tooltip>
              </h4>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil1.fahrtkosten"
                label="Elternteil 1"
                prefix="km"
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil2.fahrtkosten"
                label="Elternteil 2"
                prefix="km"
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row
            v-if="
              this.elternteil1.fahrtkosten > 0 ||
              this.elternteil2.fahrtkosten > 0
            "
            ><v-col
              ><h4 class="mx-auto my-3">
                Hier ist vorgesehen, dass in Zukunft Felder für Einträge aus dem
                entsprechenden Vordruck platziert werden könnten.
              </h4>
            </v-col>
          </v-row>
        </v-card>
        <h4 class="my-4">
          Versicherungsbeiträge
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="accent" v-bind="attrs" v-on="on"
                >mdi-information</v-icon
              >
            </template>
            <span
              >Bitte nur aktuelle Policen oder Beitragsrechnungen! KEINE
              Kontoauszüge.</span
            >
          </v-tooltip>
        </h4>
        <v-card>
          <v-row
            justify="space-around"
            no-gutters
            style="width: 100%"
            class="d-flex align-center mb-6"
          >
            <v-col cols="4">
              <h4 class="text-left">Haftpflichtversicherung</h4>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil1.haftpflicht"
                label="Elternteil 1"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil2.haftpflicht"
                label="Elternteil 2"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
        <v-card>
          <v-row
            justify="space-around"
            no-gutters
            style="width: 100%"
            class="d-flex align-center mb-6"
          >
            <v-col cols="4">
              <h4 class="text-left">Hausratsversicherung</h4>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil1.hausrat"
                label="Elternteil 1"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil2.hausrat"
                label="Elternteil 2"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
        <v-card>
          <v-row
            justify="space-around"
            no-gutters
            style="width: 100%"
            class="d-flex align-center mb-6"
          >
            <v-col cols="4">
              <h4 class="text-left">
                Freiwillige Kranken- und Pflegeversicherung
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon color="accent" v-bind="attrs" v-on="on"
                      >mdi-information</v-icon
                    >
                  </template>
                  <span>Wenn Sie nicht gesetzlich versichert sind.</span>
                </v-tooltip>
              </h4>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil1.freiwilligekrankenundpflege"
                label="Elternteil 1"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil2.freiwilligekrankenundpflege"
                label="Elternteil 2"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
        <v-card>
          <v-row
            justify="space-around"
            no-gutters
            style="width: 100%"
            class="d-flex align-center mb-6"
          >
            <v-col cols="4">
              <h4 class="text-left">
                Freiwillige Versicherung in der gesetzlichen Rentenversicherung
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon color="accent" v-bind="attrs" v-on="on"
                      >mdi-information</v-icon
                    >
                  </template>
                  <span>nur bei Selbstständigen</span>
                </v-tooltip>
              </h4>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil1.freiwilligerente"
                label="Elternteil 1"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil2.freiwilligerente"
                label="Elternteil 2"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
        <v-card>
          <v-row
            justify="space-around"
            no-gutters
            style="width: 100%"
            class="d-flex align-center mb-6"
          >
            <v-col cols="4">
              <h4 class="text-left">Riester-Rente</h4>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil1.riester"
                label="Elternteil 1"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil2.riester"
                label="Elternteil 2"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
        <v-card>
          <v-row
            justify="space-around"
            no-gutters
            style="width: 100%"
            class="d-flex align-center mb-6"
          >
            <v-col cols="4">
              <h4 class="text-left">
                Risikolebensversicherung / Sterbegeldversicherung
              </h4>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil1.lebens"
                label="Elternteil 1"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil2.lebens"
                label="Elternteil 2"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
        <v-card>
          <v-row
            justify="space-around"
            no-gutters
            style="width: 100%"
            class="d-flex align-center mb-6"
          >
            <v-col cols="4">
              <h4 class="text-left">Kfz-Haftpflichtversicherung</h4>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil1.kfzhaftpflicht"
                label="Elternteil 1"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil2.kfzhaftpflicht"
                label="Elternteil 2"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
        <v-card>
          <v-row
            justify="space-around"
            no-gutters
            style="width: 100%"
            class="d-flex align-center mb-6"
          >
            <v-col cols="4">
              <h4 class="text-left">Unfallversicherung</h4>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil1.unfall"
                label="Elternteil 1"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil2.unfall"
                label="Elternteil 2"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
        <v-card>
          <v-row
            justify="space-around"
            no-gutters
            style="width: 100%"
            class="d-flex align-center mb-6"
          >
            <v-col cols="4">
              <h4 class="text-left">Berufsunfähigkeitsversicherung</h4>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil1.berufsunfähigkeits"
                label="Elternteil 1"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil2.berufsunfähigkeits"
                label="Elternteil 2"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
        <v-card>
          <v-row
            justify="space-around"
            no-gutters
            style="width: 100%"
            class="d-flex align-center mb-6"
          >
            <v-col cols="4">
              <h4 class="text-left">
                Beiträge zu Berufsverbänden
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon color="accent" v-bind="attrs" v-on="on"
                      >mdi-information</v-icon
                    >
                  </template>
                  <span>z.B. Gewerkschaft</span>
                </v-tooltip>
              </h4>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil1.gewerkschaft"
                label="Elternteil 1"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil2.gewerkschaft"
                label="Elternteil 2"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>

        <h4 class="my-4">Ermittlung der Einkommensgrenze in €</h4>

        <v-card>
          <v-row
            justify="space-around"
            no-gutters
            style="width: 100%"
            class="d-flex align-center mb-6"
          >
            <v-col cols="4">
              <h4 class="text-left">
                Kaltmiete und Betriebskosten
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon color="accent" v-bind="attrs" v-on="on"
                      >mdi-information</v-icon
                    >
                  </template>
                  <span>Ohne Heizkosten und ohne Strom.</span>
                </v-tooltip>
              </h4>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil1.kaltmiete"
                label="Elternteil 1"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil2.kaltmiete"
                label="Elternteil 2"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
        <v-card class="mb-9">
          <v-row
            justify="space-around"
            no-gutters
            style="width: 100%"
            class="d-flex align-center mb-6"
          >
            <v-col cols="4">
              <h4 class="text-left">
                Belastungen bei Wohnungs- /Hauseigentum
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon color="accent" v-bind="attrs" v-on="on"
                      >mdi-information</v-icon
                    >
                  </template>
                  <span
                    >Zinsen für Darlehen, Gebäudeversicherung, Grundsteuer,
                    Erbbauzinsen, Jahresabrechnung über Wasser-, Abwasser-,
                    Müll- und Schornsteinfegergebühren,
                    Niederschlagswassergebühr</span
                  >
                </v-tooltip>
              </h4>
            </v-col>
            <v-col cols="3">
              <v-checkbox
                v-model="eigentum_checkbox"
                ref="belastung_eigentum"
              ></v-checkbox>
            </v-col>
            <v-col cols="3"> </v-col>
          </v-row>
          <v-row v-if="eigentum_checkbox" class="pb-4">
            <v-col
              ><h4>
                Hier ist vorgesehen, dass in Zukunft Felder für Einträge aus dem
                entsprechenden Vordruck platziert werden könnten.
              </h4>
            </v-col>
          </v-row>
        </v-card>
        <v-card>
          <v-row
            justify="space-around"
            no-gutters
            style="width: 100%"
            class="d-flex align-center mb-6"
          >
            <v-col cols="4">
              <h4 class="text-left">
                besondere Belastungen
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon color="accent" v-bind="attrs" v-on="on"
                      >mdi-information</v-icon
                    >
                  </template>
                  <span
                    >z.B Kredite
                    <span style="font-weight: bolder">mit</span> Angabe des
                    Verwendungszwecks, wobei die Zinsbelastung nachgewiesen
                    werden <span style="font-weight: bolder">muss</span>.
                  </span>
                </v-tooltip>
              </h4>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil1.besondere"
                label="Elternteil 1"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil2.besondere"
                label="Elternteil 2"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
        <v-card>
          <v-row
            justify="space-around"
            no-gutters
            style="width: 100%"
            class="d-flex align-center mb-6"
          >
            <v-col cols="4">
              <h4 class="text-left">zu leistender Unterhalt</h4>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil1.unterhaltszahlungen"
                label="Elternteil 1"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="elternteil2.unterhaltszahlungen"
                label="Elternteil 2"
                prefix="€/mtl."
                :rules="moneyNotReqRules"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
        <v-card>
          <v-row
            justify="space-around"
            no-gutters
            style="width: 100%"
            class="d-flex align-center mb-6"
          >
            <v-col cols="5">
              <h4 class="text-left">Sonstige Ergänzungen / Angaben</h4>
              <v-textarea v-model="elternteil1.sonstiges" outlined></v-textarea>
            </v-col>
            <v-col cols="5">
              <h4 class="text-left">Sonstige Ergänzungen / Angaben</h4>
              <v-textarea v-model="elternteil2.sonstiges" outlined></v-textarea>
            </v-col>
          </v-row>
        </v-card>
      </div>
      <v-row v-if="radioGroupAntragsgrundlage === 2">
        <p>
          Um eine zügige Bearbeitung zu gewährleisten, sind die erforderlichen
          Nachweise unt derm dem Punkt "Nachweise" anzufügen. Kontoauszüge
          können NICHT als Nachweis berücksichtigt werden.
        </p>
      </v-row>
<!-- HINWEISE -->
      <v-row>
        <v-card
          v-if="this.$store.state.geCheck"
          class="mx-auto pa-5 my-8"
          max-width="400"
          outlined
          ><p class="text-left"><v-icon>mdi-information</v-icon></p>
          <h4 class="text-left">Hinweis Geschwisterermäßigung</h4>
          <p class="text-left">
            Da eine Abrechnung direkt mit dem Träger der Kindertageseinrichtung
            erfolgt, erhalten Sie keine Eingangsbestätigung und auch keinen
            Bescheid. Von Ihnen wird nur noch der reduzierte Elternbeitrag
            gefordert.
          </p>
        </v-card>

        <v-card
          v-if="this.$store.state.entCheck"
          class="mx-auto pa-5 my-8"
          max-width="400"
          outlined
          ><p class="text-left"><v-icon>mdi-information</v-icon></p>
          <h4 class="text-left">Hinweis Entgeltermäßigung</h4>
          <p class="text-left">
            Sollte ein Zuschuss gewährt werden, wird dieser vom Fachbereich
            Kultur und Bildung direkt an den Träger der Kindertageseinrichtung
            gezahlt.
          </p>
        </v-card>
      </v-row>
    </v-form>

    <v-btn
      class="my-6"
      justify="center"
      @click="funcShowKindDaten"
      color="accent"
    >
      weiter
      <v-icon> mdi-arrow-right-bold-circle-outline </v-icon>
    </v-btn>
    <v-alert v-if="this.valid != true" class="warning"
      >Bitte überprüfen Sie Ihre Eingaben auf Gültigkeit.</v-alert
    >
  </div>
</template>

<script>
export default {
  name: "Antragsteller",
  components: {},
  props: {
    personlist: Array,
  },
  data() {
    return {
      valid: false,
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
        "geringes Einkommen",
        "der Bezug von Sozialleistungen",
      ] /* 
      privatinsolvenz: false,
      sozialleistungen: false,
      ohnesozialleistungen: false, */,
      /* 
      nettoeinkommen: "",
      selbstständigkeiteinkommen: "", */

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

      einkommensgrenze1: 0,
      einkommensgrenze2: 0,
      einkommensgrenze_gesamt: 0,

      km: "",

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
          value.length === 5 || "Postleitzahl sollte genau 5 Ziffern lang sein",
      ],
      emailRules: [
        (value) => !!value || "Pflichtfeld. Bitte ausfüllen!",
        (value) =>
          /.+@.+\..+/.test(value) || "Bitte geben Sie eine gülitge E-mail an!",
      ],
      telRules: [
        (value) => !!value || "Pflichtfeld. Bitte ausfüllen!",
        (value) =>
          /^\d+$/.test(value) ||
          "Die Telefonnummer darf nur aus Zahlen bestehen!",
      ],
      moneyNotReqRules: [
        (value) => /^\d+$/.test(value) || "Wert muss eine Zahl sein.",
      ],
      dateRules: [(value) => !!value || "Pflichtfeld. Bitte ausfüllen!"],
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

    this.radioGroupAntragsgrundlage =
      this.$store.state.radioGroupAntragsgrundlage;
    this.privatinsolvenz = this.$store.state.privatinsolvenz;
    this.radioGroupErmaeßigung = this.$store.state.radioGroupErmaeßigung;

    this.nettoeinkommen = this.$store.state.nettoeinkommen;
    this.selbstständigkeiteinkommen =
      this.$store.state.selbstständigkeiteinkommen;

    this.eigentum_checkbox = this.$store.state.eigentum_checkbox;
    this.elternteil1 = this.$store.state.elternteil1;
    this.elternteil2 = this.$store.state.elternteil2;
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
      this.$store.commit("setAntragsgrundlage", val);
      this.valid = true;
    },
    privatinsolvenz: function (val) {
      this.$store.commit("setPrivatinsolvenz", val);
    },
    radioGroupErmaeßigung: function (val) {
      this.$store.commit("setErmaeßigungCheck", val);
      this.kontoinhaber =
        this.$store.state.firstname + this.$store.state.lastname;
    },
    nettoeinkommen: function (val) {
      this.$store.commit("setNettoeinkommen", val);
    },
    selbstständigkeiteinkommen: function (val) {
      this.$store.commit("setSelbstständigkeitEinkommen", val);
    },

    eigentum_checkbox: function (val) {
      this.$store.commit("setEigentumCheck", val);
    },

    valid: function (val) {
      this.$store.commit("setVal", val);
    },
  },

  methods: {

    save(date) {
      this.$refs.menu.save(date);
    },
    deletePerson(deleteID) {
      this.$parent.deletePerson(deleteID);
    },
    addPerson() {
      this.$parent.addPerson();
    },
    funcShowKindDaten() {
      if (
        // wenn Einträge fehlerhaft zeige Hinweis
        this.$refs.form.validate() == true &&
        (this.$store.state.entCheck || this.$store.state.bifoCheck) &&
        this.radioGroupAntragsgrundlage != 0
      ) {
        this.$parent.funcShowKindDaten();
      } else if (
        this.$refs.form.validate() == true &&
        !this.$store.state.entCheck &&
        !this.$store.state.bifoCheck
      ) {
        this.$parent.funcShowKindDaten();
      } else if (this.$refs.form.validate() == false) {
        this.valid = false;
      }
    },
  },
};
</script>