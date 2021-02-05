import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import '../styles/shelfentry.scss';


const ShelfEntry = (props) => {
    const { user } = useAuth0(); 
    const [load, setLoad] = useState(true);
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
    


    if (load) {
        return (
            <div className="shelfspinner">
                <Spinner className="shelfentry" animation="border" variant="danger" size="sm" />
            </div>
            
        )
    }

    return (
        <div className={shelfName}>
            <p>{props.title}</p>
            <img className="image" src={props.image} alt="no image found :(" />
            <p>{props.author}</p>
            <p>{props.published}</p>
            <Button className="remove-button" variant="danger" size="sm" onClick={removeButton}>Remove</Button>
        </div>
    )
}

export default ShelfEntry;