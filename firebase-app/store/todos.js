import firebase from "~/plugins/firebase";
import { firestoreAction } from "vuexfire";

// dbへ接続
// firebaseのtodosコレクションを使うように設定
const db = firebase.firestore();
const todosRef = db.collection("todos");

// stateの定義
export const state = () => ({
  todos: []
});

export const actions = {
  // 初期化アクション。引数でバインドしたいデータに参照を渡すと関連付けされる。
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef("todos", todosRef);
  }),
  // if (name.trim())は文字が入っているか判定している。javascriptはblankをflse判定する
  add: firestoreAction((context, name) => {
    if (name.trim()) {
      todosRef.add({
        name: name,
        done: false,
        created: firebase.firestore.FieldValue.serverTimestamp()
      });
    }
  }),
  remove: firestoreAction((context, id) => {
    todosRef.doc(id).delete();
  }),
  toggle: firestoreAction((context, todo) => {
    todosRef.doc(todo.id).update({
      // !はbooleanの反転
      done: !todo.done
    });
  })
};

export const getters = {
  orderdTodos: state => {
    return _.sortBy(state.todos, "created");
  }
};
