import axios from "axios";
import React from "react";
import { baseURL } from "../../../App";
import RatingContext from "../../RatingContext";
import '../../../App.css'

function Book({ bookID, bookRating }) {

    const [book, setBook] = React.useState(false);
    const [rated, setRated] = React.useState(false);
    const [seeForm, setSeeForm] = React.useState(false);
    const [yourRate, setYourRate] = React.useState(0);
    const [yourComment, setYourComment] = React.useState("");
    const ratingContext = React.useContext(RatingContext);
  
    React.useEffect(() => {
        fetchBook();
    }, [ratingContext]);

    const fetchBook = () => {
        axios.get(baseURL + 'book/'+ bookID).then((response) => {
            setBook(response.data.data);
        }).catch(error=> console.error(error));
    };

    const handleMore = () => {
        ratingContext.toggleAction('book', bookID);
    }

    const handleAdd = () => {
        setSeeForm(true);
    }

    const handleClose = () =>{
        setSeeForm(false);
    }

    const handleRangeChange = (e) => {
        setYourRate(e.target.value);
    }

    const handleCommentChange = (e) => {
        setYourComment(e.target.value);
    }
    const handleSubmit = () => {
        axios.post(baseURL + 'rating/', {
            rating: yourRate,
            comment: yourComment,
            userID: ratingContext.userID,
            bookID: bookID
        }).then(res => console.log("added a new crating"));
        setSeeForm(false);
    }

    const isRated = () => {
        axios.get(baseURL + 'user/' + ratingContext.userID + '/rating/' + bookID)
        .then((res) => {
            if(res.data.status===200)setRated(true);
        }).catch(error=> console.error(error));
    };

    const sectionBook = () => {

        if (!book) return null;
        if(ratingContext.userID ===0)
         return (
            <li>
                <div><i>{book.title}</i> - {book.author} <b>{bookRating || ''}</b></div>
                <div>liczba ocen: {book.rating_count}</div>
                <span><button onClick={handleMore}>Zobacz recenzje</button></span>
            </li>
        );
        isRated()
        if(rated){
            return (
                <li>
                    <div><i>{book.title}</i> - {book.author} <span>{bookRating || ''}</span> liczba ocen: {book.rating_count}</div>
                    <button onClick={handleMore}>Zobacz recenzje</button> Już zrecenzowałeś_aś.
                </li>
            );
        }
        return (
            <li>
                <div><i>{book.title}</i> - {book.author} <b>{bookRating || ''}</b> liczba ocen: {book.rating_count}</div>
                <button onClick={handleMore}>Zobacz recenzje</button><button onClick={handleAdd}>Dodaj recenzje</button>
            </li>
        );
    }


    const sectionForm = () => {
        if(seeForm){
            return(
            
              <form onSubmit={handleSubmit} className="formRating">
                <label>
                    <input type="range" list="tickmarks" min="1" max="10" onChange={handleRangeChange}/>
                    <datalist id="tickmarks">
                        <option value="1"></option>
                        <option value="2"></option>
                        <option value="3"></option>
                        <option value="4"></option>
                        <option value="5"></option>
                        <option value="6"></option>
                        <option value="7"></option>
                        <option value="8"></option>
                        <option value="9"></option>
                        <option value="10"></option>
                    </datalist>
                </label>
                <label>
                  <textarea  type="text" value={yourComment} onChange={handleCommentChange} />
                </label>
                <input type="submit" value="Zatwierdź" />
                <button onClick={handleClose}>Zamknij</button>
              </form>
            );
        
        }
    }

    return(
        <React.Fragment>
            {sectionBook()}
            {sectionForm()}
        
        </React.Fragment>
    )
  }

  export default Book;