import style from "./style.module.css"
import {CommentType, ImageType} from "../../types";
import {GALLERY_COMMENTS} from "../../api/responses";
import Comment from "../Comment";
import {BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill} from "react-icons/bs"
import React, {useEffect, useState} from "react";
// @ts-ignore
import _ from "lodash";
import {connect} from "react-redux";
import {galleryList} from "../../redux/reducers/gallery/gallerySelector";
import {bindActionCreators} from "redux";
import {fetchGallery} from "../../redux/actions/gallery";
import {fetchComments} from "../../redux/actions/comments";
import {commentList} from "../../redux/reducers/comments/commentSelector";


const ShowMediaModal = ({selectedImage, setSelectedImage, fetchComments, commentList}: { selectedImage: any, setSelectedImage: any, fetchComments: any, commentList: any }) => {

    const [showNextButton, setShowNextButton] = useState(false);

    const changeMedia = (direction: string) => {
        const currentIndex = _.findIndex(selectedImage?.image?.images, (image: ImageType) => {
            return image.link === selectedImage.link
        })
        if (direction === "next") {
            setSelectedImage({...selectedImage, link: selectedImage?.image?.images[currentIndex + 1].link})
        } else {
            setSelectedImage({...selectedImage, link: selectedImage?.image?.images[currentIndex - 1].link})
        }
    }

    const showPrevious = () => {
        const currentIndex = _.findIndex(selectedImage?.image?.images, (image: ImageType) => {
            return image.link === selectedImage.link
        })
        return currentIndex !== 0;
    }

    const showNext = () => {
        const currentIndex = _.findIndex(selectedImage?.image?.images, (image: ImageType) => {
            return image.link === selectedImage.link
        })
        return selectedImage?.image?.images.length > currentIndex + 1;
    }

    useEffect(() => {
        fetchComments(selectedImage?.image?.id)
    }, [])

    console.log(commentList)

    return (
        <div className={style.modal}>
            <div className={style.title}>
                {selectedImage?.image?.title}
            </div>
            <div style={{display: "flex", borderTop: "1px solid black", paddingTop: "5px", justifyContent:"space-between"}}>
                <div className={style.previous}
                     style={{visibility: (showNextButton && showPrevious()) ? "visible" : "hidden"}}
                     onMouseEnter={() => setShowNextButton(true)}
                     onMouseLeave={() => setShowNextButton(false)}
                     onClick={() => changeMedia("previous")}
                >
                    <BsFillArrowLeftCircleFill style={{
                        width: "30px",
                        height: "30px",
                        color: "white",
                        border: "1px solid black",
                        backgroundColor: "black",
                        borderRadius: "15px"
                    }}/>
                </div>
                {selectedImage?.link?.substr(selectedImage?.link.length - 3) === "mp4" ? <video width="250px" autoPlay loop>
                    <source src={selectedImage.link} type="video/mp4"/>
                </video> : <img
                    src={selectedImage?.link}
                    alt="error"
                    width="75%"
                    height="100%"
                    onMouseEnter={() => setShowNextButton(true)}
                    onMouseLeave={() => setShowNextButton(false)}
                    style={{maxHeight: "440px", objectFit: "contain"}}
                />}


                <div
                    className={style.next}
                    style={{visibility: (showNextButton && showNext()) ? "visible" : "hidden"}}
                    onMouseEnter={() => setShowNextButton(true)}
                    onMouseLeave={() => setShowNextButton(false)}
                    onClick={() => changeMedia("next")}
                >
                    <BsFillArrowRightCircleFill style={{
                        width: "30px",
                        height: "30px",
                        color: "white",
                        border: "1px solid black",
                        backgroundColor: "black",
                        borderRadius: "15px"
                    }}/>
                </div>
                <div className={style.comments}>
                    {commentList?.map((comment: CommentType) => {
                        return (
                            <Comment key={comment.id} parent={true} comment={comment} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: object) => {
    return {
        commentList: commentList(state),
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators(
        {
            fetchComments: fetchComments,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowMediaModal);