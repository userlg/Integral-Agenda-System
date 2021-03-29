/**
 * App Entry File
 * Vuely: A Powerfull Material Design Admin Template
 * Copyright 2018. All Rights Reserved
 * Created By: The Iron Network, LLC
 * Made with Love
 */
import 'babel-polyfill';
import Vue from 'vue'
import Vuetify from 'vuetify'
import * as VueGoogleMaps from 'vue2-google-maps'
import { Vue2Dragula } from 'vue2-dragula'
import VueQuillEditor from 'vue-quill-editor'
import wysiwyg from 'vue-wysiwyg'
import VueBreadcrumbs from 'vue2-breadcrumbs'
import VueResource from 'vue-resource'
import Notifications from 'vue-notification'
import velocity from 'velocity-animate'
import AmCharts from 'amcharts3'
import AmSerial from 'amcharts3/amcharts/serial'
import AmAngularGauge from 'amcharts3/amcharts/gauge'
import Nprogress from 'nprogress'
import VueI18n from 'vue-i18n'
import VueTour from 'vue-tour'
import fullscreen from 'vue-fullscreen'
import InstantSearch from 'vue-instantsearch'
import VueVideoPlayer from 'vue-video-player';
import Croppa from 'vue-croppa';
import axios from 'axios'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.use(axios)

// global components
import GlobalComponents from './globalComponents'

// app.vue
import App from './App'

// router
import router from './router'

// themes
import primaryTheme from './themes/primaryTheme';

// store
import { store } from './store/store';

// firebase
import './firebase'

// messages
import messages from './lang';

import AuthService from "./auth/AuthService";

const auth = new AuthService();
//axios configuration
const instance = axios.get({
    baseURL: process.env.MIX_URL,
    timeout: 1000,
	headers: {'X-Requested-With': 'XMLHttpRequest',
			  'X-CSRF-TOKEN':document.head.querySelector('meta[name="csrf-token"]').content,
			  'Authorization' : localStorage.getItem('user') === null ? null:"Bearer "+JSON.parse(localStorage.getItem('user')).api_token
	}
  });
  axios.defaults.headers.common['X-CSRF-TOKEN'] = document.head.querySelector('meta[name="csrf-token"]').content;


// navigation guards before each
router.beforeEach(async(to, from, next) => {
	axios.defaults.headers.common['Authorization'] =  localStorage.getItem('user') === null ? null:"Bearer "+JSON.parse(localStorage.getItem('user')).api_token;
	Nprogress.start()

	if (to.matched.some(record => record.meta.requiresAuth)) {
		// this route requires auth, check if logged in
		// if not, redirect to login page.
		if (localStorage.getItem('user') === null) {
			next({
				path: '/session/login',
				query: { redirect: to.fullPath }
			})
		} else {
			if(!auth.isTokenExpire())
			{
			localStorage.removeItem('user');
			next({
			path: '/session/login',
			query: { redirect: to.fullPath }
			})
			}
			var request = {url:to.path};
				await axios.post(process.env.MIX_URL+'/api/url/validate', request).then(function (response) {
					//console.log(response);
					next();
				  }).catch(function (error) {
					console.log(error.response.status);
					if(error.response.status == 401)
					{	localStorage.removeItem('user');
			next({
				path: '/session/login',
				query: { redirect: to.fullPath }
			})}
			if(error.response.status == 403)
			localStorage.removeItem('user');
				next({
					path: '/scm/pages/blank',
					query: { redirect: to.fullPath }
				})
		  if(error.response.status == 404)
		  console.log(error.response);
       /* next({
					path: '/scm/pages/blank1',
					query: { redirect: to.fullPath }
				})*/
			  });
		}
	} else {
		next() // make sure to always call next()!
	}
})

// navigation guard after each
router.afterEach((to, from) => {
	Nprogress.done()
	setTimeout(() => {
		const contentWrapper = document.querySelector(".v-content__wrap");
		if(contentWrapper !== null){
			contentWrapper.scrollTop = 0;
		}
		const boxedLayout = document.querySelector('.app-boxed-layout .app-content');
		if(boxedLayout !==  null){
			boxedLayout.scrollTop = 0;
		}
		const miniLayout = document.querySelector('.app-mini-layout .app-content');
		if(miniLayout !== null){
			miniLayout.scrollTop = 0;
		}
	}, 200);
})



// plugins
Vue.use(Vuetify, {
	theme: store.getters.selectedTheme.theme
});
Vue.use(InstantSearch);
Vue.use(VueI18n)
Vue.use(AmCharts)
Vue.use(AmSerial)
Vue.use(VueTour)
Vue.use(AmAngularGauge)
Vue.use(Vue2Dragula)
Vue.use(VueQuillEditor)
Vue.use(VueResource)
Vue.use(wysiwyg, {})
Vue.use(VueBreadcrumbs)
Vue.use(Notifications, { velocity })
Vue.use(fullscreen);
Vue.use(GlobalComponents);
Vue.use(VueVideoPlayer);
Vue.use(Croppa);
Vue.use(VueGoogleMaps, {
	load: {
		key: 'AIzaSyBtdO5k6CRntAMJCF-H5uZjTCoSGX95cdk' // Add your here your google map api key
	}
})

// Create VueI18n instance with options
const i18n = new VueI18n({
	locale: store.getters.selectedLocale.locale, // set locale
	messages, // set locale messages
})

/* eslint-disable no-new */
new Vue({
	store,
	i18n,
	router,
	render: h => h(App),
	components: { App }
}).$mount('#app')
