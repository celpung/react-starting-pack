import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextEditor: React.FC = () => {
  const [text, setText] = useState<string>('');

  const handleChange = (value: string) => {
    setText(value);
  };
  
  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['bold', 'italic', 'underline'],
      ['link'],
      ['image'],
      [{ 'color': [] }, { 'background': [] }],
      ['clean'],
    ],
  };

  return (
    <div>
      <ReactQuill
        value={text}
        onChange={handleChange}
        modules={modules}
        theme="snow"
      />
    </div>
  );
};

export default TextEditor;
