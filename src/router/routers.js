import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";

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
                    component: () => import('../views/Labs.vue')
                }
            ]
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('../views/Login.vue')
        },
        {
            path:'/:pathMatch(.*)*',
            name:'NotFound',
            component: () => import('../views/Login.vue')
        }
    ]
})

function forbiddenRoute() {
    console.log('forbiddenRoute')
    next('/login')
}

routes.beforeEach((to, from, next) => {
    const isLogin = localStorage.getItem('token') ? true : false;
    if (to.path == '/login') {
        next();
    } else {
        isLogin ? next() : forbiddenRoute();
    }
})



export default routes;