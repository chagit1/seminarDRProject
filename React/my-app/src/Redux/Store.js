import { produce } from 'immer';

import { createStore } from 'redux';

const reducer = produce((state, action) => {

    switch (action.type) {
       
        default:
            break;
    }

}, initialState)

//יצירת המחסן - מקבל את הרדיוסר
const store = createStore(reducer)
window.store = store;
export default store;