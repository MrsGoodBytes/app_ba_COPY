<template>
  <div id="antrag_auswahl" class="hello">
    <h1 class="text-base font-semibold">{{ msg }}</h1>
    <div id="input_checkbox_apply">
      <label class="checkbox"><input v-model="name_field" class="rounded text-purple-500" type="checkbox" />Entgeltermäßigung
      </label>
      <label class="checkbox"><input v-model="description_field" class="rounded text-purple-500" type="checkbox" />Geschwisterermäßigung
      </label>
      <label class="checkbox"><input v-model="deadline_field" class="rounded text-purple-500" type="checkbox" />Bildungsfond
      </label> 
     <router-link :to="{ name: 'Apply' }" href="#" v-if="$route.name !== 'Apply'" v-on:click="addTodo" class="bg-purple-600 text-white text-base font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200">Ausgewählte Anträge stellen</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Antragswahl',
  props: {
    msg: String
  },
  data() {
    return {
      todo_list: [],
      name_field: "",
      description_field: "",
      deadline_field: "",
    };
  },

  methods: {
    addTodo() {
      // neues todo erzeugen
      var todo = new Object();      

      //ans Ende der Liste anfügen indem die richtige ID ermittelt wird
      if (this.todo_list.length == 0) {
        todo.id = 0;
      } else {
        // vermeide Duplikate
        todo.id = this.todo_list[this.todo_list.length - 1].id + 1;
      }

      //eintragen des neuen todo und seiner Werte in das Array
      todo.name = this.name_field;
      todo.description = this.description_field;
      todo.status = "ToDo";
      todo.deadline = this.deadline_field;

      this.todo_list.push(todo);
    },
    deleteTodo(id) {
      // Suche nach ID im Todo-Array und entferne das Element
      // https://love2dev.com/blog/javascript-remove-from-array/
      // Am einfachsten geht das über array.filter()deleteTodo(id) {
      this.todo_list = this.todo_list.filter(todo => todo.id !== id);
      //this.todo_list.splice(id, 1);
    },
    updateStatus(index, newStatus){
    //Array-Destructuring (ES2015-Feature)
    //const [status, id] = args;
    console.log(status, index);
    // Überschreibe den Status des Todos mit der übergebenen id
    var i = 0;
    for(i; i < this.todo_list.length; i++) {
      if(this.todo_list[i].id == index) {
        this.todo_list[i].status = newStatus;
      }
    }
      //this.todo_list[todo.index].status = newStatus;
    },
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
