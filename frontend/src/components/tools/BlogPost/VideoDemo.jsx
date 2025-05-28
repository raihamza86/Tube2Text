

const contentData = [
    { text: "Got YouTube videos that you want to turn into blog posts? You can repurpose them in seconds using our free video to blog AI tool. Get the most out of your content without putting in lots of extra work: our generator automatically creates a well-structured, high-quality blog post that incorporates all your video content." },
    { text: "Here at RightBlogger, we think a “video-first” content creation model makes sense for most business owners and bloggers. Plus, if you’re already putting out content on YouTube, you might as well reuse it in different formats." },
    { text: "One big drawback of videos is that they can be tricky to optimize for search engines. That’s why it’s a great idea to convert YouTube videos into blog posts that are SEO-friendly. Written content also lets you reach a wider audience: not everyone wants to watch, some people prefer to read instead." },
    { text: "Reworking all your videos into blog posts would take a ton of manual work. Even if you’ve got a good, clear transcript, you’ll still need to do lots of editing and formatting. That’s why we created one of our most popular tools: the YouTube Video to Blog Post Generator." },
    { text: "With this tool, you can instantly draft a blog post based on your video, saving you hours of work" }
];

const VideoDemo = () => {


    return (
        <div className="bg-[#0d101d] text-white flex items-center justify-center  min-h-screen">
            <div className="max-w-3xl mx-auto max-lg:px-2 md:px-12 py-8 rounded-xl ">
                {/* Video Demo Label */}
                <div className="text-center mb-6">
                    <p className="inline-block text-4xl font-bold text-white ">
                        Video Demo
                    </p>
                </div>

                {/* Video Player Container */}
                <div className="relative z-10 group cursor-pointer mb-8 lg:px-2 rounded-lg ">
                    <div className="shadow-[0px_0px_180px_250px_rgba(50,51,90,0.5)] h-40 w-[40%] mx-auto bg-[#31325288] absolute rounded-[100%] left-50 top-20 -z-10"></div>
                    <div className="w-full aspect-video">
                        <iframe
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/qro0DJARSt8?si=Eo6OiTH9fIdS-LyE"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>

                {/* Content Section */}
                <div className="space-y-7 lg:px-15 md:px-12 mt-18 text-white">
                    {contentData.map((item, index) => (
                        <p key={index}>{item.text}</p>
                    ))}
                </div>
            </div>


        </div>
    );
};

export default VideoDemo;