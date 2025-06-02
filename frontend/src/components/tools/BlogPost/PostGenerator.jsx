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


const videoData = [
  {
    id: 1,
    thumbnail: "/blog/thumbnail.jpg",
    title: "Balo Batiyaan Way Mahi (Slowed + Reverb)",
    source: "youtube.com",
    channel: "Addiction To Perfection",
    time: "2 years ago",
  },

];
import BlogContent from "./BlogContent";

const toneOptions = [
  { label: "Default", icon: <FaRegSmile /> },
  { label: "Professional", icon: <FaUserTie /> },
  { label: "Persuasive", icon: <FaBrain /> },
  { label: "Excited", icon: <FaRocket /> },
  { label: "Casual", icon: <FaHandPeace /> },
  { label: "Empathetic", icon: <FaHeart /> },
  { label: "Inspiring", icon: <FaRegLightbulb /> },
  { label: "Creative", icon: <FaFeather /> },
  { label: "Mysterious", icon: <FaUserSecret /> },
  { label: "Educational", icon: <FaBook /> },
  { label: "Conversational", icon: <FaCommentDots /> },
  { label: "Storytelling", icon: <FaUserEdit /> },
  { label: "Broadcast", icon: <FaMicrophone /> },
  { label: "Technical", icon: <FaLaptop /> },
  { label: "AI-Futuristic", icon: <FaRobot /> },
];

const languages = [
  "English (US)", "English (UK)", "Spanish", "French", "German",
  "Hindi", "Chinese", "Japanese", "Portuguese", "Russian",
  "Italian", "Arabic", "Korean", "Dutch", "Turkish"
];

const Dropdown = ({ label, icon, value, setValue, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filtered = options.filter(opt =>
    opt.label?.toLowerCase().includes(search.toLowerCase()) ||
    opt.toLowerCase?.().includes(search.toLowerCase())
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="mb-1 font-medium flex items-center gap-2">{icon} {label}</label>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-[#1a1d2e] text-white px-4 py-3 rounded-md border border-[#3a3f52] hover:border-gray-600 ${isOpen ? "ring-1 ring-blue-500 border-blue-500" : ""
          } cursor-pointer flex justify-between items-center`}
      >
        <div className="flex items-center gap-2">
          {options.find(o => (o.label || o) === value)?.icon && options.find(o => (o.label || o) === value).icon}
          <span>{value}</span>
        </div>
        <div className="relative">
          <IoIosArrowDown className=" translate-y-1" />
          <IoIosArrowUp className="absolute right-0 bottom-1.5" />
        </div>
      </div>
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-[#1a1d2e] border border-[#3a3f52] rounded-md max-h-60 overflow-y-auto">
          <input
            type="text"
            placeholder={`Search ${label.toLowerCase()}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 bg-[#0d101d] text-white border-b border-[#3a3f52] focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {filtered.length > 0 ? (
            filtered.map((opt, i) => (
              <div
                key={i}
                onClick={() => {
                  setValue(opt.label || opt);
                  setIsOpen(false);
                  setSearch("");
                }}
                className="px-4 py-2 hover:bg-[#2a2e40] flex items-center gap-2 cursor-pointer"
              >
                {opt.icon && opt.icon} {opt.label || opt}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-400">No match found</div>
          )}
        </div>
      )}
    </div>
  );
};

const SwitchButton = ({ label, checked, onChange, tooltip }) => (
  <div className="flex items-center gap-2 text-sm text-white mr-6 relative ">
    <span>{label}</span>

    {/* Tooltip */}
    <div className="relative group">
      <FaInfoCircle className="text-gray-400 cursor-pointer hover:text-white" />
      <div className="absolute hidden group-hover:block z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-xs bg-[#2a2e40] text-gray-300 rounded-md shadow-lg whitespace-nowrap">
        {tooltip}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-[#2a2e40]"></div>
      </div>
    </div>

    {/* Switch */}
    <button
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`w-11 h-6 flex items-center cursor-pointer rounded-full px-0.5 transition-colors duration-300 ${checked ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-600 hover:bg-gray-700"}`}
    >
      <span
        className={`h-5 w-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${checked ? "translate-x-5" : "translate-x-0"}`}
      />
    </button>
  </div>
);


