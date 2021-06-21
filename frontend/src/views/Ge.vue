<template>
  <div id="Ge" class="mx-16">
    <h3>Folgende Anträge werden abgeschickt:</h3>
    <v-row justify="space-around">
      <v-checkbox v-model="ge_checkbox" ref="ge_check"
        ><template v-slot:label>
          <div>Antrag auf Geschwisterermäßigung</div>
        </template>
      </v-checkbox>

      <v-checkbox v-model="ent_checkbox" ref="ge_check"
        ><template v-slot:label>
          <div>Antrag auf Entgeltermäßigung</div>
        </template>
      </v-checkbox>

      <v-checkbox v-model="bifo_checkbox" ref="ge_check"
        ><template v-slot:label>
          <div>Antrag auf Mittel aus dem Bildungsfond</div>
        </template>
      </v-checkbox>
    </v-row>
    <v-btn
      class="my-6 py-6 text-button"
      justify="center"
      @click="download"
      color="primary"
    >
      Anträge abschicken
      <v-icon> mdi-email-send </v-icon>
    </v-btn>
  </div>
</template>


<script>
import jspdf from "jspdf";
import axios from "axios";

export default {
  name: "Ge",
  props: {
    child_list: Array,
    person_list: Array,
  },
  data() {
    return {
      ge_checkbox: "",
      ent_checkbox: "",
      bifo_checkbox: "",
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
    uploadData() {
      var tmp = this.$store.state.fileBetr;
      alert(tmp);
      axios
        .post("http://localhost:5000/upload", {
          fileBetr: this.$store.state.fileBetr,
        })
        .then((response) => {
          alert(response.data);
        });
    },

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

      var child_name =
        this.$store.state.child_lastname +
        ", " +
        this.$store.state.child_firstname;
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
      doc.text(
        "1. Für dieses Kind wird eine Geschwisterermäßigung beantragt:",
        15,
        175
      );

      doc.setFontSize("9");
      doc.text("Name, Vorname: " + child_name, 15, 185);
      doc.text("Geburtsdatum: " + child_date, 85, 185);
      doc.text("Kindertagesstätte: " + betreuungseinrichtung, 15, 195);
      doc.text("Betreuungsbeginn: " + date_bb, 85, 195);

      for (var i = 0; i < this.child_list.length; i++) {
        doc.text("Geschwisterkind " + (i + 1) + ":", 15, 210);
        doc.text(
          "Name, Vorname: " +
            this.child_list[i].sibling_lastname +
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
        doc.text(
          "Kindertagesstätte: " + this.child_list[i].sibling_date,
          15,
          230 + i * 10
        );
        doc.text(
          "Betreuungsbeginn: " + this.child_list[i].betreuungsbeginn,
          85,
          230 + i * 10
        );
      }

      doc.save(pdfName + ".pdf");

      this.uploadData();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

