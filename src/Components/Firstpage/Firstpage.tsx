import React, { useState } from 'react'
import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';
import {  useNavigate } from 'react-router-dom';
function Firstpage() {
  const navigate=useNavigate()
const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Basic form validation
    if (!name || !phone || !email) {
      setError('Please fill out all fields.');
      return;
    }

    // Save user details to local storage
    localStorage.setItem('userDetails', JSON.stringify({ name, phone, email }));
    navigate('/secondpage')
    // Optionally, you can navigate to the second page here or set a state to indicate form submission
    // For now, we'll just log the details to console
    console.log({ name, phone, email });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Enter Your Details
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Phone Number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <div style={{ color: 'white', backgroundColor: 'red', padding: '10px', borderRadius: '5px' }}>
          {error}
        </div>
      </Snackbar>
    </Container>
  )
}

export default Firstpage