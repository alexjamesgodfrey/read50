import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import '../styles/Loading.scss';

const Loading = (props) => {

    return (
        <div className="total">
            <div className="header-container">
                {props.title ? <h3>{props.title}</h3> : <h3>hold tight! the computer is subvocalizing!</h3>}
            </div>
            <div className="spinner-container">
                <Spinner animation="border" variant="danger" size="xl" />
            </div>
        </div> 
    )
    
}

export default Loading;