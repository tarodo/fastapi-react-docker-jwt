import React, {useState} from 'react';
import {Card, CardContent, Grid, Typography} from "@mui/material";
import {css} from "@emotion/css";
import Button from "@mui/material/Button";
import axios from "axios";
import {Config} from "../config";

const MainPage = () => {
  const [testResult, setTestResult] = useState("");
  const [loginUser, setLoginUser] = useState("");
  const [csrf, setCsrf] = useState("");
  const instance = axios.create({
     withCredentials: true,
     baseURL: Config.url
  })

  const getItem = key =>
    document.cookie.split("; ").reduce((total, currentCookie) => {
       const item = currentCookie.split("=");
       const storedKey = item[0];
       const storedValue = item[1];
       return key === storedKey
         ? decodeURIComponent(storedValue)
         : total;
    }, '');

  const login = () => {
    instance.post('login', {username: "test", password: "test"}).then((res) => {
      if (res && res.status === 200) {
        setLoginUser(res.data["msg"]);
        setCsrf(getItem("csrf_access_token"));
      }
    }).catch((e) => {

    });
  }

  const refresh_token = () => {
    console.log(getItem("csrf_access_token"))
    instance.post(`refresh`, {},{headers: {'X-CSRF-Token': getItem("csrf_access_token")}}).then((res) => {
      if (res && res.status === 200) {
        setCsrf(getItem("csrf_access_token"));
      }
    }).catch((e) => {

    });
  }

  const prot_get = () => {
    instance.get(`protected`).then((res) => {
      if (res && res.status === 200) {
        setTestResult(res.data["user"].toString());
      }
    }).catch((e) => {

    });
  }

  const logout = () => {
    instance.delete('logout',{headers: {'X-CSRF-Token': getItem("csrf_access_token")}}).then((res) => {
      if (res && res.status === 200) {
        setLoginUser("")
        setTestResult("");
        setCsrf(getItem("csrf_access_token"))
      }
    })
  }

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
          <Typography position="static" gutterBottom variant="h5">Login Status: {loginUser}</Typography>
          <Typography position="static" gutterBottom variant="h5">CSRF Token : {csrf}</Typography>
          <Typography position="static" gutterBottom variant="h5">Protected : {testResult}</Typography>
          <Button
            onClick={login}
            variant="contained"
            sx={{ marginTop: 2 }}
            fullWidth
          >
            LogIn
          </Button>
          <Button
            onClick={refresh_token}
            variant="contained"
            sx={{ marginTop: 2 }}
            fullWidth
          >
            Refresh
          </Button>
          <Button
            onClick={prot_get}
            variant="contained"
            sx={{ marginTop: 2 }}
            fullWidth
          >
            Protected
          </Button>
          <Button
            onClick={logout}
            variant="contained"
            sx={{ marginTop: 2 }}
            fullWidth
          >
            LogOut
          </Button>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default MainPage;