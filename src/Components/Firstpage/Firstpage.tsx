import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Snackbar, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Firstpage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name || !phone || !email) {
      setError('Please fill out all fields.');
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    localStorage.setItem('userDetails', JSON.stringify({ name, phone, email }));
    navigate('/secondpage');
  };

  return (
    <Container maxWidth="sm" >
      <Typography variant="h4" gutterBottom align='center'>
        Enter Your Details
      </Typography>
      <Box component="form" onSubmit={handleFormSubmit}>
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
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </div>
      </Box>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <div style={{ color: 'white', backgroundColor: 'red', padding: '10px', borderRadius: '5px' }}>
          {error}
        </div>
      </Snackbar>
    </Container>
  );
}

export default Firstpage;
