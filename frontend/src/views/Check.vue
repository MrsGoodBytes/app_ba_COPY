<template>
  <div class="check">
    <p class="text-right">
      <router-link to="/"
        ><v-btn fab class="mr-3"><v-icon>mdi-close</v-icon></v-btn></router-link
      >
    </p>
    <h1 class="px-12">
      Bitte beantworten Sie die 4 Fragen um die für Sie relevanten Anträge zu
      ermitteln:
    </h1>

    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1" @click="e1 = 1">
          Frage 1
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2" @click="e1 = 2">
          Frage 2
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 3" step="3" @click="e1 = 3">
          Frage 3
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 4" step="4" @click="e1 = 4">
          Frage 4
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 4" step="6"> Frage 5 </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1" class="mb-6 mx-auto" height="200px">
          <h4 class="text-center mb-4">
            Haben Sie mehr als eines Ihrer Kinder in einer Betreuungseinrichtung
            angemeldet?
          </h4>
          <v-btn class="mx-3" color="accent" @click="oneAddYes"> Ja </v-btn>

          <v-btn class="mx-3" color="accent" @click="oneAddNo"> Nein </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2" class="mb-6 mx-auto" height="200px">
          <h4 class="text-center mb-4">
            Beziehen Sie, als Antragssteller, Sozialleistungen?
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="accent" v-bind="attrs" v-on="on"
                  >mdi-information</v-icon
                >
              </template>
              <span
                >Zu Sozialleistungen zählen
                <list class="text-left">
                  <li>Leistungen vom Jobcenter (Arbeitslosengeld II)</li>
                  <li>Wohngeld nach dem Wohngeldgesetz</li>
                  <li>Kinderzuschlag der Familienkassen</li>
                  <li>Hilfe zum Lebensunterhalt</li>
                  <li>Grundsicherung im Alter und bei Erwerbsminderung</li>
                  <li>Leistungen nach dem Asylbewerberleistungsgesetz</li>
                </list>
              </span>
            </v-tooltip>
          </h4>
          <v-btn class="mx-3" color="accent" @click="twoAddYes"> Ja </v-btn>
          <v-btn class="mx-3" color="accent" @click="twoAddNo"> Nein </v-btn>
          <p>
            <v-btn class="my-3" @click="e1 = 1"
              ><v-icon>mdi-arrow-left</v-icon> zurück</v-btn
            >
          </p>
        </v-stepper-content>

        <v-stepper-content step="3" class="mb-6 mx-auto" height="200px">
          <h4 class="text-center mb-4">
            Sind sie amtsgerichtlich privatinsolvent gemeldet?
          </h4>
          <v-btn class="mx-3" color="accent" @click="threeAddYes"> Ja </v-btn>
          <v-btn class="mx-3" color="accent" @click="threeAddNo"> Nein </v-btn>
          <p>
            <v-btn class="my-3" @click="e1 = 2"
              ><v-icon>mdi-arrow-left</v-icon> zurück</v-btn
            >
          </p>
        </v-stepper-content>

        <v-stepper-content step="4" class="mb-6 mx-auto" height="200px">
          <h5 class="text-center">
            Sie haben angegeben weder privatinsolvent gemeldet zu sein und auch keine Sozialleistungen zu beziehen. Um zu
            ermitteln, ob Ihre Einkommen unterhalbt der Einkommensgrenze liegt,
            beantworten Sie bitte die folgenden Fragen. Diese werden im weiteren
            Verlauf der Antragstellung übernommen und müssen nicht erneut
            eingegeben werden.
          </h5>
          <v-btn class="my-3" @click="e1 = 3"
            ><v-icon>mdi-arrow-left</v-icon> zurück</v-btn
          >
          <div id="einkommensnachweis">
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
                    Nettoeinkommen
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
                    type="number"
                    prefix="€"
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="elternteil2.netto"
                    label="Netto Elternteil 2"
                    type="number"
                    prefix="€"
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
                    label="Selbstständikteit Elternteil 1"
                    prefix="€/mtl."
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="elternteil2.selbst"
                    label="Selbstständikteit Elternteil 2"
                    prefix="€/mtl."
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
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="elternteil2.kindergeld"
                    label="Kindergeld Elternteil 2"
                    prefix="€/mtl."
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
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="elternteil2.alg1"
                    label="ALG1/EGZ Elternteil 2"
                    prefix="€/mtl."
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
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="elternteil2.krankengeld"
                    label="Krankengeld Elternteil 2"
                    prefix="€/mtl."
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
                        >Bitte hier Einkommen aus gesetzlicher
                        Rentenversicherung angeben.</span
                      >
                    </v-tooltip>
                  </h4>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="elternteil1.rente"
                    label="Rente Elternteil 1"
                    prefix="€/mtl."
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="elternteil2.rente"
                    label="Rente Elternteil 2"
                    prefix="€/mtl."
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
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="elternteil2.unterhaltseinkunft"
                    label="Unterhalt an Elternteil 2"
                    prefix="€/mtl."
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
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="elternteil2.ausbildungsvergütung"
                    label="Ausbildungsvergütung Elternteil 2"
                    prefix="€/mtl."
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
                    Ausbildungsförderung nach BAföG/SGB III
                  </h4>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="elternteil1.bafög"
                    label="BAföG Elternteil 1"
                    prefix="€/mtl."
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="elternteil2.bafög"
                    label="BAföG Elternteil 2"
                    prefix="€/mtl."
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
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="elternteil2.elterngeld"
                    label="Elterngeld Elternteil 2"
                    prefix="€/mtl."
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
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="elternteil2.kinderzuschlag"
                    label="Elternteil 2"
                    prefix="€/mtl."
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
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="elternteil2.weitere"
                    label="Elternteil 2"
                    prefix="€/mtl."
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
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="elternteil2.zuschussKita"
                    label="Elternteil 2"
                    prefix="€/mtl."
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
                  ></v-text-field>
                </v-col>
                <v-col cols="3"></v-col>
              </v-row>
            </v-card>
            <h4 class="my-4">
              Angaben zur Ermittlung der auf das Einkommen anrechenbaren
              Belastungen in €
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
                        >z.B. Kosten für Berufsbekleidung. Kosten über 5,20€
                        bitte nachweisen.</span
                      >
                    </v-tooltip>
                  </h4>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="elternteil1.arbeitsmittel"
                    label="Elternteil 1"
                    prefix="€/mtl."
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="elternteil2.arbeitsmittel"
                    label="Elternteil 2"
                    prefix="€/mtl."
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
                        >Bei Notwendigkeit der Pkw-Nutzung bitte die km-Zahl
                        einer einfachen Fahrt zwischen Wohnungs- und
                        Arbeitsstätte angeben.</span
                      >
                    </v-tooltip>
                  </h4>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="elternteil1.fahrtkosten"
                    label="Elternteil 1"
                    prefix="€/mtl."
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="elternteil2.fahrtkosten"
                    label="Elternteil 2"
                    prefix="€/mtl."
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
                    Hier ist vorgesehen, dass in Zukunft Felder für Einträge aus
                    dem entsprechenden Vordruck platziert werden könnten.
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
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="elternteil2.haftpflicht"
                    label="Elternteil 2"
                    prefix="€/mtl."
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
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="elternteil2.hausrat"
                    label="Elternteil 2"
                    prefix="€/mtl."
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
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="elternteil2.freiwilligekrankenundpflege"
                    label="Elternteil 2"
                    prefix="€/mtl."
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
                    Freiwillige Versicherung in der gesetzlichen
                    Rentenversicherung
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
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="elternteil2.freiwilligerente"
                    label="Elternteil 2"
                    prefix="€/mtl."
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
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="elternteil2.riester"
                    label="Elternteil 2"
                    prefix="€/mtl."
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
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="elternteil2.lebens"
                    label="Elternteil 2"
                    prefix="€/mtl."
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
                    v-model="elternteil1.haftpflicht"
                    label="Elternteil 1"
                    prefix="€/mtl."
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="elternteil2.haftpflicht"
                    label="Elternteil 2"
                    prefix="€/mtl."
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
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="elternteil2.unfall"
                    label="Elternteil 2"
                    prefix="€/mtl."
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
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="elternteil2.berufsunfähigkeits"
                    label="Elternteil 2"
                    prefix="€/mtl."
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
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="elternteil2.gewerkschaft"
                    label="Elternteil 2"
                    prefix="€/mtl."
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
                      <span>(ohne Heizkosten und ohne Strom)</span>
                    </v-tooltip>
                  </h4>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="elternteil1.kaltmiete"
                    label="Elternteil 1"
                    prefix="€/mtl."
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="elternteil2.kaltmiete"
                    label="Elternteil 2"
                    prefix="€/mtl."
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
                    Hier ist vorgesehen, dass in Zukunft Felder für Einträge aus
                    dem entsprechenden Vordruck platziert werden könnten.
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
                        werden
                        <span style="font-weight: bolder">muss</span>
                      </span>
                    </v-tooltip>
                  </h4>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="elternteil1.besondere"
                    label="Elternteil 1"
                    prefix="€/mtl."
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="elternteil2.besondere"
                    label="Elternteil 2"
                    prefix="€/mtl."
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
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="elternteil2.unterhaltszahlungen"
                    label="Elternteil 2"
                    prefix="€/mtl."
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
                  <v-textarea
                    v-model="elternteil1.sonstiges"
                    outlined
                  ></v-textarea>
                </v-col>
                <v-col cols="5">
                  <h4 class="text-left">Sonstige Ergänzungen / Angaben</h4>
                  <v-textarea
                    v-model="elternteil2.sonstiges"
                    outlined
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-card>
          </div>
          <v-btn color="accent" @click="fourAdd"> weiter </v-btn>
        </v-stepper-content>

        <v-stepper-content step="5" class="mb-6 mx-auto" height="200px">
          <h3 class="text-center">Geschafft!</h3>
          <h6>
            Verklickt? <v-btn text @click="e1 = 1">Fragen erneut starten</v-btn>
          </h6>
          <h4 v-if="this.$store.state.geCheck === true || this.$store.state.entCheck === true || this.$store.state.bifoCheck === true">
            Folgende Anträge haben Aussicht auf Erfolg:
          </h4>
          <h4 v-else>Sie scheinen nicht berechtigt zu sein, einen der Anträge zu stellen.</h4>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>

    <v-row>
      <v-container class="pb-0">
        <v-row justify="space-around">
          <v-checkbox
            class="font-weight-medium"
            v-model="ge_checkbox"
            :disabled="this.e1 < 5"
            ref="ge_check"
            :label="`Geschwisterermäßigung`"
          ></v-checkbox>
          <v-checkbox
            v-model="ent_checkbox"
            :disabled="this.e1 < 5"
            ref="ent_check"
            :label="`Entgeltermäßigung`"
          ></v-checkbox>
          <v-checkbox
            v-model="bifo_checkbox"
            :disabled="this.e1 < 5"
            ref="bifo_check"
            :label="`Bildungsfond`"
          ></v-checkbox>
        </v-row>
        <p class="caption pt-0">
          Es ist möglich die Antragswahl jederzeit zu ändern.
        </p>
      </v-container>
    </v-row>

    <router-link :to="{ name: 'Apply' }" href="#" class=""
      ><v-btn color="primary" class="text-button" :disabled="this.e1 < 5"
        >Gewählte Anträge stellen</v-btn
      ></router-link
    >
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Check",
  components: {},

  data() {
    return {
      e1: 1,
      ge_checkbox: false,
      ent_checkbox: false,
      bifo_checkbox: false,
      geErfolg: false,
      entErfolg: false,
      bifoErfolg: false,

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

      einkommen: 0,

      einkommensgrenze_gesamt: 0,
      einkommensgrenze1: 0,
      einkommensgrenze2: 0,
    };
  },

  created() {
    this.eigentum_checkbox = this.$store.state.eigentum_checkbox;
    this.elternteil1 = this.$store.state.elternteil1;
    this.elternteil2 = this.$store.state.elternteil2;
  },

  watch: {
    ge_checkbox: function (val) {
      this.$store.commit("setGeCheck", val);
    },
    ent_checkbox: function (val) {
      this.$store.commit("setEntCheck", val);
    },
    bifo_checkbox: function (val) {
      this.$store.commit("setBifoCheck", val);
    },

    eigentum_checkbox: function (val) {
      this.$store.commit("setEigentumCheck", val);
    },

     //EINKOMMEN
    elternteil1: function (val) {
      this.$store.commit("setElternteil1", val);
      var sum1 = 0;
      var minus1 = 10;
      sum1 =
        parseInt(val.netto)
        /*parseInt(this.elternteil1.selbst) +
        parseInt(this.elternteil1.kindergeld) +
        parseInt(this.elternteil1.alg1) +
        parseInt(this.elternteil1.existenz) +
        parseInt(this.elternteil1.krankengeld) +
        parseInt(this.elternteil1.rente) +
        parseInt(this.elternteil1.unterhaltseinkunft) +
        parseInt(this.elternteil1.ausbildungsvergütung) +
        parseInt(this.elternteil1.bafög) +
        parseInt(this.elternteil1.elterngeld) +
        parseInt(this.elternteil1.kinderzuschlag) +
        parseInt(this.elternteil1.weitere) +
        parseInt(this.elternteil1.zuschussKita);*/
      /*minus1 =
        parseInt(this.elternteil1.arbeitsmittel) +
        parseInt(this.elternteil1.fahrtkosten) +
        parseInt(this.elternteil1.haftpflicht) +
        parseInt(this.elternteil1.hausrat) +
        parseInt(this.elternteil1.freiwilligekrankenundpflege) +
        parseInt(this.elternteil1.freiwilligerente) +
        parseInt(this.elternteil1.riester) +
        parseInt(this.elternteil1.lebens);
        parseInt(this.elternteil1.kfzhaftpflicht) +
        parseInt(this.elternteil1.unfall) +
        parseInt(this.elternteil1.berufsunfähigkeits) +
        parseInt(this.elternteil1.gewerkschaft) +
        parseInt(this.elternteil1.kaltmiete) +
        parseInt(this.elternteil1.eigentum) +
        parseInt(this.elternteil1.besondere) +
        parseInt(this.elternteil1.unterhaltszahlungen);*/
      this.einkommensgrenze1 = sum1 - minus1;
      this.einkommensgrenze_gesamt =
        parseInt(this.einkommensgrenze1) + parseInt(this.einkommensgrenze2);
    },
    elternteil2: function (val) {
      this.$store.commit("setElternteil2", val);
      var sum2 = 0;
      var minus2 = 0;
      sum2 =
        parseInt(this.elternteil2.netto) +
        parseInt(this.elternteil2.selbst) +
        parseInt(this.elternteil2.kindergeld) +
        parseInt(this.elternteil2.alg1) +
        parseInt(this.elternteil2.existenz) +
        parseInt(this.elternteil2.krankengeld) +
        parseInt(this.elternteil2.rente) +
        parseInt(this.elternteil2.unterhaltseinkunft) +
        parseInt(this.elternteil2.ausbildungsvergütung) +
        parseInt(this.elternteil2.bafög) +
        parseInt(this.elternteil2.elterngeld) +
        parseInt(this.elternteil2.kinderzuschlag) +
        parseInt(this.elternteil2.weitere) +
        parseInt(this.elternteil2.zuschussKita);        
      minus2 =
        parseInt(this.elternteil2.arbeitsmittel) +
        parseInt(this.elternteil2.fahrtkosten) +
        parseInt(this.elternteil2.haftpflicht) +
        parseInt(this.elternteil2.hausrat) +
        parseInt(this.elternteil2.freiwilligekrankenundpflege) +
        parseInt(this.elternteil2.freiwilligerente) +
        parseInt(this.elternteil2.riester) +
        parseInt(this.elternteil2.lebens);
        /*parseInt(this.elternteil2.kfzhaftpflicht) +
        parseInt(this.elternteil2.unfall) +
        parseInt(this.elternteil2.berufsunfähigkeits) +
        parseInt(this.elternteil2.gewerkschaft) +
        parseInt(this.elternteil2.kaltmiete) +
        parseInt(this.elternteil2.eigentum) +
        parseInt(this.elternteil2.besondere) +
        parseInt(this.elternteil2.unterhaltszahlungen);*/
        this.einkommensgrenze2 = sum2 - minus2;
      this.einkommensgrenze_gesamt =
        parseInt(this.einkommensgrenze1) + parseInt(this.einkommensgrenze2);
    },
  },

  methods: {
    //GESCHWISTERERM
    oneAddYes() {
      this.$store.state.geCheck = true;
      this.e1 = 2;
      this.ge_checkbox = true;
    },
    oneAddNo() {
      this.$store.state.geCheck = false;
      this.e1 = 2;
      this.ge_checkbox = false;
    },
    //ENTGELT SOZI
    twoAddYes() {
      this.$store.state.entCheck = true;
      this.$store.state.bifoCheck = true;
      this.entErfolg = true;
      this.bifoErfolg = true;
      this.ent_checkbox = true;
      this.bifo_checkbox = true;
      this.$store.state.radioGroupAntragsgrundlage = 3;
      this.e1 = 5;
    },
    twoAddNo() {
      this.e1 = 3;
    },

    threeAddYes() {
      this.$store.state.entCheck = true;
      this.$store.state.bifoCheck = true;
      this.entErfolg = true;
      this.bifoErfolg = true;
      this.ent_checkbox = true;
      this.bifo_checkbox = true;
      this.$store.state.radioGroupAntragsgrundlage = 1;
      this.e1 = 5;
    },
    threeAddNo() {
      this.e1 = 4;
    },

    fourAdd() {
      if (this.einkommensgrenze_gesamt < 3000) {
        this.$store.state.entCheck = true;
        this.entErfolg = true;
        this.ent_checkbox = true;
        this.e1 = 5;
      } else {this.e1 = 5}
    },
    
  },
};
</script>