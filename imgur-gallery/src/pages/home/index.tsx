import style from "./style.module.css"
import {useEffect, useState} from "react";
import ImageCard from "../../components/ImageCard";
import VideoCard from "../../components/VideoCard";
import ImgurModal from "../../components/ImgurModal";
import {ImageType, SortParamType, WindowParamType} from "../../types";
import ShowMediaModal from "../../components/ShowMediaModal";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchGallery} from "../../redux/actions/gallery";
import {galleryList} from "../../redux/reducers/gallery/gallerySelector";
import PageHeader from "../../components/PageHeader";

const Home = ({fetchGallery, galleryList}: any) => {

    const [openModal, setOpenModal] = useState(false)
    const [selectedImage, setSelectedImage] = useState<any>()
    const [section, setSection] = useState<string>("/hot")
    const [viral, setViral] = useState(false);
    const [sort, setSort] = useState<SortParamType>("/viral")
    const [window, setWindow] = useState<WindowParamType>("/day")

    const openImage = (image: ImageType, link: string) => {
        setSelectedImage({image, link})
        setOpenModal(true)
    }

    useEffect(() => {
        fetchGallery(section, viral, sort, window)
    }, [section, viral, sort, window])

    return (
        <div style={{padding: "100px"}}>
            <ImgurModal setOpen={setOpenModal} open={openModal} width="50%">
                <ShowMediaModal selectedImage={selectedImage} setSelectedImage={setSelectedImage}/>
            </ImgurModal>
            <PageHeader setWindow={setWindow} setSort={setSort} setSection={setSection} setViral={setViral} viral={viral}/>
            <div className={style.imageList}>
                {galleryList?.map((image: ImageType) => {
                    if (image.images) {
                        if (image.images[0].mp4) {
                            return <VideoCard openImage={openImage} link={image.images[0].mp4} image={image}/>
                        } else {
                            return <ImageCard openImage={openImage} image={image} link={image.images[0].link}/>
                        }
                    } else {
                        if (image.mp4) {
                            return <VideoCard openImage={openImage} link={image.mp4} image={image}/>
                        } else {
                            return <ImageCard openImage={openImage} image={image} link={image.link}/>
                        }
                    }
                })}
            </div>
        </div>
    )
}

const mapStateToProps = (state: object) => {
    return {
        galleryList: galleryList(state)
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators(
        {
            fetchGallery: fetchGallery,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);