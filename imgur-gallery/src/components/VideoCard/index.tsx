import React, {useEffect, useState} from 'react';
import style from "./style.module.css";
import {FaRegArrowAltCircleDown, FaRegArrowAltCircleUp} from "react-icons/fa";
import {BiCommentDetail} from "react-icons/bi";
import {BsEye} from "react-icons/bs";
import {GalleryType} from "../../types";

const VideoCard = ({link, gallery, openImage}: { link: string, gallery: GalleryType, openImage: (gallery: GalleryType, link: string) => void }) => {

    const videoRef: any = React.createRef()
    const [spans, setSpan] = useState(0)

    useEffect(() => {
        videoRef.current.addEventListener('loadeddata', setSpans);
    })

    /**
     * when the imageCard loads this function is executed and sets how many spans of the grid it will take
     */
    const setSpans = () => {
        const height = videoRef.current.clientHeight;
        const spans = Math.ceil(height / 10 + 1) + 10;

        setSpan(spans);
    }


    return (
        <div style={{gridRowEnd: `span ${spans}`}}>
            <video ref={videoRef} width="250px" autoPlay loop onClick={() => openImage(gallery, link)}>
                <source src={link} type="video/mp4"/>
            </video>
            <div style={{
                backgroundColor: "#474a51",
                height: "60px",
                width: "210px",
                position: "relative",
                top: "-4px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
            }}>
                <div style={{color: "white", wordBreak: "break-word", maxHeight: "37px", overflow: "hidden"}}>
                    {gallery.title}
                </div>
                <div className={style.imageDetails} style={{display: "flex"}}>
                    <div className={style.detailContainer}>
                        <FaRegArrowAltCircleUp/>
                        <div>
                            {gallery.ups}
                        </div>
                    </div>
                    <FaRegArrowAltCircleDown className={style.detailContainer} />
                    <div className={style.detailContainer}>
                        <BiCommentDetail/>
                        <div>
                            {gallery.comment_count}
                        </div>
                    </div>
                    <div className={style.detailContainer}>
                        <BsEye/>
                        <div>
                            {gallery.views}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default VideoCard;