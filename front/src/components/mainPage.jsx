import React from 'react';
import {Card, CardContent, Grid, Typography} from "@mui/material";
import {css} from "@emotion/css";
import Button from "@mui/material/Button";
import axios from "axios";
import {Config} from "../config";

const MainPage = () => {
  const prot_get = () => {
    const instance = axios.create({
       withCredentials: true,
       baseURL: Config.url
    })
    instance.get(`protected`).then((res) => {
      if (res && res.status === 200) {
        console.log(res.data)
      }
    }).catch((e) => {

    });
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
          <Typography position="static" gutterBottom variant="h5">Log In</Typography>
          <Button
            onClick={prot_get}
            variant="contained"
            sx={{ marginTop: 2 }}
            fullWidth
          >
            Test me
          </Button>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default MainPage;