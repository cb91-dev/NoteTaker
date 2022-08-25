import { createApp,markRaw } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './index.css'


// Creating pinia stores
const pinia = createPinia()

//  adding router to all stores
pinia.use(({ store }) => {
    store.router = markRaw(router)
  })

createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app')



