<template>
  <div class="home">
    <h1>Willkommen</h1>
     
      <h1 class="title">My beautiful ToDo-App</h1>
    <div id="input_todo">
      <div class="columns">
        <input v-model="name_field" class="input column is-one-quarter" type="text" placeholder="Type name" />
        <input v-model="description_field" class="input column is-one-quarter" type="text" placeholder="Type todo" />
        <input v-model="deadline_field" class="input column is-one-quarter" type="text" placeholder="Deadline" />
        <button class="button is-success column is-one-quarter is-size-6 has-text-weight-bold" v-on:click="addTodo">Add</button>
      </div>
    </div>
    <br />
    <!--{{todo_list}}-->
    
    <todo msg="Meine ToDos" :todolist='todo_list' />

    <h2>Erstellen Sie Anträge jetzt vollständig digital</h2>
    <Antragswahl msg="Welche Anträge möchtest du stellen?"/>
    <h3>Falls Sie unsicher sind</h3>
    <p>hilft Ihnen unser Test auf Berechtigung weiter:</p>
    <router-link :to="{ name: 'Check' }" href="#" class="bg-purple-600 text-white text-base font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200">Welche Anträge sollte ich stellen?</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import Antragswahl from '@/components/Antragswahl.vue'
import todo from "@/components/todo.vue"

export default {
  name: 'Home',
  components: {
    Antragswahl,
    todo
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
};
</script>
