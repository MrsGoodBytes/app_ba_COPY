<template>
<v-app>
  <div class="check">
    <router-link :to="{ name: 'Home' }" href="#" v-if="$route.name !== 'Home'" class="bg-purple-600 text-white text-base font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200">x</router-link>
      <h1>Bitte beantworten Sie die Fragen um die für Sie relevanten Anträge zu ermitteln:</h1>
      <div>
        <p>Haben Sie mehr als eines Ihrer Kinder in einer Betreuungseinrichtung angemeldet?</p>
      </div>
      <span>
        <button class="bg-purple-600 text-white text-base font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200" v-on:click="oneAddYes">Ja</button>
        <button class="bg-purple-600 text-white text-base font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200" v-on:click="oneAddNo">No</button>
      </span>
      <Antragswahl msg="Diese Anträge haben Aussicht auf Erfolg:"/>
  </div>
</v-app>
</template>

<script>
// @ is an alias to /src
import Antragswahl from '@/components/Antragswahl.vue'

export default {
  name: 'Check',
  components: {
    Antragswahl
  }
}
</script>