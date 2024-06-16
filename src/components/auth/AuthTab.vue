<template>
  <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl tracking-tight font-bold text-green-500">
          {{props.formTitle}}
        </h2>
      </div>
    <form class="mt-8 space-y-6" @submit.prevent="onSubmit">
      <input type="hidden" name="remember" value="true" />
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="email-address" class="sr-only">Email address</label>
          <input 
            v-model="credentials.email"
            id="email-address" 
            name="email" 
            type="email" 
            autocomplete="email" 
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input 
            v-model="credentials.password"
            id="password" 
            name="password" 
            type="password" 
            autocomplete="current-password"  
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
            placeholder="Password" />
        </div>
        </div>
      <div>
        <button 
          type="submit" 
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <LockClosedIcon class="h-5 w-5 text-white" aria-hidden="true" />
          </span>
        {{ props.formBtn }}
        </button>
      </div>
    </form>
    </div>
  </div>
</template>

<script setup>
import { LockClosedIcon } from '@heroicons/vue/solid'
import { reactive } from 'vue';
import { useStoreAuth } from '@/stores/storeAuth'

// Store
const storeAuth = useStoreAuth()

// props
const props = defineProps({
  formTitle:{
     type: String,
      required: true
  },
  formBtn:{
    type: String,
    required: true
  }
})
// credentials
const credentials = reactive({
  email:'',
  password: '',
})

// onSubmit
const onSubmit = () => {
    if(!credentials.email || !credentials.password){
      alert('Please enter a email and password')
    }else{
      if(props.formBtn == "Register"){
        storeAuth.registerUser(credentials)
      }else{
        storeAuth.loginUser(credentials)
      }
      
    }
}
</script>