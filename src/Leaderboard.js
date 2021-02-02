import { render } from '@testing-library/react';
import React, { Component } from 'react';
import Header from './components/Header.js';
import LeaderboardList from './components/LeaderboardList.js';
import LeaderboardPage from './components/LeaderboardPage';
import Loading from './components/Loading.js';
import './styles/Leaderboard.scss';

class Leaderboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            entries: [],
            loading: true
        }
    }

    loadFunc = async () => {
        await this.delay(1250);
        this.setState({ loading: false });
    }

    delay = ms => new Promise(res => setTimeout(res, ms));

    numConverter = num => {
        if (num > 999999999) {
            num /= 1000000000;
            num = num.toFixed(2);
            num += 'bn';
        }
        else if (num > 999999) {
            num /= 1000000;
            num = num.toFixed(2);
            num += 'm';
        } else if (num > 999) {
            num /= 1000;
            num = num.toFixed(2);
            num += 'k';
        }
        return num;
    }

    setRanks = arr => {
        let rank = 1;
        for (let i = 0; i < arr.length; i++){
            arr[i].rank = rank;
            rank++;
        }
    }

    getLeaderboards = async () => {
        //create final array
        let finalArray = [];
        //create users array
        const getUsers = await fetch('/api/getsubs');
        const json = await getUsers.json();
        this.setState({ users: [...json] });
        //create the entries array by looping through users and booklists
        for (let i = 0; i < this.state.users.length; i++){
            //create the three num sum
            let auth0_id = this.state.users[i];
            const books = await fetch(`/api/3numsum/books/${auth0_id}`);
            let booksJson = await books.json();
            let booksReal = this.numConverter(parseInt(booksJson));
            const pages = await fetch(`/api/3numsum/pages/${auth0_id}`);
            let pagesJson = await pages.json();
            let pagesReal = this.numConverter(parseInt(pagesJson));
            const words = await fetch(`/api/3numsum/words/${auth0_id}`);
            let wordsJson = await words.json();
            let wordsReal = this.numConverter(parseInt(wordsJson));
            const total = booksReal + ' / ' + pagesReal + ' / ' + wordsReal;

            //get the users user name
            const username = await fetch(`/api/users/username/${auth0_id}`);
            let usernameJson = await username.json();

            //get the users pen name
            const penName = 'N/A';

            let object = {
                sub: this.state.users[i],
                rank: 0,
                username: usernameJson,
                penname: penName,
                words: wordsJson,
                threeNumSum: total
            }
            finalArray.push(object);
        }
        finalArray.sort((a, b) => {
            return b.words - a.words;
        });
        this.setRanks(finalArray);
        this.setState({ entries: [...finalArray] });
        console.log(this.state.entries);
    }

    render() {
        this.loadFunc();
        const loading = this.state.loading;
        if (loading) {
            return <Loading />
        }
    
        return (
            <div className="">
                <Header />
                <h2 className="head">Read50 Leaderboard</h2>
                <h5 className="tiny-head">Displays the stats of the top 100 readers on read50.com</h5>
                <h5 className="tiny-tiny-head">**page numbers will not work until there are more than 25 registered users**</h5>
                <div className="leaderboard-entry">
                    <div className="entry-rank">Rank</div>
                    <div className="entry-name">Username</div>
                    <div className="entry-part">Pen Name</div>
                    <div className="entry-meat">Books/Pages/Words</div>
                </div>
                <LeaderboardList delay={this.delay} state={this.state} entries={this.state.entries} getLeaderboards={this.getLeaderboards}/>
            </div>  
        )
    }
    
}

export default Leaderboard;