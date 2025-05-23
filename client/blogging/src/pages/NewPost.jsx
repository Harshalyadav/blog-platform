// File: pages/NewPost.js
import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { ClassicEditor, Essentials, Paragraph, Bold, Italic } from 'ckeditor5';
// import { FormatPainter } from 'ckeditor5-premium-features';
import { useNavigate } from "react-router-dom";

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
 const navigate = useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token"); // get token from localStorage

  if (!token) {
    alert("You must be logged in!");
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/posts/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,  // token without Bearer prefix
      },
      body: JSON.stringify({ title, content }),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Post created successfully!');
      navigate('/dashboard');
    } else {
      alert(`Error: ${data.message}`);
    }
  } catch (err) {
    console.error('Post submission failed', err);
    alert('Something went wrong. Try again.');
  }
};

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h4">Create a New Post</Typography>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Typography variant="h6">Content</Typography>
      <CKEditor
        editor={ClassicEditor}
            config={ {
                licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDkyNTQzOTksImp0aSI6ImM1YzFhZGJiLTk0OTAtNGIzZS04NzBlLTBkNGExYjU3OGUyOCIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImE0ZWEzZWRmIn0.io6d0mGmT8yHoFuU2aDYzP8CWpnzX-2oCTbTJs7M_dzwjd2pGPqPgHcbVFeLPVCaORToRpw5VxiONHhpc5yYrQ', // Or 'GPL'.
                // plugins: [ Essentials, Paragraph, Bold, Italic, FormatPainter ],
                toolbar: [ 'undo', 'redo', '|', 'bold', 'italic', '|', 'formatPainter' ],
                initialData: '<p>Hello from CKEditor 5 in React!</p>',
            } }
        data={content}
        onChange={(event, editor) => {
          const data = editor.getData();
          setContent(data);
        }}
      />
      <Button type="submit" variant="contained" color="primary">
        Publish
      </Button>
    </Box>
  );
}
