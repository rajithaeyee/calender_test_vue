import Vue from 'vue'
import Router from 'vue-router'
import FullCalendar from './views/FullCalendar.vue'
import SyncfusionCalendar from './views/SyncfusionCalendar.vue';
import KendoCalendar from './views/KendoCalendar.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: FullCalendar
    },
    {
      path: '/SyncfusionCalendar',
      name: 'SyncfusionCalendar',
      component: SyncfusionCalendar
    }
  ]
})
