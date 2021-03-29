import Vue from 'vue'
import Vuex from 'vuex'

// modules
import auth from './modules/auth';
import chat from './modules/chat';
import settings from './modules/settings';
import ecommerce from './modules/ecommerce';
import mail from './modules/mail';
import sidebar from './modules/sidebar';
import role from './modules/role';
import user from './modules/user';
import permit from './modules/permit';


Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        auth,
        chat,
        settings,
        ecommerce,
        mail,
        sidebar,
        role,
        user,
        permit
    }
})
