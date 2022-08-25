// stores/counter.js
import { defineStore } from 'pinia'
import {v4 as uuidv4} from 'uuid'
import { collection, onSnapshot, doc, deleteDoc,updateDoc,query, orderBy, addDoc } from "firebase/firestore";
import { db } from '@/js/firebase'
import {useStoreAuth} from '@/stores/storeAuth'
import { useThrottledRefHistory } from '@vueuse/core';



let notesCollectionRef
let notesCollectionQuery 
let getNotesSnapShot = null

export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return { 
        notes: [
            // {
            //     id:'id1',
            //     content:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex incidunt fuga deserunt, facere ratione recusandae autem reprehenderit nesciunt explicabo delectus? Excepturi possimus unde amet earum a harum dolorum? Qui, omnis.'
            // },
            //  {
            //     id:'id2',
            //     content:'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
            // },
            //  {
            //     id:'id3',
            //     content:'Last note my guy!'
            // }
        ],
        notesLoaded: false,
    }
  },
  actions: {
    init(){
      const storeAuth = useStoreAuth()

      // initialise our database ref
      notesCollectionRef = collection(db,"users",storeAuth.user.uid,"notes")
      notesCollectionQuery = query(notesCollectionRef, orderBy("date", "desc"));
      this.getNotes()
    },
    async getNotes() {
      this.notesLoaded = false

      // unsubsccibe from any active listener
      if(getNotesSnapShot) getNotesSnapShot()
      getNotesSnapShot = onSnapshot(notesCollectionQuery, (querySnapshot) => {
        let notes = []
        querySnapshot.forEach((doc) => {
          let note = {
                id: doc.id,
                content: doc.data().content,
                date: doc.data().date
              }
            notes.push(note)
        })
        this.notes = notes
        this.notesLoaded = true
      }, error => {
        console.log('error message: ', error.message)
      }) 
    },
    clearNotes(){
        this.notes = []
    },
    async addNote(newNoteContent) {
      // date gen 
      let curDate = new Date().getTime(),
        dateStamp = curDate.toString()
    // Add a new document in collection
      await addDoc(notesCollectionRef,{
        content: newNoteContent,
        date: dateStamp
      })
    },
    async deleteNotes(idToDelete){
        await deleteDoc(doc(notesCollectionRef, idToDelete))
    },
    async updateNote(id,content){
      await updateDoc(doc(notesCollectionRef, id), {
        content: content.value
      })
    }  
  },
  getters: {
    getNoteContent: (state) => {
      return (id) => {
        return state.notes.filter(note => { return note.id === id})[0].content
      }
    },
    totalNotesCount:(state) => {
      return state.notes.length
    },
    totalCharactersCount: (state) => {
      let count = 0
      state.notes.forEach(note => {
        count += note.content.length
      })
      return count
    },
    getLastNote: (state) => {
      let lastNote = state.notes[0].content
      return lastNote
    }
  }
})