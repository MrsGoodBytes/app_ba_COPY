<template>
  <div id="antrag_auswahl" class="hello">
    <h1>{{ msg }}</h1>
      <label class="checkbox">
        <input type="checkbox">Entgeltermäßigung
      </label>
      <label class="checkbox">
        <input type="checkbox">Geschwisterermäßigung
      </label>
      <label class="checkbox">
        <input type="checkbox">Bildungsfond
      </label>
    </div>
</template>

<script>
export default {
  name: 'Antragswahl',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
