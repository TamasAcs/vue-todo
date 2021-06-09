import { auth, db } from '../boot/firebase'

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
    console.log('payload:', payload)
    auth.createUserWithEmailAndPassword(payload.email, payload.password).then(response => {
      console.log(response)
      const userId = auth.currentUser.uid
      db.ref('users/' + userId).set({
        name: payload.name,
        email: payload.email
      })
    }).catch(error => {
      console.log(error.message)
    })
  },
  loginUser ({ userDetails }, payload) {
    console.log('payload:', payload)
    auth.signInWithEmailAndPassword(payload.email, payload.password).then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error.message)
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
