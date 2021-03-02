<template>
  <div class="home">
    <h1>Willkommen</h1>
    <h2>Erstellen Sie Anträge jetzt vollständig digital</h2>
    <Antragswahl msg="Welche Anträge möchtest du stellen?"/>
    <h3>Falls Sie unsicher sind</h3>
    <p>hilft Ihnen unser Test auf Berechtigung weiter:</p>
    <button>Welche Anträge sollte ich stellen?</button>
  </div>
</template>

<script>
// @ is an alias to /src
import Antragswahl from '@/components/Antragswahl.vue'

export default {
  name: 'Home',
  components: {
    Antragswahl
  }
}
</script>
