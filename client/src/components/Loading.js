import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import '../styles/Loading.scss';

const Loading = (props) => {

    return (
        <div className="total">
            <div className="spinner-container">
                <Spinner animation="border" variant="danger" size="xl" />
            </div>
        </div> 
    )
    
}

export default Loading;