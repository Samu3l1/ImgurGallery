import style from "./style.module.css"
import {useEffect, useState} from "react";
import ImageCard from "../../components/ImageCard";
import VideoCard from "../../components/VideoCard";
import ImgurModal from "../../components/ImgurModal";
import {GalleryType, ImageType, SortParamType, WindowParamType} from "../../types";
import ShowMediaModal from "../../components/ShowMediaModal";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchGallery} from "../../redux/actions/gallery";
import {galleryList} from "../../redux/reducers/gallery/gallerySelector";
import PageHeader from "../../components/PageHeader";

const Home = ({fetchGallery, galleryList}: {fetchGallery: any, galleryList: GalleryType[]}) => {

    const [openModal, setOpenModal] = useState(false)
    const [selectedGallery, setSelectedGallery] = useState<any>()
    const [section, setSection] = useState<string>("/hot")
    const [viral, setViral] = useState(false);
    const [sort, setSort] = useState<SortParamType>("/viral")
    const [window, setWindow] = useState<WindowParamType>("/day")

    /**
     * opens the image/video modal
     * @param  image
     * @param {string} link
     */
    const openImage = (gallery: GalleryType, link: string) => {
        setSelectedGallery({gallery, link})
        setOpenModal(true)
    }

    /**
     * fetched galley images when the component first loads and when one of the given parameters is updated
     */
    useEffect(() => {
        fetchGallery(section, viral, sort, window)
    }, [section, viral, sort, window])

    return (
        <div style={{padding: "100px"}}>
            <ImgurModal setOpen={setOpenModal} open={openModal} width="50%">
                <ShowMediaModal selectedGallery={selectedGallery} setSelectedGallery={setSelectedGallery}/>
            </ImgurModal>
            <PageHeader setWindow={setWindow} setSort={setSort} setSection={setSection} setViral={setViral} viral={viral}/>
            <div className={style.imageList}>
                {galleryList?.map((gallery: GalleryType) => {
                    if (gallery.images) {
                        if (gallery.images[0].mp4) {
                            return <VideoCard openImage={openImage} link={gallery.images[0].mp4} gallery={gallery}/>
                        } else {
                            return <ImageCard openImage={openImage} gallery={gallery} link={gallery.images[0].link}/>
                        }
                    } else {
                        if (gallery.mp4) {
                            return <VideoCard openImage={openImage} link={gallery.mp4} gallery={gallery}/>
                        } else {
                            return <ImageCard openImage={openImage} gallery={gallery} link={gallery.link}/>
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