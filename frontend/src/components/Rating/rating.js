import axios from "axios";
import React from "react";
import { baseURL } from "../../App";
import RatingContext from "../RatingContext";

function Rating() {

    const [listItem, setItems] = React.useState([]);
    const ratingContext = React.useContext(RatingContext);

    React.useEffect(() => {
        fetchRatings();
    }, [ratingContext]);

    const fetchRatings = () => {
        axios.get(baseURL+ratingContext.action+'/'+ratingContext.id +'/rating').then((response) => {
            setItems(response.data.data);
        }).catch(error=> console.error('Error: ${error}'));
    };

    const handleDelete = (e) => {
        console.log(e.target.getAttribute('value') )
        axios.delete(baseURL+'rating/'+e.target.getAttribute('value') +'/delete').then((res) => {
            console.log(res)
            console.log('delete a comment');
        }).catch(error=> console.error(error));
        ratingContext.toggleAction('reset',0)
    }


    const sectionRatings = () =>{
        const ratingsList = [];
        if (!listItem) return null;
        if (listItem.length) {
            listItem.forEach(item => {
                ratingsList.push(item)
            })
        }   
        switch (ratingContext.action){
            case 'user':
              return (
                <ol>
                    {ratingsList.map(rating => (
                        <li key={rating.ID}>
                            <div><b>{rating.title}, {rating.author} - ocena: {rating.rating}</b></div>
                            <div>{rating.comment}</div><button value={rating.ID} onClick={handleDelete}>Usuń recenzje</button>
                        </li>
                    ))}
                </ol>
                );
            case 'book':
              return (
                <ol>
                    {ratingsList.map(rating => (
                        <li key={rating.ID}>
                            <div><b>{rating.username} - ocena:{rating.rating}</b></div>
                            <div>{rating.comment}</div>
                        </li>
                    ))}
                </ol>
                );
            case 'reset':
              return '';
          }
    };

    return(
        <React.Fragment >{sectionRatings()}</React.Fragment>
    )
}
export default Rating;