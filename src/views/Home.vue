<template>
  <div class="home">
    <h1>Willkommen</h1>
    <h2>Erstellen Sie Anträge jetzt vollständig digital</h2>

    <Antragswahl msg="Welche Anträge möchtest du stellen?" />
    <router-link :to="{ name: 'Apply' }" href="#" class=""
      ><v-btn
        color="primary"
        class="text-button"
        >Gewählte Anträge stellen</v-btn
      ></router-link
    >
    <v-card
    outlined
    class="mx-16 mt-10"
    color="#E8EAF6">
    <h3 class="pt-5">Falls Sie unsicher sind</h3>
    <p>hilft Ihnen unser Test auf Berechtigung weiter:</p>
    <router-link :to="{ name: 'Check' }" href="#" class=""
      ><v-btn
        color="accent"
        class="mb-3 text-button"
        >Welche Anträge sollte ich stellen?</v-btn
      ></router-link
    >
    </v-card>
  </div>
</template>

<script>
// @ is an alias to /src
import Antragswahl from "@/components/Antragswahl.vue";

export default {
  name: "Home",
  components: {
    Antragswahl,
  },
};
</script>
