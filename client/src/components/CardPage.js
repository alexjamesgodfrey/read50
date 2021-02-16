import BookCard from './BookCard.js';
import NoImage from '../images/noimage.png';

const CardPage = (props) => {

    const stringTrimmer = (string) => {
    if (string) {
      if (string.length < 20) {
        return string.toUpperCase();
      } else {
        string = string.substring(0, 14);
        string += '...';
        return string.toUpperCase();
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

    return (
        <div className="booklist">
        {
            props.books.map((book, i) => {
            //error handling for an undefined image
            let image;
            try {
                image = book.volumeInfo.imageLinks.thumbnail;
            } catch (err) {
                image = NoImage;
            }
            return <BookCard
                        page={props.page}
                        hidden={props.state.hidden}
                        key={i}
                        cardNumber={i}
                        google_id={book.id}
                        google_link={book.volumeInfo.canonicalVolumeLink}
                        amazon_link={"https://www.amazon.com/s?k=" + book.volumeInfo.title + "&ref=nb_sb_noss_2"}
                        bookshop_link={"https://bookshop.org/books?keywords=" + book.volumeInfo.title.replace(" ", "+")}
                        wikipedia_link={"https://en.wikipedia.org/wiki/" + book.volumeInfo.title.replace(" ", "_")}
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