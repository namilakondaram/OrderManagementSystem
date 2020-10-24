import React from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > svg': {
      margin: theme.spacing(1),
    },
  },
}));

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

function Nav() {
    const navstyle = {
        color:'white'
    };

    const classes = useStyles();

  return (
    <nav className={classes.root}>
        <h2> Order Management System </h2>
        <IconButton edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            href="/">
      <HomeIcon style={{ fontSize: 40, color:'black' }}/>
      </IconButton>
    </nav>
  );
}

export default Nav;
