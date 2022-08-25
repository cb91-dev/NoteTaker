<template>
    <div class="edit-note">
        <AddEditNote 
                v-model="noteContent"
                placeHolder="Edit Note"
                label="Edit Note"
                ref="addEditNoteRef">
            <template v-slot:buttons>
                    <button
                    @click="handleSavedClicked"
                    :disabled="!noteContent"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-400 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Save Note</button>
                    <button
                    @click="$router.back()"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-400 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Cancel</button>
            </template>
        </AddEditNote>
    </div>

</template>


<script setup>
import AddEditNote from '@/components/notes/AddEditNote.vue'
import { ref } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import { useStoreNotes } from '@/stores/storeNotes'
import { useWatchCharacters } from '@/use/useWatchCharacters'

// useRoutes
const route = useRoute()

// useRouter
const router = useRouter()

// Store
const storeNotes = useStoreNotes()

// ref for notes
const noteContent = ref('')

noteContent.value = storeNotes.getNoteContent(route.params.id)

//  save clicked 

const handleSavedClicked = () => {
  storeNotes.updateNote(route.params.id, noteContent)
  router.push('/')

}

// Watch Character
useWatchCharacters(noteContent)
</script>