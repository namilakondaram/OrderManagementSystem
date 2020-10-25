import React,{useState,useEffect} from 'react';
import './App.css';
import {Link} from 'react-router-dom';
function Shop() {
    useEffect(()=> {
          fetchEvents();
    },[]);
    
    const [events, setEvents] = useState([]);

    const fetchEvents = async () => {
          const data = await fetch('http://localhost:8080/v1/event/all');
          const events = await data.json();
          console.log(events);
          setEvents(events);
    };

  return (
    <div>
      {
          events.map(event => (
                 <h1 key={event.eventId}> 
                 <Link to={`/shop/${event.eventId}`}>
                 {event.eventName} 
                 </Link>
                 </h1>
          ))
          
      }
    </div>
  );
}

export default Shop;
