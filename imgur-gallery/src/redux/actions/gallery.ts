import * as type from "../types";
import {GALLERY_ENDPOINT} from "../../api/endpoints";
import api from "../../api/api";
import {GALLERY_HOT} from "../../api/responses";

export const fetchGallery =
    (section: string, viral: boolean, sort: string, window: string) =>
        async (dispatch: (arg0: { type: string; payload: object }) => void) => {
            dispatch({ type: type.IS_FETCHING_GALLERY, payload: {} });
            const url = `${GALLERY_ENDPOINT}${section}${sort}${window}`;
            await api
                .get(`${url}?showViral=${viral}`)
                .then((response: any) =>
                    dispatch({ type: type.IS_FETCHING_GALLERY_COMPLETED, payload: response.data })
                )
                .catch(() => dispatch({ type: type.IS_FETCHING_GALLERY_FAILED, payload: GALLERY_HOT.data }));
};