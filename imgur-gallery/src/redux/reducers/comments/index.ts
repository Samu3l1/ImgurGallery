import * as type from "../../types"
import {InitialStateType} from "../../../types";

const initialState: InitialStateType = {
    payload: [],
    isFetching: false,
    isError: false,
}

const comments = (state: InitialStateType = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case type.IS_FETCHING_COMMENTS:
            return {...state, isFetching: true};
        case type.IS_FETCHING_COMMENTS_COMPLETED:
            return {...state, isFetching: false, payload: action.payload}
        case type.IS_FETCHING_COMMENTS_FAILED:
            return {...state, isFetching: false, isError: true, payload: action.payload}
        default:
            return {...state};
    }
}

export default comments;