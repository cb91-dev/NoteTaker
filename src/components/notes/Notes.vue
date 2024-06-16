<template>
  <div class="page-box ">
    <h2 class="txt-box-header mt-3 font-semibold">
      Note
    </h2>
    <div class="txt-box pt-4">
    <p class="text-gray-500">{{ note.content }}</p>
      <div class="flex justify-between pt-3">
        <small class="text-gray-400 text-left">{{dateFormatted}}</small>
        <small class="text-gray-400 text-right">{{ characterLength }}</small>
      </div>
    </div>
  <div class="txt-box-btns">
    <RouterLink 
      :to="`/editNote/${ note.id }`" 
      class="bg-blue-500 text-white rounded py-2 px-5 hover:bg-blue-500 shadow  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
    Edit
    </RouterLink>
    <button
      @click="modals.deleteNote = true" 
      type="button" 
      class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow py-2 px-3 rounded text-white bg-red-400 hover:bg-red-500">
    Delete
    </button>
    <ModalDeleteNote 
      v-model="modals.deleteNote" 
      v-if="modals.deleteNote"
      :noteId="note.id"/>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useDateFormat } from '@vueuse/core'
import { useStoreNotes } from '@/stores/storeNotes'
import ModalDeleteNote from '@/components/notes/ModalDeleteNote.vue';
import { reactive } from 'vue';

// Formate date from db
const dateFormatted = computed(() => {
    let date = new Date(parseInt(props.note.date))
    let formattedDate = useDateFormat(date, 'DD-MM-YYYY @ HH:mm')
    return formattedDate.value
})
//  PROPS
const props = defineProps({
    note: {
        type: Object,
        required: true
    }
})
// Store 
const storeNotes = useStoreNotes()

// characterLength
const characterLength = computed(() => {
    let length = props.note.content.length
    let description = length > 1 ?
    'characters' : 'character'
    return `${length} ${ description }`
})

// modals
const modals = reactive({
    deleteNote: false
})
</script>