import axios from 'axios'
import router from '../../../router'
import lang from '../../../lang'
import sigla from '../settings'
export default {
  postRole({ commit, state })
  {

    commit('setIndeterminate', true);
  axios.post(process.env.MIX_URL+'/api/role/create',  {
      name: state.name
    })
    .then(response => {
      commit('setSnackBar', true);
      commit('setIndeterminate', false);
      commit('setName', '');
  }).catch(e => {
    commit('setSnackBar', false);
    commit('setIndeterminate', false);
   })
  },
  async getRoles({commit}){
    commit('setLoader');
		let datos = await axios.get(process.env.MIX_URL+'/api/role/list')
    commit('setItems', datos);
    commit('setLoader');

		},
    savePermit({commit,state}){
      var id_role = router.history.current.params.role_id;
      var permit_aux = [];
      state.permit.forEach((item)=>{
        var aux = item.split("-");
        permit_aux.push({"value":aux[1],"module_id":aux[0]});
      });
      var role_permit = {
          "role_id":id_role,
          "permits": permit_aux
      };
      axios.post(process.env.MIX_URL+'/api/permit/post', {id_role,permit_aux})
      .then(response => {
        commit('setSnackBar', true);
        commit('setIndeterminate', false);
      })
      .catch(e =>  {
        commit('setSnackBar', false);
        commit('setIndeterminate', false);
      });
    },
    async getRoleIdEdit({commit, state}){
      var id = router.history.current.params.role_id;
      var data = await axios.get(process.env.MIX_URL+'/api/permit/get/'+id);
      /* translate section */
      var location = sigla.state.selectedLocale.locale;
      data = data.data.response.modules.map((item)=>{
        return item;
      });

      for (let index = 0; index < Array.from(data).length; index++) {
        data[index].parent = lang[location].message[String(data[index].parent)];
        var childAux = data[index].child
        for (let indexChild = 0; indexChild < Array.from(childAux).length; indexChild++) {
          console.log(childAux[indexChild]);
          data[index].child[indexChild].name = lang[location].message[String(childAux[indexChild].name)];
        }
      }
      /* --------------- */
      data.forEach(element => {
        element.child =element.child.filter((modul)=>{
          return modul.id != 6 && modul.id != 7;
        });
      });
      commit('setTest', data);
        var permits=[];
        state.test.forEach((aux)=>{
          aux.child.forEach((aux_child)=>{
              aux_child.permits.forEach((aux_child_permits)=>{
                permits.push(aux_child.id+"-"+aux_child_permits);
              });
          });
        });
        commit('setPermit', permits);
		},
	async getRoleId({commit}, props){
    commit('setLoader');

		var id = props.item.id ;
		//let datos = await axios.get(process.env.MIX_URL+'/api/permit/get/'+id)
		//this.$router.push( { path: `/default/edit_role/${id}` } );
		router.push({ name: 'edit_role', params: { role_id: id }});
		//this.items = datos
		commit('setLoader');
		//console.log(id);
		},

	deleteRole({commit, dispatch },props){
		var id = props.item.id;

		 // console.log(process.env.MIX_URL);
		axios.post(process.env.MIX_URL+'/api/delete_role', {
      	id: props.item.id
    	})
		.then(response => {
      commit('setSnackBar', true);
      commit('setIndeterminate', false);
      dispatch('getRoles');
		})
    	.catch(e => {
      commit('setSnackBar', false);
      commit('setIndeterminate', false);
   		})
      },


}
