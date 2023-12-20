import { Box, Button, Typography } from '@mui/material';
import useTitle from '../hooks/useTitle';

const NotFound = () => {
  useTitle('Page Not Found');
  return (
    <Box
      component="main"
      display="flex"
      alignItems="center"
      height="100vh"
      justifyContent="center"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        p={2}
      >
        <Typography variant="h2" mb={2}>
          Hey there
        </Typography>
        <Typography variant="body1" mb={2}>
          this page doesn't exist.
        </Typography>
        <Button variant="contained" to="/">
          Go back to home
        </Button>
      </Box>
    </Box>
  );
};

export default NotFound;
