<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-lg leading-6 font-medium text-gray-900">Notes Information</h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">Below you can find out all the stats about your Notes App.</p>
    </div>
        <div class="w-full py-2 px-3 flex justify-center">
    <input maxlength="50" v-model="loveNoteTaker" v-autofocus class="h-8 focus:outline-none focus:ring focus:ring-green-400 border-solid border-green-300 border-2 rounded w-full"  placeholder="Do you love NoteTaker ??"/>
    </div>
    <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
      <dl class="sm:divide-y sm:divide-gray-200">
        <div class="py-4 sm:py-5 grid grid-cols-2 sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Number of Notes:</dt>
          <dd class=" text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ storeNotes.totalNotesCount }}</dd>
        </div>
        <div class="py-4 sm:py-5 grid grid-cols-2 sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Number of Character (of all notes):</dt>
          <dd class=" text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{storeNotes.totalCharactersCount}}</dd>
        </div>
        <div class="py-4 sm:py-5 grid grid-cols-2 sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Email address:</dt>
          <dd class=" text-sm text-gray-900 sm:mt-0 sm:col-span-2">userName or use Email</dd>
        </div>
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Last Note:</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{storeNotes.getLastNote}}</dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStoreNotes } from '../stores/storeNotes';
import { vAutofocus } from '@/directives/vAutofocus'
import { useWatchCharacters } from '@/use/useWatchCharacters'

const storeNotes = useStoreNotes()

// Love NoteTaker
const loveNoteTaker = ref('')
// Watch Character
useWatchCharacters(loveNoteTaker,50)
</script>
