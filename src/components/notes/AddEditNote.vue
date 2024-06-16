<template>
  <div class="flex items-start space-x-4 py-5 m-1 rounded" :class="`bg-green-${ bgColor }`">
    <div class="min-w-0 px-4 flex-1">
      <div class="relative">
        <p 
          v-if="label" 
          class="pb-4 font-semibold text-white text-lg">
        Edit Note
        </p>
        <div class="border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
        <textarea
          maxlength="200"
          v-autofocus
          :value="props.modelValue"
          @input="$emit('update:modelValue', $event.target.value)" 
          ref="textAreaRef"
          rows="3" 
          name="newNote" 
          id="newNote"
          :class="label ?'h-60' : 'h-36'" 
          class="text-gray-500 block w-full py-3 border-0 resize-none focus:ring-0 sm:text-sm " :placeholder="placeHolder" />
        <div class="py-2 bg-white" aria-hidden="true">
          <div class="py-px">
            <div class="h-9" />
          </div>
        </div>
        </div>
      <div class="z-0 absolute rounded border-gray-300 bottom-0 inset-x-0 pl-3 pr-2 py-2">
        <div class="flex-shrink-0 flex justify-between flex-row-reverse">
          <slot name="buttons"/>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { vAutofocus } from '@/directives/vAutofocus'

// props
const props = defineProps({
    modelValue: {
        type: String,
        required: true
    },
    bgColor:{
        type:String,
        default: '400'
    },
    placeHolder:{
        type: String,
        default: 'Type something...'
    },
    label:{
        type: String
    }
})
// Emits
const emit = defineEmits(['update:modelValue'])

// textAreaRef
const textAreaRef = ref(null)
// Focus Text Area
const focusTextArea = () => {
    textAreaRef.value.focus()
    
}
// Focus text area after submit
defineExpose({
    focusTextArea
})
</script>