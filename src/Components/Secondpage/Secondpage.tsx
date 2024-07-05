
import Component_1 from './Component_1';
import Component_2 from './Component_2';
import { Container, Box } from '@mui/material'; // Import Box from MUI for spacing

function Secondpage() {
  return (
    <Container>
      <Box sx={{ mt: 8, mb: 12 }}>
        <Component_1 />
      </Box>
      <Box sx={{ mb: 3 }}>
        <Component_2 />
      </Box>
    </Container>
  );
}

export default Secondpage;
