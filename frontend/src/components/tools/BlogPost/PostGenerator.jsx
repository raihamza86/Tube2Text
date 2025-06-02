import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  FaRegSmile, FaUserTie, FaBrain, FaRocket, FaHandPeace,
  FaHeart, FaRegLightbulb, FaFeather, FaUserSecret, FaBook,
  FaUserEdit, FaMicrophone, FaLaptop, FaRobot, FaCommentDots,
  FaRegQuestionCircle,
  FaYoutube
} from "react-icons/fa";
import { MdStyle } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FiArrowRight, FiClock } from 'react-icons/fi';
import { FaInfoCircle } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { CiClock2 } from "react-icons/ci";
import VideoDetails from "./VideoDetails";
import BlogContent from "./BlogContent";

const PostGenerator = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [videoDetails, setVideoDetails] = useState(null);



  const [formData, setFormData] = useState({
    youtubeUrl: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // fetch video details based on URL
  const fetchVideoDetail = async (url) => {
    try {
      const res = await axios.post("http://localhost:5000/api/blog/details", {
        youtubeUrl: url,
      });

      if (res.data?.success) {
        return {
          thumbnail: res.data.thumbnail,
          title: res.data.title,
          channel: res.data.channel,
          time: formatDuration(res.data.durationInSec),
          source: "YouTube",
        };
      } else {
        throw new Error("Invalid video details.");
      }
    } catch (err) {
      throw err;
    }
  };


  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    setError("");
    setResult(null);
    setVideoDetails(null);

    if (!formData.youtubeUrl) {
      setError("Please enter a YouTube video URL.");
      setLoading(false);
      return;
    }

    try {
      // Fetch video details first
      const videoMeta = await fetchVideoDetail(formData.youtubeUrl);
      setVideoDetails(videoMeta);

      // Now send blog post creation request with formData
      const response = await axios.post("http://localhost:5000/api/blog", formData, { withCredentials: true });
      setResult(response.data);

    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to generate blog. Please try again.");
      }
      console.log("Error is..", err);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to format duration from seconds to "mm:ss"
  function formatDuration(durationInSec) {
    const minutes = Math.floor(durationInSec / 60);
    const seconds = durationInSec % 60;
    return `${minutes}m ${seconds}s`;
  }

  return (
    <div className=" bg-[#0d101d] text-white px-4 py-10 flex items-center justify-center">
      <div className="absolute top-6">
        <img src="/blog/back.svg" alt="" />
      </div>
      <div className="w-full max-w-3xl relative">
        <div className="text-center mb-10">
          <div className="text-sm bg-purple-400/10 border border-purple-500 inline-block px-3 py-1 rounded-full text-purple-500 font-semibold mb-2">
            AI-Powered Tool
          </div>
          <h1 className="max-md:text-2xl md:text-4xl font-bold mb-1">
            YouTube Video to Blog Post Generator
          </h1>
          <p className="text-gray-300 text-sm md:text-base">
            Turn a YouTube video into a SEO-optimized blog post.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block mb-1 font-medium">
              YouTube Video URL / Transcript
            </label>
            <input
              type="text"
              name="youtubeUrl"
              placeholder="https://www.youtube.com/watch?v=..."
              value={formData.youtubeUrl}
              onChange={handleChange}
              className="w-full bg-[#1a1d2e] text-white px-4 py-3 rounded-md border border-[#3a3f52] hover:border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />

            {videoDetails && (
              <VideoDetails
                title={videoDetails.title}
                channel={videoDetails.channel}
                thumbnail={videoDetails.thumbnail}
                time={videoDetails.time}
                source={videoDetails.source}
              />
            )}
          </div>



          <div className="pt-4">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`mt-6 w-full px-6 py-3 rounded-md text-white font-semibold transition-all duration-300 ${loading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {loading ? "Generating..." : "Generate Blog Post"}
            </button>


            {error && (
              <div className="mt-4 text-red-500 font-medium">{error}</div>
            )}

            {/* Data is: */}
            {result && (
              <div className="mt-10 bg-[#1a1d2e] p-6 rounded-lg border border-[#3a3f52]">
                <BlogContent markdown={result} />
              </div>
            )}


            <p className="text-center text-gray-400 text-sm mt-2">
              <span className="font-semibold">191 creators</span> have used this tool in the past week
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostGenerator;
