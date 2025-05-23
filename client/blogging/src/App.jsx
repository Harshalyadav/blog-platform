import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import NewPost from './pages/NewPost';
import MyPosts from './pages/MyPosts';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import EditPost from './pages/EditPost';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  {/* <Router> */}
      <CssBaseline />
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/new-post" element={<NewPost />} />
          <Route path="/myposts" element={<MyPosts />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
      </Container>
    {/* </Router> */}
    </>
  )
}

export default App
