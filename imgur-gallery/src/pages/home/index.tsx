import style from "./style.module.css"
import {GALLERY_HOT} from "../../api/responses";
import {useEffect, useState} from "react";
import ImageCard from "../../components/ImageCard";
import VideoCard from "../../components/VideoCard";
import ImgurModal from "../../components/ImgurModal";
import {ImageType} from "../../types";
import ShowMediaModal from "../../components/ShowMediaModal";

const Home = () => {

    const [openModal, setOpenModal] = useState(true)
    const [images, setImages] = useState<any>();
    const [selectedImage, setSelectedImage] = useState<any>()

    const openImage = (image: ImageType, link: string) => {
        setSelectedImage({image, link})
        setOpenModal(true)
    }

    useEffect(() => {
        const tempImages = GALLERY_HOT.data.map((image: ImageType) => {
            if(image.images){
                if(image.images[0].mp4){
                    return <VideoCard link={image.images[0].mp4} image={image}/>
                } else {
                    return <ImageCard openImage={openImage} image={image} link={image.images[0].link}/>
                }
            }  else {
                if(image.mp4){
                    return <VideoCard link={image.mp4} image={image}/>
                } else {
                    return <ImageCard openImage={openImage} image={image} link={image.link}/>
                }
            }
        })
        setImages(tempImages)
    }, [])

    return (
        <div style={{padding:"100px"}}>
            <ImgurModal setOpen={setOpenModal} open={openModal} width="50%">
                <ShowMediaModal selectedImage={selectedImage} setSelectedImage={setSelectedImage}/>
            </ImgurModal>
            <div className={style.imageList}>
                {images}
            </div>
            <button onClick={() => console.log(GALLERY_HOT)}>
                request
            </button>
        </div>
    )
}

export default Home;