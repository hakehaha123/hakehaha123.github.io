import Vue from "vue";
import Router from "vue-router";
import Page1 from '../pages/Page1.vue';
Vue.use(Router);

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/page1',
        name: 'Page1',
        component: Page1,
      },
      {
        path: '/page2',
        name: 'Page2',
        component: () => import("../pages/Page2.vue")
      },
      {
        path: '/page3',
        name: 'Page3',
        component: () => import("../pages/Page3.vue")
      },
      {
        path:"/",
        redirect:"/page1"
      },
    ]
})
