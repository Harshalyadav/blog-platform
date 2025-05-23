import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography,
  Container,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  CircularProgress,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyPosts = async () => {
    try {
      // console.log(token, 'token');
      const res = await axios.get('http://localhost:5000/api/posts/mine', {
        headers: { 'x-access-token': token },
      });
      setPosts(res.data.posts || []);
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/posts/delete/${id}`, {
        headers: { 'x-access-token': token },
      });
      setPosts(posts.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };
console.log(token, 'token');
useEffect(() => {
  if (token === undefined) return; // wait until token is initialized
  if (!token) navigate('/login');
  else fetchMyPosts();
}, [token]);

  if (loading) return <Container><CircularProgress /></Container>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        My Posts
      </Typography>

      {posts.length === 0 ? (
        <Typography>No posts yet.</Typography>
      ) : (
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid item xs={12} md={6} key={post.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{post.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(post.createdAt).toLocaleString()}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => navigate(`/edit/${post.id}`)}>
                    Edit
                  </Button>
                  <Button size="small" color="error" onClick={() => deletePost(post.id)}>
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Dashboard;
