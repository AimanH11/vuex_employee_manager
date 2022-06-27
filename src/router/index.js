import Vue from 'vue'
import VueRouter from 'vue-router'
import Employee from '../views/Employee.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Employees',
    component: Employee
  },
  {
    path: '/employees/create',
    name: 'Create',
    component: () => import('../views/EmployeeCreate.vue')
  },
  {
    path: '/employees/edit/:id',
    name: 'Edit',
    component: () => import('../views/EmployeeEdit.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
