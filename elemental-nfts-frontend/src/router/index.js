import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeComponent from '../views/Home.vue'
import CreateComponent from '@/components/Element/Create';
import MyLab from '@/components/Element/MyLab';
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: 'home' }
  },
  {
    path: '/home',
    name: 'home',
    component: HomeComponent
  },
  {
    path: '/create',
    name: 'create',
    component: CreateComponent
  },
  {
    path: '/my-lab',
    name: 'my-lab',
    component: MyLab

  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
