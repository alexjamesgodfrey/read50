import React from 'react';
import amazon from './images/amazon_logo.png';

const BookCard = (props) => {
  return (
    <div className="bookcard">
      <a href={props.google_link} target="_blank"><img src={props.image} alt=""/></a>
      <div className="desc">
        <h2>{props.title}</h2>
        <h3>{props.author}</h3>
        <p>{props.published}</p>
        <div className="action-buttons">
          <div id="more-info" className="action-button"><p>Add to TBR</p></div>
          <div className="action-button"><p>Add to ARL</p></div>
          <div className="amazon"><a href={props.amazon_link} target="_blank"><img className="amazon-png" src={amazon} alt="amazon"/></a></div>
        </div>

      </div>
    </div>
  )
}

export default BookCard;
