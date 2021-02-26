import React from 'react';
import { Link } from 'react-router-dom';
import ShelfEntry from './ShelfEntry.js';

const Shelf = (props) => {
    let numbers = -1;

    if (props.type === 'Want Shelf') {
        if (props.TBR.length === 0) {
            return (
                <div className="shelf">
                    <h3>Want Shelf</h3>
                    {props.profile ? <p>Empty! <Link to="/search">Add books</Link></p> : <p>Empty :(</p>}
                </div>
            )
        }
        return (
        <div className="shelf">
                <h3>Want Shelf</h3>
                <div className="items">
        {
            props.TBR.map((book, i) => {
                numbers++;
                return <ShelfEntry
                            readOnly={!props.profile}
                            key={i}
                            entryNumber={numbers}
                            google_id={book.google_id}
                            author={book.author}
                            published={book.date.substring(0, 4)}
                            title={book.title}
                            listType={book.listtype}
                            delay={props.delay}
                            image={book.image}
                            pages={props.pages}
                            words={props.pages * 300}
                        />
            })
                    }
                    </div>
        </div>
        
    )
    } else if (props.type === 'Currently Reading Shelf') {
        if (props.CURR.length === 0) {
            return (
                <div className="shelf">
                    <h3>Currently Reading Shelf</h3>
                    {props.profile ? <p>Empty! <Link to="/search">Add books</Link></p> : <p>Empty :(</p>}
                </div>
            )
        }
        return (
        <div className="shelf">
                <h3>Currently Reading Shelf</h3>
                <div className="items">
        {
            props.CURR.map((book, i) => {
                numbers++;
                return <ShelfEntry
                            readOnly={!props.profile}
                            key={i}
                            entryNumber={numbers}
                            google_id={book.google_id}
                            author={book.author}
                            published={book.date.substring(0,4)}
                            title={book.title}
                            listType={book.listtype}
                            delay={props.delay}
                            image={book.image}
                            pages={props.pages}
                            words={props.pages * 300}
                        />
            })
                    }
                    </div>
        </div>
        
    )
    } else if (props.type === 'Read Shelf') {
        if (props.ARL.length === 0) {
            return (
                <div className="shelf">
                    <h3>Read Shelf</h3>
                    {props.profile ? <p>Empty! <Link to="/search">Add books</Link></p> : <p>Empty :(</p>}
                </div>
            )
        }
        return (
        <div className="shelf">
                <h3>Read Shelf</h3>
                <div className="items">
        {
            props.ARL.map((book, i) => {
                numbers++;
                return <ShelfEntry
                            readOnly={!props.profile}
                            key={i}
                            entryNumber={numbers}
                            google_id={book.google_id}
                            author={book.author}
                            published={book.date.substring(0, 4)}
                            title={book.title}
                            listType={book.listtype}
                            delay={props.delay}
                            image={book.image}
                            pages={props.pages}
                            words={props.pages * 300}
                        />
            })
                    }
                    </div>
        </div>
        
    )
    } else {
        if (props.DNF.length === 0) {
            return (
                <div className="shelf">
                    <h3>Did Not Finish Shelf</h3>
                    {props.profile ? <p>Empty!<Link to="/search">Add books</Link></p> : <p>Empty :(</p>}
                </div>
            )
        }
        return (
        <div className="shelf">
                <h3>Did Not Finish Shelf</h3>
                <div className="items">
        {
            props.DNF.map((book, i) => {
                numbers++;
                return <ShelfEntry
                            readOnly={!props.profile}
                            key={i}
                            entryNumber={numbers}
                            google_id={book.google_id}
                            author={book.author}
                            published={book.date.substring(0,4)}
                            title={book.title}
                            listType={book.listtype}
                            delay={props.delay}
                            image={book.image}
                            pages={props.pages}
                            words={props.pages * 300}
                        />
            })
                    }
                    </div>
        </div>
        
    )
    }
}

export default Shelf;