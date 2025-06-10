import { createRouter, createWebHistory } from 'vue-router'
import store from '../../security/services/authentication.store.old.js'
import CropsComponent from '../../soil/pages/Crops.component.vue'
import SignUpComponent from '../../security/pages/SignUp.component.vue'
import LoginComponent from '../../security/pages/Login.component.vue'
import WaterManagementComponent from '../../irrigation/pages/WaterManagement.component.vue'
import SystemsComponent from '../../system/pages/Systems.component.vue'
import CropDetailComponent from '../../soil/pages/CropDetail.component.vue'
import WaterGraphComponent from '../../irrigation/pages/WaterGraph.component.vue'
import WaterTanksComponent from '../../irrigation/pages/WaterTanks.component.vue'
import RecommendedActionsComponent from '../../soil/pages/RecommendedActions.component.vue'
import SystemDetailComponent from '../../system/pages/SystemDetail.component.vue'
import AddSystemComponent from '../../system/pages/AddSystem.component.vue'
import EditSystemComponent from '../../system/pages/EditSystem.component.vue'
import CropHistoryComponent from '../../soil/pages/CropHistory.component.vue'

const routes = [
    { path: '/', redirect: '/crops' },
    { path: '/:pathMatch(.*)*', redirect: '/crops' },
    { path: '/login', component: LoginComponent },
    { path: '/signup', component: SignUpComponent },
    { path: '/crops', component: CropsComponent, meta: { requiresAuth: true } },
    { path: '/crops/:id', component: CropDetailComponent, meta: { requiresAuth: true } },
    { path: '/crops/:id/short-history', component: CropHistoryComponent, meta: { requiresAuth: true } },
    { path: '/crops/:id/history', component: CropHistoryComponent, meta: { requiresAuth: true } },
    { path: '/temperature/:id/actions', component: RecommendedActionsComponent, meta: { requiresAuth: true } },
    { path: '/humidity/:id/actions', component: RecommendedActionsComponent, meta: { requiresAuth: true } },
    { path: '/water', component: WaterManagementComponent, meta: { requiresAuth: true } },
    { path: '/water/graph', component: WaterGraphComponent, meta: { requiresAuth: true } },
    { path: '/tanks', component: WaterTanksComponent, meta: { requiresAuth: true } },
    { path: '/systems', component: SystemsComponent, meta: { requiresAuth: true }},
    { path: '/systems/:id', component: SystemDetailComponent, meta: { requiresAuth: true } },
    { path: '/systems/add', component: AddSystemComponent, meta: { requiresAuth: true }},
    { path: '/systems/:id/edit', component: EditSystemComponent, meta: { requiresAuth: true } },
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
