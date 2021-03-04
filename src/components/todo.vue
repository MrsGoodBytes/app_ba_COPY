<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Deadline</th>
            <th>Delete-Todo</th>
          </tr>
        </thead>
        <tfoot v-for="item in todolist" :key="item.id">
          <tr>
            <th>{{ item.name }}</th>
            <th>{{item.description}}</th>
            <th><select name="status" class="select">
                <option v-on:click="updateStatus(item.id, 'ToDo')">ToDo</option>
                <option v-on:click="updateStatus(item.id, 'In Bearbeitung')">In Bearbeitung</option>
                <option v-on:click="updateStatus(item.id, 'Erledigt')">Erledigt</option>
                </select>
            </th>
            <th>{{item.deadline}}</th>
            <th><button class="button is-small is-danger has-text-centered" v-on:click="deleteTodo(item.id)">x</button></th>
          </tr>
        </tfoot>
    </table>
  </div>
</template>

<script>

export default {
  name: "todo",
  props: {
    msg: String,
    todolist: Array,
  },

  data() {
    return {
      // Index des zu löschenden Eintrags übergeben
      deleteID: "",
      
    };
  },

  methods: {  
    updateStatus(index, newStatus) {
      this.$parent.updateStatus(index, newStatus);
    },
    deleteTodo(deleteID) {
      this.$parent.deleteTodo(deleteID);
    }
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
  max-width: 1024px;
}
li {
  display: block;
  margin-bottom: 5px;
}
a {
  color: #42b983;
}
table {
  margin: auto;
}
</style>
