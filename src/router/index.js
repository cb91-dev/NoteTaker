import { createRouter, createWebHistory } from 'vue-router'
import PageNotes from '@/pages/PageNotes.vue'
import EditNotes from '@/pages/EditNotes.vue'
import Auth from '@/pages/Auth.vue'
import Stats from '@/pages/Stats.vue'
import { useStoreAuth } from '@/stores/storeAuth'

// Defining Routes for app
const routes = [
    {
        path:'/',
        name:'pages',
        component: PageNotes
    },
        {
        path:'/stats',
        name:'stats',
        component: Stats
    },
        {
        path:'/editNote/:id',
        name:'edit-note',
        component: EditNotes
    },
        {
        path:'/auth',
        name:'auth',
        component: Auth
    }
]

// config router for app
const router = createRouter({
    history: createWebHistory(),
    routes
})

// nav guards
router.beforeEach(async (to, from) => {
    const storeAuth = useStoreAuth()

    if(!storeAuth.user.uid && to.name !== 'auth'){
        return { name: 'auth'}
    }
    if(storeAuth.user.uid && to.name === 'auth'){
        return false
    }
  })

export default router