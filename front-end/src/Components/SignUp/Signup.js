import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {NavLink} from "react-router-dom"
import { UserAuthContext } from '../Context/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        www.myecom.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
    const {SignUpUser} = React.useContext(UserAuthContext);
    const [userInfo,setUserInfo] = React.useState({
        name:"",
        number:"",
        password:"",
        passwordConfirm:"",
    })
    const handleChange = (e)=>
    {
      setUserInfo((pre)=>{
        return {...pre,[e.target.name]:e.target.value}
      })
    }
  const handleSubmit = (event) => {
    event.preventDefault();
        if(userInfo.name && userInfo.number && userInfo.password && userInfo.password)
        {
          //this will work only when all fields is given
          SignUpUser(userInfo);
        }
        else{
          toast.error("All Fields Required");
        }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
            Sign Up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  autoFocus
                  value={userInfo.name}
                  onChange={handleChange}
                />
                {/* <input type="text"  /> */}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Number"
                  name="number"
                  autoComplete="family-name"
                  value={userInfo.number}
                  onChange={handleChange}
                

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Password"
                  label="Password"
                  name="password"
                  autoComplete="email"
                  value={userInfo.password}
                  onChange={handleChange}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="passwordConfirm"
                  label="Password Confirm"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={userInfo.passwordConfirm}
                  onChange={handleChange}

                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <NavLink
            to={'/signin'}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
               Have A account
            </NavLink>
            
          </Box>

        </Box>
        <Copyright sx={{ mt: 5 }} />
        <ToastContainer
        position='top-center'
        pauseOnHover
      
        />
      </Container>
    </ThemeProvider>
  );
}