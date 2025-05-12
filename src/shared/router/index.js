import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/store.js'
import CropsComponent from '../../soil/pages/Crops.component.vue'
import SignUpComponent from '../../security/pages/SignUp.component.vue'
import LoginComponent from '../../security/pages/Login.component.vue'
import WaterManagementComponent from '../../irrigation/pages/WaterManagement.component.vue'
import SystemComponent from '../../system/pages/System.component.vue'
import CropDetailComponent from '../../soil/pages/CropDetail.component.vue'
import WaterGraph from '../../irrigation/pages/WaterGraph.component.vue'
import WaterTanks from '../../irrigation/pages/WaterTanks.component.vue'
import RecommendedActions from '../../soil/pages/RecommendedActions.component.vue'

const routes = [
    { path: '/', redirect: '/crops' },
    { path: '/:pathMatch(.*)*', redirect: '/crops' },
    { path: '/login', component: LoginComponent },
    { path: '/signup', component: SignUpComponent },
    { path: '/crops', component: CropsComponent, meta: { requiresAuth: true } },
    { path: '/crops/:id', component: CropDetailComponent, meta: { requiresAuth: true } },
    { path: '/temperature/:id/actions', component: RecommendedActions, meta: { requiresAuth: true } },
    { path: '/humidity/:id/actions', component: RecommendedActions, meta: { requiresAuth: true } },
    { path: '/water', component: WaterManagementComponent, meta: { requiresAuth: true } },
    { path: '/water/graph', component: WaterGraph, meta: { requiresAuth: true } },
    { path: '/tanks', component: WaterTanks, meta: { requiresAuth: true } },
    { path: '/system', component: SystemComponent, meta: { requiresAuth: true }}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        if (store.getters.isAuthenticated) {
            next()
        } else {
            next('/login')
        }
    } else {
        next()
    }
});

export default router
