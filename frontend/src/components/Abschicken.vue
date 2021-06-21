<template>
  <div id="Abschicken">
    <h2 class="py-3">Anträge absenden</h2>
    <h5 class="pb-3">Bitte prüfen Sie die Angaben auf ihre Richtigkeit!</h5>

    <v-row>
      <h4>
        Antragsteller Daten
        <v-btn @click="funcShowAntragstellerDaten"
          ><v-icon color="accent">mdi-pencil</v-icon></v-btn
        >
      </h4>
      <h4 v-if="this.$store.state.valid == false">
        Bitte diesen Bereich Prüfen. Es fehlen Angaben.
      </h4>
    </v-row>
    <v-row>
      <v-col cols="3" class="text-left">
        <h6 class="text--disabled">Antragsteller/in</h6>
        <h5
          v-if="
            this.$store.state.firstname != 0 && this.$store.state.lastname != 0
          "
        >
          {{ this.name }}
        </h5>
        <h5 v-else>
          <v-btn @click="funcShowAntragstellerDaten"
            ><v-icon color="secondary">mdi-pencil</v-icon></v-btn
          >
          Name unvollständig!
        </h5>
        <h6 class="text--disabled" v-if="this.$store.state.entCheck">
          Geburtsdatum
        </h6>
        <h5 v-if="this.$store.state.entCheck">{{ this.date }}</h5>
        <h5 v-else-if="this.date == 0">
          <v-btn @click="funcShowAntragstellerDaten"
            ><v-icon color="secondary">mdi-pencil</v-icon></v-btn
          >
          Bitte Geburtsdatum angeben!
        </h5>
      </v-col>
      <v-col cols="4" class="text-left">
        <h6 class="text--disabled">Anschrift</h6>
        <h5
          v-if="
            this.$store.state.street != 0 &&
            this.$store.state.number != 0 &&
            this.$store.state.postcode != 0 &&
            this.$store.state.town != 0
          "
        >
          {{ this.adress }}
        </h5>
        <h5 v-else>
          <v-btn @click="funcShowAntragstellerDaten"
            ><v-icon color="secondary">mdi-pencil</v-icon></v-btn
          >
          Anschrift unvollständig!
        </h5>
      </v-col>
      <v-col cols="4" class="text-left">
        <h6 class="text--disabled">E-Mail</h6>
        <h5 v-if="this.email != 0">{{ this.email }}</h5>
        <h5 v-else>
          <v-btn @click="funcShowAntragstellerDaten"
            ><v-icon color="secondary">mdi-pencil</v-icon></v-btn
          >
          Gültige Mail angeben!
        </h5>
        <h6 class="text--disabled">Telefonnummer</h6>
        <h5 v-if="this.tel != 0">{{ this.tel }}</h5>
        <h5 v-else>
          <v-btn @click="funcShowAntragstellerDaten"
            ><v-icon color="secondary">mdi-pencil</v-icon></v-btn
          >
          Telefonnummer fehlt
        </h5>
      </v-col>
    </v-row>

    <v-row v-if="this.$store.state.entCheck || this.$store.state.bifoCheck">
      <v-col cols="3" class="text-left">
        <h6 class="text--disabled">Antragsgrundlage</h6>
        <h5 v-if="this.antragsgrundlage == 1">Privatinsolvenz</h5>
        <h5 v-else-if="this.antragsgrundlage == 2">Einkommen</h5>
        <h5 v-else-if="this.antragsgrundlage == 3">
          Bezug von Sozialleistungen
        </h5>
        <h5 v-else>
          <v-btn @click="funcShowAntragstellerDaten"
            ><v-icon color="secondary">mdi-pencil</v-icon></v-btn
          >
          Antragsgrundlage angeben!
        </h5>
      </v-col>
      <v-col v-if="person_list != 0" cols="8" class="text-left">
        <h6 class="text--disabled pb-3">
          weitere im Haushalt lebende Personen
        </h6>
        <v-row v-for="(n, index) in person_list" :key="n">
          <v-col class="text-left py-0">
            <h5>
              {{ person_list[index].firstname_person }}
              {{ person_list[index].lastname_person }},
              {{ person_list[index].date_p }},
              {{ person_list[index].verwandtschaft_p }}
            </h5>
            <!-- <h5 v-else>
          <v-btn @click="funcShowAntragstellerDaten"
            ><v-icon color="secondary">mdi-pencil</v-icon></v-btn
          >
          Personendaten unvollständig!
        </h5> -->
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-divider class="my-8"></v-divider>

    <v-row>
      <h4>
        Kind/er Daten
        <v-btn @click="funcShowKindDaten"
          ><v-icon color="accent">mdi-pencil</v-icon></v-btn
        >
      </h4>
    </v-row>

    <v-row>
      <v-col cols="3" class="text-left">
        <h6 class="text--disabled">Kind</h6>
        <h5 v-if="this.child_firstname != 0 && this.child_lastname != 0">
          {{ this.child_name }}
        </h5>
        <h5 v-else>
          <v-btn @click="funcShowKindDaten"
            ><v-icon color="secondary">mdi-pencil</v-icon></v-btn
          >
          Name unvollständig!
        </h5>
      </v-col>
      <v-col cols="4" class="text-left">
        <h6 class="text--disabled">Geburtstag</h6>
        <h5 v-if="this.child_date != 0">{{ this.child_date }}</h5>
        <h5 v-else>
          <v-btn @click="funcShowKindDaten"
            ><v-icon color="secondary">mdi-pencil</v-icon></v-btn
          >
          Geburtsdatum eintragen!
        </h5>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3" class="text-left">
        <h6 class="text--disabled">Betreuungsform</h6>
        <h5 v-if="this.betreuung == 1">Tagespflege</h5>
        <h5 v-else-if="this.betreuung == 2">Krippe</h5>
        <h5 v-else-if="this.betreuung == 3">Elementar</h5>
        <h5 v-else-if="this.betreuung == 4">Hort</h5>
        <h5 v-else-if="this.betreuung == 5">Ganztags an Schulen</h5>
        <h5 v-else-if="this.betreuung == 6">Kindertagesstätte</h5>
        <h5 v-else>
          <v-btn @click="funcShowKindDaten"
            ><v-icon color="secondary">mdi-pencil</v-icon></v-btn
          >
          Betreuungsform angeben!
        </h5>
      </v-col>

      <v-col cols="4" class="text-left">
        <h6 class="text--disabled">Betreuungseinrichtung</h6>
        <h5 v-if="this.betreuung == 1">{{ this.tagespflege }}</h5>
        <h5 v-else-if="this.betreuung == 0">
          <v-btn @click="funcShowKindDaten"
            ><v-icon color="secondary">mdi-pencil</v-icon></v-btn
          >
          Betreuungseinrichtung angeben!
        </h5>
        <h5 v-else>{{ this.betreuungseinrichtung }}</h5>
      </v-col>

      <v-col cols="4" class="text-left">
        <h6 class="text--disabled">Ermäßigungsantrag im Vorjahr gestellt:</h6>
        <h5 v-if="this.vorjahr == true">ja</h5>
        <h5 v-else>nein</h5>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-if="
          this.$store.state.geCheck ||
          this.$store.state.radioGroupBetreuungsform == 1
        "
        cols="12"
        sm="3"
        class="text-left"
      >
        <h6 class="text--disabled">Betreuungsbeginn</h6>
        <h5 v-if="this.betreuungsbeginn != 0">{{ this.betreuungsbeginn }}</h5>
        <h5 v-else>
          <v-btn @click="funcShowKindDaten"
            ><v-icon color="secondary">mdi-pencil</v-icon></v-btn
          >
          Betreuungsbeginn fehlt
        </h5>
      </v-col>

      <v-col
        v-if="
          (this.$store.state.geCheck &&
            this.$store.state.radioGroupBetreuungsform == 1) ||
          (this.$store.state.entCheck &&
            this.$store.state.radioGroupBetreuungsform == 1)
        "
        cols="12"
        sm="3"
        class="text-left"
      >
        <h6 class="text--disabled">Betreuungsumfang</h6>
        <h5 v-if="this.betreuungsumfang != 0">
          {{ this.betreuungsumfang }} Stunden
        </h5>
        <h5 v-else>
          <v-btn @click="funcShowKindDaten"
            ><v-icon color="secondary">mdi-pencil</v-icon></v-btn
          >
          Betreuungsumfang fehlt
        </h5>
      </v-col>

      <v-col
        v-if="this.$store.state.geCheck || this.$store.state.entCheck"
        cols="12"
        sm="3"
        class="text-left"
      >
        <h6 class="text--disabled">Betreuungsentgelt</h6>
        <h5 v-if="this.betreuungsentgelt != 0">
          {{ this.betreuungsentgelt }} €
        </h5>
        <h5 v-else>0 €</h5>
      </v-col>

      <v-col
        cols="12"
        sm="3"
        v-if="this.$store.state.geCheck"
        class="text-left"
      >
        <h6 class="text--disabled">Elternbeitrag</h6>
        <h5 v-if="this.elternbeitrag != 0">{{ this.elternbeitrag }} €</h5>
        <h5 v-else>0 €</h5>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-if="
          this.$store.state.bifoCheck &&
          this.$store.state.radioGroupBetreuungsform == 1
        "
        cols="3"
        class="text-left"
      >
        <h6 class="text--disabled">Essensgeld</h6>
        <h5 v-if="this.essensgeld != 0">{{ this.essensgeld }} €</h5>
        <h5 v-else>0 €</h5>
      </v-col>
      <v-col
        v-if="
          this.$store.state.bifoCheck &&
          this.$store.state.radioGroupBetreuungsform == 1
        "
        cols="3"
        class="text-left"
      >
        <h6 class="text--disabled">
          Kontoinhaber für Ermäßigung des Essensgeldes
        </h6>
        <h5 v-if="this.bic != 0 && this.iban != 0">{{ this.konto }}</h5>
        <h5 v-else>
          <v-btn @click="funcShowKindDaten"
            ><v-icon color="secondary">mdi-pencil</v-icon></v-btn
          >
          Kontodaten unvollständig
        </h5>
      </v-col>
    </v-row>

    <v-divider class="my-8"></v-divider>

    <div v-if="this.$store.state.child_list.length != 0">
      <v-row>
        <h4>
          Geschwisterkind/er Daten
          <v-btn @click="funcShowKindDaten"
            ><v-icon color="accent">mdi-pencil</v-icon></v-btn
          >
        </h4>
      </v-row>

      <div v-for="(n, index) in child_list" :key="n">
        <v-row>
          <v-col cols="3" class="text-left">
            <h6 class="text--disabled">Kind</h6>
            <h5
              v-if="
                child_list[index].sibling_firstname != 0 &&
                child_list[index].sibling_lastname != 0
              "
            >
              {{ child_list[index].sibling_firstname }}
              {{ child_list[index].sibling_lastname }}
            </h5>
            <h5 v-else>
              <v-btn @click="funcShowKindDaten"
                ><v-icon color="secondary">mdi-pencil</v-icon></v-btn
              >
              Name unvollständig!
            </h5>
          </v-col>
          <v-col cols="4" class="text-left">
            <h6 class="text--disabled">Geburtstag</h6>
            <h5 v-if="child_list[index].date_sibling != 0">
              {{ child_list[index].date_sibling }}
            </h5>
            <h5 v-else>
              <v-btn @click="funcShowKindDaten"
                ><v-icon color="secondary">mdi-pencil</v-icon></v-btn
              >
              Bitte Geburtsdatum angeben!
            </h5>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3" class="text-left">
            <h6 class="text--disabled">Betreuungsform</h6>
            <h5 v-if="child_list[index].radioGroupBetreuungsform_sibling == 1">
              Tagespflege
            </h5>
            <h5
              v-else-if="
                child_list[index].radioGroupBetreuungsform_sibling == 2
              "
            >
              Krippe
            </h5>
            <h5
              v-else-if="
                child_list[index].radioGroupBetreuungsform_sibling == 3
              "
            >
              Elementar
            </h5>
            <h5
              v-else-if="
                child_list[index].radioGroupBetreuungsform_sibling == 4
              "
            >
              Hort
            </h5>
            <h5
              v-else-if="
                child_list[index].radioGroupBetreuungsform_sibling == 5
              "
            >
              Ganztags an Schulen
            </h5>
            <h5 v-else>
              <v-btn @click="funcShowKindDaten"
                ><v-icon color="secondary">mdi-pencil</v-icon></v-btn
              >
              Betreuungsform wählen!
            </h5>
          </v-col>

          <v-col cols="4" class="text-left">
            <h6 class="text--disabled">Betreuungseinrichtung</h6>
            <h5 v-if="child_list[index].radioGroupBetreuungsform_sibling == 1">
              {{ child_list[index].tagespflegename }},
              {{ child_list[index].institutionstreet }}
              {{ child_list[index].institutionnumber }},
              {{ child_list[index].institutionpostcode }}
              {{ child_list[index].institutiontown }}
            </h5>
            <h5
              v-else-if="
                child_list[index].radioGroupBetreuungsform_sibling == 0
              "
            >
              <v-btn @click="funcShowKindDaten"
                ><v-icon color="secondary">mdi-pencil</v-icon></v-btn
              >
              Betreuungseinrichtung angeben!
            </h5>
            <h5 v-else>{{ child_list[index].institutionname }}</h5>
          </v-col>

          <v-col cols="4" class="text-left">
            <h6 class="text--disabled">
              Ermäßigungsantrag im Vorjahr gestellt:
            </h6>
            <h5 v-if="child_list[index].vorjahr_checkbox === true">ja</h5>
            <h5 v-else>nein</h5>
          </v-col>
        </v-row>

        <v-divider class="my-8"></v-divider>
      </div>
    </div>
    <v-card class="mx-auto pa-5 my-8" outlined>
      <h4 class="text-left">
        <v-icon>mdi-file</v-icon> Anträge müssen jedes Jahr erneut gestellt
        werden. Denken Sie daran, am Ende der Antragstellung Ihre Daten
        herunterzuladen, um sie beim nächsten Antrag zu importieren. Sie haben
        bereits eine Datei mit Ihren gespeicherten Daten? Dann können Sie diese
        hier hochladen und wiederherstellen!
      </h4>
      <v-row justify="space-around">
        <v-btn
          class="my-6 text-button"
          justify="center"
          @click="funcDownloadData"
          color="primary"
          v-model="btn_json"
        >
          meine Daten herunterladen
          <v-icon> mdi-download-circle-outline </v-icon>
        </v-btn>
      </v-row>
    </v-card>

    <div id="json"></div>
    <Ge :child_list="this.child_list" :person_list="this.person_list" />
    <v-btn class="d-block mx-auto my-6" @click="funcShowNachweise">
      <v-icon> mdi-arrow-left-bold-circle-outline </v-icon>
      Nachweise
    </v-btn>
  </div>
