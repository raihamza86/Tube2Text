import React from 'react';

const Features = () => {
    const contentSections = [
        {
            heading: "1. YouTube Video URL OR Paste Your Full Transcript",
            intro1: `Most bloggers use this tool by pasting in their YouTube video's URL. The tool automatically grabs the transcript and creates your blog post.<br/><br/>But what you might not realize is that you can also paste a whole transcript into this field. (Yes, it'll fit!) This is really useful if you haven't yet published your video or if you're creating an article based on a private video—e.g. as part of an online course.`,
            image: "/blog/bonus1.webp",
            afterImageHtml: `You could also use this feature to combine two (or more) YouTube videos into one blog post. You don't need to transcribe the videos yourself. Just grab the transcripts using our 
                <a href="#" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline hover:text-blue-600">Download YouTube Video Transcript</a> 
                tool, then go ahead and paste those into the YouTube Video to Blog Post Generator.<br/><br/>
                Tip: When pasting the URL, make sure it's the URL for a specific video, not for your whole YouTube channel.`
        },
        {
            heading: "2. Article Length (Specify the Length You Want)",
            intro1: `The YouTube Video to Blog Post Generator usually does a good job of choosing a sensible length for your blog post, based on the amount of content in your video. <br/><br/>
                     If you want a longer or shorter post, though, just select from the options here.<br/><br/>
                     Short-form posts will normally be under 1,000 words; long-form posts will be around 1,500 words … though note that if your video itself is fairly short, the tool will end up producing blog posts that are on the shorter side too.`,
            image: "/blog/bonus2.webp",

        },
        {
            heading: "3. Primary Keyword (What Keyword Are You Optimizing Around?)",
            intro1: `While you don’t have to include a primary keyword for your article, I strongly recommend it. Keywords let the AI create SEO-optimized blog posts that should rank well (assuming you’ve picked an achievable, relevant keyword).<br/><br/>
                     Here are a couple of examples:<br/><br/>
                     Without a keyword specified:`,
            image: "/blog/bonus3.webp",
        },
        {

            intro1: `With the keyword “make money online with a laptop and camera” specified:`,
            image: "/blog/bonus4.webp",
            afterImageHtml: `In the second example, the AI has incorporated the exact primary keyword phrase into a subheading—an important ranking factor.`

        },
        {
            heading: "4. Tone & Writing Style (Bring Your Style and Voice Into Your Post)",
            intro1: `Have you ever read a blog post and known instantly that it was written by ChatGPT? You can tell from the bland phrasing, like this:<br/><br/>
                     In today’s digital age, all you need to kickstart a money-making venture is a laptop, a camera, and a little creativity. Whether you’re looking for a side hustle or aiming to build a full-time business, there are countless ways to turn these tools into income streams.<br/><br/>
                     RightBlogger’s AI aims for a more conversational, engaging style—but you can adjust this to suit your own personal style and voice.<br/><br/>
                     We have 20+ different pre-set styles to choose from, including Fun & Quirky, Technical, and Direct.<br/><br/>
                     Here are some examples so you can see the difference:<br/><br/>
                     Fun & Quirky: This guide skips the Instagram hype and empty promises of overnight success and delivers a real roadmap to time and location freedom. Spoiler alert: It’s not magic, and it’s not easy—but it’s absolutely achievable.<br/><br/>
                     Technical: Building a sustainable income this way takes time, effort, and strategy. This guide will give you a step-by-step plan to set yourself on the right path, avoid the biggest mistakes, and start moving toward your goals.<br/><br/>
                     Direct: This guide will show you how to actually make money online using a laptop and camera. There are no shortcuts or overnight riches, but if you’re willing to put in the work, you can build a sustainable business and create time and location freedom.<br/><br/>
                     If you have the RightBlogger Unlimited plan, which costs just $29.99/month, you can also create up to 5 customized MyTones. <br/><br/>
                     When you create a MyTone, you simply give the AI a sample of your writing to use as a model. It’ll then analyze your writing in depth, pinpointing your style and saving it to use from any RightBlogger tool with a Tone & Writing Style dropdown.`,
            image: "/blog/bonus5.webp",
        },
    ];

    return (
        <div className="bg-[#0d101d] text-white flex items-center justify-center">
            <div className="max-w-3xl mx-auto max-lg:px-2 md:px-12">
                <div className="lg:px-15 md:px-12 space-y-2">
                    <p className="text-2xl font-extrabold mb-4">
                        The Features of the AI YouTube Video to Blog Post Generator
                    </p>
                    <p>
                        Our AI YouTube Video to Blog Post Tool is easy to get started with … but there's a ton of power under the hood.
                    </p>
                    <p>
                        Let's take a deeper look at all the options you've got, including the advanced features.
                    </p>
                </div>

                <div className="lg:px-15 md:px-12 mt-2 mb-12">
                    {contentSections.map((section, index) => (
                        <div key={index} className="mb-12">
                            <h2 className="text-2xl font-bold mb-4 mx-auto">{section.heading}</h2>

                            {/* Intro with HTML breaks */}
                            {section.intro1 && (
                                <div
                                    className="mb-4 text-lg space-y-3"
                                    dangerouslySetInnerHTML={{ __html: section.intro1 }}
                                />
                            )}

                            {/* Image */}
                            {section.image && (
                                <img
                                    src={section.image}
                                    alt="section"
                                    className="w-full mb-4 rounded-xl"
                                />
                            )}

                            {/* After image content with breaks and links in HTML */}
                            {section.afterImageHtml && (
                                <div
                                    className="text-lg"
                                    dangerouslySetInnerHTML={{ __html: section.afterImageHtml }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Features;
