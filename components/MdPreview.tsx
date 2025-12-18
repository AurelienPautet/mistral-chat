"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
interface MarkdownPreviewProps {
  content: string;
}

function MarkdownPreview({ content }: MarkdownPreviewProps) {
  return (
    <article className="prose prose-slate  max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </article>
  );
}

export { MarkdownPreview };
