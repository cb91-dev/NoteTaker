// stores/counter.js
import { defineStore } from 'pinia'
import {auth} from '@/js/firebase'
import { createUserWithEmailAndPassword,signOut,signInWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";
import { useStoreNotes } from '@/stores/storeNotes'

export const useStoreAuth = defineStore('storeAuth', {
  state: () => {
    return {
      user: {

      },
     }
  },
  actions: {
    init(){
    const storeNotes = useStoreNotes()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user.uid = user.uid
        this.user.email = user.email
        this.router.push('/')
        this.navMenu = true
        storeNotes.init()
        } else {
          this.user = {}
          this.router.replace('/auth')
          storeNotes.clearNotes()
        }
      });
    },
    registerUser(credentials){
      createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
        const user = userCredential.user
        }).catch((error) => {
          console.error(error)
    })
    },
    loginUser(credentials){
        signInWithEmailAndPassword(auth, credentials.email, credentials.password)
          .then((userCredential) => { 
            const user = userCredential.user
            console.log('user sign in')
          }).catch((error) => {
            console.log(error.message)
          });
    },
    logOutUser(){
        signOut(auth).then(() => {
          console.log('user sign out')
          }).catch((error) => {
            console.log(error.message)
          });
    }
  }
})