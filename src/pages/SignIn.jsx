import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useLoginMutation } from '../slices/auth/authApiSlice';
import { setCredentials } from '../slices/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openAlert } from '../slices/alert/alertSlice';
import { setLoading } from '../slices/loading/loadingSlice';
import usePersist from '../hooks/usePersist';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [persist, setPersist] = usePersist();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [dispatch, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { accessToken, firstName, lastName } = await login({
        username,
        password,
      }).unwrap();

      dispatch(setCredentials({ accessToken, firstName, lastName }));

      setUsername('');
      setPassword('');

      dispatch(
        openAlert({ message: 'Successfully logged in', severity: 'success' })
      );
      navigate('/', { replace: true });
    } catch (err) {
      if (!err.status) {
        dispatch(
          openAlert({ message: 'No Server Response', severity: 'error' })
        );
      } else if (err.status === 400) {
        dispatch(
          openAlert({
            message: 'Missing Username or Password',
            severity: 'error',
          })
        );
      } else if (err.status === 401) {
        dispatch(
          openAlert({ message: 'Wrong credentials', severity: 'error' })
        );
      } else {
        dispatch(openAlert({ message: err.data?.message, severity: 'error' }));
      }
    }
  };

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handlePersist = (e) => setPersist((prev) => !prev);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            onChange={handleUsername}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={handlePassword}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
            onChange={handlePersist}
            checked={persist}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> */}
        </Box>
      </Box>
    </Container>
  );
}
