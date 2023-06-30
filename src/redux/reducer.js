import {ADD_TASK, RERENDER} from "./action"

const initialState = JSON.parse(localStorage.getItem("taskList"))||[]

export const reducer = (state=initialState,action) => {
    const {type,payload} = action;

    switch(type){
        case ADD_TASK:
            return(
                [...state,payload]
            )
        case RERENDER:
            return(
                state = JSON.parse(localStorage.getItem("taskList"))
            )
        default:
            return(
                state
            )
    }
}