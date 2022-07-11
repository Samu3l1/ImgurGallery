import style from "./style.module.css"
import {ImageType} from "../../types";
import {GALLERY_COMMENTS} from "../../api/responses";
import Comment from "../Comment";
import {BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill} from "react-icons/bs"
import {useState} from "react";
// @ts-ignore
import _ from "lodash";


const ShowMediaModal = ({selectedImage, setSelectedImage}: { selectedImage: any, setSelectedImage: any }) => {

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

    // console.log(selectedImage)

    return (
        <div className={style.modal}>
            <div style={{display: "flex"}}>
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
                <img
                    src={selectedImage?.link}
                    alt="error"
                    width="75%"
                    height="100%"
                    onMouseEnter={() => setShowNextButton(true)}
                    onMouseLeave={() => setShowNextButton(false)}
                    style={{maxHeight: "440px", objectFit: "contain"}}
                />

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
                    {/*{GALLERY_COMMENTS.data.map((comment: CommentType) => {*/}
                    {/*    return (*/}
                    {/*        <Comment key={comment.id} comment={comment} />*/}
                    {/*    )*/}
                    {/*})}*/}

                    <Comment parent={true} comment={GALLERY_COMMENTS.data[1]}/>
                </div>
            </div>
        </div>
    )
}

export default ShowMediaModal;