import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link' 
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));


function Home({match}) {

    const classes = useStyles();

    return (
        <div>
        <div className={classes.root}>
        <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
              Hello People! Welcome to the shopping arena! Hope a seamless experience to the customers and sellers!
          </Paper>
        </Grid>
        </Grid>
        </div>
        <br/><br/><br/><br/>
        <Link style={{textDecoration:'none'}} href="/items">
        <Button variant="contained">  Customer Login</Button>
        </Link>
        <br/><br/><br/>
        <Link style={{textDecoration:'none'}} href="/SellerForm">
        <Button variant="contained"> Seller Login </Button>
        </Link>
    
    </div>
    );
}

export default Home;