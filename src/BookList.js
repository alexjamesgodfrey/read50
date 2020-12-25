import React from 'react';
import BookCard from './BookCard.js';

const BookList = (props) => {
  return (
    <div className="booklist">
      {
        props.books.map((book, i) => {
          return <BookCard
                    key={i}
                    google_link={book.volumeInfo.canonicalVolumeLink}
                    amazon_link={"https://www.amazon.com/s?k=" + book.volumeInfo.title + "&ref=nb_sb_noss_2"}
                    image={book.volumeInfo.imageLinks.thumbnail}
                    title={book.volumeInfo.title}
                    author={book.volumeInfo.authors}
                    published={book.volumeInfo.publishedDate}
                  />
        })
      }
    </div>
  )
}

export default BookList;
