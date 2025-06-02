import React from 'react';
import ReactMarkdown from 'react-markdown';

const BlogContent = ({ markdown }) => {
    return (
        <div className="prose max-w-none prose-headings:text-yellow-500 prose-a:text-blue-600 dark:prose-invert">
            <h1 className="text-yellow-500 mb-4">{markdown.title}</h1>
            <ReactMarkdown>{markdown.content}</ReactMarkdown>
        </div>
    );
};

export default BlogContent;
