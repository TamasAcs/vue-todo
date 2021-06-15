import { auth, db } from '../boot/firebase'
import { Notify } from 'quasar'
const state = {
  userDetails: {}
}
const mutations = {
  setUserDetails (state, payload) {
    state.userDetails = payload
  }
}
const actions = {
  registerUser ({ userDetails }, payload) {
    auth.createUserWithEmailAndPassword(payload.email, payload.password).then(response => {
      const userId = auth.currentUser.uid
      db.ref('users/' + userId).set({
        name: payload.name,
        email: payload.email
      })
      Notify.create({
        type: 'positive',
        color: 'positive',
        timeout: 1500,
        position: 'center',
        message: 'Successful registration!'
      })
    }).catch(error => {
      console.log(error.message)
      Notify.create({
        type: 'warning',
        color: 'warning',
        timeout: 1500,
        position: 'center',
        message: 'Password should be at least 6 character'
      })
    })
  },
  loginUser ({ userDetails }, payload) {
    auth.signInWithEmailAndPassword(payload.email, payload.password).then(response => {
      Notify.create({
        type: 'positive',
        color: 'positive',
        timeout: 1000,
        position: 'center',
        message: 'You are logged in!'
      })
    }).catch(error => {
      console.log(error.message)
      Notify.create({
        type: 'negative',
        color: 'negative',
        timeout: 2000,
        position: 'center',
        message: 'Invalid email or password! Please try again.'
      })
    })
  },
  logoutUser () {
    auth.signOut()
  },
  handleAuthStateChanged ({ commit, state }) {
    auth.onAuthStateChanged(user => {
      if (user) {
        // User logged in
        const userId = auth.currentUser.uid
        db.ref('users/' + userId).once('value', snapshot => {
          const userDetails = snapshot.val()
          commit('setUserDetails', {
            name: userDetails.name,
            email: userDetails.email,
            userId: userId
            // saving data after logging in
          })
        })
        this.$router.push('/home')
        // after login redirect to home page
      } else {
        // User logged out
        commit('setUserDetails', {
          // clear out the data after logging out
        })
        this.$router.replace('/')
        // after logout redirect to login page
      }
    })
  },
  firebaseUpdateUser ({ userDetails }, payload) {
    if (payload.userId) {
      db.ref('users/' + payload.userId).update(payload.updates)
    }
  }
}
const getters = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
