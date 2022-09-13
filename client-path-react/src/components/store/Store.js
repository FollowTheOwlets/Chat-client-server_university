import { configureStore } from '@reduxjs/toolkit'

function reducer(state, action) {
    switch (action.type) {
        case "normal":
            return {id: "", title: ""};
        case "apply":
            return {title: action.title, id: action.id};
        default:
            return state;
    }
}

const store = configureStore({
    reducer: reducer,
});

store.dispatch({type: "normal"});

export default store;