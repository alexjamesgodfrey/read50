import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import TimelineEntry from './TimelineEntry.js';
import '../styles/Timeline.scss';
import { propTypes } from 'react-bootstrap/esm/Image';

const Timeline = (props) => {
    console.log('timeline reloaded');
    const { user, isAuthenticated, isLoading } = useAuth0();

    const [entries, setEntries] = useState([]);

    const getRecents = async (user) => {
        console.log('get recents');
        //get all actions from booklists
        const booklists = await fetch(`/api/booklistactions/${user}`);
        const booklistsJson = await booklists.json();
        //get all deletions from booklists
        const deletions = await fetch(`/api/deletionactions/${user}`);
        const deletionsJson = await deletions.json();
        //sort and add to entries
        for (let i = 0; i < deletionsJson.length; i++){
            booklistsJson.push(deletionsJson[i]);
        }
        //remove GMT (Eastern Standard Time) from date_added
        for (let i = 0; i < booklistsJson.length; i++){
            booklistsJson[i].date_added = booklistsJson[i].date_added.slice(0, booklistsJson[i].date_added.indexOf('GMT'));
        }
        booklistsJson.sort((a, b) => {
            return b.seconds_added - a.seconds_added;
        });
        console.log(booklistsJson);
        setEntries([...booklistsJson]);
        console.log(entries);
    }

    useEffect(() => {
        getRecents(user.sub);
    }, [])

    return (
        <div className="timelines">
            <h4 className="title">Timeline</h4>
            {
                entries.map((entry, i) => {
                    return <TimelineEntry
                        key={i}
                        title={entry.title}
                        author={entry.author}
                        date={entry.date_added}
                        type={entry.type}
                        listtype={entry.listtype}
                        />
                })
            }
        </div>
        
    )
}

export default Timeline;