import Vue from "vue";
import App from './app.vue';
import router from './plugins/router';
import ImageLazyLoad from "./components/ImageLazyLoad";
Vue.use(ImageLazyLoad, {
  fade: true,
  time: 300,
  preload: 500
})

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');