</template>

<script>
import Ge from "@/views/Ge.vue";
//import axios from "axios";

export default {
  name: "Abschicken",
  components: {
    Ge,
  },
  props: {
    child_list: Array,
    person_list: Array,
  },
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
    };
  },

  created() {
    this.name = this.$store.state.firstname + " " + this.$store.state.lastname;
    this.date = this.$store.state.date;
    this.adress =
      this.$store.state.street +
      " " +
      this.$store.state.number +
      ", " +
      this.$store.state.postcode +
      " " +
      this.$store.state.town;
    this.email = this.$store.state.email;
    this.tel = this.$store.state.tel;

    this.child_name =
      this.$store.state.child_firstname +
      " " +
      this.$store.state.child_lastname;
    this.child_date = this.$store.state.date_child;
    this.betreuung = this.$store.state.radioGroupBetreuungsform;
    this.antragsgrundlage = this.$store.state.radioGroupAntragsgrundlage;
    this.tagespflege =
      this.$store.state.tagespflegename +
      " " +
      this.$store.state.institutionstreet +
      " " +
      this.$store.state.institutionnumber +
      ", " +
      this.$store.state.institutionpostcode +
      " " +
      this.$store.state.institutiontown;
    this.betreuungseinrichtung = this.$store.state.institutionname;
    this.vorjahr = this.$store.state.vorjahr_checkbox;
    this.elternbeitrag = this.$store.state.elternbeitrag;
    this.betreuungsentgelt = this.$store.state.betreuungsentgelt;
    this.date_bb = this.$store.state.date_bb;
    this.essensgeld = this.$store.state.essensgeld;
    this.betreuungsumfang = this.$store.state.betreuungsumfang;
    this.betreuungsbeginn = this.$store.state.date_bb;
    this.konto =
      this.$store.state.firstname +
      " " +
      this.$store.state.lastname +
      ", IBAN: " +
      this.$store.state.iban +
      ", BIC: " +
      this.$store.state.bic +
      ", " +
      this.$store.state.bank;
  },

  watch: {},

  methods: {
    funcShowAntragstellerDaten() {
      this.$parent.funcShowAntragstellerDaten();
    },
    funcShowKindDaten() {
      this.$parent.funcShowKindDaten();
    },
    funcShowNachweise() {
      this.$parent.funcShowNachweise();
    },
    //JSON Download
    funcDownloadData() {
      var data = {
        geCheck: this.$store.state.geCheck,
        entCheck: this.$store.state.entCheck,
        bifoCheck: this.$store.state.bifoCheck,
        ge_checkbox: this.$store.state.geCheck,
        ent_checkbox: this.$store.state.entCheck,
        bifo_checkbox: this.$store.state.bifoCheck,

        firstname: this.$store.state.firstname,
        lastname: this.$store.state.lastname,
        date: this.$store.state.date,
        street: this.$store.state.street,
        number: this.$store.state.number,
        postcode: this.$store.state.postcode,
        town: this.$store.state.town,
        email: this.$store.state.email,
        tel: this.$store.state.tel,

        radioGroupAntragsgrundlage:
          this.$store.state.radioGroupAntragsgrundlage,
        privatinsolvenz: this.$store.state.privatinsolvenz,
        radioGroupErmaeßigung: this.$store.state.radioGroupErmaeßigung,

        nettoeinkommen: this.$store.state.nettoeinkommen,
        selbstständigkeiteinkommen:
          this.$store.state.selbstständigkeiteinkommen,

        eigentum_checkbox: this.$store.state.eigentum_checkbox,
        elternteil1: this.$store.state.elternteil1,
        elternteil2: this.$store.state.elternteil2,

        child_firstname: this.$store.state.child_firstname,
        child_lastname: this.$store.state.child_lastname,
        date_child: this.$store.state.date_child,
        date_bb: this.$store.state.date_bb,

        institutionname: this.$store.state.institutionname,
        institutionstreet: this.$store.state.institutionstreet,
        institutionnumber: this.$store.state.institutionnumber,
        institutionpostcode: this.$store.state.institutionpostcode,
        institutiontown: this.$store.state.institutiontown,
        tagespflegename: this.$store.state.tagespflegename,

        elternbeitrag: this.$store.state.elternbeitrag,
        betreuungsentgelt: this.$store.state.betreuungsentgelt,

        radioGroupBetreuungsform: this.$store.state.radioGroupBetreuungsform,

        essensgeld: this.$store.state.essensgeld,
        betreuungsumfang: this.$store.state.betreuungsumfang,
        vorjahr_checkbox: this.$store.state.vorjahr_checkbox,
        kostenerstattung: this.$store.state.kostenerstattung,
        gueltig: this.$store.state.gueltig,
        bifo_begr: this.$store.state.bifo_begr,

        kontoinhaber:
          this.$store.state.firstname + " " + this.$store.state.lastname,
        iban: this.$store.state.iban,
        bic: this.$store.state.bic,
        bank: this.$store.state.bank,

        child_list: this.$store.state.child_list,
        person_list: this.$store.state.person_list,
      };
      var json = JSON.stringify(data);
      var blob = new Blob([json], { type: "application/json" });
      var url = URL.createObjectURL(blob);

      var a = document.createElement("a");
      a.download = "Daten_ErmaessigungsantraegeKinder" + new Date().getFullYear() + ".json";
      a.href = url;
      a.textContent = "Datei erstellt. Hier klicken zum Download";

      document.getElementById("json").appendChild(a);
      a.click();
      document.getElementById("json").removeChild(a);
    },
  },
};
</script>
