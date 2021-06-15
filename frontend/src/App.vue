<template>
<v-app>
  <div id="app">
    <div id="nav">
      <router-link to="/check">Berechtigung prüfen</router-link> |
      <router-link to="/">Anträge stellen</router-link>
      <file-upload />
    </div>
    <router-view/>
  </div>
</v-app>
</template>

<script>
import FileUpload from './components/FileUpload.vue'

export default {
  name: 'app',
  components: {
    FileUpload
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
  color: #42b983;
}
</style>
