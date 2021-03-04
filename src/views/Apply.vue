<template>
  <div class="apply">
    <router-link :to="{ name: 'Home' }" href="#" v-if="$route.name !== 'Home'" class="bg-purple-600 text-white text-base font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200">x</router-link>
      <Antragswahl msg="Folgende Anträge sind ausgewählt:"/>
      <p>Es ist möglich die Auswahl jederzeit durch Auswahl der Checkboxen zu ändern.</p>
  </div>
</template>

<script>
// @ is an alias to /src
import Antragswahl from '@/components/Antragswahl.vue'

export default {
  name: 'Apply',
  components: {
    Antragswahl
  }
}
</script>