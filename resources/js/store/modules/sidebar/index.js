/**
 * Sidebar Module
 */
import axios from 'axios';
import { menus } from './data.js';

const state = {
    menus,
    search:''
}

const getters = {
    menus: state => {
        return state.menus;
    }
}

const actions = {
    setActiveMenuGroup(context, payload) {
        context.commit('setActiveMenuGroupHandler', payload);
    },
    
      async getRoleMenu(context){ 
              axios.defaults.headers.common['Authorization'] = "Bearer "+JSON.parse(localStorage.getItem('user')).api_token;
      var data=[];
      var resp=await axios.get(process.env.MIX_URL+'/api/role/menu/list' ).then(function (response) {
          return response.data;
  
      }).catch(function (error) {console.log(error);})
      resp=await Promise.resolve(resp)
      await resp.forEach(element => {
          data.push(element);
      });
     
      return data;
  }
}

const mutations = {
    setSearch(state, search){
        state.search=search;
    },
    setActiveMenuGroupHandler(state, router) {
        let fullPath = '';
        if(router.pathURL){
            fullPath = router.pathURL;
        }else{
            fullPath = router.history.current.fullPath;
        }
        let path = fullPath.split('/');
        let matchedPath = '/' + path[2] + '/' + path[3];
        for (const category in state.menus) {
            for(const menuGroup in state.menus[category]) {
                if(state.menus[category][menuGroup].items !== null) {
                    for(const matched in state.menus[category][menuGroup].items){
                        if(state.menus[category][menuGroup].items[matched].path == matchedPath || state.menus[category][menuGroup].items[matched].path == fullPath ){
                           state.menus[category][menuGroup].active = true;
                        }
                    }
                }
            }
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}