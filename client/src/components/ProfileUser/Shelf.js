import React from 'react';
import { Link } from 'react-router-dom';
import ShelfEntry from './ShelfEntry.js';

const Shelf = (props) => {
    let numbers = -1;

    if (props.type === 'Want Shelf') {
        if (props.TBR.length === 0) {
            return (
                <div className="sample-empty">
                    {props.profile ? <p>Empty! <Link id="add-link" to="/search">Add books</Link></p> : <p>Empty :(</p>}
                </div>
            )
        }
        if (props.sample === true) {
            return (
                <div className="sample">
                    <div className="sample-items">
                    {
                        props.TBR.slice(0, 3).map((book, i) => {
                            numbers++;
                            return <ShelfEntry
                                        readOnly={!props.profile}
                                        username={props.username}
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
                                        id={book.id}
                                    />
                        })}
                                </div>
                    </div>
            )
            
        }
        return (
            <div className="shelf">
                <div className="items">
        {
            props.TBR.map((book, i) => {
                numbers++;
                return <ShelfEntry
                            readOnly={!props.profile}
                            username={props.username}
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
                            id={book.id}
                        />
            })
                    }
                    </div>
        </div>
        
    )
    } else if (props.type === 'Currently Reading Shelf') {
        if (props.CURR.length === 0) {
            return (
                <div className="sample-empty">
                    {props.profile ? <p>Empty! <Link id="add-link" to="/search">Add books</Link></p> : <p>Empty :(</p>}
                </div>
            )
        }
        if (props.sample === true) {
            return (
                <div className="sample">
                    <div className="sample-items">
                    {
                        props.CURR.slice(0, 3).map((book, i) => {
                            numbers++;
                            return <ShelfEntry
                                        readOnly={!props.profile}
                                        username={props.username}
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
                                        id={book.id}
                                    />
                        })
                                }
                                </div>
                    </div>
            )
            
        }
        return (
            <div className="shelf">
                <div className="items">
        {
            props.CURR.map((book, i) => {
                numbers++;
                return <ShelfEntry
                            readOnly={!props.profile}
                            username={props.username}
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
                            id={book.id}
                        />
            })
                    }
                    </div>
        </div>
        
    )
    } else if (props.type === 'Read Shelf') {
        if (props.ARL.length === 0) {
            return (
                <div className="sample-empty">
                    {props.profile ? <p>Empty! <Link id="add-link" to="/search">Add books</Link></p> : <p>Empty :(</p>}
                </div>
            )
        }
        if (props.sample === true) {
            return (
                <div className="sample">
                    <div className="sample-items">
                    {
                        props.ARL.slice(0, 3).map((book, i) => {
                            numbers++;
                            return <ShelfEntry
                                        readOnly={!props.profile}
                                        username={props.username}
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
                                        month_read={book.month_read}
                                        year_read={book.year_read}
                                        review={book.review}
                                        recommend={book.recommend}
                                        format={book.format}
                                        read_count={book.read_count}
                                        id={book.id}
                                    />
                        })
                    }
                    </div>
                </div>
            )
            
        }
        return (
            <div className="shelf">
                <div className="items">
        {
            props.ARL.map((book, i) => {
                numbers++;
                return <ShelfEntry
                            readOnly={!props.profile}
                            username={props.username}
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
                            month_read={book.month_read}
                            year_read={book.year_read}
                            review={book.review}
                            recommend={book.recommend}
                            format={book.format}
                            read_count={book.read_count}
                            id={book.id}
                        />
            })
                    }
                    </div>
        </div>
        
    )
    } else if (props.type === 'Did Not Finish Shelf') {
        if (props.DNF.length === 0) {
            return (
                <div className="sample-empty">
                    {props.profile ? <p>Empty! <Link id="add-link" to="/search">Add books</Link></p> : <p>Empty :(</p>}
                </div>
            )
        }
        if (props.sample === true) {
            return (
                <div className="sample">
                    <div className="sample-items">
                    {
                        props.DNF.slice(0, 3).map((book, i) => {
                            numbers++;
                            return <ShelfEntry
                                        readOnly={!props.profile}
                                        username={props.username}
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
                                        id={book.id}
                                    />
                        })
                                }
                                </div>
                    </div>
            )
            
        }
        return (
            <div className="shelf">
                <div className="items">
        {
            props.DNF.map((book, i) => {
                numbers++;
                return <ShelfEntry
                            readOnly={!props.profile}
                            username={props.username}
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
                            id={book.id}
                        />
            })
                    }
                    </div>
        </div>
        
    )
    }
}

export default Shelf;