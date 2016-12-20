import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App';
import VueRouter from 'vue-router';
import routes from './router/routes';
import VueResource from 'vue-resource';

import './common/css/base.styl';
import './common/css/iconfont.css';
import 'element-ui/lib/theme-default/index.css';

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(VueResource);
// vue-resource模拟html表单
Vue.http.options.emulateJSON = true;

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
  next();
});

new Vue({
	render: h => h(App),
	router
}).$mount('#app');

