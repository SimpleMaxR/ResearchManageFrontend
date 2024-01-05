import {createRouter, createWebHistory} from "vue-router";
import { MainStore } from '../store/index'

const routes = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Layout',
            redirect: '/Dashboard',
            component: () => import('../layout/Layout.vue'),
            children: [
                {
                    path: '/Dashboard',
                    name: 'Dashboard',
                    component: () => import('../views/Dashboard.vue')
                },
                {
                    path: '/Labs',
                    name: 'Labs',
                    component: () => import('../views/Labs.vue')
                },
                {
                    path: '/Office',
                    name: 'Office',
                    component: () => import('../views/Office.vue')
                },
                {
                    path: '/Secretary',
                    name: 'Secretary',
                    component: () => import('../views/Secretary.vue')
                },
                {
                    path: '/Partners',
                    name: 'Partners',
                    component: () => import('../views/Partners.vue')
                },
                {
                    path: '/QM',
                    name: 'QM',
                    component: () => import('../views/QM.vue')
                },
                {
                    path: '/Clients',
                    name: 'Clients',
                    component: () => import('../views/Clients.vue')
                },
                {
                    path: '/Projects',
                    name: 'Projects',
                    component: () => import('../views/Projects.vue')
                },
                {
                    path: '/Researchers',
                    name: 'Researchers',
                    component: () => import('../views/Researchers.vue')
                },
                {
                    path: '/Achievements',
                    name: 'Achievements',
                    component: () => import('../views/Achievements.vue')
                },
                {
                    path: '/ProjectDetail',
                    name: 'ProjectDetail',
                    component: () => import('../views/ProjectDetail.vue')
                },
                {
                    path: '/test',
                    name: 'Test',
                    component: () => import('../components/LabQuickView.vue')
                }
            ]
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('../views/Login.vue')
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: () => import('../views/Login.vue')
        }
    ]
})

function forbiddenRoute() {
    console.log('forbiddenRoute')
    routes.push('/login')
}

routes.beforeEach((to, from, next) => {
    const store = MainStore()
    const isLogin = store.isLogin;
    if (to.path === '/login') {
        next();
    } else {
        isLogin ? next() : forbiddenRoute();
    }
})


export default routes;