<template>
  <div>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <!-- todo.createdに値がある時だけ描画する。 -->
        <span v-if="todo.created">
          <!-- checbox -->
          <!-- @changeでcheckboxの状態が変わった時にtoggleメソッドを呼び出し -->
          <input
            type="checkbox"
            v-bind:cheked="todo.done"
            @change="toggle(todo)"
          />
          <!-- todo.doneがtrueだったらdoneclassが設定されflseだったらclassが設定されない -->
          <span v-bind:class="{ done: todo.done }">
            {{ todo.name }} {{ todo.created.toDate() | dateFilter }}
          </span>
          <!-- todo削除 -->
          <button v-on:click="remove(todo.id)">X</button>
        </span>
      </li>
    </ul>
    <div class="form">
      <!-- todo登録 -->
      <!-- .preventを付けるとsubmitイベントでページがリロードされないよにする。 -->
      <form v-on:submit.prevent="add">
        <input v-model="name" />
        <button>Add</button>
      </form>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data: function() {
    return {
      name: "",
      done: false
    };
  },
  // createdはインスタンスが生成された時にコードを実行したいときに使われる。
  created: function() {
    // initアクションを実行。
    this.$store.dispatch("todos/init");
  },
  methods: {
    add() {
      this.$store.dispatch("todos/add", this.name);
      this.name = "";
    },
    remove(id) {
      this.$store.dispatch("todos/remove", id);
    },
    toggle(todo) {
      this.$store.dispatch("todos/toggle", todo);
    }
  },
  // データに何かしらの処理を加えてから表示させたい際はcomputedプロパティを用いる。computedプロパティは関数内の変数に変更があるときだけ再計算。
  computed: {
    todos() {
      // return this.$store.state.todos.todos;
      return this.$store.getters["todos/orderdTodos"];
    }
  },
  filters: {
    dateFilter: function(date) {
      return moment(date).format("YYYY/MM/DD HH:mm:ss");
    }
  }
};
</script>

<style>
li > span > span.done {
  text-decoration: line-through;
}
</style>
