import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

useEffect(() => {
  async function fetchPosts() {
    try {
      const res = await axios.get('http://localhost:5000/api/posts');
      console.log(res.data, 'posts');  // logs data here
      setPosts(res.data.posts,"djdjjd");
    } catch (err) {
      console.error('Failed to fetch posts', err);
    }
  }
  fetchPosts();
}, []);

console.log(posts, 'posts'); // logs data here
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        All Blog Posts
      </Typography>

    {posts?.map((post) => (
  <Grid item xs={12} md={6} key={post.id}>
    <Card>
      <CardContent>
        <Typography variant="h6">{post.title}</Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {post.content ? post.content.replace(/<[^>]+>/g, '').slice(0, 150) + '...' : ''}
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          By {post.author?.username || 'Unknown'} on {new Date(post.createdAt).toLocaleDateString()}
        </Typography>
      </CardContent>
      <Button size="small" onClick={() => navigate(`/posts/${post.id}`)}>
        Read More
      </Button>
    </Card>
  </Grid>
))}

    </Container>
  );
};

export default Home;
