import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import amazon from '../../images/amazon_logo.png';
import bookshop from '../../images/bookshop_logo.png';
import wikipedia from '../../images/wikipedia.png';
import './BookCard.scss';

const BookCard = (props) => {
  const { user, isAuthenticated, isLoading } = useAuth0(); 
  const { loginWithRedirect } = useAuth0();

  const [page, setPage] = useState(props.page);

  const [thoughts, setThoughts] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [complete, setComplete] = useState(false);

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const renderChecks = async (sub, listType, id) => {
    //clear all checkboxes
    const boxes = document.getElementsByClassName(listType);
    for (let i = 0; i < boxes.length; i++){
      boxes[i].checked = false;
    }
    //check if user has item in TBR
    const check = await fetch(`/api/booklists/${listType}/${sub}/${id}`);
    const checkText = await check.text();
    //if in listtype, check box
    if (checkText === listType) {
      const box = document.getElementsByClassName(listType);
      box[props.cardNumber].checked = true;
    }
  };

  const showAlert = () => {
    const login = () => loginWithRedirect();
    window.location.href = login();
  }

  //run on change of props.page to hide the counts and show the loading spinners
  const showSpinners = () => {
    //get html elements that show count
    let TBRnumbers = document.getElementsByClassName('TBR' + '-count');
    let CURRnumbers = document.getElementsByClassName('CURR' + '-count');
    let ARLnumbers = document.getElementsByClassName('ARL' + '-count');
    let DNFnumbers = document.getElementsByClassName('DNF' + '-count');
    //get html elements that show spinner
    let TBRspinner = document.getElementsByClassName("tbr-spin");
    let CURRspinner = document.getElementsByClassName("curr-spin");
    let ARLspinner = document.getElementsByClassName("arl-spin");
    let DNFspinner = document.getElementsByClassName("dnf-spin");
    //if not on the first page, the default counts must be re-hidden and the spinners must be shown
    if (props.page !== 1) {
      TBRnumbers[props.cardNumber].style.display = 'none';
      CURRnumbers[props.cardNumber].style.display = 'none';
      ARLnumbers[props.cardNumber].style.display = 'none';
      DNFnumbers[props.cardNumber].style.display = 'none';
      TBRspinner[props.cardNumber].style.display = 'inline-block';
      CURRspinner[props.cardNumber].style.display = 'inline-block';
      ARLspinner[props.cardNumber].style.display = 'inline-block';
      DNFspinner[props.cardNumber].style.display = 'inline-block';
    }
  }

  const renderCounts = async () => {
    //run this function regardless of whether the user is logged in
    //get html elements that show count
    let TBRnumbers = document.getElementsByClassName('TBR' + '-count');
    let CURRnumbers = document.getElementsByClassName('CURR' + '-count');
    let ARLnumbers = document.getElementsByClassName('ARL' + '-count');
    let DNFnumbers = document.getElementsByClassName('DNF' + '-count');
    //get html elements that show spinner
    let TBRspinner = document.getElementsByClassName("tbr-spin");
    let CURRspinner = document.getElementsByClassName("curr-spin");
    let ARLspinner = document.getElementsByClassName("arl-spin");
    let DNFspinner = document.getElementsByClassName("dnf-spin");
    //hide the counts and show spinners
    showSpinners();
    //check if user has item in TBR
    const TBRcount = await fetch(`/api/count/TBR/${props.google_id}`);
    const TBRcountText = await TBRcount.text();
    //check if user had item in CURR
    const CURRcount = await fetch(`/api/count/CURR/${props.google_id}`);
    const CURRcountText = await CURRcount.text();
    //check if user has item in ARL
    const ARLcount = await fetch(`/api/count/ARL/${props.google_id}`);
    const ARLcountText = await ARLcount.text();
    //check if user has item in dnf
    const DNFcount = await fetch(`/api/count/DNF/${props.google_id}`);
    const DNFcountText = await DNFcount.text();
    TBRspinner[props.cardNumber].style.display = "none";
    TBRnumbers[props.cardNumber].style.display = "block";
    TBRnumbers[props.cardNumber].innerHTML = '(' + TBRcountText + ')';
    CURRspinner[props.cardNumber].style.display = "none";
    CURRnumbers[props.cardNumber].style.display = "block";
    CURRnumbers[props.cardNumber].innerHTML = '(' + CURRcountText + ')';
    ARLspinner[props.cardNumber].style.display = "none";
    ARLnumbers[props.cardNumber].style.display = "block";
    ARLnumbers[props.cardNumber].innerHTML = '(' + ARLcountText + ')';
    DNFspinner[props.cardNumber].style.display = "none";
    DNFnumbers[props.cardNumber].style.display = "block";
    DNFnumbers[props.cardNumber].innerHTML = '(' + DNFcountText + ')';
  }

  const addRemoveBooklist = async (sub, id, listType, title, author, date, image, pages, words) => {
    const box = document.getElementsByClassName(listType);
    const numbers = document.getElementsByClassName(listType + '-count');
    let prevNumber = numbers[props.cardNumber].innerHTML;
    //if unchecked, add to list
    if (box[props.cardNumber].checked === true) {
      //first, do a fake count increase (so rendercounts does not have to be run again)
      prevNumber = parseInt(prevNumber[0, 1]);
      prevNumber++;
      prevNumber = '(' + prevNumber + ')';
      numbers[props.cardNumber].innerHTML = prevNumber;
      const date_added = Date();
      const seconds_added = Date.now();
      //create json
      const json = `{
        "auth0_id": "${sub}",
        "google_id": "${id}",
        "listtype": "${listType}",
        "title": "${title}",
        "author": "${author}",
        "date": "${date}",
        "image": "${image}",
        "pages": "${pages}",
        "words": "${words}",
        "date_added": "${date_added}",
        "seconds_added": "${seconds_added}"
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
      //first, do a fake count decrease (so rendercounts does not have to be run again)
      prevNumber = parseInt(prevNumber[0, 1]);
      prevNumber--;
      prevNumber = '(' + prevNumber + ')';
      numbers[props.cardNumber].innerHTML = prevNumber;
      //step 2: get the date added from the entry (will be used in deletions table for timeline use)
      const previousAddedDate = await fetch(`/api/addeddate/${sub}/${props.google_id}/${listType}`);
      const previousAddedDateJson = await previousAddedDate.json();
      //step 3: get the seconds added from the entry (will be used in deletions table for sorting in timeline)
      const previousAddedSeconds = await fetch(`/api/addedseconds/${sub}/${props.google_id}/${listType}`);
      const previousAddedSecondsJson = await previousAddedSeconds.json();
      //send delete request
      const response = fetch(`/api/booklists/${sub}/${listType}/${id}`, {
        method: "DELETE"
      });
      //add to deletions table
      const date_added = Date();
      const seconds_added = Date.now();
      //create json
      const json = `{
        "auth0_id": "${sub}",
        "google_id": "${id}",
        "listtype": "${listType}",
        "title": "${title}",
        "author": "${author}",
        "date": "${date}",
        "image": "${image}",
        "pages": "${pages}",
        "words": "${words}",
        "date_added": "${date_added}",
        "type": "remove",
        "seconds_added": "${seconds_added}"
      }`;
      //send to db
      const response2 = await fetch("/api/deletions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: json
      });
      //create json
      const json2 = `{
        "auth0_id": "${sub}",
        "google_id": "${id}",
        "listtype": "${listType}",
        "title": "${title}",
        "author": "${author}",
        "date": "${date}",
        "image": "${image}",
        "pages": "${pages}",
        "words": "${words}",
        "date_added": "${previousAddedDateJson}",
        "type": "add",
        "seconds_added": "${previousAddedSecondsJson}"
      }`;
      //send to db
      const response3 = await fetch("/api/deletions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: json2
      });
    };
  }

  //create onclick functions for adding/removing list entries from db
  const addToTBR = () => addRemoveBooklist(user.sub, props.google_id, 'TBR', props.title, props.author, props.published, props.image, props.pages, props.words);
  const addToCURR = () => addRemoveBooklist(user.sub, props.google_id, 'CURR', props.title, props.author, props.published, props.image, props.pages, props.words);
  const addToARL = () => addRemoveBooklist(user.sub, props.google_id, 'ARL', props.title, props.author, props.published, props.image, props.pages, props.words);
  const addToDNF = () => addRemoveBooklist(user.sub, props.google_id, 'DNF', props.title, props.author, props.published, props.image, props.pages, props.words);

  //add/remove from db, else show sign up function
  const onCheckBoxClick = (listtype) => {
    if (isAuthenticated) {
      if (listtype === 'TBR') {
        addToTBR();
      } else if (listtype === 'CURR') {
        addToCURR();
      } else if (listtype === 'ARL') {
        addToARL();
      } else if (listtype === 'DNF') {
        addToDNF();
      }
    } else {
      showAlert();
    } 
  }

  const TBRonCheck = () => onCheckBoxClick('TBR');
  const CURRonCheck = () => onCheckBoxClick('CURR');
  const ARLonCheck = () => onCheckBoxClick('ARL');
  const DNFonCheck = () => onCheckBoxClick('DNF');

  //useEffect ensures that render checks and color enforcement are only run once
  useEffect(() => {
    renderCounts();
    if (isAuthenticated && !isLoading) {
      renderChecks(user.sub, 'TBR', props.google_id);
      renderChecks(user.sub, 'CURR', props.google_id);
      renderChecks(user.sub, 'ARL', props.google_id);
      renderChecks(user.sub, 'DNF', props.google_id);
  };
  }, [props.page])

  const completeFunction = async () => {
    await delay(1500);
    setComplete(true);
    await delay(1000);
    setSubmitting(false);
    setThoughts(false);
  }

  const ARLSetup = () => {
    if (document.getElementsByClassName('ARL')[props.cardNumber].checked === false) {
      ARLonCheck();
    } else {
      setThoughts(true);
    }
  }

  const ARLCancel = () => {
    setThoughts(false);
    document.getElementsByClassName('ARL')[props.cardNumber].checked = false;
  }

  const ARLSubmit = async () => {
    setSubmitting(true);
    //get form values
    const month = document.getElementById('month-entry').value;
    let year = parseInt(document.getElementById('year-entry').value);
    const recommend = document.getElementById('recommend-entry').value;
    const review = document.getElementById('review-entry').value;

    //makes sure that year is in number format
    if (!year) {
      year = 2021;
    }

    const numbers = document.getElementsByClassName('ARL-count');
    let prevNumber = numbers[props.cardNumber].innerHTML;
    //first, do a fake count increase (so rendercounts does not have to be run again)
      prevNumber = parseInt(prevNumber[0, 1]);
      prevNumber++;
      prevNumber = '(' + prevNumber + ')';
      numbers[props.cardNumber].innerHTML = prevNumber;
      const date_added = Date();
      const seconds_added = Date.now();
      //create json
      const json = `{
        "auth0_id": "${user.sub}",
        "google_id": "${props.google_id}",
        "listtype": "ARL",
        "title": "${props.title}",
        "author": "${props.author}",
        "date": "${props.published}",
        "image": "${props.image}",
        "pages": "${props.pages}",
        "words": "${props.words}",
        "date_added": "${date_added}",
        "seconds_added": "${seconds_added}",
        "month_read": "${month}",
        "year_read": "${year}",
        "review": "${review}",
        "recommend": "${recommend}"
      }`;
      //send to db
      const response = await fetch("/api/booklists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: json
      });
    completeFunction();
  }

  return (
    <div className="bookcard">
      {thoughts ?
        <Modal show={thoughts} onHide={() => ARLCancel()}>
          <Modal.Header closeButton>
            <Modal.Title>Add {props.title} to Read Shelf</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {submitting ?
              <div>
                {complete ?
                  <h3>Success! :)</h3>
                  :
                  <div className="submitting">
                    <h3>Submitting...</h3>
                    <Spinner animation="border" variant="success" />
                  </div>
                }
              </div>
              :
              <Form id="arl-entry">
                <Form.Row id="formrow">
                  <Form.Group id="month">
                    <Form.Label>Month</Form.Label>
                    <Form.Control id="month-entry" as="select" defaultValue="January">
                      <option value="January">January</option>
                      <option value="February">February</option>
                      <option value="March">March</option>
                      <option value="April">April</option>
                      <option value="May">May</option>
                      <option value="June">June</option>
                      <option value="July">July</option>
                      <option value="August">August</option>
                      <option value="September">September</option>
                      <option value="October">October</option>
                      <option value="November">November</option>
                      <option value="December">December</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group id="year">
                    <Form.Label>Year</Form.Label>
                    <Form.Control
                      id="year-entry"
                      placeholder="Year"
                      controlId="year"
                    />
                  </Form.Group>
                  <Form.Group id="recommend">
                    <Form.Label>Recommend?</Form.Label>
                    <Form.Control
                      id="recommend-entry"
                      as="select"
                      className="mr-sm-2"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Form.Control>
                  </Form.Group>
                </Form.Row>
              
                <Form.Group >
                  <Form.Label>Notes // Review // Final Thoughts</Form.Label>
                  <Form.Control id="review-entry" controlId="review" as="textarea" rows={4} />
                </Form.Group>
              </Form>
            }
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => ARLCancel()}>Cancel</Button>
            <Button variant="success" onClick={() => ARLSubmit()}>Add</Button>
          </Modal.Footer>
        </Modal>
        :
        <span></span>
      }
        <div className="innards">
          <a href={props.google_link} target="_blank" rel="noreferrer"><img id="cover" src={props.image} alt="" /></a>
          <div id="right-side">
            <div className="desc">
              <h1 id="card-title">{props.title}</h1>
              <h1 id="author">{props.author}</h1>
              <h1 id="date">{props.published}</h1>
            </div>
            <div className="action-buttons">
              <div className="description-container">
                <p className="add-description">Want</p>
                <p className="TBR-count">( )</p>
                <Spinner className="tbr-spin" id="spinny" animation="border" variant="danger" size="sm" />
              </div>
              <div className="description-container">
                <p className="add-description">Reading</p>
                <p className="CURR-count">( )</p>
                <Spinner className="curr-spin" id="spinny" animation="border" variant="danger" size="sm" />
              </div>
              <div className="description-container">
                <p className="add-description">Read</p>
                <p className="ARL-count">( )</p>
                <Spinner className="arl-spin" id="spinny" animation="border" variant="danger" size="sm" />
              </div>
              <div className="description-container">
                <p className="add-description">DNF</p>
                <p className="DNF-count">( )</p>
                <Spinner className="dnf-spin" id="spinny" animation="border" variant="danger" size="sm" />
              </div>
              <div className="checklist-container">
                <input type="checkbox" className="TBR" onClick={TBRonCheck}></input>
              </div>
              <div className="checklist-container">
                <input type="checkbox" className="CURR" onClick={CURRonCheck}></input>
              </div>
              <div className="checklist-container">
                <input type="checkbox" className="ARL" onClick={() => ARLSetup()}></input>
              </div>
              <div className="checklist-container">
                <input type="checkbox" className="DNF" onClick={DNFonCheck}></input>
              </div>
              <div className="external-container"><a href={props.wikipedia_link} target="_blank" rel="noreferrer"><img className="wikipedia-png" src={wikipedia} alt="amazon" /></a></div>
              <div className="external-container"><a href={props.amazon_link} target="_blank" rel="noreferrer"><img className="amazon-png" src={amazon} alt="amazon" /></a></div>
              <div className="external-container"><a href={props.bookshop_link} target="_blank" rel="noreferrer"><img className="bookshop-png" src={bookshop} alt="bookshop" /></a></div>
            </div>
          </div>
        </div>
      </div>
  )

}

export default BookCard;
