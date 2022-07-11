import {combineReducers} from "redux";
import gallery from "./gallery"
import comments from "./comments"

export default combineReducers({
    gallery: gallery,
    comments: comments,
});