import style from "./style.module.css"
import {CommentType, GalleryType, ImageType, ShowMediaType} from "../../types";
import Comment from "../Comment";
import {BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill} from "react-icons/bs"
import React, {useEffect, useState} from "react";
// @ts-ignore
import _ from "lodash";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchComments} from "../../redux/actions/comments";
import {commentList} from "../../redux/reducers/comments/commentSelector";


const ShowMediaModal = ({
                            selectedGallery,
                            setSelectedGallery,
                            fetchComments,
                            commentList
                        }: ShowMediaType) => {

    const [showNextButton, setShowNextButton] = useState(false);

    /**
     * changes between different images of the same gallery
     * @param direction
     */
    const changeMedia = (direction: string) => {
        const currentIndex = _.findIndex(selectedGallery?.gallery?.images, (image: ImageType) => {
            return image.link === selectedGallery.link
        })
        if (direction === "next") {
            setSelectedGallery({...selectedGallery, link: selectedGallery?.gallery?.images[currentIndex + 1].link})
        } else {
            setSelectedGallery({...selectedGallery, link: selectedGallery?.gallery?.images[currentIndex - 1].link})
        }
    }

    /**
     * returns boolean value that determines if the previous image button should be rendered
     */
    const showPrevious = () => {
        const currentIndex = _.findIndex(selectedGallery?.gallery?.images, (image: ImageType) => {
            return image.link === selectedGallery.link
        })
        return currentIndex !== 0;
    }

    /**
     * returns boolean value that determines if the next image button should be rendered
     */
    const showNext = () => {
        const currentIndex = _.findIndex(selectedGallery?.gallery?.images, (image: ImageType) => {
            return image.link === selectedGallery.link
        })
        return selectedGallery?.gallery?.images.length > currentIndex + 1;
    }


    /**
     * fetches comments that are related to the selected galery
     */
    useEffect(() => {
        fetchComments(selectedGallery?.gallery?.id)
    }, [])

    return (
        <div className={style.modal}>
            <div className={style.title}>
                {selectedGallery?.gallery?.title}
            </div>
            <div style={{
                display: "flex",
                borderTop: "1px solid black",
                paddingTop: "5px",
                justifyContent: "space-between"
            }}>
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
                {selectedGallery?.link?.substr(selectedGallery?.link.length - 3) === "mp4" ?
                    <video width="250px" autoPlay loop>
                        <source src={selectedGallery.link} type="video/mp4"/>
                    </video> : <img
                        src={selectedGallery?.link}
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
                            <Comment key={comment.id} parent={true} comment={comment}/>
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