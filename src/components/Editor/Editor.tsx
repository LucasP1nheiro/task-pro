'use client'

import { initialEditorContent } from '@/lib/initialEditorContent'
import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
  RxFontBold,
  RxFontItalic,
  RxStrikethrough,
  RxCode,
} from 'react-icons/rx'
import BubbleButton from './BubbleButton'
import FloatingMenuButton from './FloatingMenuButton'
import { useState, useEffect } from 'react'
import Placeholder from '@tiptap/extension-placeholder'

const Editor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return 'What’s the title?'
          }

          return 'Can you add some further context?'
        },
      }),
    ],
    content: initialEditorContent,
    editorProps: {
      attributes: {
        class: 'outline-none',
      },
    },
  })

  const [text, setText] = useState<string>('')

  useEffect(() => {
    if (editor?.getHTML()) {
      setText(editor?.getHTML())
    }
  }, [editor, editor?.getHTML])

  useEffect(() => {
    console.log(text)
  }, [text])

  return (
    <>
      <EditorContent
        className="prose prose-sky mx-auto max-w-[700px] py-24 text-tertiary placeholder:text-tertiary prose-h1:text-secondary prose-h2:text-secondary prose-h3:text-secondary prose-blockquote:text-secondary prose-strong:text-secondary prose-code:text-secondary"
        editor={editor}
        data-placeholder
      />
      {editor && (
        <FloatingMenu
          editor={editor}
          shouldShow={({ state }) => {
            const { $from } = state.selection

            const currentLineText = $from.nodeBefore?.textContent

            return currentLineText === '/'
          }}
          className="flex max-h-[700px] flex-col gap-4 overflow-y-scroll rounded bg-secondary px-1 pb-24 pt-2"
        >
          <FloatingMenuButton
            onClick={() => editor.chain().focus().setParagraph().run()}
            data-active={editor.isActive('paragraph')}
            src={'https://www.notion.so/images/blocks/text/en-US.png'}
            title="Text"
            description="Just start writing with plain text"
          />
          <FloatingMenuButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            data-active={editor.isActive('heading', { level: 1 })}
            src="https://www.notion.so/images/blocks/header.57a7576a.png"
            title="Heading 1"
            description="Big section heading"
          />
          <FloatingMenuButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            data-active={editor.isActive('heading', { level: 2 })}
            src="https://www.notion.so/images/blocks/subheader.9aab4769.png"
            title="Heading 2"
            description="Medium section heading"
          />
          <FloatingMenuButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            data-active={editor.isActive('heading', { level: 3 })}
            src="https://www.notion.so/images/blocks/subsubheader.d0ed0bb3.png"
            title="Heading 3"
            description="Small section heading"
          />

          <FloatingMenuButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            data-active={editor.isActive('bulletList')}
            src="https://www.notion.so/images/blocks/bulleted-list.0e87e917.png"
            title="Bulleted list"
            description="Create a simple bulleted list"
          />

          <FloatingMenuButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            data-active={editor.isActive('orderList')}
            src="https://www.notion.so/images/blocks/numbered-list.0406affe.png"
            title="Ordered list"
            description="Create a simple ordered list"
          />

          <FloatingMenuButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            data-active={editor.isActive('blockquote')}
            src="https://www.notion.so/images/blocks/quote/en-US.png"
            title="Block quote"
            description="Capture a quote"
          />

          <FloatingMenuButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            data-active={editor.isActive('codeblock')}
            src="https://www.notion.so/images/blocks/code.a8b201f4.png"
            title="Code block"
            description="Capture a code snippet"
          />

          <FloatingMenuButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            src="https://www.notion.so/images/blocks/divider.210d0faf.png"
            title="Divider"
            description="Add a divider into the text"
          />
        </FloatingMenu>
      )}

      {editor && (
        <BubbleMenu editor={editor} className="flex items-center gap-1">
          <BubbleButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            data-active={editor.isActive('bold')}
          >
            <RxFontBold />
          </BubbleButton>

          <BubbleButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            data-active={editor.isActive('italic')}
          >
            <RxFontItalic />
          </BubbleButton>
          <BubbleButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            data-active={editor.isActive('strike')}
          >
            <RxStrikethrough />
          </BubbleButton>
          <BubbleButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            data-active={editor.isActive('code')}
          >
            <RxCode />
          </BubbleButton>
        </BubbleMenu>
      )}
    </>
  )
}

export default Editor
