<template>
  <Disclosure  as="header" class="bg-white shadow">
    <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8">
      <div class="relative h-16 flex justify-between">
        <div>
            <h1 class="title-font text-green-400">Note Taker</h1>
        </div>
        <div class="relative z-10 flex items-center lg:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton class="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-green-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
            <span class="sr-only">Open menu</span>
            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
      </div>
      <nav class="hidden lg:py-2 lg:flex lg:space-x-8" >
        <a  @click="router.push(item.href)" v-for="item in navigation"  :class="[item.current ? 'bg-green-100 text-green-600' : 'text-green-600 hover:bg-gray-100 hover:text-green-600', 'rounded-md py-2 px-3 inline-flex items-center text-sm font-medium']" :aria-current="item.current ? 'page' : undefined">
          {{ item.name }}
        </a>
          <a v-if="storeAuth.user.uid" @click="logOut" class="text-green-600 hover:bg-gray-100 hover:text-green-500 rounded-md py-2 px-3 inline-flex items-center text-sm font-medium" >
          Logout <span class="pl-3 text-green-900"> {{ storeAuth.user.email }}</span>
        </a>
      </nav>
    </div>
    <!-- Mobile Btns -->
    <template v-if="storeAuth.user.uid">
      <DisclosurePanel v-slot="{ close }"  as="nav" class="lg:hidden" aria-label="Global">
        <div  class="z-40 mobile-menu-layout pt-2 pb-3 px-2 space-y-1">
          <a  @click="mobileNavMenuCloser(item.href, close)" v-for="item in navigation" :key="item.name" as="a"  :class="[item.current ? 'bg-gray-100 text-gray-900' : 'text-green-500 hover:bg-gray-50 hover:text-green-600', 'block rounded-md py-2 px-3 text-base font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a>
          <a  v-if="storeAuth.user.uid" @click="logOut" class="block text-green-500 hover:bg-gray-50 hover:text-green-500 rounded-md py-2 px-3 items-center text-base font-medium" >
           Logout <span class="pl-3 text-green-900 "> {{ storeAuth.user.email }}</span>
        </a>
        </div>
      </DisclosurePanel>
      </template>
  </Disclosure>

</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { MenuIcon, XIcon } from '@heroicons/vue/outline'
import router from '../../router';
import { ref } from 'vue';
import { useStoreAuth } from '@/stores/storeAuth'

// Store
const storeAuth = useStoreAuth()

const navigation = [
  { name: 'Notes',href:'/'},
  { name: 'Stats',href:'/stats'}
]
// state for mobile menu
const open = ref(null)

// REF for nav menu when logged out
const navMenuOpener = ref(false)

// close mobile menu after href clicked
const mobileNavMenuCloser = (href,close) =>{
  router.push(href)
  close()
}

// logout
const logOut = () => {
  navMenuOpener.value = false
  console.log(navMenuOpener.value)
  storeAuth.logOutUser()
  storeAuth.setMenu(navMenuOpener.value)
}
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Rubik+Moonrocks&display=swap');

.title-font{
font-family: 'Rubik Moonrocks', cursive;
font-size: xx-large;
}

@media only screen and (max-width: 750px) {
  .mobile-menu-layout {
    background-color: white;
    position: absolute;
    border-bottom: 1.8px solid rgb(166, 166, 166);
    left: 0;
    width: 100%;
  }
}
</style>