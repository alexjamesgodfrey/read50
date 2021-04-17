import { Link } from 'react-router-dom';
import Header from '../Header/Header.js';
import bookcardsample1 from '../../images/bookcardsample1.JPG';
import bookcardsample2 from '../../images/bookcardsample2.JPG';
import bookcardsample3 from '../../images/bookcardsample3.JPG';
import addtoread from '../../images/addtoread.JPG';
import notificationdemo from '../../images/notificationdemo.JPG';
import './Tutorial.scss';

const Tutorial = () => {
    return (
        <div className="about">
            <Header />
            <div className="about-meat">
                <h3 style={{textDecoration: 'underline'}}>tutorial</h3>
                <h3 className="push-left">searching for books</h3>
                <p>simply type your query into the top right of this screen or in the top-center of the search page and
                click search, go, or hit enter. a list of 40 "book cards" will pop up, with 10 per page. below the search box, you
                will also have an option to search users for your search term. from there you can send requests to other users. tell your
                friends about read50!</p>
                <h3 className="push-left">book card  anatomy</h3>
                <p>a bookcard obviously has a title, author, and date. in the future, when you click on the title
                or image, a summary and open discussion of the book by read50 users will pop up. but for now, you can
                add a book to your want list, reading list, read list, or did not finish list. you cannot create more shelves
                than those four, but <span className="special">you will be able to add and group by tags in the future</span></p>
                <div className="sample-bookcard-container">
                    <div>
                        <img className="bookcard-sample" src={bookcardsample3} />
                        <p>book no one has want, reading, read, or did not finish</p>
                    </div>
                    <div>
                        <img className="bookcard-sample" src={bookcardsample2} />
                        <p>book I and one other person have read</p>
                    </div>
                    <div>
                        <img className="bookcard-sample" src={bookcardsample1} />
                        <p>book i want and one other user has read</p>
                    </div>
                </div>
                <h3 className="push-left">adding a book to the read shelf</h3>
                <div className="read-box">
                    <img className="read-sample" src={addtoread} />
                    <div className="read-captions">
                        <p>as you can see, there are multiple fields you can fill out when you are adding a
                        book to your read shelf. </p>
                        <p>soon, there will be more fields, like if you have read a book multiple times</p>
                        <p>other people will be able to see what you write here, but write whatever you want! also,
                        if you type letter in for the date, there may be an error. finally, make sure that you do
                        not hit the enter key in the review box (i will allow you to do this soon)</p>
                    </div>
                </div>
                <h3 className="push-left">viewing your profile</h3>
                <p>to access your profile, simply click on "myread50" in the top right corner, then click profile</p>
                <img id="notis" className="read-sample" src={notificationdemo} />
                <p>in the top left corner of your profile, there is a notification bell that will appear with a red
                dot if you have a notification. in this example, i have a friend request from testbot. in the middle of the page
                you can view your friends or view your clubs (coming soon)</p>
                <p>on the main profile page, i can set my yearly goal in books, and get a calculated pace needed
                and progress bar. simply hit edit, enter goal, and remember to hit save</p>
                <p>lower on the profile page, you can see three values of each shelf. to see more, simply click on the shelf name in the top-middle
                of the page. <span className="special">you will soon be able to sort shelves.</span></p>
                <p>click remove below any of the images to remove that item. to edit a read shelf entry, simply click of the image.</p>
                <h3 className="push-left">leaderboard and other's profiles</h3>
                <p>simply hit leaderboard to see the leaderboard. it should load quickly. <span className="special">soon there will be friend and club leaderboards</span>
                from there you can click on other people's
                profiles to view what they have read and said about thier books. </p>
                <h3 className="push-left">that's all there is to it</h3>
                <p><Link id="about-link" to="/bugs">feel free to visit bugs</Link> to ask any questions about how to use the site! thank you again and enjoy!</p>
            </div>
        </div>
    )
}

export default Tutorial;