"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import { EditorContent, useEditor, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Mathematics from "@tiptap/extension-mathematics";
import { TableKit } from "@tiptap/extension-table";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style/text-style";
import FontFamily from "@tiptap/extension-text-style/font-family";
import FontSize from "@tiptap/extension-text-style/font-size";
import LineHeight from "@tiptap/extension-text-style/line-height";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";

const maximumImageSize = 700_000;

export const blogEditorExtensions = [
  StarterKit.configure({ link: false }),
  Link.configure({ openOnClick: false, autolink: true, linkOnPaste: true, HTMLAttributes: { target: "_blank", rel: "noopener noreferrer" } }),
  TextStyle, Color, Highlight.configure({ multicolor: true }), FontFamily, FontSize, LineHeight,
  TextAlign.configure({ types: ["heading", "paragraph"] }), Subscript, Superscript,
  Image.configure({ allowBase64: true }), TableKit.configure({ table: { resizable: true } }),
  Mathematics.configure({ katexOptions: { throwOnError: false } }),
];

function readImageFile(file: File): Promise<{ src: string; alt: string }> {
  if (!["image/png", "image/jpeg", "image/gif", "image/webp"].includes(file.type)) {
    return Promise.reject(new Error("PNG, JPG, GIF অথবা WebP ছবি যোগ করুন।"));
  }
  if (file.size > maximumImageSize) {
    return Promise.reject(
      new Error("ছবির আকার ৭০০ KB-এর মধ্যে রাখুন, কারণ পোস্ট এই ব্রাউজারেই সংরক্ষিত হয়।"),
    );
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("ছবিটি পড়া যায়নি। আবার চেষ্টা করুন।"));
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        reject(new Error("ছবিটি পড়া যায়নি। আবার চেষ্টা করুন।"));
        return;
      }
      resolve({ src: reader.result, alt: file.name });
    };
    reader.readAsDataURL(file);
  });
}

type RichTextEditorProps = {
  initialContent?: JSONContent;
  content?: JSONContent;
  onContentChange?: (content: JSONContent, text: string) => void;
  onError?: (error: string) => void;
  className?: string;
};

