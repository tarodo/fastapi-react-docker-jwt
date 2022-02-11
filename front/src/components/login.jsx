import React, { useState } from 'react';
import {
  Alert, Box, Card, CardActions, CardContent, Grid, Link, TextField, Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import Joi from 'joi-browser';
import axios from 'axios';
import { css } from '@emotion/css';
import { Config } from '../config';
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {
  const [data, setData] = useState({ email: '', pswd: '' });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const schema = {
    email: Joi.string().required().min(3).label('Email'),
    pswd: Joi.string().required().min(3).label('Password')
    // email: Joi.string().email({ tlds: { allow: false } }).required().label('Email'),
    // pswd: Joi.string().required().min(5).label('Password'),
  };

  const doSubmit = () => {
    // const bodyFormData = new FormData();
    // bodyFormData.set('username', data.email);
    // bodyFormData.set('password', data.pswd);
    const instance = axios.create({
       withCredentials: true,
    })
    instance.post(`${Config.url}login`, {username: data.email, password: data.pswd}).then((res) => {
      if (res && res.status === 200) {
        setErrors([]);
        navigate('/home');
      } else if (res && res.data) {
        setErrors([res.data.detail]);
      } else {
        setErrors(['Unknown error occured']);
      }
    }).catch((e) => {
      if (e.response && e.response.data) {
        setErrors([e.response.data.detail]);
      } else {
        setErrors(['Unknown error occured']);
      }
    });
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, schema, options);
    if (!error) return null;

    const preErrors = [];
    error.details.map((item) => (preErrors.push(item.message)));
    return preErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors || []);
    if (newErrors) return;

    doSubmit();
  };

  const handleChange = ({ currentTarget: input }) => {
    const newData = { ...data };
    newData[input.name] = input.value;
    setData(newData);
  };

  const isDisabled = data.email.trim() === '' || data.pswd.trim() === '';
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
    >
      <Card variant="outlined" className={css`
    width: 480px;
    margin-top: 10%;
    `}>
        <CardContent>
          <Typography position="static" gutterBottom variant="h5">Log In</Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              id="email"
              name="email"
              variant="filled"
              fullWidth
              label="Email"
              sx={{ marginY: 1 }}
              onChange={handleChange}
              value={data.email}
            />
            <TextField
              id="pswd"
              name="pswd"
              variant="filled"
              fullWidth
              label="Password"
              sx={{ marginY: 1 }}
              type="password"
              onChange={handleChange}
              value={data.pswd}
            />
            {errors.map((error) => (
              <Alert
                key={error}
                severity="error"
                sx={{ marginTop: 1 }}
              >
                {error}
              </Alert>
            ))}
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{ marginTop: 2 }}
              fullWidth
              disabled={isDisabled}
            >
              Log in
            </Button>
          </Box>
        </CardContent>
        <CardActions>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            px={1}
            mb={1}
          >
            <Link sx={{ cursor: 'pointer' }} href="http://localhost:3000/my_kvc">Create account</Link>
            <Link sx={{ cursor: 'pointer' }} href="http://localhost:3000/my_kvc">Forgot password?</Link>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default LoginForm;
