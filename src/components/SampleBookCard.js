import React from 'react';
import '../styles/SampleBookCard.scss';

const SampleBookCard = (props) => {

  const plusOne = (type) => {
    if (type == 'want' && !props.want.includes('k')) {
      let num = parseInt(props.want);
      let numberbox = document.getElementsByClassName('sample-TBR-count')[props.number];
      let checkbox = document.getElementsByClassName('sample-TBR')[props.number];
      if (checkbox.checked === true) {
        numberbox.innerHTML = num + 1;
      } else {
        numberbox.innerHTML = num;
      }
    }
    else if (type == 'reading' && !props.curr.includes('k')) {
      let num = parseInt(props.curr);
      let numberbox = document.getElementsByClassName('sample-CURR-count')[props.number];
      let checkbox = document.getElementsByClassName('sample-CURR')[props.number];
      if (checkbox.checked === true) {
        numberbox.innerHTML = num + 1;
      } else {
        numberbox.innerHTML = num;
      }
    }
    else if (type == 'read' && !props.read.includes('k')) {
      let num = parseInt(props.read);
      let numberbox = document.getElementsByClassName('sample-ARL-count')[props.number];
      let checkbox = document.getElementsByClassName('sample-ARL')[props.number];
      if (checkbox.checked === true) {
        numberbox.innerHTML = num + 1;
      } else {
        numberbox.innerHTML = num;
      }
    }
    else {
      let num = parseInt(props.dnf);
      let numberbox = document.getElementsByClassName('sample-DNF-count')[props.number];
      let checkbox = document.getElementsByClassName('sample-DNF')[props.number];
      if (checkbox.checked === true) {
        numberbox.innerHTML = num + 1;
      } else {
        numberbox.innerHTML = num;
      }
    }
  }

  const plusWant = () => plusOne('want');
  const plusReading = () => plusOne('reading');
  const plusRead = () => plusOne('read');
  const plusDNF = () => plusOne('DNF');

  return (
    <div className="sample">
      <a target="_blank" rel="noreferrer"><img className="sample-book-img" src={props.img} alt="" /></a>
      <div id="sample-right-side">
        <div className="sample-desc">
          <h1 id="sample-card-title">{props.title}</h1>
          <i><h1 id="sample-author">{props.author}</h1></i>
          <h1 id="sample-date">{props.date}</h1>
        </div>
        <div className="sample-action-buttons">
          <div className="sample-description-container">
            <p className="sample-add-description">Want</p>
            <p className="sample-TBR-count">{props.want}</p>
          </div>
          <div className="sample-description-container">
            <p className="sample-add-description">Reading</p>
            <p className="sample-CURR-count">{props.curr}</p>
          </div>
          <div className="sample-description-container">
            <p className="sample-add-description">Read</p>
            <p className="sample-ARL-count">{props.read}</p>
          </div>
          <div className="sample-description-container">
            <p className="sample-add-description">DNF</p>
            <p className="sample-DNF-count">{props.dnf}</p>
          </div>
          <div className="sample-checklist-container">
            <input type="checkbox" className="sample-TBR" onClick={plusWant}></input>
          </div>
          <div className="checklist-container">
            <input type="checkbox" className="sample-CURR" onClick={plusReading}></input>
          </div>
          <div className="checklist-container">
            <input type="checkbox" className="sample-ARL" onClick={plusRead}></input>
          </div>
          <div className="checklist-container">
            <input type="checkbox" className="sample-DNF" onClick={plusDNF}></input>
          </div>
        </div>
      </div>
      
    </div>
  )

}

export default SampleBookCard;
