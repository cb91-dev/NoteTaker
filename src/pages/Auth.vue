<template>
  <div class="flex flex-col">
    <div class="flex justify-center">
      <div class="block">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8" aria-label="Tabs">
            <a 
              @click="authPanel(tab.name)" 
              v-for="tab in tabs" :key="tab.name"     
              :class="[tab.current ? 'border-green-400 text-green-600' : 'border-transparent text-gray-500 hover:text-green-700 hover:border-green-300', 'group inline-flex items-center py-4 px-1 border-b-4 rounded font-medium text-sm']" 
              :aria-current="tab.current ? 'page' : undefined">
              <component 
                :is="tab.icon" 
                :class="[tab.current ? 'text-green-500' : 'text-gray-400 group-hover:text-green-400', '-ml-0.5 mr-2 h-8 w-5']" aria-hidden="true" />
              <span>{{ tab.name }}</span>
            </a>
          </nav>
        </div>
      </div>
    </div>
  <AuthTab :formTitle="formTitle" :formBtn="formBtn"/>
  </div>
</template>

<script setup>
import { UserIcon } from '@heroicons/vue/solid'
import { ref,reactive } from 'vue';
import { UserAddIcon } from '@heroicons/vue/outline'
import AuthTab from '../components/auth/AuthTab.vue'

let tabs = reactive([
  { name: 'Login',icon: UserIcon, current: true },
  { name: 'Register', icon: UserAddIcon, current: false }
])
// form title
const regsiter = reactive({
    title:false
    })

const formTitle = ref('Login into your account')
const formBtn = ref('Login')

const authPanel = (name) => {
  if (name == "Login") {
    tabs[0].current = true
    tabs[1].current = false
    formTitle.value = 'Login into your account'
    formBtn.value = 'Login'
  }
   if (name == "Register") {
    tabs[0].current = false
    tabs[1].current = true
    formTitle.value = 'Register a new account'
    formBtn.value = "Register"
  }
}
</script>
