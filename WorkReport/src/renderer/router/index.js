import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'edit-page',
      component: require('@/pages/Edit').default
    },
    {
      path: '/setting',
      name: 'setting-page',
      component: require('@/pages/Setting').default
    },
    {
      path: '/report',
      name: 'report-page',
      component: require('@/pages/Report').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})