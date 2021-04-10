import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import '../styles/Loading.scss';

const Loading = (props) => {

    return (
        <div className="total">
            {/* <div className="header-container">
                {props.title ? <h3>{props.title}</h3> : <h3>hold tight! the computer is subvocalizing!</h3>}
            </div> */}
            <div className="spinner-container">
                <Spinner animation="border" variant="danger" size="xl" />
            </div>
            {/* <div className="header-container">
                {props.desc ? <h5>{props.desc}</h5> : <h3></h3>}
            </div> */}
        </div> 
    )
    
}

export default Loading;