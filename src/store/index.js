import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'

Vue.use(Vuex)

// snapshot updates in realtime
fb.itemsCollection.onSnapshot(() => {
  store.dispatch('getItems')
})

const store = new Vuex.Store({
  state: {
    userProfile: {},
    items: [],
  },

  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val
    },

    setItems(state, val) {
      state.items = val
    }
  },

  actions: {
    async createItem({ state }, item) {
      await fb.itemsCollection.add({
        createdOn: new Date(),
        location: item.location,
        name: item.name,
        userId: fb.auth.currentUser.uid,
        userName: state.userProfile.name,
        comments: 0,
        likes: 0
      })
    },

    async getItems({ commit }) {
        const user = fb.auth.currentUser

        if(!user) {
          commit('setItems', [])
        }

        // TODO: Order desc by created date
        fb.itemsCollection.where('userId', '==', user.uid)
          .get()
          .then((snapshot) => {
            let itemsArray = []

            snapshot.forEach(doc => {
              let item = doc.data()
              item.id = doc.id
          
              itemsArray.push(item)
            })

            commit('setItems', itemsArray)
          })

    },

    async login({ dispatch }, form) {
      // sign user in
      const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)

      // fetch user profile and set in state
      dispatch('fetchUserProfile', user)
      dispatch('getItems')
    },

    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get()

      // set user profile in state
      commit('setUserProfile', userProfile.data())
      
      // change route to dashboard
      if (router.currentRoute.path === '/login') {
        router.push('/')
      }
    },

    async logout({ commit }) {
      await fb.auth.signOut()
    
      // clear userProfile and redirect to /login
      commit('setUserProfile', {})
      router.push('/login')
    },

    async signup({ dispatch }, form) {
      // sign user up
      const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)
    
      // create user profile object in userCollections
      await fb.usersCollection.doc(user.uid).set({
        name: form.name,
        title: form.title
      })
    
      // fetch user profile and set in state
      dispatch('fetchUserProfile', user)
    }
  }
})

export default store