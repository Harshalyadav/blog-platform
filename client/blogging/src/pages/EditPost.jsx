import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';
const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
console.log(token, 'token');
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`,
             {
        headers: { 'x-access-token': token },
      }
        );
        setTitle(res.data.title);
        setContent(res.data.content);
        setLoading(false);
      } catch (err) {
        console.error(err);
        alert('Unable to load post');
        navigate('/');
      }
    };
    fetchPost();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/posts/update/${id}`, { title, content });
      alert('Post updated successfully');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Failed to update post');
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>Edit Post</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        <Typography sx={{ mt: 2, mb: 1 }}>Content</Typography>
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
        <Button type="submit" variant="contained" sx={{ mt: 3 }}>
          Save Changes
        </Button>
      </Box>
    </Container>
  );
};

export default EditPost;
