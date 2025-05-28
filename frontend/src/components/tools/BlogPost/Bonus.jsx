import React from 'react';
import { Link } from 'react-router-dom';

const Bonus = () => {
    const checklist = [
        {
            text: 'Install and use the ',
            links: [
                { text: 'Yoast plugin', url: '#' },
                { text: 'RankMath', url: '#' }
            ],
            after: ' plugin for WordPress'
        },
        { text: 'Make sure you’ve chosen a suitable keyword: go for medium volume and low difficulty if possible' },
        { text: 'Include your keyword in your headings (encourages rich snippets and faster indexing on Google)' },
        { text: 'Only have one H1 header in your post—this should be your post title at the top of the page' },
        { text: 'Use the correct header hierarchy, with H2 subheadings and H3 sub-subheadings' },
        { text: 'Incorporate your primary keyword naturally within the text—don’t go over the top' },
        { text: 'Have a good mix of internal and external links, with at least 3 external links' },
        {
            text: 'Craft an enticing ',
            links: [{ text: 'meta descriptions', url: '#' }],
            after: ' that incorporates your primary and (ideally) secondary keywords'
        },
        {
            text: 'Include ',
            links: [{ text: 'alt descriptions', url: '#' }],
            after: ' for all the images (photos, screenshots, illustrations, etc) in your post, using keywords within these as much as possible'
        },
        { text: 'Make sure your blog post is a suitable length—for the best SEO results, that normally means at least 1,500 words' },
        {
            text: 'Craft a ',
            links: [{ text: 'meta title', url: '#' }],
            after: ' (SEO title) that uses your primary keyword and grabs'
        },
        { text: 'Include your primary keyword in the URL (permalink) for your post' },
    ];

    return (
        <div className="bg-[#0d101d] text-white flex items-center justify-center px-4">
            <div className="max-w-xl mx-auto py-12 px-3">
                <h2 className="text-2xl font-extrabold mb-4">Bonus: Use My Free SEO Checklist Alongside This Tool</h2>
                <p className="text- mb-2">
                    Turning your videos into blog posts is a fantastic way to reap SEO benefits, getting more organic traffic to your site—and more customers for your business.
                </p>
                <p className="text- mb-4">
                    You can go even further using my personal SEO checklist:
                </p>

                <ol className="list-decimal list-inside space-y-2">
                    {checklist.map((item, index) => (
                        <li key={index} className="text-base text-white">
                            {item.text}
                            {item.links?.map((link, i) => (
                                <Link
                                    key={i}
                                    to={link.url}
                                    className="text-blue-500 underline hover:text-blue-600 mx-1"
                                >
                                    {link.text}
                                </Link>
                            ))}
                            {item.after}
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default Bonus;
