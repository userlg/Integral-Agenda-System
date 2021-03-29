// Sidebar Routers
import axios from 'axios';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['X-CSRF-TOKEN'] = document.head.querySelector('meta[name="csrf-token"]').content;
if(localStorage.getItem('user') === null){

}else{
	axios.defaults.headers.common['Authorization'] = "Bearer "+JSON.parse(localStorage.getItem('user')).api_token;
}

async function getRoleMenu(){
	var data=[];
	var resp=await axios.get(process.env.MIX_URL+'/api/role/menu/list' ).then(function (response) {
		//console.log(response.data);
		return response.data;

	}).catch(function (error) {console.log(error);})
	resp=await Promise.resolve(resp)
	await resp.forEach(element => {
		data.push(element);
	});
	//console.log("data::"+data);
	return data;
};


export const menus = {

	'message.general': getRoleMenu()/* [
		{
			action: 'zmdi-home',
			title: 'Company',
			active: false,
			items: [
				{ title: 'Create Company', path: '/create_company' },
				{ title: 'List Companies', path: '/list_companies' },
			]
		},
		{
			action: 'zmdi-calendar',
			title: 'Calendar',
			active: false,
			label: 'Old',
			items: [
				{ title: 'message.ecommerce', path: '/default/dashboard/ecommerce', exact: true,label: 'Old' },
				{ title: 'message.webAnalytics', path: '/mini/dashboard/web-analytics', exact: true,label: 'Old' },
				{ title: 'message.magazine', path: '/horizontal/dashboard/magazine', exact: true,label: 'Old' },
				{ title: 'message.news', path: '/boxed-v2/dashboard/news', exact: true,label: 'Old' },
				{ title: 'message.agency', path: '/boxed/dashboard/agency', exact: true,label: 'Old' },
				{ title: 'message.saas', path: '/horizontal/dashboard/saas', exact: true,label: 'Old' }
			]
		},
		{
			action: 'zmdi-book',
			title: 'Property',
			active: false,
			label: 'New',
			items: [
				{ title: 'message.courses', path: '/courses',label: 'New',},
				{ title: 'message.coursesList', path:'/courses/courses-list',label: 'New'},
				{ title: 'message.courseDetail', path: '/courses/courses-detail',label: 'New' },
				{ title: 'message.signIn', path: '/courses/sign-in',label: 'New',},
				{ title: 'message.payment', path: '/courses/payment',label: 'New'}
			]
		},
		{
			action: 'zmdi-comments',
			title: 'SMS Sellers',
			active: false,
			label: 'Old',
			items: [
				{ title: 'message.user', path: '/widgets/user-widgets',label: 'Old' },
				{ title: 'message.charts', path: '/widgets/chart-widgets',label: 'Old'}
			]
		},
		{
			action: 'zmdi-shopping-cart',
			title: 'Buyers',
			active: false,
			label: 'Old',
			items: [
				{ title: 'message.shop', path: '/ecommerce/shop',label: 'Old' },
				{ title: 'message.cart', path: '/ecommerce/cart',label: 'Old' },
				{ title: 'message.checkout', path: '/ecommerce/checkout',label: 'Old' },
				{ title: 'message.cards', path: '/ecommerce/cards',label: 'Old' }
			]
		},
		{
			action: 'zmdi-email',
			title: 'SMS Buyers',
			active: false,
			label: 'Old',
			items: [
				{ title: 'message.blog', path: '/pages/blog',label: 'Old' },
				{ title: 'message.gallery', path: '/pages/gallery',label: 'Old' },
				{ title: 'message.pricing1', path: '/pages/pricing-1',label: 'Old'},
				{ title: 'message.pricing2', path: '/pages/pricing-2',label: 'Old'},
				{ title: 'message.blank', path: '/pages/blank',label: 'Old' }
			]
		},
		{
			action: 'zmdi-wrench',
			title: 'Tools',
			active: false,
			label: 'Old',
			items: [
				{ title: 'message.signUp', path: '/session/sign-up', exact: true ,label: 'Old'},
				{ title: 'message.login', path: '/session/login', exact: true,label: 'Old' },
				{ title: 'message.lockScreen', path: '/session/lock-screen', exact: true ,label: 'Old'},
				{ title: 'message.forgotPassword', path: '/session/forgot-password', exact: true ,label: 'Old'},
				{ title: 'message.resetPassword', path: '/session/reset-password', exact: true ,label: 'Old'}
			]
		}
	],
	// 	{
	// 		action: 'zmdi-view-dashboard',
	// 		title: 'message.dashboard',
	// 		active: true,
	// 		label: 'Old',
	// 		items: [
	// 			{ title: 'message.ecommerce', path: '/default/dashboard/ecommerce', exact: true,label: 'Old' },
	// 			{ title: 'message.webAnalytics', path: '/mini/dashboard/web-analytics', exact: true,label: 'Old' },
	// 			{ title: 'message.magazine', path: '/horizontal/dashboard/magazine', exact: true,label: 'Old' },
	// 			{ title: 'message.news', path: '/boxed-v2/dashboard/news', exact: true,label: 'Old' },
	// 			{ title: 'message.agency', path: '/boxed/dashboard/agency', exact: true,label: 'Old' },
	// 			{ title: 'message.saas', path: '/horizontal/dashboard/saas', exact: true,label: 'Old' }
	// 		]
	// 	},
	// 	{
	// 		action: 'zmdi-book',
	// 		title: 'message.courses',
	// 		active: false,
	// 		label: 'New',
	// 		items: [
	// 			{ title: 'message.courses', path: '/courses',label: 'New',},
	// 			{ title: 'message.coursesList', path:'/courses/courses-list',label: 'New'},
	// 			{ title: 'message.courseDetail', path: '/courses/courses-detail',label: 'New' },
	// 			{ title: 'message.signIn', path: '/courses/sign-in',label: 'New',},
	// 			{ title: 'message.payment', path: '/courses/payment',label: 'New'}
	// 		]
	// 	},
	// 	{
	// 		action: 'zmdi-widgets',
	// 		title: 'message.widgets',
	// 		active: false,
	// 		label: 'Old',
	// 		items: [
	// 			{ title: 'message.user', path: '/widgets/user-widgets',label: 'Old' },
	// 			{ title: 'message.charts', path: '/widgets/chart-widgets',label: 'Old'}
	// 		]
	// 	},
	// 	{
	// 		action: 'zmdi-shopping-cart',
	// 		title: 'message.ecommerce',
	// 		active: false,
	// 		label: 'Old',
	// 		items: [
	// 			{ title: 'message.shop', path: '/ecommerce/shop',label: 'Old' },
	// 			{ title: 'message.cart', path: '/ecommerce/cart',label: 'Old' },
	// 			{ title: 'message.checkout', path: '/ecommerce/checkout',label: 'Old' },
	// 			{ title: 'message.cards', path: '/ecommerce/cards',label: 'Old' }
	// 		]
	// 	},
	// 	{
	// 		action: 'zmdi-file-plus',
	// 		title: 'message.pages',
	// 		active: false,
	// 		label: 'Old',
	// 		items: [
	// 			{ title: 'message.blog', path: '/pages/blog',label: 'Old' },
	// 			{ title: 'message.gallery', path: '/pages/gallery',label: 'Old' },
	// 			{ title: 'message.pricing1', path: '/pages/pricing-1',label: 'Old'},
	// 			{ title: 'message.pricing2', path: '/pages/pricing-2',label: 'Old'},
	// 			{ title: 'message.blank', path: '/pages/blank',label: 'Old' }
	// 		]
	// 	},
	// 	{
	// 		action: 'zmdi-time',
	// 		title: 'message.session',
	// 		active: false,
	// 		label: 'Old',
	// 		items: [
	// 			{ title: 'message.signUp', path: '/session/sign-up', exact: true ,label: 'Old'},
	// 			{ title: 'message.login', path: '/session/login', exact: true,label: 'Old' },
	// 			{ title: 'message.lockScreen', path: '/session/lock-screen', exact: true ,label: 'Old'},
	// 			{ title: 'message.forgotPassword', path: '/session/forgot-password', exact: true ,label: 'Old'},
	// 			{ title: 'message.resetPassword', path: '/session/reset-password', exact: true ,label: 'Old'}
	// 		]
	// 	}
	// ],
	// 'message.modules': [
	// 	{
	// 		action: 'zmdi-email',
	// 		title: 'message.inbox',
	// 		active: false,
	// 		items: null,
	// 		path: '/inbox',
	// 		label: 'Old'
	// 	},
	// 	{
	// 		action: 'zmdi-comments',
	// 		title: 'message.chat',
	// 		active: false,
	// 		items: null,
	// 		path: '/chat',
	// 		label: 'Old',
	// 	}
	// ],
	// 'message.components': [
	// 	{
	// 		action: 'zmdi-wrench',
	// 		title: 'message.uiElements',
	// 		active: false,
	// 		label: 'New',
	// 		items: [
	// 			{ title: 'message.groups', path: '/ui-elements/groups',label: 'New' },
	// 			{ title: 'message.buttons', path: '/ui-elements/buttons',label: 'Old' },
	// 			{ title: 'message.cards', path: '/ui-elements/cards',label: 'Old'},
	// 			{ title: 'message.checkbox', path: '/ui-elements/checkbox' ,label: 'Old'},
	// 			{ title: 'message.carousel', path: '/ui-elements/carousel' ,label: 'Old'},
	// 			{ title: 'message.chips', path: '/ui-elements/chips' ,label: 'Old'},
	// 			{ title: 'message.datepicker', path: '/ui-elements/datepicker',label: 'Old' },
	// 			{ title: 'message.dialog', path: '/ui-elements/dialog' ,label: 'Old'},
	// 			{ title: 'message.grid', path: '/ui-elements/grid',label: 'Old' },
	// 			{ title: 'message.hover', path: '/ui-elements/hover',label: 'Old' },
	// 			{ title: 'message.images', path: '/ui-elements/images',label: 'Old' },
	// 			{ title: 'message.input', path: '/ui-elements/input',label: 'Old' },
	// 			{ title: 'message.list', path: '/ui-elements/list',label: 'Old' },
	// 			{ title: 'message.menu', path: '/ui-elements/menu' ,label: 'Old'},
	// 			{ title: 'message.progress', path: '/ui-elements/progress' ,label: 'Old'},
	// 			{ title: 'message.ratings', path: '/ui-elements/ratings',label: 'Old' },
	// 			{ title: 'message.radio', path: '/ui-elements/radio',label: 'Old' },
	// 			{ title: 'message.select', path: '/ui-elements/select',label: 'Old' },
	// 			{ title: 'message.slider', path: '/ui-elements/slider',label: 'Old' },
	// 			{ title: 'message.snackbar', path: '/ui-elements/snackbar',label: 'Old' },
	// 			{ title: 'message.tabs', path: '/ui-elements/tabs',label: 'Old' },
	// 			{ title: 'message.toolbar', path: '/ui-elements/toolbar',label: 'Old' },
	// 			{ title: 'message.tooltip', path: '/ui-elements/tooltip',label: 'Old' },
	// 			{ title: 'message.timepicker', path: '/ui-elements/timepicker',label: 'Old' }
	// 		]
	// 	},
	// 	{
	// 		action: 'zmdi-format-list-bulleted',
	// 		title: 'message.treeview',
	// 		active: false,
	// 		items: null,
	// 		path: '/treeview',
	// 		label:'New',
	// 	},
	// 	{
	// 		action: 'zmdi-time',
	// 		title: 'message.timelines',
	// 		active: false,
	// 		label:'New',
	// 		items: [
	// 			{ title: 'message.usage', path: '/timelines/usage',label:'New' },
	// 			{ title: 'message.smallDots', path: '/timelines/smalldots',label:'New'},
	// 			{ title: 'message.iconDots', path: '/timelines/icondots',label:'New'},
	// 			{ title: 'message.coloredDots', path: '/timelines/coloreddots',label:'New'},
	// 			{ title: 'message.oppositeSlot', path: '/timelines/oppositeslot',label:'New'},
	// 			{ title: 'message.denseAlert', path: '/timelines/densealert',label:'New'},
	// 			{ title: 'message.advanced', path: '/timelines/advanced',label:'New'}
	// 		]
	// 	},
	// 	{
	// 		action: 'zmdi-file-text',
	// 		title: 'message.forms',
	// 		active: false,
	// 		label:'Old',
	// 		items: [
	// 			{ title: 'message.formValidation', path: '/forms/form-validation',label: 'Old' },
	// 			{ title: 'message.stepper', path: '/forms/stepper',label: 'Old' }
	// 		]
	// 	},
	// 	{
	// 		action: 'zmdi-chart-donut',
	// 		title: 'message.charts',
	// 		active: false,
	// 		label:'Old',
	// 		items: [
	// 			{ title: 'message.vueChartjs', path: '/charts/vue-chartjs',label:'Old'},
	// 			{ title: 'message.vueEcharts', path: '/charts/vue-echarts',label:'Old'}
	// 		]
	// 	},
	// 	{
	// 		action: 'zmdi-flag',
	// 		title: 'message.icons',
	// 		active: false,
	// 		label:'Old',
	// 		items: [
	// 			{ title: 'message.themify', path: '/icons/themify',label:'Old' },
	// 			{ title: 'message.material', path: '/icons/material',label:'Old'}
	// 		]
	// 	},
	// 	{
	// 		action: 'zmdi-grid',
	// 		title: 'message.tables',
	// 		active: false,
	// 		label:'Old',
	// 		items: [
	// 			{ title: 'message.standard', path: '/tables/standard',label:'Old'},
	// 			{ title: 'message.slots', path: '/tables/slots',label:'Old'},
	// 			{ title: 'message.selectable', path: '/tables/selectablerows',label:'Old'},
	// 			{ title: 'message.searchRow', path: '/tables/searchwithtext',label:'Old'}
	// 		]
	// 	},
	// 	{
	// 		action: 'zmdi-map',
	// 		title: 'message.maps',
	// 		active: false,
	// 		label:'Old',
	// 		items: [
	// 			{ title: 'message.googleMaps', path: '/maps/google-maps',label:'Old'},
	// 			{ title: 'message.leafletMaps', path: '/maps/leaflet-maps',label:'Old'},
	// 			{ title: 'message.jvectorMap', path: '/maps/jvector-map',label:'Old'}
	// 		]
	// 	}
	// ],
	// 'message.applications': [
		// {
		// 	action: 'zmdi-accounts',
		// 	title: 'message.users',
		// 	active: false,
		// 	label:'Old',
		// 	items: [
		// 		{ title: 'message.userProfile', path: '/users/user-profile',label:'Old'},
		// 		{ title: 'message.usersList', path: '/users/users-list',label:'Old'}
		// 	]
		// },
	// 	{
	// 		action: 'zmdi-calendar-note',
	// 		title: 'message.calendar',
	// 		active: false,
	// 		items: null,
	// 		path: '/calendar',
	// 		label:'Old',
	// 	}
	// ],
	// 'message.features': [
	// 	{
	// 		action: 'zmdi-edit',
	// 		title: 'message.editor',
	// 		active: false,
	// 		label:'Old',
	// 		items: [
	// 			{ title: 'message.quillEditor', path: '/editor/quilleditor',label:'Old'},
	// 			{ title: 'message.wYSIWYG', path: '/editor/wysiwyg',label:'Old'}
	// 		]
	// 	},
	// 	{
	// 		action: 'zmdi-mouse',
	// 		title: 'message.dragAndDrop',
	// 		active: false,
	// 		label:'Old',
	// 		items: [
	// 			{ title: 'message.vue2Dragula', path: '/drag-drop/vue2dragula',label:'Old'},
	// 			{ title: 'message.vueDraggable', path: '/drag-drop/vuedraggable',label:'Old'},
	// 			{ title: 'message.draggableResizeable', path: '/drag-drop/vuedraggableresizeable',label:'Old'}
	// 		]
	// 	}
	// ],
	// 'message.extensions': [
	// 	{
	// 		action: 'zmdi-crop',
	// 		title: 'message.imageCropper',
	// 		active: false,
	// 		items: null,
	// 		path: '/image-cropper',
	// 		label:'Old'
	// 	},
	// 	{
	// 		action: 'zmdi-collection-video',
	// 		title: 'message.videoPlayer',
	// 		active: false,
	// 		items: null,
	// 		path: '/video-player',
	// 		label:'Old'
	// 	},
	// 	{
	// 		action: 'zmdi-dropbox',
	// 		title: 'message.dropzone',
	// 		active: false,
	// 		items: null,
	// 		path: '/dropzone',
	// 		label:'Old'
	// 	}
	// ]*/
}
