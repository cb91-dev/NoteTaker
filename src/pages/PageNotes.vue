<template>
  <div>
    <div>
      <AddEditNote 
        v-model="newNote"
        bgColor="300"
        ref="addEditNoteRef">
        <template v-slot:buttons>
          <button @click="addNewNote" :disabled="!newNote" 
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-400 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Add New Note
          </button>
        </template>
      </AddEditNote>
    </div>
  <!-- Loading -->
  <div v-if="!storeNotes.notesLoaded" class="w-full px-3 rounded-full h-2.5">
    <div class="progress-green bg-green-400 h-2.5 rounded-full" style="width: 100%" />
  </div>
    <template v-else>
      <Notes 
        v-for="note in storeNotes.notes" 
        :id="note.id"
        :note="note" 
        :key="note.id" 
        class="shadow bg-white rounded page-layout  py-5"
      />
        <div v-if="!storeNotes.notes.length">
        <p class="py-3 text-xl text-gray-400 text-center">
          You have no current notes, get going !!
        </p>
      </div>
    </template>
  </div>
</template>

<script setup>
// Imports
import { ref } from 'vue'
import { useStoreNotes } from '@/stores/storeNotes'
import Notes from '../components/notes/Notes.vue'
import AddEditNote from '../components/notes/AddEditNote.vue'
import { useWatchCharacters } from '@/use/useWatchCharacters'

// Taking value from new note
const newNote = ref('')
// Used to refocus text area after submit
const addEditNoteRef = ref(null)

// Store 
const storeNotes = useStoreNotes()

//  add new note to user
const addNewNote = () => {
    //  adding to pina note store
    storeNotes.addNote(newNote.value)
    // reset newNote ref to empty
    newNote.value = ""
    addEditNoteRef.value.focusTextArea()
}

// Watch Character
useWatchCharacters(newNote)
</script>







<style >

.progress-green {
  position: relative;
  overflow: hidden;
}
.progress-green::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background-image: linear-gradient(
    90deg,
    rgb(255, 255, 255) 0,
    rgba(255, 255, 255, 0.9) 50%,
    rgba(255, 255, 255, 0.8) 100%
  );
  animation: shimmer 1.5s ease-out infinite;
  content: "";
}

@keyframes shimmer {
  100% {
    transform: translateX(0%);
    opacity: 1;
  }
}

.page-layout{
    display: flex;
    justify-content: center;
    border: 1px solid rgb(225, 225, 225);
    margin: 1em;
}
.page-box{
    display: grid;
    grid-template-columns: 200px 200px 200px 200px;
    grid-template-rows: auto;
    grid-template-areas:
    "header . . . "
    "main main main main"
    ". . . footer";

}

.txt-box-header{
    grid-area: header;
    padding-bottom: 5px;
}

/* txt-box-btns is also found in componets/Notes */
.txt-box {
    grid-area: main;
}
.txt-box-btns {
    grid-area: footer;
    padding: 5px;
    display: flex;
    justify-content: space-between;
}

/* MOBILE */
@media only screen and (max-width: 840px) {
    
    .page-box{
    display: grid;
    grid-template-columns: 100px 200px 100px;
    grid-template-rows: auto;
    grid-template-areas:
    "header . . "
    "main main main"
    "footer footer footer";

}
    .txt-box{
    justify-content: space-between;
    grid-area: main;
  }
    .txt-box-header{
    grid-area: header;
    padding-bottom: 5px;
}
    .txt-box-btns {
    grid-area: footer;
    display: flex;
    padding: 5px;
    justify-content: space-between;
}
}
/* MOBILE */
@media only screen and (max-width: 450px) {
    .page-box{
    display: grid;
    grid-template-columns: 100px 125px 100px;
    grid-template-rows: auto;
    grid-template-areas:
    "header . . "
    "main main main"
    "footer footer footer";

}
    .txt-box{
    justify-content: center;
    grid-area: main;
  }
    .txt-box-header{
    grid-area: header;
    padding-bottom: 5px;
}
    .txt-box-btns {
    grid-area: footer;
    display: flex;
    padding: 5px;
    justify-content: space-between;
}
}

</style>