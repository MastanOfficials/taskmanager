export const ADD_TASK = "ADD_TASk";
export const RERENDER = "RERENDER";

export const onAddTask = (payload) => ({
    type:ADD_TASK,
    payload
})

export const reRender = () => ({
    type:RERENDER,
})