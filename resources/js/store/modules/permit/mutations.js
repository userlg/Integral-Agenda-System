export default {
    setInit(state) {
        state.create = false;
        state.read = false;
        state.update = false;
        state.deletePermit = false;
    },
    setCreate(state) {
        state.create = !state.create;
    },
    setRead(state) {
        state.read = !state.read;
    },
    setUpdate(state) {
        state.update = !state.update;
    },
    setDeletePermit(state) {
        state.deletePermit = !state.deletePermit;
    },/**/
    /*setLoader(state) {
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

    setName(state, name) {
        state.name = name;
    },
    setParameters(state, parameters) {
        state.parameters.data = parameters;
    },
    setShowParameters(state) {
        state.parameters.show = !state.parameters.show;
    },
    setShowdialogParameter(state) {
        state.dialogParameter = !state.dialogParameter;
    }
    */
}
