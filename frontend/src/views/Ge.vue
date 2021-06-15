<template>
  <div id="Ge" class="mx-16">
  <!--   <v-row
      ><v-col
        ><v-img
          :src="require('/src/img/hl.jpg')"
          class="float-left"
          max-width="300"
        /> </v-col
      ><v-col
        ><v-img
          :src="require('/src/img/adler.jpg')"
          class="float-right"
          max-width="100"
      /></v-col>
    </v-row>

    <h2 class="font-weight-light pb-3">
      Antrag auf Geschwisterermäßigung in Kindertagesstättenfür<br />
      das Kita-Jahr {{ new Date().getFullYear() }} /
      {{ new Date().getFullYear() + 1 }}
    </h2>

    <v-row>
      <v-col class="text-left">
        <p>
          Hansestadt Lübeck<br />
          Fachbereich Kultur und Bildung<br />
          Entgeltermäßigung Kindertagesbetreuung<br />
          Kronsforder Allee 2-6<br />
          23539 Lübeck
        </p>
      </v-col>
      <v-col cols="12" md="4" class="text-left float-right">
        <h6 class="text--disabled">Antragstellende Person (Elternteil)</h6>
        <h5>{{ this.name }}</h5>

        <h6 class="text--disabled">Anschrift</h6>
        <h5>{{ this.adress }}</h5>

        <h6 class="text--disabled">Telefonnummer</h6>
        <h5>{{ this.tel }}</h5>

        <h6 class="text--disabled">E-Mail</h6>
        <h5>{{ this.email }}</h5>
      </v-col>
    </v-row>
    <h4 class="text-left">
      Hiermit wird die Geschwisterermäßigungfür Kinder in Kindertagesstätten
      beantragt.
    </h4>
    <h6 class="text-left">
      Grundlage ist die „Satzung zur sozialen Staffelung von Gebühren oder
      Entgelten für die Betreuung von Kindern in Kindertageseinrichtungen oder
      Kindertagespflegestellen“ der Hansestadt Lübeck.
    </h6>
    <p class="text-left">
      Besuchen mehrere mit Hauptwohnung in einem Haushalt lebende Kinder einer
      Familie eine öffentlich geförderte Kindertageseinrichtung,
      Kindertagespflegestelle oder eine Ganztagsbetreuung an Schulen mit einer
      Nachmittagsbetreuung an mindestens 3 Tagen pro Woche für mindestens 70
      EUR, wird der Elternbeitrag auf Antrag ermäßigt.<br />
      <list
        ><li>
          Für das älteste Kind ist der Elternbeitrag in voller Höhe zu
          entrichten.
        </li>
        <li>
          Für das nächstjüngere Kind ermäßigt sich der Elternbeitrag um 50%,
        </li>
        <li>für jedes weitere jüngere Kind um 100%.</li> </list
      ><br />
      Ermäßigung erfolgt unabhängig vom Einkommen. Anspruchsberechtigt sind
      Familien, die in Lübeck gemeldet sind. Familien aus anderen Gemeinden
      melden sich bitte bei der für sie zuständigen Gemeindeverwaltung.
    </p>

    <h4 class="text-left">
      1. Für dieses Kind wird eine Geschwisterermäßigung beantragt:
    </h4>
    <v-card class="pa-3" outlined>
      <v-row>
        <v-col cols="12" md="7" class="text-left">
          <h5>Name, Vorname: {{ this.child_name }}</h5>
        </v-col>
        <v-col cols="12" md="5" class="text-left">
          <h5>Geburtdatum: {{ this.child_date }}</h5>
        </v-col>
      </v-row>

      <v-row v-if="this.betreuung != 0 && this.betreuung != 1">
        <v-col cols="12" md="7" class="text-left">
          <h5>Name der Einrichtung: {{ this.betreuungseinrichtung }}</h5>
        </v-col>
        <v-col cols="12" md="5" class="text-left">
          <h5>Betreuungsbeginn: {{ this.date_bb }}</h5>
        </v-col>
      </v-row>

      <v-row v-if="this.betreuung == 1">
        <v-col cols="12" md="7" class="text-left">
          <h5>Kindertagespflegeperson: {{ this.tagespflege }}</h5>
        </v-col>
        <v-col cols="12" md="5" class="text-left">
          <h5>Betreuungsbeginn: {{ this.date_bb }}</h5>
        </v-col>
        <v-col cols="12">
          <h5>{{ this.betreuungsumfang }}</h5>
        </v-col>
      </v-row>

      <v-row v-if="this.betreuung != 0 && this.betreuung != 1">
        <v-col cols="12" class="text-left">
          <h5>
            <span v-if="this.betreuung == 2">Krippe</span>
            <span v-if="this.betreuung == 3">Elementar</span>
            <span v-if="this.betreuung == 4">Hort</span>
          </h5>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6" class="text-left">
          <h5>Betreuungsentgelt: {{ this.betreuungsentgelt }} €</h5>
        </v-col>
        <v-col cols="12" md="6" class="text-left">
          <h5>
            Elternbeitrag:
            <span v-if="this.elternbeitrag != 0"
              >{{ this.elternbeitrag }} €</span
            >
            <span v-else>0 €</span>
          </h5>
        </v-col>
      </v-row>
    </v-card>

    <div v-if="this.child_list.length != 0" class="mt-4">
      <h4 class="text-left">
        2. Bitte tragen Sie hier Ihre älteren Kinder ein, die sich ebenfalls in
        anerkannten Betreuungsverhältnissen befinden:
      </h4>

      <v-card
        v-for="(n, index) in child_list"
        :key="n"
        class="text-left pa-3"
        outlined
      >
        <h5>{{ child_list[index].id + 1 }} .Geschwisterkind</h5>
        <v-row>
          <v-col cols="12" md="7" class="text-left">
            <h5>
              Name, Vorname: {{ child_list[index].sibling_firstname }},
              {{ child_list[index].sibling_lastname }}
            </h5>
          </v-col>
          <v-col cols="12" md="5" class="text-left">
            <h5>Geburtsdatum: {{ child_list[index].date_sibling }}</h5>
          </v-col>
        </v-row>

        <v-row
          v-if="
            child_list[index].radioGroupBetreuungsform_sibling != 0 &&
            child_list[index].radioGroupBetreuungsform_sibling != 1
          "
        >
          <v-col cols="12" md="7" class="text-left">
            <h5>
              Name der Einrichtung:
              {{ child_list[index].betreuungseinrichtung }}
            </h5>
          </v-col>
          <v-col cols="12" md="5" class="text-left">
            <h5>Betreuungsbeginn: {{ child_list[index].date_bb }}</h5>
          </v-col>
        </v-row>

        <v-row v-if="child_list[index].radioGroupBetreuungsform_sibling == 1">
          <v-col cols="12" md="7" class="text-left">
            <h5>
              Kindertagespflegeperson: {{ child_list[index].tagespflegename }},
              {{ child_list[index].institutionstreet }}
              {{ child_list[index].institutionnumber }},
              {{ child_list[index].institutionpostcode }}
              {{ child_list[index].institutiontown }}
            </h5>
          </v-col>
          <v-col cols="12" md="5" class="text-left">
            <h5>Betreuungsbeginn: {{ child_list[index].date_bb }}</h5>
          </v-col>
        </v-row>

        <v-row
          v-if="
            child_list[index].radioGroupBetreuungsform_sibling != 0 &&
            child_list[index].radioGroupBetreuungsform_sibling != 1
          "
        >
          <v-col cols="12" class="text-left">
            <h5>
              <span
                v-if="child_list[index].radioGroupBetreuungsform_sibling == 2"
                >Krippe</span
              >
              <span
                v-if="child_list[index].radioGroupBetreuungsform_sibling == 3"
                >Elementar</span
              >
              <span
                v-if="child_list[index].radioGroupBetreuungsform_sibling == 4"
                >Hort</span
              >
              <span
                v-if="child_list[index].radioGroupBetreuungsform_sibling == 5"
                >Ganztagsschule</span
              >
            </h5>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6" class="text-left">
            <h5>
              Betreuungsentgelt: {{ child_list[index].betreuungsentgelt }} €
            </h5>
          </v-col>
          <v-col cols="12" md="6" class="text-left">
            <h5>
              Elternbeitrag:
              <span v-if="child_list[index].elternbeitrag != 0"
                >{{ child_list[index].elternbeitrag }} €</span
              >
              <span v-else>0 €</span>
            </h5>
          </v-col>
        </v-row>
      </v-card>
    </div> -->
    <v-btn class="my-6 py-6 text-button" justify="center" @click="download" color="accent">
      PDF schreiben
      <v-icon> mdi-email-send </v-icon>
    </v-btn>
  </div>