const PostGenerator = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);


  const [formData, setFormData] = useState({
    youtubeUrl: "",
    // primaryKeyword: "",
    // articleLength: "Automatic",
    // toneStyle: "Default",
    // language: "English (US)",
    // editOutline: false,
    // embedVideo: false,
    // externalLinks: false
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await axios.post("http://localhost:5000/api/blog", formData, { withCredentials: true });
      console.log("response is..", response);
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

            <div className="mt-3 space-y-4 group">
              {videoData.map((video) => (
                <div
                  key={video.id}
                  className="flex bg-[#0d101d] border-1 p-2 border-[#3a3f52] text-white rounded-lg overflow-hidden shadow-md max-w-3xl group-hover:border-gray-600 transition"
                >
                  {/* Left: Thumbnail */}
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-40 h-auto object-cover"
                  />

                  {/* Right: Content */}
                  <div className="flex flex-col justify-center px-4 ps-5 py-2 space-y-1">
                    <span className="text-sm text-gray-400">{video.source}</span>

                    <h3 className="font-semibold flex items-center gap-2 text-base">
                      <FaYoutube className="text-red-600 text-lg" />
                      {video.title}
                    </h3>

                    <p className="text-gray-400 text-sm flex items-center space-x-2">
                      <FaRegCircleUser /> {video.channel}  <FiClock className="ms-4 me-1.5"/> {video.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Switch Buttons Row */}
            {/* <div className="flex flex-wrap items-center gap-4 mt-4 ">
              <SwitchButton
                label="Edit Outline?"
                checked={formData.editOutline}
                onChange={() =>
                  setFormData({ ...formData, editOutline: !formData.editOutline })
                }
                tooltip="Edit the outline that's generated when writing the artical."
              />
              <SwitchButton
                label="Embed Video"
                checked={formData.embedVideo}
                onChange={() =>
                  setFormData({ ...formData, embedVideo: !formData.embedVideo })
                }
                tooltip="Embed the video in the blg post."
              />
              <SwitchButton
                label="External Links?"
                checked={formData.externalLinks}
                onChange={() =>
                  setFormData({ ...formData, externalLinks: !formData.externalLinks })
                }
                tooltip="Ai will find relevant links to include in your artical"
              />
            </div> */}
          </div>

          {/* Rest of form fields */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="mb-1 font-medium flex items-center gap-2">
                Article Length
                <div className="relative group inline-flex">
                  <FaInfoCircle className="text-gray-400 text-base cursor-pointer hover:text-gray-300 transition-colors" />
                  <div className="absolute hidden group-hover:block z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-sm bg-[#2a2e40] text-gray-300 rounded-md shadow-lg whitespace-nowrap">
                    Select the desired length of your blog post
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-[#2a2e40]"></div>
                  </div>
                </div>
              </label>
              <div className="relative">
                <select
                  name="articleLength"
                  value={formData.articleLength}
                  onChange={handleChange}
                  className="w-full bg-[#1a1d2e] cursor-pointer text-white px-4 py-3 rounded-md border border-[#3a3f52] hover:border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none pr-10"
                >
                  <option>Automatic</option>
                  <option>Short-form</option>
                  <option>Medium-form</option>
                  <option>Long-form</option>
                  <option>Very Long-form</option>
                </select>
                <div className="absolute right-4.5 top-1/2 transform -translate-y-1/2 pointer-events-none flex flex-col items-center">
                  <IoIosArrowUp />
                  <IoIosArrowDown className="-mt-1.5" />
                </div>
              </div>
            </div>
            <div>
              <label className="block mb-1 font-medium">
                Primary Keyword <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="text"
                name="primaryKeyword"
                value={formData.primaryKeyword}
                onChange={handleChange}
                placeholder="A primary keyword for the blog post"
                className="w-full bg-[#1a1d2e] text-white px-4 py-3 rounded-md border border-[#3a3f52] hover:border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div> */}

          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Dropdown
              label="Tone & Writing Style"
              value={formData.toneStyle}
              setValue={(val) => setFormData({ ...formData, toneStyle: val })}
              options={toneOptions}
            />
            <Dropdown
              label="Language"
              value={formData.language}
              setValue={(val) => setFormData({ ...formData, language: val })}
              options={languages}
            />
          </div> */}

          <div className="pt-4">
            <button
              disabled={loading}
              onClick={handleSubmit}
              className="w-full bg-[#6c4efc] hover:bg-[#5936e9] text-white font-semibold py-2.5 px-6 rounded-md transition-all duration-300 text-center cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? "Generating..." : "Generate Blog Post"}
            </button>


            {error && (
              <div className="mt-4 text-red-500 font-medium">{error}</div>
            )}

            {/* Data is: */}
            {result && (
              <div className="mt-10 bg-[#1a1d2e] p-6 rounded-lg border border-[#3a3f52]">
                {/* <h2 className="text-xl font-bold mb-4">{result.title}</h2> */}
                {/* <div className="text-gray-300 whitespace-pre-line">{result.content}</div> */}
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
