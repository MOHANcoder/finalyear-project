export const savePageToLocalStorage = store => next => action => {
    const result = next(action);
    const {page} = store.getState();
    if(action.type.startsWith('page/') && page.data.id !== undefined){
        localStorage.setItem(`page/${page.data.id}`,JSON.stringify(page.data));
    }
    return result;
}