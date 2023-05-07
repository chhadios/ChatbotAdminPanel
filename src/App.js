import React, { useEffect,useState } from 'react';
import { makeStyles } from '@mui/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  Paper,
  Box
} from '@mui/material';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: "10px",
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: "10px",
    textAlign: 'center',
    color: 'white',
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
}));


function App() {
  
  const [userList,setUserList]=useState();
  useEffect(() => {
    axios.get('http://localhost:8000/api/auth/get-users')
      .then(response => {
        setUserList(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Admin Panel
          </Typography>
          <Button color="inherit">Log out</Button>
        </Toolbar>
      </AppBar>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h4">Welcome to the Admin Panel</Typography>
            <Typography variant="subtitle1"></Typography>
          </Paper>
        </Grid>
        <Box sx={{width:"80%", marginLeft:"10%",marginTop:"40px"}}>
          <Typography variant="h5" sx={{textAlign:"center"}}>Users List</Typography>
          <Stack spacing={2}>
            {userList && (
              userList.map((item,index)=>(
                <Item key={index}>
                  {item.name ? item.name : "No Name Provided"}
                </Item>
              ))
            )}
          </Stack>

        </Box>
      </Grid>
    </div>
  );
}

export default App;
