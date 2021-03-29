import axios from 'axios'

export default {
    async getPermitByRoleModule({ commit },id)
    {
      commit("setInit");
      await axios.get(process.env.MIX_URL+'/api/role/module/'+id)
      .then( (response) => {
        var getPermit = response.data;
        getPermit.forEach((aux)=>{
        switch (aux.value) {
          case 1:
            //this.create = true;
            commit("setCreate");
            break;
          case 2:
            //this.read = true;
            commit("setRead");
            break;
          case 3:
            //this.update = true;
            commit("setUpdate");
            break;
          case 4:
            //this.deletePermit = true;
            commit("setDeletePermit");
            break;
          default:
            console.log('Error');
        }
        }); //console.log(getPermit);
      });
    },
    async getParameters({ commit }, name)
    {
      commit("setName", name);
      commit('setIndeterminate', true);
      await axios.get(process.env.MIX_URL+'/api/list_parameters/'+name) .then(function (response) {

        commit('setParameters', response.data);
        commit('setIndeterminate', false);
      })
      .catch(function (error) {
        console.log(error);
        commit('setIndeterminate', false);
      }).finally(function () {
        commit("setShowParameters");
        commit('setIndeterminate', false);
      })


    },
    async UpdatetParameters({ commit, state }, data)
    {

      console.log(data);
      var request = {name:state.name, id:data.id, unicost:data.unicost};
      console.log(request);
     await  axios.post(process.env.MIX_URL+'/api/change_parameter', request) .then(function (response) {
        commit('setParameters', response.data);
      })
      .catch(function (error) {
        console.log(error);
      }).finally(function () {
        commit("setShowdialogParameter");
      })


    },
    postCompany({ commit, state })
    {
      commit('setIndeterminate', true);
      axios.post(process.env.MIX_URL+'/api/create_company', {name:state.name})
      .then(function (response) {
        commit('setSnackBar', true);
        commit('setIndeterminate', false);
      })
      .catch(function (e) {
          console.log(e.response);
          commit('setSnackBar', false);
          commit('setIndeterminate', false);
      })
      .finally(function () {
        commit('setLoader');
      });
    },

}
