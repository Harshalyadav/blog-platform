import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";

export default function Signup() {
 const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/admin/signup', form);
      alert(res.data.message || 'Signup successful!');
      navigate('/Login');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <Box component="form" onSubmit={handleSignup} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4">Signup</Typography>
      <TextField name="username" label="Username" value={form.username} onChange={handleChange} required />
      <TextField name="email" label="Email" type="email" value={form.email} onChange={handleChange} required />
      <TextField name="password" label="Password" type="password" value={form.password} onChange={handleChange} required />
      <Button type="submit" variant="contained">Register</Button>
    </Box>
  );
}
