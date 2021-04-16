import { useState, useEffect } from 'react';
import BookCard from './Search/BookCard.js';
import NoImage from '../images/noimage.png';

const CardPage = (props) => {
  //loading to be used for edit of searchfield
  const [loading, setLoading] = useState(false);
  //shows books or users
  const [books, setBooks] = useState(true);
  //users array
  const [usersArray, setUsersArray] = useState([]);
  
  //months array to be used to in bookcard to fetch current month
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const stringTrimmer = (string) => {
    if (string) {
      if (string.length < 20) {
        return string;
      } else {
        string = string.substring(0, 14);
        string += '...';
        return string;
      }
    } else {
      return 'No Title Found :(';
    }
  };

  const arrayTrimmer = (array) => {
    if (array) {
      let string = array.join();
      if (string.length > 20) {
        string = string.substring(0, 17) + '...';
        return string;
      } else {
        return string;
      }
    } else {
      return 'No Author Found :{'
    }
  }

  const getUsers = async () => {
    setLoading(true);
    const users = await fetch(`/api/users/levenshtein/${props.state.searchField}`);
    const usersJson = await users.json();
    console.log(usersJson);
    setUsersArray(usersJson);
    console.log(usersArray);
    setLoading(false);
  }

  useEffect(() => {
    getUsers();
  }, [props.state.searchField]);

  return (
      <div className="booklist">
      {
          props.books.map((book, i) => {
          //error handling for an undefined image / link
          let image;
          let bookshop;
          let wiki;
          try {
            image = book.volumeInfo.imageLinks.thumbnail;
            bookshop = "https://bookshop.org/books?keywords=" + book.volumeInfo.title.replace(" ", "+");
            wiki = "https://en.wikipedia.org/wiki/" + book.volumeInfo.title.replace(" ", "_");
          } catch (err) {
            image = NoImage;
            bookshop = "https://bookshop.org/";
            wiki = "https://en.wikipedia.org";
          }
          
            return <BookCard
                      months={months}
                      alert={props.state.alert}
                      page={props.page}
                      hidden={props.state.hidden}
                      key={i}
                      cardNumber={i}
                      google_id={book.id}
                      google_link={book.volumeInfo.canonicalVolumeLink}
                      amazon_link={"https://www.amazon.com/s?k=" + book.volumeInfo.title + "&ref=nb_sb_noss_2"}
                      bookshop_link={bookshop}
                      wikipedia_link={wiki}
                      image={image}
                      title={stringTrimmer(book.volumeInfo.title)}
                      author={arrayTrimmer(book.volumeInfo.authors)}
                      published={book.volumeInfo.publishedDate}
                      pages={book.volumeInfo.pageCount}
                      words={book.volumeInfo.pageCount * 300}
                  />
          })
      }
      </div>
  )
}

export default CardPage;