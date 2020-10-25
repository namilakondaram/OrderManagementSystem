
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
import ac from '../Images/ac.jpg'
import washing_machine from '../Images/washing_machine.jpg'
import almirah from '../Images/almirah.jpg'
import chair from '../Images/chair.jpg'
import doormat from '../Images/doormat.jpg'
import fridge from '../Images/fridge.jpg'
import mirror from '../Images/mirror.jpg'
import sofaset from '../Images/sofaset.jpg'
import table from '../Images/table.jpeg'
import wallclock from '../Images/wallclock.jpg'

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
            {item.itemId=="1" && <img src={ac} alt="an Image" />}
            {item.itemId=="10" && <img src={washing_machine} alt="an Image" />}
            {item.itemId=="2" && <img src={almirah} alt="an Image" />}
            {item.itemId=="3" && <img src={chair} alt="an Image" />}
            {item.itemId=="4" && <img src={doormat} alt="an Image" />}
            {item.itemId=="5" && <img src={fridge} alt="an Image" />}
            {item.itemId=="6" && <img src={mirror} alt="an Image" />}
            {item.itemId=="7" && <img src={sofaset} alt="an Image" />}
            {item.itemId=="8" && <img src={table} alt="an Image" />}
            {item.itemId=="9" && <img src={wallclock} alt="an Image" />}

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