</template>


<script>
import jspdf from "jspdf";

export default {
  name: "Ge",
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
      headline: [
        "Antrag auf Geschwisterermäßigung in",
        "Kindertagesstätten für",
        "das Kita-Jahr",
      ],
      year: "",

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
    this.person =
      this.$store.state.firstname_person +
      " " +
      this.$store.state.lastname_person +
      " " +
      this.$store.state.date_p +
      " " +
      this.$store.state.verwandtschaft_p;
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

    this.year = new Date().getFullYear();
  },

  methods: {
    download() {
      let pdfName = "Antrag_Geschwisterermaeßigung";

      var doc = new jspdf();
      
      var yearPlus = new Date().getFullYear() + 1;
      var firstname = this.$store.state.firstname;
      var lastname = this.$store.state.lastname;
      var street = this.$store.state.street;
      var number = this.$store.state.number;
      var postcode = this.$store.state.postcode;
      var town = this.$store.state.town;
      var email = this.$store.state.email;
      var tel = this.$store.state.tel;
      
      var child_name = this.$store.state.child_lastname + ", " + this.$store.state.child_firstname;
      var child_date = this.$store.state.date_child;
      var betreuungseinrichtung = this.$store.state.institutionname;
      var date_bb = this.$store.state.date_bb;

      doc.setFontSize("15");
      doc.text(
        "Antrag auf Geschwisterermäßigung in Kindertagesstätten",
        40,
        30
      );
      doc.text("für das Kita-Jahr", 75, 37);

      doc.text(new Date().getFullYear() + "/" + yearPlus, 120, 37);

      doc.setFontSize("9");
      doc.text("Hansestadt Lübeck", 15, 50);
      doc.text("Fachbereich Kultur und Bildung", 15, 55);
      doc.text("Entgeltermäßigung Kindertagesbetreuung", 15, 60);
      doc.text("Kronsforder Allee 2-6", 15, 65);
      doc.text("23539 Lübeck", 15, 70);

      doc.setFontSize("7");
      doc.text("Antragstellende Person (Elternteil)", 130, 50);
      doc.setFontSize("9");
      doc.text(firstname + lastname, 130, 55);
      doc.setFontSize("7");
      doc.text("Anschrift", 130, 60);
      doc.setFontSize("9");
      doc.text(street + " " + number + ", " + postcode + " " + town, 130, 65);
      doc.setFontSize("7");
      doc.text("Telefonnummer", 130, 70);
      doc.setFontSize("9");
      doc.text(tel, 130, 75);
      doc.setFontSize("7");
      doc.text("E-Mail", 130, 80);
      doc.setFontSize("9");
      doc.text(email, 130, 85);

      doc.setFontSize("10");
      doc.setFont("helvetica", "bold");
      doc.text(
        "Hiermit wird die Geschwisterermäßigungfür Kinder in Kindertagesstätten beantragt.",
        15,
        95
      );

      doc.setFontSize("7");
      doc.setFont("helvetica", "normal");
      doc.text(
        "Grundlage ist die „Satzung zur sozialen Staffelung von Gebühren oder Entgelten für die Betreuung von Kindern in",
        15,
        100
      );
      doc.text(
        "Kindertageseinrichtungen oder Kindertagespflegestellen“ der Hansestadt Lübeck.",
        15,
        103
      );

      doc.setFontSize("9");
      doc.text(
        "Besuchen mehrere mit Hauptwohnung in einem Haushalt lebende Kinder einer Familie eine",
        15,
        115
      );
      doc.text(
        "öffentlich geförderte Kindertageseinrichtung, Kindertagespflegestelle oder eine",
        15,
        120
      );
      doc.text(
        "Ganztagsbetreuung an Schulen mit einer Nachmittagsbetreuung an mindestens 3 Tagen pro",
        15,
        125
      );
      doc.text(
        " Woche für mindestens 70 EUR, wird der Elternbeitrag auf Antrag ermäßigt.",
        15,
        130
      );

      doc.text(
        "Für das älteste Kind ist der Elternbeitrag in voller Höhe zu entrichten.",
        25,
        135
      );
      doc.text(
        "Für das nächstjüngere Kind ermäßigt sich der Elternbeitrag um 50%,",
        25,
        140
      );
      doc.text("für jedes weitere jüngere Kind um 100%.", 25, 145);

      doc.text(
        "Ermäßigung erfolgt unabhängig vom Einkommen. Anspruchsberechtigt sind",
        15,
        155
      );
      doc.text(
        "Familien, die in Lübeck gemeldet sind. Familien aus anderen Gemeinden",
        15,
        160
      );
      doc.text(
        "melden sich bitte bei der für sie zuständigen Gemeindeverwaltung.)",
        15,
        165
      );
      doc.text("1. Für dieses Kind wird eine Geschwisterermäßigung beantragt:", 15, 175);
      
      doc.setFontSize("9");
      doc.text("Name, Vorname: " + child_name, 15, 185);
      doc.text("Geburtsdatum: " + child_date, 85, 185);
      doc.text("Kindertagesstätte: " + betreuungseinrichtung, 15, 195);
      doc.text("Betreuungsbeginn: " + date_bb, 85, 195);
      
      for (var i = 0; i < this.child_list.length; i++) {
        doc.text("Geschwisterkind " + (i+1) + ":", 15, 210);
        doc.text(
          "Name, Vorname: " + this.child_list[i].sibling_lastname + 
            " " +
            this.child_list[i].sibling_firstname,
          15,
          220 + i * 10
        );
        doc.text(
          "Geburtsdatum: " + this.child_list[i].sibling_date,
          85,
          220 + i * 10
        );
        doc.text("Kindertagesstätte: " + this.child_list[i].sibling_date, 15, 230 + i * 10);
        doc.text("Betreuungsbeginn: " + this.child_list[i].betreuungsbeginn, 85, 230 + i * 10);
      }

      doc.save(pdfName + ".pdf");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

