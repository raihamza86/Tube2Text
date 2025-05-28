import React from 'react';
import { Link } from 'react-router-dom';

const VideoToBlog = () => {
    const contentSections = [
        {
            heading: "1. Enter the URL for Your YouTube Video",
            intro: "First, pop in the direct URL for your YouTube video. Not sure where to find this? Just go to your video on YouTube, then copy-and-paste the URL from your browser’s toolbar.",
            image: "/blog/guider1.webp",
            afterImage: "Tip: If your video isn’t on YouTube or is private, you can instead copy the whole transcript into this box. We’ll cover that in more detail later."
        },
        {
            heading: "2. Specify the Length for Your Blog Post",
            intro: "The RightBlogger AI will automatically try to come up with a blog post of a suitable length—but if you want, you can specify how long/short the post should be here.",
            image: "/blog/guider2.webp"
        },
        {
            heading: "3. Set a Primary Keyword for Your Blog Post (Optional)",
            intro: "For the best SEO results, you want to have a primary keyword (search query) for each article you write. If you’re not sure what keyword to best use for your post, our ",
            linkText: "Keyword Research Tool",
            linkUrl: "#",
            linkAfterText: " will help.",
            image: "/blog/guider3.webp"
        },
        {
            heading: "4. Choose the Tone and Writing Style for Your Blog Post",
            intro: "By default, the AI will write in a conversational tone that should be suitable for most blogs. But if you want to more closely match your own writing voice, select a different tone & writing style from the dropdown list.",
            image: "/blog/guider4.webp",
            afterImage: "Tip: If you have the Unlimited RightBlogger plan (instead of the free plan), you can create up to 5 custom ",
            afterImageLinkText: "MyTone",
            afterImageLinkUrl: "#",
            afterImageContinuation: " styles to use. Just select your MyTone from the dropdown here."
        },
        {
            heading: "5. Select the Language for Your Blog Post",
            intro: "RightBlogger defaults to English (US) as that’s what the majority of our users write in. But you can choose from over 100+ different languages here—including other varieties of English (UK, Canada, and Australia).",
            image: "/blog/guider5.webp",
        }
    ];

    return (
        <div className="bg-[#0d101d] text-white flex items-center justify-center">
            <div className="max-w-3xl mx-auto max-lg:px-2 md:px-12">
                <div className="lg:px-15 md:px-12">
                    <p className="text-2xl font-extrabold mb-4">
                        How to Use Our Free YouTube Video to Blog Post Generator
                    </p>
                    <p>
                        We designed the YouTube Video to Blog Post tool to be as easy as possible to use. Here’s how to get started with it.
                    </p>
                </div>

                <div className="lg:px-15 md:px-12 mt-2 mb-12">
                    {contentSections.map((section, index) => (
                        <div key={index} className="mb-12">
                            <h2 className="text-2xl font-bold mb-4 mx-auto">{section.heading}</h2>

                            {/* Intro with optional inline link */}
                            {section.intro && (
                                <p className="mb-4 text-lg">
                                    {section.intro}
                                    {section.linkText && section.linkUrl && (
                                        <Link
                                            to={section.linkUrl}
                                            className="text-blue-400 underline hover:text-blue-600 mx-1"
                                        >
                                            {section.linkText}
                                        </Link>
                                    )}
                                    {section.linkAfterText && section.linkAfterText}
                                </p>
                            )}

                            {/* Image */}
                            {section.image && (
                                <img
                                    src={section.image}
                                    alt="section"
                                    className="w-full mb-4 rounded-xl"
                                />
                            )}

                            {/* After image content */}
                            {section.afterImage && (
                                <p className="text-lg">
                                    {section.afterImage}
                                    {section.afterImageLinkText && section.afterImageLinkUrl && (
                                        <Link
                                            to={section.afterImageLinkUrl}
                                            className="text-blue-500 underline hover:text-blue-600 mx-1"
                                        >
                                            {section.afterImageLinkText}
                                        </Link>
                                    )}
                                    {section.afterImageContinuation && section.afterImageContinuation}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VideoToBlog;
