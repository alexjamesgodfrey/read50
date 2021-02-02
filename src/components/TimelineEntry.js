import React, {useEffect} from 'react';

const TimelineEntry = (props) => {

    const addString = `${props.title} by ${props.author} added to ${props.listtype} shelf on ${props.date}`;

    if (props.type === 'add') {
        if (props.listtype === "ARL") {
            return (
                <div className="timeline-entry">
                    <p className="timeline-beef">{props.title} by {props.author} <span className="added">added</span> to the read shelf on {props.date}</p>
                </div>
            )
        } 
        if (props.listtype === "DNF") {
            return (
                <div className="timeline-entry">
                    <p className="timeline-beef">{props.title} by {props.author} <span className="added">added</span> to the did not finish shelf on {props.date}</p>
                </div>
            )
        } 
        if (props.listtype === "CURR") {
            return (
                <div className="timeline-entry">
                    <p className="timeline-beef">{props.title} by {props.author} <span className="added">added</span> to the current shelf on {props.date}</p>
                </div>
            )
        } 
        if (props.listtype === "TBR") {
            return (
                <div className="timeline-entry">
                    <p className="timeline-beef">{props.title} by {props.author} <span className="added">added</span> to the to be read shelf on {props.date}</p>
                </div>
            )
        } 
        return (
            <div className="timeline-entry">
                <p className="timeline-beef">{props.title} by {props.author} <span className="added">added</span> to {props.listtype} shelf on {props.date}</p>
            </div>
        )
    }

    if (props.listtype === "ARL") {
        return (
            <div className="timeline-entry">
                <p className="timeline-beef">{props.title} by {props.author} <span className="removed">removed</span> from the read shelf on {props.date}</p>
            </div>
        )
    } 

    if (props.listtype === "CURR") {
        return (
            <div className="timeline-entry">
                <p className="timeline-beef">{props.title} by {props.author} <span className="removed">removed</span> from the current shelf on {props.date}</p>
            </div>
        )
    }

    if (props.listtype === "TBR") {
        return (
            <div className="timeline-entry">
                <p className="timeline-beef">{props.title} by {props.author} <span className="removed">removed</span> from the to be read shelf on {props.date}</p>
            </div>
        )
    } 

    if (props.listtype === "DNF") {
        return (
            <div className="timeline-entry">
                <p className="timeline-beef">{props.title} by {props.author} <span className="removed">removed</span> from the did not finish shelf on {props.date}</p>
            </div>
        )
    } 

    return (
        <div className="timeline-entry">
            <p className="timeline-beef">{props.title} by {props.author} <span className="removed">removed</span> from {props.listtype} shelf on {props.date}</p>
        </div>
    )
}

export default TimelineEntry;