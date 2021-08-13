export default [
    {
        path: '/test',
        meta: {requireLogin: false},
        component: () => import(/* webpackChunkName: 'root' */ '@/views/test')
    },
    {
        path: '/redirect/:type',
        meta: {requireLogin: false},
        component: () => import(/* webpackChunkName: 'root' */ '@/views/redirect')
    },
    {
        path: '/account/validate',
        meta: {requireLogin: false},
        component: () => import(/* webpackChunkName: 'root' */ '@/views/account/validate')
    },
    {
        path: '/forget/password',
        meta: {requireLogin: false},
        component: () => import(/* webpackChunkName: 'root' */ '@/views/account/ForgetPwd')
    },
    {
        path: '/',
        meta: {requireLogin: false},
        component: () => import(/* webpackChunkName: 'root' */ '@/views/account/login/index')
    },
    {
        path: '/payService',
        meta: {requireLogin: false},
        component: () => import(/* webpackChunkName: 'root' */ '@/views/official/PayService')
    },
    {
        path: '/login',
        meta: {requireLogin: false},
        component: () => import(/* webpackChunkName: 'root' */ '@/views/account/login/index')
    },
    {
        path: '/login/platform',
        meta: {requireLogin: false},
        component: () => import(/* webpackChunkName: 'root' */ '@/views/account/login/platformLogin')
    },
    {
        path: '/home',
        meta: {requireLogin: true},
        component: () => import(/* webpackChunkName: 'root' */ '@/views/home'),
        children: [
            {
                path: '/',
                meta: {requireLogin: true},
                component: () => import(/* webpackChunkName: 'root' */ '@/views/project/my/index')
            },
            {
                path: 'member',
                meta: {requireLogin: true},
                component: () => import(/* webpackChunkName: 'root' */ '@/views/account/member')
            }
        ]
    }

]
