import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext.js';
import { Spinner, Modal, Button, Form } from 'react-bootstrap';
import './ShelfEntry.scss';
import '../Search/BookCard.scss';

const ShelfEntry = (props) => {
    const { currentUser } = useAuth();
    const [load, setLoad] = useState(true);
    
    //used to handle the displayed details of a book on the ARL shelf
    const [thoughts, setThoughts] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [complete, setComplete] = useState(false);
    const [month, setMonth] = useState(props.month_read);
    const [year, setYear] = useState(props.year_read);
    const [recommend, setRecommend] = useState(props.recommend);
    const [format, setFormat] = useState(props.format);
    const [review, setReview] = useState(props.review);
    
    const shelfName = props.listType + 'shelf';

    //function to be run upon removal of item from shelf
    const remove = async (listType) => {
        //step 1: get the entry and hide it
        const entries = document.getElementsByClassName(shelfName);
        entries[props.entryNumber].style.display = 'none';
        //step 2: send a delete request to booklists table
        const deleteResponse = await fetch(`/api/booklists/${currentUser.uid}/${listType}/${props.google_id}`, {
            method: "DELETE"
        });
    }

    const editDeets = async () => {
        setSubmitting(true);
        const editJson = `{
            "month_read": "${month}",
            "year_read": "${year}",
            "review": "${review}",
            "recommend": "${recommend}",
            "format": "${format}"
        }`;
        const editResponse = await fetch(`/api/booklists/${props.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: editJson
        });
        console.log(editResponse);
        await props.delay(250);
        setComplete(true);
        await props.delay(750);
        setSubmitting(false);
        setComplete(false);
        setThoughts(false);
    }

    if (props.listType === 'ARL') {
        return (
            <div className={shelfName}>
                <p>{month} {year}</p>
                <img onClick={() => setThoughts(true)} className="image" src={props.image} alt="no image found :(" />
                {thoughts ?
                    <Modal show={thoughts} onHide={() => setThoughts(false)} keyboard="true">
                    <Modal.Header closeButton>
                        <Modal.Title id="modal-title">{props.title} -- @{props.username}</Modal.Title>
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
                                            <Form.Control id="month-entry" as="select" onChange={e => setMonth(e.target.value)} defaultValue={month} readOnly={props.readOnly}>
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
                                            <Form.Control id="year-entry" onChange={e => setYear(e.target.value)} defaultValue={year} controlId="year" readOnly={props.readOnly} />
                                        </Form.Group>
                                        <Form.Group id="recommend">
                                            <Form.Label>Recommend?</Form.Label>
                                            <Form.Control onChange={e => setRecommend(e.target.value)} defaultValue={recommend} id="recommend-entry" as="select" className="mr-sm-2" readOnly={props.readOnly}>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Group readOnly={props.readOnly}>
                                        <Form.Label>Format</Form.Label>
                                        <div id="format">
                                            {format === 'paper' ? <Form.Check onClick={() => setFormat('paper')} type="radio" checked="true" label="paper" name="formHorizontalRadios" readOnly={props.readOnly} /> : <Form.Check onClick={() => setFormat('paper')} type="radio" label="paper" name="formHorizontalRadios" readOnly={props.readOnly} />}
                                            {format === 'ebook' ? <Form.Check onClick={() => setFormat('ebook')} type="radio" checked="true" label="ebook" name="formHorizontalRadios" readOnly={props.readOnly} /> : <Form.Check onClick={() => setFormat('ebook')} type="radio" label="ebook" name="formHorizontalRadios" readOnly={props.readOnly} />}
                                            {format === 'audio' ? <Form.Check onClick={() => setFormat('audio')} type="radio" checked="true" label="audio" name="formHorizontalRadios" readOnly={props.readOnly} /> : <Form.Check onClick={() => setFormat('audio')} type="radio" label="audio" name="formHorizontalRadios" readOnly={props.readOnly} />}
                                        </div>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Notes // Review // Final Thoughts</Form.Label>
                                        <Form.Control onChange={e => setReview(e.target.value)} id="review-entry" controlId="review" as="textarea" defaultValue={review} rows={4} readOnly={props.readOnly} />
                                    </Form.Group>
                                </Form>
                            }
                        </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setThoughts(false)}>exit</Button>
                        {props.readOnly ? <span></span> : <Button variant="danger" onClick={() => editDeets()}>save</Button>}
                    </Modal.Footer>
                    </Modal>
                    :
                    <span></span>
                }
                {props.readOnly ? <span></span> : <Button id="remove" className="remove-button" variant="warning" size="sm" onClick={() => remove(props.listType)}>Remove</Button>}
            </div>
        )
    }

    return (
        <div className={shelfName}>
            <img onClick={() => setThoughts(true)} className="image" src={props.image} alt="no image found :(" />
            {props.readOnly ? <span></span> : <Button id="remove" className="remove-button" variant="warning" size="sm" onClick={() => remove(props.listType)}>Remove</Button>}
        </div>
    )
}

export default ShelfEntry;