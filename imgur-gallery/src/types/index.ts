export type TagType = any;

export type ImageType = any;

export type GalleryType = {
    id: string,
    title: string,
    description: string,
    datetime: number,
    type: string,
    animated: boolean,
    width: number,
    height: number,
    size: number,
    views: number,
    bandwidth: number,
    vote: any,
    favorite: boolean,
    nsfw: boolean,
    section: string,
    account_url: string,
    account_id: number,
    is_ad: boolean,
    in_most_viral: boolean,
    has_sound: boolean,
    tags: TagType[],
    ad_type: number,
    ad_url: string,
    edited: number,
    in_gallery: boolean,
    topic: any,
    topic_id: number,
    link: string,
    mp4?: string,
    gifv: string,
    hls: string,
    mp4_size: number,
    looping: boolean,
    processing: any,
    ad_config: any,
    comment_count: number,
    favorite_count: number,
    ups: number,
    downs: number,
    points: number,
    score: number,
    is_album: false,
    images: ImageType[]
}

export type CommentType = {
    id: number,
    image_id: string,
    comment: string,
    author: string,
    author_id: number,
    on_album: boolean,
    album_cover: string,
    downs: number,
    ups: number,
    points: number,
    datetime: number,
    parent_id: number,
    deleted: boolean,
    vote: any,
    platform: string,
    has_admin_badge: boolean,
    children: CommentType[]
}

export type InitialStateType = {
    payload: Array<any>,
    isFetching: boolean,
    isError: boolean,
}

export type SortParamType = "/viral" | "/top" | "/time"

export type WindowParamType = "/day" | "/week" | "/month" | "/year" | "/all"

export type PageHeaderType = { setSection: any, setViral: any, viral: any, setSort: any, setWindow: any }

export type ShowMediaType = { selectedGallery: { gallery: GalleryType, link: string },
    setSelectedGallery: (v: { gallery: GalleryType, link: string }) => void, fetchComments: (galleryID: string) => void, commentList: CommentType[] }