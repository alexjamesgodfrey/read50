import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './ShelfEntry.scss';
import '../Search/BookCard.scss';

const ShelfEntry = (props) => {
    const { user } = useAuth0(); 
    const [load, setLoad] = useState(true);
    const [thoughts, setThoughts] = useState(false);

    //used to handle the displayed details of a book on the ARL shelf
    const [month, setMonth] = useState(props.month_read);
    const [year, setYear] = useState(props.year_read);
    const [recommend, setRecommend] = useState(props.recommend);
    const [format, setFormat] = useState(props.format);
    const [review, setReview] = useState(props.review);
    
    const shelfName = props.listType + 'shelf';

    const loading = async (ms) => {
        await props.delay(ms);
        setLoad(false);
    }

    useEffect(() => {
        loading(1000);
    }, [])

    //function to be run upon removal of item from shelf
    const remove = async (sub, listType, id) => {
        //step 1: get the entry and hide it
        const entries = document.getElementsByClassName(shelfName);
        entries[props.entryNumber].style.display = 'none';
        //step 2: get the date added from the entry (will be used in deletions table for timeline use)
        const previousAddedDate = await fetch(`/api/addeddate/${sub}/${props.google_id}/${listType}`);
        const previousAddedDateJson = await previousAddedDate.json();
        console.log(previousAddedDateJson);
        //step 3: get the seconds added from the entry (will be used in deletions table for sorting in timeline)
        const previousAddedSeconds = await fetch(`/api/addedseconds/${sub}/${props.google_id}/${listType}`);
        const previousAddedSecondsJson = await previousAddedSeconds.json();
        console.log(previousAddedSecondsJson);
        //step 3: send a delete request to booklists table
        const deleteResponse = await fetch(`/api/booklists/${sub}/${listType}/${id}`, {
            method: "DELETE"
        });
        //step 4: send an add request (remove) to the deletions database
        const date_added = Date();
        const seconds_added = Date.now();
        const removeJson = `{
            "auth0_id": "${sub}",
            "google_id": "${id}",
            "listtype": "${listType}",
            "title": "${props.title}",
            "author": "${props.author}",
            "date": "${props.published}",
            "image": "${props.image}",
            "pages": "${props.pages}",
            "words": "${props.words}",
            "date_added": "${date_added}",
            "type": "remove",
            "seconds_added": "${seconds_added}"
        }`;
        const removeResponse = await fetch("/api/deletions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: removeJson
        });
        //step 5: send a post request (add) to the deletions database WITH THE PREVIOUS DATE FETCH
        const addJson = `{
            "auth0_id": "${sub}",
            "google_id": "${id}",
            "listtype": "${listType}",
            "title": "${props.title}",
            "author": "${props.author}",
            "date": "${props.date}",
            "image": "${props.image}",
            "pages": "${props.pages}",
            "words": "${props.words}",
            "date_added": "${previousAddedDateJson}",
            "type": "add",
            "seconds_added": "${previousAddedSecondsJson}"
        }`;
        //send to db
        const addResponse = await fetch("/api/deletions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: addJson
        });
    }
    const removeButton = () => remove(user.sub, props.listType, props.google_id);

    const editDeets = async () => {
        setThoughts(false);
        const newMonth = document.getElementById('month-entry').value;
        setMonth(newMonth);
        let newYear = parseInt(document.getElementById('year-entry').value);
        setYear(newYear);
        const newRecommend = document.getElementById('recommend-entry').value;
        setRecommend(newRecommend);
        const newReview = document.getElementById('review-entry').value;
        setReview(newReview);

        //makes sure that year is in number format
        if (!year || typeof(year) != 'integer') {
            newYear = 2021;
            setYear(newYear);
        }

        const editJson = `{
            "month_read": "${newMonth}",
            "year_read": "${newYear}",
            "review": "${newReview}",
            "recommend": "${newRecommend}",
            "format": "${format}"
        }`;
        console.log(editJson);

        const editResponse = await fetch(`/api/booklists/${props.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: editJson
        });
        console.log(editResponse);
    }
    


    if (load) {
        return (
            <div className="shelfspinner">
                <Spinner id="spin" animation="border" variant="danger" size="sm" />
            </div>
        )
    }
    
    if (props.listType === 'ARL') {
        return (
            <div className={shelfName}>
                <img onClick={() => setThoughts(true)} className="image" src={props.image} alt="no image found :(" />
                {thoughts ?
                    <Modal show={thoughts} onHide={() => setThoughts(false)} keyboard="true">
                    <Modal.Header closeButton>
                        <Modal.Title id="modal-title">{props.title} -- @{user['https://www.read50.com/username']}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form id="arl-entry">
                            <Form.Row>
                            <Form.Group id="month">
                                <Form.Label>Month</Form.Label>
                                <Form.Control id="month-entry" as="select" defaultValue={month}>
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
                                defaultValue={props.year_read}
                                controlId="year"
                                />
                            </Form.Group>
                            <Form.Group id="recommend">
                                <Form.Label>Recommend?</Form.Label>
                                    <Form.Control defaultValue={recommend} id="recommend-entry" as="select" className="mr-sm-2">
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </Form.Control>
                            </Form.Group>
                            </Form.Row>
                            <Form.Group>
                            <Form.Label>Format</Form.Label>
                            <div id="format">
                                {format === 'paper' ? <Form.Check onClick={() => setFormat('paper')} type="radio" checked="true" label="paper" name="formHorizontalRadios" /> : <Form.Check onClick={() => setFormat('paper')} type="radio" label="paper" name="formHorizontalRadios" /> } 
                                {format === 'ebook' ? <Form.Check onClick={() => setFormat('ebook')} type="radio" checked="true" label="ebook" name="formHorizontalRadios" /> : <Form.Check onClick={() => setFormat('ebook')} type="radio" label="ebook" name="formHorizontalRadios" /> }
                                {format === 'audio' ? <Form.Check onClick={() => setFormat('audio')} type="radio" checked="true" label="audio" name="formHorizontalRadios" /> : <Form.Check onClick={() => setFormat('audio')} type="radio" label="audio" name="formHorizontalRadios" /> }
                            </div>
                            </Form.Group>
                            <Form.Group >
                            <Form.Label>Notes // Review // Final Thoughts</Form.Label>
                                <Form.Control id="review-entry" controlId="review" as="textarea" defaultValue={review} rows={4} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setThoughts(false)}>exit</Button>
                        <Button variant="danger" onClick={() => editDeets()}>save</Button>
                    </Modal.Footer>
                    </Modal>
                    :
                    <span></span>
                }
                {props.readOnly ? <span></span> : <Button id="remove" className="remove-button" variant="warning" size="sm" onClick={removeButton}>Remove</Button>}
            </div>
        )
    }

    return (
        <div className={shelfName}>
            <img onClick={() => setThoughts(true)} className="image" src={props.image} alt="no image found :(" />
            {props.readOnly ? <span></span> : <Button id="remove" className="remove-button" variant="warning" size="sm" onClick={removeButton}>Remove</Button>}
        </div>
    )
}

export default ShelfEntry;