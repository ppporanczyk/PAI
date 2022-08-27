import './App.css';
import Books from './components/Books/books';
import User from './components/User/user';
import Rating from './components/Rating/rating';
import RatingContext from './components/RatingContext';
import axios from 'axios';
import React from 'react';


export const baseURL = "http://localhost:3000/";

function App() {
  const [action, setAction] = React.useState('reset');
  const [id, setID] = React.useState(0);
  const [userID, setUserID] = React.useState(0);

  const toggleAction = (someAction, someId) => {
    setAction(someAction);
    setID(someId);
  }

  const toggleUser = (Id) => {
    setUserID(Id);
  }

  const ratingSettings = { action, id, userID, toggleAction, toggleUser};

  axios.defaults.headers.common= {
    "Content-Type": "application/json",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "Origin, Content-Type"
  }

  return (
    <RatingContext.Provider value={ratingSettings}>
      <React.Fragment >
        <nav><User /></nav>
        <div id="block_container">
          <div id="blockBook"><Books /></div>
          <div id="blockRating"><Rating /></div>
        </div>
      </React.Fragment>
    </RatingContext.Provider>
  );
}

export default App;
