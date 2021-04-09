<template>
  <v-app>
    <div class="home">
      <h1>Willkommen</h1>
      <h2>Erstellen Sie Anträge jetzt vollständig digital</h2>

      <Antragswahl msg="Welche Anträge möchtest du stellen?" />
      <router-link :to="{ name: 'Apply' }" href="#" class=""
        ><v-btn
          class="bg-purple-600 text-white text-base font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
          >Gewählte Anträge stellen</v-btn
        ></router-link
      >
      <h3>Falls Sie unsicher sind</h3>
      <p>hilft Ihnen unser Test auf Berechtigung weiter:</p>
      <router-link :to="{ name: 'Check' }" href="#" class=""
        ><v-btn
          class="bg-purple-600 text-white text-base font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
          >Welche Anträge sollte ich stellen?</v-btn
        ></router-link
      >
    </div>
  </v-app>
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
