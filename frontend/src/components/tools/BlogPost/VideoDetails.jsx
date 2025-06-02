import React from 'react';

const VideoDetails = ({ title, channel, thumbnail, time, source }) => {
    return (
        <div className="flex md:flex-row flex-col bg-[#0d101d] border p-2 border-[#3a3f52] text-white rounded-lg shadow-md">
            <img
                src={thumbnail}
                alt={title}
                className="md:w-40 h-auto object-cover"
            />
            <div className="flex flex-col justify-center md:px-4 md:ps-5 md:py-2 space-y-1">
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="text-sm text-gray-400">Channel: {channel}</p>
                <p className="text-sm text-gray-400">Uploaded: {time}</p>
                <p className="text-sm text-gray-400">Source: {source}</p>
            </div>
        </div>
    );
};

export default VideoDetails;
