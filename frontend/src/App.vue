<template>
<v-app>
  <div id="app">
    <div id="nav">
      <router-link to="/check">Berechtigung prüfen</router-link> |
      <router-link to="/">Anträge stellen</router-link>
    </div>
    <router-view/>
  </div>
</v-app>
</template>

<script>

export default {
  name: 'app',
  components: {
  },
}
</script>

  
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: grey;
}
</style>
