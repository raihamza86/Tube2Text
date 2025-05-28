import React from 'react'
import PostGenerator from '../components/tools/BlogPost/PostGenerator'
import VideoDemo from '../components/tools/BlogPost/VideoDemo'
import VideoToBlog from '../components/tools/BlogPost/VideoToBlog'
import Bonus from '../components/tools/BlogPost/Bonus'
import Features from '../components/tools/BlogPost/Features'


const Tools = () => {
    return (
        <>
            <PostGenerator />
            <VideoDemo />
            <VideoToBlog />
            <Bonus/>
            <Features/>
        </>
    )
}

export default Tools