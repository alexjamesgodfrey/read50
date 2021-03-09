import React, { Component } from 'react';
import CountUp from 'react-countup';
import Loading from '../Loading.js';
import LoginButton from '../LoginButton.js';
import './Home.scss';
 
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userCount: null,
            bookCount: null,
            pageCount: null,
            wordCount: null,
            loading: true
        }
    }

    getNumbers = async () => {
        const getUsers = await fetch('/api/usercount');
        const userJson = await getUsers.json();
        
        const getBooks = await fetch('/api/3numsum/bookcount');
        const bookJson = await getBooks.json();
        
        const getPages = await fetch('/api/3numsum/pagecount');
        const pageJson = await getPages.json();
        
        const getWords = await fetch('/api/3numsum/wordcount');
        const wordJson = await getWords.json();

        this.setState({ userCount: userJson });
        this.setState({ bookCount: bookJson });
        this.setState({ pageCount: pageJson });
        this.setState({ wordCount: wordJson });
        this.setState({ loading: false });
    }

    componentDidMount() {
        this.getNumbers();
    }


    render() {
        let loading = this.state.loading;
        let books = this.state.bookCount;
        let pages = this.state.pageCount;
        let words = this.state.wordCount;
        let users = this.state.userCount;
        if (loading) {
            return <Loading title={'loading home page. just a sec'}/>
        }
        return (
            <div className="sample-total">
                <div className="counts">
                    <p><CountUp end={books} duration={3} /> books.</p>
                    <p><CountUp end={pages} duration={2} /> pages.</p>
                    <p><CountUp end={words} duration={2} /> words.</p>
                    <p>Read by <CountUp end={users} duration={3} /> users.</p>
                </div>
                
                <div className="call-to-action">
                    <p>Challenge friends, join clubs, and climb the leaderboards. Registration only takes 30 seconds.</p>
                </div>
                <LoginButton text="Get Started" />
            </div>
            
        )
    }
}
 
export default Home;