import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import amazon from '../images/amazon_logo.png';
import '../styles/ListCard.css';

const ListCard = (props) => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  console.log(props.searchCount);

  const enforceColors = async (sub) => {
    //make sure to put in isAuthenticated block
    //get colors from database
    const response = await fetch(`/api/users/color/${sub}`);
    let currentColor = await response.text();
    const finalColor = currentColor.slice(1, -1);
    //update all h1 colors
    const h1Elements = document.getElementsByTagName("h1");
    for (let i = 0; i < h1Elements.length; i++) {
      h1Elements[i].style.color = finalColor;
    }
    console.log('colors updated');
  };

  const renderChecks = async (sub, listType, id) => {
    //clear all checkboxes
    const boxes = document.getElementsByClassName(listType);
    for (let i = 0; i < boxes.length; i++){
      boxes[i].checked = false;
    }
    //check if user has item in listType
    const check = await fetch(`/api/booklists/${listType}/${sub}/${id}`);
    const checkText = await check.text();
    console.log(checkText);
    //if in listtype, check box
    if (checkText === listType) {
      const box = document.getElementsByClassName(listType);
      box[props.cardNumber].checked = true;
      console.log('box ' + props.cardNumber + 'checked');
    }
  };

  const addRemoveBooklist = async (sub, id, listType, title, author, date, image) => {
    console.log('click registered');
    const box = document.getElementsByClassName(listType);
    //if unchecked, add to list
    if (box[props.cardNumber].checked === true) {
      console.log('sending add request');
      //create json
      const json = `{
        "auth0_id": "${sub}",
        "google_id": "${id}",
        "listtype": "${listType}",
        "title": "${title}",
        "author": "${author}",
        "date": "${date}",
        "image": "${image}"
      }`;
      //send to db
      const response = await fetch("/api/booklists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: json
      });
    };
    //if checked, remove from list
    if (box[props.cardNumber].checked === false) {
      //send delete request
      const response = fetch(`/api/booklists/${sub}/${listType}/${id}`, {
        method: "DELETE"
      });
    };
  }

  const addToTBR = () => addRemoveBooklist(user.sub, props.google_id, 'TBR', props.title, props.author, props.published, props.image);
  const addToCURR = () => addRemoveBooklist(user.sub, props.google_id, 'CURR', props.title, props.author, props.published, props.image);
  const addToARL = () => addRemoveBooklist(user.sub, props.google_id, 'ARL', props.title, props.author, props.published, props.image);

  //run upon authentication
  if (isAuthenticated && !isLoading) {
    enforceColors(user.sub);
    renderChecks(user.sub, 'TBR', props.google_id);
    renderChecks(user.sub, 'CURR', props.google_id);
    renderChecks(user.sub, 'ARL', props.google_id);
    console.log('render buttons run');
  };

  //run if bookcards change

  return (
    <div className="bookcard">
      <a href={props.google_link} target="_blank"><img src={props.image} alt="" /></a>
      <div id="right-side">
        <div className="desc">
          <h1 id="card-title">{props.title}</h1>
          <i><h1 id="author">{props.author}</h1></i>
          <em><h1 id="date">{props.published}</h1></em>
        </div>
        <div className="action-buttons">
          <div className="description-container">
            <p className="add-description">Want to Read</p>
          </div>
          <div className="description-container">
            <p className="add-description">Currently Reading</p>
          </div>
          <div className="description-container">
            <p className="add-description">Already Read</p>
          </div>
          <div className="checklist-container">
            <input type="checkbox" className="TBR" onClick={addToTBR}></input>
          </div>
          <div className="checklist-container">
            <input type="checkbox" className="CURR" onClick={addToCURR}></input>
          </div>
          <div className="checklist-container">
            <input type="checkbox" className="ARL" onClick={addToARL}></input>
          </div>
          <div className="amazon"><a href={props.amazon_link} target="_blank"><img className="amazon-png" src={amazon} alt="amazon" /></a></div>
        </div>
      </div>
      
    </div>
  )

}

export default BookCard;
