import * as type from "../types";
import {COMMENTS_ENDPOINT} from "../../api/endpoints";
import api from "../../api/api";
import {GALLERY_COMMENTS} from "../../api/responses";

export const fetchComments =
    (galleryID: string) =>
        async (dispatch: (arg0: { type: string; payload: object }) => void) => {
            dispatch({ type: type.IS_FETCHING_COMMENTS, payload: {} });
            const url = `${COMMENTS_ENDPOINT.replace(":galleryID", galleryID)}`;
            await api
                .get(url)
                .then((response: any) =>
                    dispatch({ type: type.IS_FETCHING_COMMENTS_COMPLETED, payload: response.data })
                )
                .catch(() => dispatch({ type: type.IS_FETCHING_COMMENTS_FAILED, payload: GALLERY_COMMENTS.data }));
        };