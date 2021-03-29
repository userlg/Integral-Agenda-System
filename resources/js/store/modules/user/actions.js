import axios from 'axios'
import router from '../../../router'
export default {
  async getUsers({commit}){
    commit('setLoader');
		let datos = await axios.get(process.env.MIX_URL+'/api/list_users')
    commit('setItems', datos);
		commit('setLoader');

		},
		
		deleteUser({commit, dispatch}, props){
		var id = props.item.id;
		 // console.log(process.env.MIX_URL);
		axios.post(process.env.MIX_URL+'/api/delete_user', {
      	id: props.item.id
    	})
		.then(response => {
      	commit('setSnackBar', true);
      	commit('setIndeterminate', false);	
      	dispatch('getUsers');
		})
    	.catch(e => {
        commit('setSnackBar', false);
        commit('setIndeterminate', false);		  
   		})
	  },
	  async getRoles({commit, state}){
		commit('setLoader');
		await axios.get(process.env.MIX_URL+'/api/role/list')
		.then( (response) => {
			
			commit('setItemsRole', response.data);
			commit('setLoader');
			})
		.catch(e => {
			commit('setSnackBar', false);
			commit('setIndeterminate', false);	
			commit('setLoader');
		   })
	},

	async getUserId({commit, state}){
		var id = router.history.current.params.id;
		await axios.get(process.env.MIX_URL+'/api/edit_user/'+id)
		.then( (response) => {
			commit('setUser', response.data[0]);
			})
		.catch(e => {
			commit('setSnackBar', false);
			commit('setIndeterminate', false);	
		   })
	},

		async updateUser({commit, state}){
		
				axios.put(process.env.MIX_URL+'/api/update_user',  {
						id: state.user.id,
						name: state.user.name,
						email: state.user.email,
						password: state.user.password,
						role_id: state.user.role_id,
					})
				.then( (response) => {
					commit('setSnackBar', true);
					commit('setIndeterminate', false);	
					commit('setUser',{});
					router.push('/scm/tools/list_users');
						})
				.catch(e => {
					commit('setSnackBar', false);
					commit('setIndeterminate', false);	
			})
	},

   

}