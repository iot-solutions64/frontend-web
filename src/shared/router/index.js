import { createRouter, createWebHistory } from 'vue-router'
import CropsComponent from '../../soil/pages/Crops.component.vue'
import SignUpComponent from '../../security/pages/SignUp.component.vue'
import LoginComponent from '../../security/pages/SignIn.component.vue'
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
import {authenticationGuard} from "@/security/services/authentication.guard.js";

const routes = [
    { path: '/', redirect: '/crops' },
    { path: '/login', component: LoginComponent },
    { path: '/signup', component: SignUpComponent },
    { path: '/crops', component: CropsComponent },
    { path: '/crops/:id', component: CropDetailComponent },
    { path: '/crops/:id/short-history', component: CropHistoryComponent },
    { path: '/crops/:id/history', component: CropHistoryComponent },
    { path: '/temperature/:id/actions', component: RecommendedActionsComponent},
    { path: '/humidity/:id/actions', component: RecommendedActionsComponent},
    { path: '/water', component: WaterManagementComponent},
    { path: '/water/graph', component: WaterGraphComponent},
    { path: '/tanks', component: WaterTanksComponent},
    { path: '/systems', component: SystemsComponent},
    { path: '/systems/:id', component: SystemDetailComponent},
    { path: '/systems/add', component: AddSystemComponent},
    { path: '/systems/:id/edit', component: EditSystemComponent},
    { path: '/:pathMatch(.*)*', redirect: '/login' }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

router.beforeEach((to, from, next) => {
    authenticationGuard(to, from, next);
});

export default router;
