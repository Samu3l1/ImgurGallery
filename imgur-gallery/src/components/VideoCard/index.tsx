import React, {useEffect, useState} from 'react';

const VideoCard = ({link}: { link: string }) => {

    const videoRef: any = React.createRef()
    const [spans, setSpan] = useState(0)

    useEffect(() => {
        videoRef.current.addEventListener('loadeddata', setSpans);
    })

    const setSpans = () => {
        const height = videoRef.current.clientHeight;
        const spans = Math.ceil(height / 10 + 1);

        setSpan(spans);
    }


    return (
        <div style={{gridRowEnd: `span ${spans}`}}>
            <video ref={videoRef} width="250px" autoPlay loop>
                <source src={link} type="video/mp4"/>
            </video>
        </div>
    );

}

export default VideoCard;