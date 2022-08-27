import axios from "axios";
import React from "react";
import { baseURL } from "../../App";
import Book from  "./Book/book"
import RatingContext from "../RatingContext";
import '../../App.css'

function Books() {

    const [books, setBooks] = React.useState([]);
    const ratingContext = React.useContext(RatingContext);

    React.useEffect(() => {
        fetchBooks();
    }, [ratingContext]);

    const fetchBooks = () => {
        axios.get(baseURL + 'book/').then((response) => {
            setBooks(response.data.data);
        }).catch(error=> console.error('Error: ${error}'));
    };


    const sectionBooks = () =>{
        
        if (!books) return null;
        const bookList = [];
        
        if (books.length) {
            books.forEach(item => {
                bookList.push(item);
            })
        }
        return (
            <div>
            <ol>
                {bookList.map(book => (
                    <Book key={book.ID} bookID={book.ID} bookRating={book.avg_rating}/> 
                ))}
            </ol></div>
        );
    };

    return(
        <React.Fragment>{sectionBooks()}</React.Fragment>
    )
}
export default Books;