export function RichTextEditor({
  initialContent = { type: "doc", content: [{ type: "paragraph" }] },
  content,
  onContentChange,
  onError,
  className = "",
}: RichTextEditorProps) {
  const [editorVersion, setEditorVersion] = useState(0);
  const [composerError, setComposerError] = useState("");
  const imageInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: blogEditorExtensions,
    immediatelyRender: false,
    content: initialContent,
    editorProps: {
      handlePaste: (view, event) => {
        const files = Array.from(event.clipboardData?.files ?? []).filter((file) =>
          ["image/png", "image/jpeg", "image/gif", "image/webp"].includes(file.type),
        );
        if (files.length === 0) return false;
        event.preventDefault();
        void Promise.all(files.map(readImageFile))
          .then((images) => {
            if (view.isDestroyed) return;
            let transaction = view.state.tr;
            const position = view.state.selection.from;
            for (const image of images) {
              const node = view.state.schema.nodes.image.create(image);
              const mappedPosition = transaction.mapping.map(position, 1);
              transaction = transaction.replaceRangeWith(
                mappedPosition,
                mappedPosition,
                node,
              );
            }
            view.dispatch(transaction);
            setComposerError("");
            onError?.("");
          })
          .catch((error: unknown) => {
            setComposerError(
              error instanceof Error ? error.message : "ছবি যোগ করা যায়নি।",
            );
            onError?.(error instanceof Error ? error.message : "ছবি যোগ করা যায়নি।");
          });
        return true;
      },
      handleDrop: (view, event) => {
        const files = Array.from(event.dataTransfer?.files ?? []).filter((file) =>
          ["image/png", "image/jpeg", "image/gif", "image/webp"].includes(file.type),
        );
        if (files.length === 0) return false;
        event.preventDefault();
        const position = view.posAtCoords({ left: event.clientX, top: event.clientY })?.pos;
        void Promise.all(files.map(readImageFile))
          .then((images) => {
            if (view.isDestroyed) return;
            let transaction = view.state.tr;
            const insertAt = position ?? view.state.selection.from;
            for (const image of images) {
              const node = view.state.schema.nodes.image.create(image);
              const mappedPosition = transaction.mapping.map(insertAt, 1);
              transaction = transaction.replaceRangeWith(
                mappedPosition,
                mappedPosition,
                node,
              );
            }
            view.dispatch(transaction);
            setComposerError("");
            onError?.("");
          })
          .catch((error: unknown) => {
            setComposerError(
              error instanceof Error ? error.message : "ছবি যোগ করা যায়নি।",
            );
            onError?.(error instanceof Error ? error.message : "ছবি যোগ করা যায়নি।");
          });
        return true;
      },
    },
    onSelectionUpdate: () => setEditorVersion((version) => version + 1),
    onUpdate: () => {
      setEditorVersion((version) => version + 1);
      if (editor && onContentChange) {
        onContentChange(editor.getJSON(), editor.getText());
      }
    },
  });

  async function uploadImage(file: File) {
    try {
      const image = await readImageFile(file);
      editor?.chain().focus().setImage(image).run();
      setComposerError("");
      onError?.("");
    } catch (error) {
      setComposerError(
        error instanceof Error ? error.message : "ছবি যোগ করা যায়নি।",
      );
      onError?.(error instanceof Error ? error.message : "ছবি যোগ করা যায়নি।");
    }
  }

  function addLink() {
    const selection = editor?.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      " ",
    );
    const input = window.prompt(
      "লিংকের URL লিখুন",
      editor?.getAttributes("link").href ?? "https://",
    );
    if (input === null) return;
    const url = input.trim();
    if (!url) {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    let safeUrl: string;
    try {
      const parsed = new URL(url, window.location.origin);
      if (!["http:", "https:", "mailto:"].includes(parsed.protocol)) {
        onError?.("নিরাপত্তার জন্য শুধু http, https বা mailto link ব্যবহার করুন");
        return;
      }
      safeUrl = parsed.href;
    } catch {
      onError?.("সঠিক link URL লিখুন");
      return;
    }
    editor?.chain().focus().extendMarkRange("link").setLink({ href: safeUrl }).run();
    if (!selection) editor?.chain().focus().insertContent(safeUrl).run();
  }

  function addMath(block: boolean) {
    const latex = window.prompt(
      block ? "Block equation-এর LaTeX লিখুন" : "Inline equation-এর LaTeX লিখুন",
      block ? "\\frac{a}{b}" : "x^2 + y^2 = z^2",
    );
    if (!latex?.trim()) return;
    if (block) {
      editor?.chain().focus().insertBlockMath({ latex: latex.trim() }).run();
    } else {
      editor?.chain().focus().insertInlineMath({ latex: latex.trim() }).run();
    }
  }

  void editorVersion;

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className={`overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-700 ${className}`}>
      <div className="flex flex-wrap items-center gap-1 border-b border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950">
        <ToolbarButton
          label="Bold"
          active={editor?.isActive("bold")}
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          <strong className="text-sm">B</strong>
        </ToolbarButton>
        <ToolbarButton
          label="Italic"
          active={editor?.isActive("italic")}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        >
          <span className="text-sm italic">I</span>
        </ToolbarButton>
        <ToolbarButton
          label="Strikethrough"
          active={editor?.isActive("strike")}
          onClick={() => editor?.chain().focus().toggleStrike().run()}
        >
          <span className="text-sm line-through">S</span>
        </ToolbarButton>
        <ToolbarButton
          label="Inline code"
          active={editor?.isActive("code")}
          onClick={() => editor?.chain().focus().toggleCode().run()}
        >
          <FiCode aria-hidden="true" className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Underline"
          active={editor?.isActive("underline")}
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
        >
          <span className="text-sm underline">U</span>
        </ToolbarButton>
        <span className="mx-1 h-5 w-px bg-zinc-200 dark:bg-zinc-700" />
        <label className="sr-only" htmlFor="blog-heading-style">Text style</label>
        <select
          id="blog-heading-style"
          aria-label="Paragraph or heading"
          value={
            editor?.isActive("heading", { level: 1 }) ? "h1"
              : editor?.isActive("heading", { level: 2 }) ? "h2"
                : editor?.isActive("heading", { level: 3 }) ? "h3"
                  : "paragraph"
          }
          onChange={(event) => {
            const level = Number(event.target.value.slice(1));
            if (event.target.value === "paragraph") {
              editor?.chain().focus().setParagraph().run();
            } else if (level >= 1 && level <= 3) {
              editor?.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 }).run();
            }
          }}
          className="h-9 rounded-lg border-0 bg-transparent px-2 text-xs font-semibold text-zinc-600 outline-none hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          <option value="paragraph">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
        </select>
        <label className="sr-only" htmlFor="blog-font-family">Font family</label>
        <select id="blog-font-family" aria-label="Font family" defaultValue="" onChange={(event) => { if (event.target.value) editor?.chain().focus().setFontFamily(event.target.value).run(); else editor?.chain().focus().unsetFontFamily().run(); }} className="h-9 max-w-32 rounded-lg border-0 bg-transparent px-2 text-xs font-semibold text-zinc-600 outline-none hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800">
          <option value="">Font</option><option value="Arial, sans-serif">Arial</option><option value="Georgia, serif">Georgia</option><option value="'Times New Roman', serif">Times New Roman</option><option value="monospace">Monospace</option>
        </select>
        <label className="sr-only" htmlFor="blog-font-size">Font size</label>
        <select id="blog-font-size" aria-label="Font size" defaultValue="" onChange={(event) => { if (event.target.value) editor?.chain().focus().setFontSize(event.target.value).run(); else editor?.chain().focus().unsetFontSize().run(); }} className="h-9 w-20 rounded-lg border-0 bg-transparent px-2 text-xs font-semibold text-zinc-600 outline-none hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800">
          <option value="">Size</option>{['12px', '14px', '16px', '18px', '24px', '32px'].map((size) => <option key={size} value={size}>{size}</option>)}
        </select>
        <ToolbarButton label="Align left" active={editor?.isActive({ textAlign: "left" })} onClick={() => editor?.chain().focus().setTextAlign("left").run()}><FiAlignLeft aria-hidden="true" /></ToolbarButton>
        <ToolbarButton label="Align center" active={editor?.isActive({ textAlign: "center" })} onClick={() => editor?.chain().focus().setTextAlign("center").run()}><FiAlignCenter aria-hidden="true" /></ToolbarButton>
        <ToolbarButton label="Align right" active={editor?.isActive({ textAlign: "right" })} onClick={() => editor?.chain().focus().setTextAlign("right").run()}><FiAlignRight aria-hidden="true" /></ToolbarButton>
        <ToolbarButton label="Justify" active={editor?.isActive({ textAlign: "justify" })} onClick={() => editor?.chain().focus().setTextAlign("justify").run()}><FiAlignJustify aria-hidden="true" /></ToolbarButton>
        <ToolbarButton label="Subscript" active={editor?.isActive("subscript")} onClick={() => editor?.chain().focus().toggleSubscript().run()}><span className="text-xs">x2</span></ToolbarButton>
        <ToolbarButton label="Superscript" active={editor?.isActive("superscript")} onClick={() => editor?.chain().focus().toggleSuperscript().run()}><span className="text-xs">x^2</span></ToolbarButton>
        <label className="sr-only" htmlFor="blog-line-height">Line height</label>
        <select id="blog-line-height" aria-label="Line height" defaultValue="" onChange={(event) => { if (event.target.value) editor?.chain().focus().setLineHeight(event.target.value).run(); else editor?.chain().focus().unsetLineHeight().run(); }} className="h-9 w-20 rounded-lg border-0 bg-transparent px-2 text-xs font-semibold text-zinc-600 outline-none hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800">
          <option value="">Line</option><option value="1">1.0</option><option value="1.25">1.25</option><option value="1.5">1.5</option><option value="2">2.0</option>
        </select>
        <ToolbarButton
          label="Bullet list"
          active={editor?.isActive("bulletList")}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        >
          <span className="text-lg leading-none">•</span>
        </ToolbarButton>
        <ToolbarButton
          label="Numbered list"
          active={editor?.isActive("orderedList")}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        >
          <span className="text-xs font-bold">1.</span>
        </ToolbarButton>
        <ToolbarButton
          label="Quote"
          active={editor?.isActive("blockquote")}
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
        >
          <span className="text-sm font-bold">“ ”</span>
        </ToolbarButton>
        <ToolbarButton
          label="Insert link"
          active={editor?.isActive("link")}
          onClick={addLink}
        >
          <FiLink aria-hidden="true" />
        </ToolbarButton>
        <label
          title="Text color"
          className="relative grid size-9 cursor-pointer place-items-center rounded-lg text-sm font-black text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          A
          <input
            type="color"
            aria-label="Text color"
            defaultValue="#166534"
            onChange={(event) =>
              editor?.chain().focus().setColor(event.target.value).run()
            }
            className="absolute bottom-1 left-1/2 h-1 w-4 -translate-x-1/2 cursor-pointer opacity-0"
          />
          <span className="absolute bottom-1 h-0.5 w-4 bg-emerald-600" />
        </label>
        <ToolbarButton
          label="Highlight"
          active={editor?.isActive("highlight")}
          onClick={() =>
            editor
              ?.chain()
              .focus()
              .toggleHighlight({ color: "#fef08a" })
              .run()
          }
        >
          <span className="rounded-sm bg-yellow-200 px-1 text-xs font-bold text-zinc-800">H</span>
        </ToolbarButton>
        <label
          title="Highlight color"
          className="relative grid size-9 cursor-pointer place-items-center rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <span className="size-4 rounded bg-yellow-200 ring-1 ring-zinc-300" />
          <input
            type="color"
            aria-label="Highlight color"
            defaultValue="#fef08a"
            onChange={(event) =>
              editor?.chain().focus().setHighlight({ color: event.target.value }).run()
            }
            className="absolute inset-0 size-full cursor-pointer opacity-0"
          />
        </label>
        <ToolbarButton label="Insert table" onClick={() => editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>
          <FiTable aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton
          label="Insert image"
          onClick={() => imageInputRef.current?.click()}
        >
          <FiImage aria-hidden="true" />
        </ToolbarButton>
        <input
          ref={imageInputRef}
          type="file"
          accept="image/png,image/jpeg,image/gif,image/webp"
          className="sr-only"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void uploadImage(file);
            event.target.value = "";
          }}
        />
        <ToolbarButton label="Inline math" onClick={() => addMath(false)}>
          <span className="text-xs font-bold">x²</span>
        </ToolbarButton>
        <ToolbarButton label="Block equation" onClick={() => addMath(true)}>
          <FiCode aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton
          label="Code block"
          active={editor?.isActive("codeBlock")}
          onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
        >
          <span className="text-[10px] font-bold">{"</>"}</span>
        </ToolbarButton>
        <ToolbarButton
          label="Horizontal divider"
          onClick={() => editor?.chain().focus().setHorizontalRule().run()}
        >
          <FiMinus aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton
          label="Clear formatting"
          onClick={() =>
            editor?.chain().focus().unsetAllMarks().clearNodes().run()
          }
        >
          <span className="text-xs font-bold">Tx</span>
        </ToolbarButton>
        <ToolbarButton label="Hard line break" onClick={() => editor?.chain().focus().setHardBreak().run()}>
          <span className="text-[10px] font-bold">↵</span>
        </ToolbarButton>
        <span className="mx-1 h-5 w-px bg-zinc-200 dark:bg-zinc-700" />
        <ToolbarButton label="Undo" onClick={() => editor?.chain().focus().undo().run()}>
          <FiRotateCcw aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton label="Redo" onClick={() => editor?.chain().focus().redo().run()}>
          <FiRotateCw aria-hidden="true" />
        </ToolbarButton>
        {editor?.isActive("table") && (
          <>
            <ToolbarButton label="Add table row" onClick={() => editor.chain().focus().addRowAfter().run()}>
              <span className="text-xs font-bold">+row</span>
            </ToolbarButton>
            <ToolbarButton label="Add table column" onClick={() => editor.chain().focus().addColumnAfter().run()}>
              <span className="text-xs font-bold">+col</span>
            </ToolbarButton>
            <ToolbarButton label="Delete table" onClick={() => editor.chain().focus().deleteTable().run()}>
              <FiX aria-hidden="true" />
            </ToolbarButton>
          </>
        )}
      </div>
      <div className="blog-prose min-h-48 px-4 py-3 text-sm text-zinc-800 dark:text-zinc-200">
        <EditorContent editor={editor} />
      </div>
      {composerError && (
        <p role="alert" className="mt-2 rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-700 dark:bg-rose-950/40 dark:text-rose-300">
          {composerError}
        </p>
      )}
    </div>
  );
}

function ToolbarButton({
  label,
  active,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      title={label}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className={`grid size-9 place-items-center rounded-lg transition ${
        active
          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
          : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

import { FiAlignCenter, FiAlignJustify, FiAlignLeft, FiAlignRight, FiCode, FiImage, FiLink, FiMinus, FiRotateCcw, FiRotateCw, FiTable, FiX } from "react-icons/fi";