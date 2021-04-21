import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext.js';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import amazon from '../../images/amazon.svg';
import bookshop from '../../images/bookshop_logo.png';
import wikipedia from '../../images/wikipedia.svg';
import './BookCard.scss';

const BookCard = (props) => {
  //currentuser
  const { currentUser } = useAuth();

  //state for checks
  const [loadingChecks, setLoadingChecks] = useState(true);
  const [wantCheck, setWantCheck] = useState(false);
  const [readingCheck, setReadingCheck] = useState(false);
  const [readCheck, setReadCheck] = useState(false);
  const [DNFCheck, setDNFCheck] = useState(false);

  //state for counts
  const [wantCount, setWantCount] = useState(0);
  const [readingCount, setReadingCount] = useState(0);
  const [readCount, setReadCount] = useState(0);
  const [DNFCount, setDNFCount] = useState(0);

  //date object that will be used to set current year and month
  const date = new Date();
  //state for arl add 
  const [thoughts, setThoughts] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [complete, setComplete] = useState(false);
  const [month, setMonth] = useState(props.months[date.getMonth()]);
  const [year, setYear] = useState(date.getFullYear());
  const [recommend, setRecommend] = useState('Yes');
  const [format, setFormat] = useState('paper');
  const [review, setReview] = useState('');

  //delay function used in arl submission
  const delay = ms => new Promise(res => setTimeout(res, ms));

  //renders counts through fetch and count state
  const renderCounts = async () => {
    //set all to false for proper page changing
    setWantCount(0);
    setReadingCount(0);
    setReadCount(0);
    setDNFCount(0);
    const totalCount = await fetch(`api/totalcount/${props.google_id}`);
    const totalCountJSON = await totalCount.json();
    for (let i = 0; i < totalCountJSON.length; i++) {
      if (totalCountJSON[i]) {
        if (totalCountJSON[i].listtype === 'TBR') {
          setWantCount(totalCountJSON[i].count);
          console.log(wantCount)
        } else if (totalCountJSON[i].listtype === 'CURR') {
          setReadingCount(totalCountJSON[i].count);
        } else if (totalCountJSON[i].listtype === 'ARL') {
          setReadCount(totalCountJSON[i].count);
        } else {
          setDNFCount(totalCountJSON[i].count);
        }
      }
    }
  }

  //renders checks via fetch and check state
  const renderChecks = async () => {
    setLoadingChecks(true);
    setWantCheck(false);
    setReadingCheck(false);
    setReadCheck(false);
    setDNFCheck(false);
    const checks = await fetch(`/api/getchecks/${currentUser.uid}/${props.google_id}`);
    const checksJSON = await checks.json();
    for (let i = 0; i < checksJSON.length; i++) {
      if (checksJSON[i]) {
        if (checksJSON[i].listtype === 'TBR') {
          setWantCheck(true);
        } else if (checksJSON[i].listtype === 'CURR') {
          setReadingCheck(true);
        } else if (checksJSON[i].listtype === 'ARL') {
          setReadCheck(true);
        } else {
          setDNFCheck(true);
        }
      }
    }
    setLoadingChecks(false)
  };

  //generic function to add entry to shelf
  const addEntry = async (listType) => {
    const date_added = Date();
    const seconds_added = Date.now();
    //create json
    const json = `{
      "auth0_id": "${currentUser.uid}",
      "google_id": "${props.google_id}",
      "listtype": "${listType}",
      "title": "${props.title}",
      "author": "${props.author}",
      "date": "${props.published}",
      "image": "${props.image}",
      "pages": "${props.pages}",
      "words": "${props.words}",
      "date_added": "${date_added}",
      "seconds_added": "${seconds_added}"
    }`;
    //send to db
    const response = await fetch("/api/booklists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: json
    });
  }

  //generic function to remove an entry
  const removeEntry = async (listType) => {
    const response = fetch(`/api/booklists/${currentUser.uid}/${listType}/${props.google_id}`, {
      method: "DELETE"
    });
  }

  //onclick function for want box
  const addRemoveWant = async (sub) => {
    if (wantCheck === false) {
      setWantCheck(true);
      setWantCount(wantCount + 1);
      addEntry('TBR');
    } else {
      setWantCheck(false);
      setWantCount(wantCount - 1);
      removeEntry('TBR');
    }
  }

  //onclick function for reading box
  const addRemoveReading = async () => {
    if (readingCheck === false) {
      setReadingCheck(true);
      setReadingCount(readingCount + 1);
      addEntry('CURR');
    } else {
      setReadingCheck(false);
      setReadingCount(readingCount - 1);
      removeEntry('CURR');
    }
  }

  //onclick function for read
  const addRemoveRead = async () => {
    if (readCheck === false) {
      setThoughts(true);
    } else {
      setReadCheck(false);
      setReadCount(readCount - 1);
      removeEntry('ARL');
    }
  }

  //special read submission box
  const submitRead = async () => {
    setSubmitting(true);
    const date_added = Date();
    const seconds_added = Date.now();
    const json = `{
      "auth0_id": "${currentUser.uid}",
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
      "recommend": "${recommend}",
      "format": "${format}"
    }`;
    //send to db
    const response = await fetch("/api/booklists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: json
    });
    await delay(250);
    setComplete(true);
    setReadCheck(true);
    setReadCount(readCount + 1);
    await delay(750);
    setSubmitting(false);
    setComplete(false);
    setThoughts(false);
  }

  const addRemoveDNF = async () => {
    if (DNFCheck === false) {
      setDNFCheck(true);
      setDNFCount(DNFCount + 1);
      addEntry('DNF');
    } else {
      setDNFCheck(false);
      setDNFCount(DNFCount - 1);
      removeEntry('DNF');
    }
  }

  //useEffect ensures that render checks and color enforcement are only run once
  useEffect(() => {
    renderCounts();
    renderChecks();
  }, [props.page]);

  return (
    <div className="bookcard">
      {thoughts ?
        <Modal show={thoughts} onHide={() => setThoughts(false)} keyboard="true">
          <Modal.Header closeButton>
            <div>
              <p id="modal-title">Add {props.title} to Read Shelf</p>
              <p id="modal-title-bottom">all fields are optional</p>
            </div>
          </Modal.Header>
          <Modal.Body>
            {submitting ?
              <div>
                {complete ?
                  <h3>Success! :)</h3>
                  :
                  <div className="submitting">
                    <h3>Submitting...</h3>
                    <Spinner animation="border" variant="warning" />
                  </div>
                }
              </div>
              :
              <Form id="arl-entry">
                <Form.Row>
                  <Form.Group id="month">
                    <Form.Label>Month</Form.Label>
                    <Form.Control onChange={e => setMonth(e.target.value)} id="month-entry" as="select" defaultValue={month}>
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
                    <Form.Control onChange={e => setYear(e.target.value)} id="year-entry" defaultValue={year} controlId="year" />
                  </Form.Group>
                  <Form.Group id="recommend">
                    <Form.Label>Recommend?</Form.Label>
                    <Form.Control onChange={e => setRecommend(e.target.value)} id="recommend-entry" as="select" className="mr-sm-2">
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Form.Control>
                  </Form.Group>
                </Form.Row>
                <Form.Group>
                  <Form.Label>Format</Form.Label>
                  <div id="format">
                    <label onClick={() => setFormat('paper')}><input name="formHorizontalRadios" type="radio" /> paper</label>
                    <label onClick={() => setFormat('ebook')}><input name="formHorizontalRadios" type="radio" /> ebook</label>
                    <label onClick={() => setFormat('audio')}><input name="formHorizontalRadios" type="radio" /> audio</label>
                  </div>
                </Form.Group>
                <Form.Group >
                  <Form.Label>Notes // Review // Final Thoughts</Form.Label>
                  <Form.Control onChange={e => setReview(e.target.value)} id="review-entry" controlId="review" as="textarea" placeholder={'enter anything you like!'} rows={4} />
                </Form.Group>
              </Form>
            }
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={() => setThoughts(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => submitRead()}>Add</Button>
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
          {loadingChecks ?
            <div className="loading-spinner-container">
              <Spinner id="loading-spinner" animation="border" variant="warning" />
            </div>
          :
            <div className="counts-and-checks">
              <div className="description-container">
                <p className="add-description">Want</p>
                <p className="TBR-count">({wantCount})</p>
              </div>
              <div className="description-container">
                <p className="add-description">Reading</p>
                <p className="CURR-count">({readingCount})</p>
              </div>
              <div className="description-container">
                <p className="add-description">Read</p>
                <p className="ARL-count">({readCount})</p>
              </div>
              <div className="description-container">
                <p className="add-description">DNF</p>
                <p className="DNF-count">({DNFCount})</p>
              </div>
              <div className="checklist-container">
                <input type="checkbox" className="TBR" checked={wantCheck} onChange={() => addRemoveWant(currentUser.uid)} />
              </div>
              <div className="checklist-container">
                <input type="checkbox" className="CURR" checked={readingCheck} onChange={() => addRemoveReading(currentUser.uid)} />
              </div>
              <div className="checklist-container">
                <input type="checkbox" className="ARL" checked={readCheck} onChange={() => addRemoveRead(currentUser.uid)} />
              </div>
              <div className="checklist-container">
                <input type="checkbox" className="DNF" checked={DNFCheck} onClick={() => addRemoveDNF(currentUser.uid)} />
              </div>
            </div>
          }
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
