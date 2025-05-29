import React from 'react';
import { Link } from "react-router-dom";

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
        {
            heading: "5. Language (Pick From 100+ Languages)",
            intro1: `By default, RightBlogger creates content in English (US), because the majority of our users are based in the USA. But if you live somewhere else, or you’re creating content for an audience in a different country, we’ve got you covered too.<br/><br/>
                     RightBlogger supports over 100 languages for content creation. Regardless of your video’s language, you can choose whatever language you want here.<br/><br/>
                     For instance, your video might be in English—but you may want a Spanish blog post based on it for your multilingual website. RightBlogger can handle that with ease.`,
            image: "/blog/bonus7.webp",
            afterImageHtml: `Tip: Even if your video’s language matches the output you want (e.g. your video is in French and you want the blog post to be in French too), you still need to select the output language here. `
        },
        {
            heading: "6. Embed Video (Opt to Include Your Video in Your Post … or Not!)",
            intro1: `The Video to Blog Post tool also has a set of advanced options, which you can view by expanding the “Embed Video & Point of View & More” section.`,
            image: "/blog/bonus9.webp",
            afterImageHtml: `The first of these options is “Embed Video”. Having this option toggled on will include your YouTube video near the start of your article.<br/><br/>
                             This is a great option in most cases: it helps boost views of your video as blog readers may opt to watch it instead of (or as well as) reading your article.`
        },
        {
            image: "/blog/bonus12.webp",
        },
        {
            heading: "7. Point of View (Choose the Perspective for Your Post)",
            intro1: `1. Do you want to write your post from your own perspective, to the reader, or in a more neutral way?<br/><br/> 
                     2. Most bloggers will write posts to “you” the reader—and this usually makes the most sense for the point of view.<br/><br/>  
                     3. But in some situations, you may want to tweak things. The Point of View feature lets you choose from different perspectives:<br/> <br/> 
                     4. First Person (I): useful if your video is primarily based on your own story or experience<br/> <br/> 
                     5. First Person Plural (we): useful if your video has two or more presenters or you’re sharing a joint story<br/> <br/> 
                     6. Second Person (you): a good option for focusing on your reader and their needs and interests<br/> <br/> 
                     7. Third Person (they): a more neutral tone that can be good if you’re talking about mistakes or problems`,
            image: "/blog/bonus8.webp",
        },
        {
            heading: "8. Internal Links (Add Your Website or Blog URL Here)",
            intro1: `The AI can automatically include internal links in your post, if you let it know the URL of your website or blog. This is great for your SEO and also helps encourage readers to stick around for longer on your site.<br/> <br/> 
                     Just enter your URL and the AI will do the rest.`,
            image: "/blog/bonus6.webp",
        },
        {

            intro1: `You’ll see relevant links included throughout your article:`,
            image: "/blog/bonus10.webp",
        },
        {
            heading: "9. Target Audience (Who is Your Post Aimed At?)",
            intro1: `You can specify a target audience for your post—helping the AI to tailor the content specifically to that 
                    <a href="#" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline hover:text-blue-600">audience’s needs</a> 
                     and preferences.<br/> <br/> 
                     In many cases, this will be a similar target audience to your video. However, you might find there are some crucial differences between your YouTube and blog audiences: for instance, maybe your YouTube audience tends to be younger whereas your blog audience is a little older. Your audiences may also have different levels of expertise.`,
            image: "/blog/bonus11.webp",
        },
        {
            heading: "10. Additional Instructions (Give the AI More Info or Specific Constraints)",
            intro1: `In the Additional Instructions section, you can include anything else you want.  <br/> <br/>
                     That might be information that you want added to the AI-generated content (e.g. “add a bonus section on…”) or it could be related to how you want the post formatted, perhaps if you use specific templates for your posts.`,
            image: "/blog/bonus13.webp",
        },
        {
            heading: "11. Creativity (Choose How Unusual or Predictable to Make Your Post)",
            intro1: `Finally, you can choose how “Creative” the AI should be. This essentially determines whether the AI should be predictable or unpredictable when writing your post. The more creative you ask it to be, the more unusual the generated blog post will be.`,
            image: "/blog/bonus14.webp",
            afterImageHtml: `High creativity can help you avoid bland AI-like content … but it can also make your post a bit too off-beat. Low creativity keeps things simple … but it can be boring.<br/><br/>
                              We usually recommend sticking with the midway point for Creativity, but you can experiment by changing the slider to see if a different setting suits your blogging style better.`
        },
        {
            heading: "Tip: Set Up a Project if You’re Creating Multiple Blog Posts From Videos",
            intro1: `<a href="#" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline hover:text-blue-600">RightBlogger’s Projects feature </a> 
                     lets you create a project and pre-populate the information in the Video to Blog Post Tool (and all our other tools).<br/><br/>
                     This will streamline your workflow if you’re creating several videos for the same blog.`,
            image: "/blog/bonus13.webp",
        },
        {
            heading: "AI Video to Blog Post Generator FAQs",
            intro1: `Got questions about turning videos into blog posts or about using the video to blog post generator? Here’s everything you need to know.`,

        },
        {
            heading: "Can I Use YouTube Videos in My Blog Post?",
            intro1: `Yes!  <br/><br/>
                     Obviously, you can always use your own YouTube videos in your blog post. <br/><br/>
                     When it comes to other people’s YouTube videos, it’s generally considered okay to embed these on your blog too (as embedding it will link back to their original video, on YouTube). Keep in mind, though, that if someone has violated copyright in their video, you probably don’t want to associate yourself with that. <br/><br/>
                    If you’re at all unsure whether you can use a particular video within your blog content, check with a legal professional.`,
        },
        {
            heading: "Can I Use TikTok, Instagram Reels, or Other Videos with This Tool?",
            intro1: `The YouTube to blog converter also works just fine with TikTok videos. Simply paste in the TikTok URL for the video and go ahead and create your blog post.<br/><br/>
                     We’ve got support for Instagram Reels coming soon, too.<br/><br/>
                     If you’ve got a transcript for your video (no matter where it’s hosted!) then you can just paste the whole transcript into the tool, as well.`,
        },
        {
            heading: "How Do I Embed a Video Into My Blog?",
            intro1: `With WordPress, it’s really easy to embed a video. Just copy-and-paste the URL for your YouTube video into the place where you want it in your post, and the WordPress block editor will automatically embed the video.<br/><br/>
                     If you’re using a different blogging platform, you may need the
                     <a href="#" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline hover:text-blue-600">embed HTML code </a> 
                     for the video. `,
        },
        {
            heading: "How Else Can I Write a Blog Post Using AI?",
            intro1: `RightBlogger is packed with 80+ tools to help you with your blogging and business. When it comes to writing blog articles, we have a whole suite of AI content creation tools to help, including:<br/><br/>
                        1.  <a href="#" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline hover:text-blue-600">The Article Writer </a> 
                            : draft a full-length blog post from just a keyword or idea<br/>
                        2.  <a href="#" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline hover:text-blue-600">The Listicle Writer </a> 
                            : draft a listicle-style blog post<br/>
                        3.  <a href="#" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline hover:text-blue-600">The Post Outline tool </a> 
                            : come up with a detailed outline to use with AI or a human writer<br/>
                        4.  <a href="#" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline hover:text-blue-600">Post Introduction </a> , 
                            <a href="#" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline hover:text-blue-600">Paragraph </a> ,
                            <a href="#" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline hover:text-blue-600">Post Conclusion </a> and
                            <a href="#" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline hover:text-blue-600">FAQ  </a>  
                            tools: draft your post bit by bit  <br/> <br/>
                            If you’re at an earlier stage of the content creation process, we have AI-powered idea generators like the 
                            <a href="#" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline hover:text-blue-600">  Post Ideas  </a>  and
                            <a href="#" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline hover:text-blue-600"> Smart Suggest  </a>  tools`,
        },
        {
            heading: "What Other AI Tools Can I Use to Help Me Grow My Business?",
            intro1: `We have dozens of powerful AI tools in RightBlogger. Some of the best ones you can use for fast business growth are:<br/><br/>
                        1.  <a href="#" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline hover:text-blue-600">The Keyword Research Tool </a> 
                            : pinpoint the best keywords to target for great traffic<br/>
                        2.  <a href="#" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline hover:text-blue-600">The Backlink Checker Tool </a> 
                            : find out the exact backlinks your competitors’ are getting<br/>
                        3.  <a href="#" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline hover:text-blue-600">The Feature/Benefit/Outcome Tool </a> 
                            : write stronger sales copy for your products or services<br/>
                        4.  <a href="#" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline hover:text-blue-600">The Ad Copy Tool </a> 
                            : create ad copy to draw in readers<br/><br/>
                            We’ve also got loads of social media tools to help you build your following online, podcast tools, AI video script and outline tools, and much more. You could even use our 
                            <a href="#" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline hover:text-blue-600">AI image generator</a> 
                            for custom visuals.`,
        },
        {
            heading: "Who is the YouTube Video to Blog Post Generator Tool Designed For?",
            intro1: `When we created the video to post tool, we had in mind both YouTubers and bloggers. Whether you’re a YouTube creator who wants to build a profitable website and business or a blogger looking to repurpose content, it should be a great fit. We had all sorts of use cases in mind, from repurposing a product tutorial to creating blog posts for beginners based on super-simple videos.<br/><br/>
                            It’s also a great tool for content marketers, content creators, SEO professionals carrying out content creation for their clients, and small business owners. Basically, if you’re using both video creation and written content for your digital marketing, this tool is for you!`,
        },
        {
            heading: "How Do I Sign Up for RightBlogger and How Much Does it Cost?",
            intro1: `You can 
                            <a href="#" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline hover:text-blue-600">sign up for a free RightBlogger account</a> 
                            to try out most of our tools for as long as you want. There are some restrictions in place (e.g. a monthly word limit) but it’s a great way to get started, especially if you only want to create a fairly small amount of content. No catches and no credit card required.  <br/><br/>
                            Want to go further? Then you’ll love our 
                            <a href="#" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline hover:text-blue-600">Unlimited account</a> 
                            . As you might guess from the name, this offers full access to all our 80+ blogging tools and unlimited monthly usage. It also gives you access to our premium features like AI Chat, MyTone, and the Knowledge Library. We’ve kept our pricing as low as possible at just $29.99/month, or $24.99/month when paid upfront annually.`,
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
