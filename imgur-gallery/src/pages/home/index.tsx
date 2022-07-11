import style from "./style.module.css"
import {GALLERY_HOT} from "../../api/responses";
import {useEffect} from "react";
import ImageCard from "../../components/ImageCard";
import VideoCard from "../../components/VideoCard";

const Home = () => {

    useEffect(() => {
        // fetchGallery()

    }, [])

    const images = GALLERY_HOT.data.map((image: any) => {
        if(image.images){
            if(image.images[0].mp4){
                return <VideoCard link={image.images[0].mp4} image={image}/>
            } else {
                return <ImageCard image={image} link={image.images[0].link}/>
            }
        }  else {
            if(image.mp4){
                return <VideoCard link={image.mp4} image={image}/>
            } else {
                return <ImageCard image={image} link={image.link}/>
            }
        }
    })

    return (
        <div style={{padding:"100px"}}>
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