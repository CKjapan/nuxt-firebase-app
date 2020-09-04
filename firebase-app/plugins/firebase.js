import firebase from "firebase";

// .envからID取得して変数に入れる
const config = {
  projectId: process.env.FIREBASE_PROJECT_ID
};

// .lengthは空判定(入っているとtrue)。!はbooleanの反転。// ! .lengthで空ならtrue
// firebase.initializeApp();はfirebaseの初期化。//空なら初期化する。
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

// firebaseを他のcomponentでも使えるようにする。
export default firebase;
