"use client";

import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { blogEditorExtensions } from "@/src/components/blogs/RichTextEditor";
import type { JSONContent } from "@tiptap/react";

type TopicNotesContentProps = {
  content: JSONContent;
  className?: string;
};

export function TopicNotesContent({ content, className = "" }: TopicNotesContentProps) {
  const editor = useEditor({
    extensions: blogEditorExtensions,
    immediatelyRender: false,
    editable: false,
    content,
  });

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className={`blog-prose blog-reader ${className}`}>
      <EditorContent editor={editor} />
    </div>
  );
}