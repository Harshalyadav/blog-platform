import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
export default function Login() {
  // const router = useRouter();
    const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
 const { login } = useAuth();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/admin/login', form, {
        headers: {
          'Content-Type': 'application/json'
        }});
        localStorage.setItem('token', res.data.accessToken);
       console.log(localStorage.getItem('token'), "response");
login(res.data.accessToken); 
      alert('Login successful!');
  
      navigate('/dashboard');
    } catch (err) {
      console.log(err,"error");
      alert(err || 'Login failed');
    }
  };

  return (
    <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4">Login</Typography>
      <TextField name="email" label="Email" type="email" value={form.email} onChange={handleChange} required />
      <TextField name="password" label="Password" type="password" value={form.password} onChange={handleChange} required />
      <Button type="submit" variant="contained">Login</Button>
    </Box>
  );
}
