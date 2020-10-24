
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import {Link} from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 600,
    height: 1000,
    
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));


function Items({match}) {

    useEffect(()=> {
        getItems();
        console.log(match);
    },[]);
    
    const [items, setItems] = useState([]);

    const getItems = async () => {
        const fetchTheItems = await fetch(
            `http://localhost:8080/getItems`
        ); 
        const itemstore = await fetchTheItems.json();
        setItems(itemstore);
        console.log(itemstore);

    }

    const classes = useStyles();
        return (
          <div>
            <br/>
          <Link style={{textDecoration:'none'}} to={`../CustomerForm/0`}>
           <Button variant = "outlined" style={{float:'right',marginRight:'30px'}}>
             My Orders
           </Button>
           </Link>
           <br/><br/>
        <div className={classes.root}>
          <GridList cellHeight={280} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto'}} >
          <ListSubheader component="div"><b>Our Items for you!</b>  &nbsp; &nbsp; &nbsp;
          </ListSubheader>
         </GridListTile>
        {items.map((item) => (
          <GridListTile key={item.itemId} style={{padding: '20px'}}>
            {item.itemId=="1" && <img src={require('../Images/ac.jpg')} alt="an Image" />}
            {item.itemId=="10" && <img src={require('../Images/washing_machine.jpg')} alt="an Image" />}
            {item.itemId=="2" && <img src={require('../Images/almirah.jpg')} alt="an Image" />}
            {item.itemId=="3" && <img src={require('../Images/chair.jpg')} alt="an Image" />}
            {item.itemId=="4" && <img src={require('../Images/doormat.jpg')} alt="an Image" />}
            {item.itemId=="5" && <img src={require('../Images/fridge.jpg')} alt="an Image" />}
            {item.itemId=="6" && <img src={require('../Images/mirror.jpg')} alt="an Image" />}
            {item.itemId=="7" && <img src={require('../Images/sofaset.jpg')} alt="an Image" />}
            {item.itemId=="8" && <img src={require('../Images/table.jpeg')} alt="an Image" />}
            {item.itemId=="9" && <img src={require('../Images/wallclock.jpg')} alt="an Image" />}

            <GridListTileBar
              title={item.itemName}
              subtitle={<span>Item Price: ₹{item.itemPrice}</span>}
              actionIcon={
                <IconButton aria-label={`purchase this item`} className={classes.icon}>
                    <Link style={{textDecoration:'none'}} to={`../CustomerForm/${item.itemId}`}>
                  <ShoppingCartIcon />
                     </Link>
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
              </div>
              </div>
            );
}

export default Items;