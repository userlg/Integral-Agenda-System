export default {
    setTest(state, test) {
        state.test = test;
    },
    setUser(state, user) {
        state.user = user;
    },
    setPermit(state, permit) {
        state.permit = permit;
    },
    setLoader(state) {
        state.loader = !state.loader;
    },
    setIndeterminate(state,value) {
        state.indeterminate = value;
    },
    setSnackBar(state, value) {
        state.snackbarStatus.status = true;
        if(value == true){
            state.snackbarStatus.color = "success";
            state.snackbarStatus.text = "Success!!";
        }else{
            state.snackbarStatus.color = "error";
            state.snackbarStatus.text = "Error!!";
        }
    },
    setItems(state, items) {
        state.items = items;
    },
    setItemsRole(state, items) {
        state.items_role = items;
    },

    setName(state, name) {
        state.name = name;
    },
    
}