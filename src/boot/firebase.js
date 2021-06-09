import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyCCNL-bT-vR9cIUqWRY-BYUfASGHydyKes',
  authDomain: 'vue-todo-2ec9a.firebaseapp.com',
  projectId: 'vue-todo-2ec9a',
  storageBucket: 'vue-todo-2ec9a.appspot.com',
  messagingSenderId: '854659884809',
  appId: '1:854659884809:web:89f4f36d11593b1af495d8'
}
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)
const auth = firebaseApp.auth()
const db = firebaseApp.database()

export { auth, db }
