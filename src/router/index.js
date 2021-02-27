import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/employees',
        name: 'Employees',
        component: () => import('../views/employee/Employees')
    },
        // country routs
    {
        path: '/countries',
        name: 'Countries',
        component: () => import('../views/country/Countries')
    },
    {
        path: '/new-country',
        name: 'New Country',
        component: () => import('../views/country/CreateCountry')
    },
    {
        path: '/edit-country',
        name: 'Update Country',
        component: () => import('../views/country/UpdateCountry')
    },

    // states routs
    {
        path: '/states',
        name: 'States',
        component: () => import('../views/state/States')
    },
    {
        path: '/states/new-state',
        name: 'New State',
        component: () => import('../views/state/NewStates')
    },
    {
        path: '/states/edit-state',
        name: 'Update State',
        component: () => import('../views/state/UpdateState')
    },

    // city routs
    {
        path: '/cities',
        name: 'Cities',
        component: () => import('../views/city/Cities')
    },
    {
        path: '/cities/new-city',
        name: 'New City',
        component: () => import('../views/city/NewCity')
    },
    {
        path: '/cities/edit-city',
        name: 'Update City',
        component: () => import('../views/city/UpdateCity')
    },

    // department routs
    {
        path: '/departments',
        name: 'Departments',
        component: () => import('../views/department/Departments')
    },
    {
        path: '/departments/new-department',
        name: 'New Department',
        component: () => import('../views/department/NewDepartment')
    },
    {
        path: '/departments/edit-department',
        name: 'Update Department',
        component: () => import('../views/department/UpdateDepartment')
    },


    // employee routs
    {
        path: '/employees',
        name: 'Employees',
        component: () => import('../views/employee/Employees')
    },
    {
        path: '/employees/new-employee',
        name: 'New Employee',
        component: () => import('../views/employee/NewEmployee')
    },
    {
        path: '/employees/edit-employee',
        name: 'Update Employee',
        component: () => import('../views/employee/UpdateEmployee')
    },

    // user routs
    {
        path: '/users',
        name: 'Users',
        component: () => import('../views/user/Users')
    },
    {
        path: '/users/new-user',
        name: 'New State',
        component: () => import('../views/user/NewUser')
    },
    {
        path: '/users/edit-user',
        name: 'Update State',
        component: () => import('../views/user/UpdateUser')
    },

    // auth routs
    {
        path: '/auth/login',
        name: 'Login',
        component: () => import('../views/auth/Login')
    },




]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
