import React, {useEffect, useState} from 'react';
import Spinner from 'react-bootstrap/Spinner';
import '../styles/Loading.scss';

const Loading = () => {
    const [rand, setRand] = useState(Math.floor(Math.random() * 9));

    let tips = [
        "(0) It takes an average of 475 hours to write a novel",
        "(1) Half of all books sold today are to people over the age of 45.",
        "(2) Women buy 68% of all books sold",
        "(3) Surprisingly, reading proved to be 600% more beneficial in fighting stress than playing a video game, and 300% more useful than going for a walk. Its impact even surpasses drinking a cup of tea (100%) or listening to music (68%)",
        "(4) Among people who volunteer, 42% are readers, and 25% are non-readers",
        "(5) Among people who donate money and goods, 82% are readers, and 66% non-readers",
        "(6) Daily reading to children puts them almost 1 year ahead of those who are not being read to",
        "(7) The average person has a reading speed of 250 words per minute. Visit lessons to improve your reading speed",
        "(8) Up to 50 books can be made from one tree",
        "(9) The Holy Bible has sold over six billion copies",
        "(10) If you read 20 minutes a day you'll read 1,800,000 words per year"
    ]

    return (
        <div className="total">
            <div className="header-container">
                <h3>hold tight! the computer is subvocalizing!</h3>
            </div>
            <div className="spinner-container">
                <Spinner animation="border" variant="danger" size="lg" />
            </div>
            <div className="tip-container">
                <h5>{tips[rand]}</h5>
            </div>
        </div> 
    )
    
}

export default Loading;