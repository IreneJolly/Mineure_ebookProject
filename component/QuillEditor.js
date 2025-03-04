import React, { useEffect, useRef } from 'react';
import Quill from 'quill';

const QuillEditor = ({ initialContent}) => {
    const editorRef = useRef(null);
    const quillRef = useRef(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (!quillRef.current) {
                quillRef.current = new Quill(editorRef.current, {
                    theme: 'snow',
                    modules: {
                        toolbar: [
                            [{ 'header': [1, 2, false] }],
                            ['bold', 'italic', 'underline'],
                            ['image', 'code-block'],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }]
                        ],
                    },
                });
            }
            quillRef.current.clipboard.dangerouslyPasteHTML(initialContent);
        }
    }, [initialContent]);

    return (
        <div>
            <div ref={editorRef} style={{ height: '400px', border: '1px solid #ccc' }}></div>
        </div>
    );
};

export default QuillEditor;