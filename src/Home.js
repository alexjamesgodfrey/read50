import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import Particles from 'react-particles-js';
import CountUp from 'react-countup';
import Loading from './components/Loading.js';
import Button from 'react-bootstrap/Button';
import SampleBookCard from './components/SampleBookCard.js';
import LoginButton from './components/LoginButton.js';
import wayofkings from './images/WoKSample.jpg';
import orwell from './images/1984sample.jpg';
import amusing from './images/amusingsample.jpg';
import time from './images/eyeoftheworldsample.jpg';
import danny from './images/fast and slow sample.jpg';
import will from './images/freewillsample.jpg';
import harry from './images/harrypottersample.jpg';
import lamora from './images/lies.jpg';
import meditations from './images/meditationssample.jpg';
import snowden from './images/permanentrecordsample.jpg';
import power from './images/powersample.jpg';
import andy from './images/puddicomesample.jpg';
import republic from './images/republicofthievessample.jpg';
import walker from './images/whywesleepsample.jpg';
import king from './images/wizardandglasssample.jpg';
import bobby from './images/bobbyfischer.jpg';
import bravenewworld from './images/bravenewworld.jpg';
import elonmusk from './images/elonmusk.jpg';
import neuroscienceintelligence from './images/neuroscienceintelligence.jpg';
import misery from './images/misery.jpg';
import stand from './images/stand.jpg';
import blackswan from './images/blackswan.jpg';
import fooled from './images/fooled.jpg';
import bloodelves from './images/bloodelves.jpg';
import quiet from './images/quiet.jpg';
import atomichabits from './images/atomichabits.jpg';
import howofhappiness from './images/howofhappiness.jpg';
import rhythymwar from './images/rhythymwar.jpg';
import mistborn from './images/mistborn.jpg';
import riseofrobots from './images/riseofrobots.jpg';
import warbreaker from './images/warbreaker.jpg';
import dune from './images/dune.jpg';
import discourses from './images/discourses.jpg';
import secretsfablehaven from './images/secretsfablehaven.jpg';
import randomwalk from './images/randomwalk.jpg';
import childrenoftime from './images/childrenoftime.jpg';
import './styles/Home.scss';
 
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
        console.log(this.state);
    }

    sleep = ms => new Promise(res => setTimeout(res, ms));

    loadingFunc = async () => {
        await this.sleep(1250);
        this.setState({ loading: false });
        console.log('loaded');
    }

    componentDidMount() {
        this.loadingFunc();
        this.getNumbers();
    }


    render() {
        let loading = this.state.loading;
        let books = this.state.bookCount;
        let pages = this.state.pageCount;
        let words = this.state.wordCount;
        let users = this.state.userCount;
        if (loading) {
            return <Loading />
        }
        return (
            <div id="sample-total">
                <Particles id="particles"
                    params={{
                        "particles": {
                            "number": {
                                "value": 30
                            },
                            "color": {
                                "value": '#dc3545'
                            },
                            "size": {
                                "value": 3
                            }
                        }
                    }} />
                <div id="bg">
                    <p className="main-count"><CountUp end={books} duration={3} /> books.</p>
                    <p className="main-count"><CountUp end={pages} duration={2} /> pages.</p>
                    <p className="main-count"><CountUp end={words} duration={2} /> words.</p>
                    <p className="main-count">Read by <CountUp end={users} duration={3} /> users.</p>
                    <p className="call-to-action">Challenge friends, join clubs, and climb the leaderboards. Registration only takes 30 seconds.</p>
                </div>
                <div id="sample-container">
                    <SampleBookCard
                        title={"THE WAY OF KINGS"}
                        author={"Brandon Sanderson"}
                        date={"2014-03-04"}
                        want={"12.4k"}
                        curr={"129"}
                        read={"57k"}
                        dnf={"380"}
                        img={wayofkings}
                        number={0}
                    />
                    <SampleBookCard
                        title={"1984"}
                        author={"George Orwell"}
                        date={"1983-10-17"}
                        want={"800"}
                        curr={"20"}
                        read={"85k"}
                        dnf={"3k"}
                        img={orwell}
                        number={1}
                    />
                    <SampleBookCard
                        title={"AMUSING OURSEL..."}
                        author={"Neil Postman"}
                        date={"2006"}
                        want={"300"}
                        curr={"7"}
                        read={"3k"}
                        dnf={"400"}
                        img={amusing}
                        number={2}
                    />
                    <SampleBookCard
                        title={"THE EYE OF THE..."}
                        author={"Robert Jordan"}
                        date={"1990-01-15"}
                        want={"9k"}
                        curr={"1k"}
                        read={"180k"}
                        dnf={"3k"}
                        img={time}
                        number={3}
                    />
                    <SampleBookCard
                        title={"THINKING, FAST..."}
                        author={"Daniel Kahneman"}
                        date={"2011-10-25"}
                        want={"14k"}
                        curr={"3k"}
                        read={"105k"}
                        dnf={"7k"}
                        img={danny}
                        number={4}
                    />
                    <SampleBookCard
                        title={"FREE WILL"}
                        author={"Sam Harris"}
                        date={"2012-03-06"}
                        want={"300"}
                        curr={"7"}
                        read={"3.8k"}
                        dnf={"130"}
                        img={will}
                        number={5}
                    />
                    <SampleBookCard
                        title={"HARRY POTTER A..."}
                        author={"J.K. Rowling"}
                        date={"2015-12-08"}
                        want={"2.2k"}
                        curr={"150"}
                        read={"20k"}
                        dnf={"183"}
                        img={harry}
                        number={6}
                    />
                    <SampleBookCard
                        title={"THE LIES OF LO..."}
                        author={"Scott Lynch"}
                        date={"2008-09-18"}
                        want={"1.8k"}
                        curr={"89"}
                        read={"23k"}
                        dnf={"1.7k"}
                        img={lamora}
                        number={7}
                    />
                    <SampleBookCard
                        title={"THE MEDITATION..."}
                        author={"Marcus Aurelius"}
                        date={"1887"}
                        want={"3.9k"}
                        curr={"1.2k"}
                        read={"120k"}
                        dnf={"792"}
                        img={meditations}
                        number={8}
                    />
                    <SampleBookCard
                        title={"PERMANENT RECORD"}
                        author={"Edward Snowden"}
                        date={"2019-09-17"}
                        want={"128"}
                        curr={"23"}
                        read={"2.8k"}
                        dnf={"34"}
                        img={snowden}
                        number={9}
                    />
                    <SampleBookCard
                        title={"THE 48 LAWS OF..."}
                        author={"Robert Greene"}
                        date={"2000-09-01"}
                        want={"18k"}
                        curr={"3.7k"}
                        read={"107k"}
                        dnf={"7.8k"}
                        img={power}
                        number={10}
                    />
                    <SampleBookCard
                        title={"THE HEADSPACE ..."}
                        author={"Andy Puddicombe"}
                        date={"2011-05-26"}
                        want={"128"}
                        curr={"8"}
                        read={"5.8k"}
                        dnf={"15"}
                        img={andy}
                        number={11}
                    />
                    <SampleBookCard
                        title={"THE REPUBLIC O..."}
                        author={"Scott Lynch"}
                        date={"2013-10-08"}
                        want={"5.8k"}
                        curr={"639"}
                        read={"46k"}
                        dnf={"2.3k"}
                        img={republic}
                        number={12}
                    />
                    <SampleBookCard
                        title={"WHY WE SLEEP"}
                        author={"Matthew Walker"}
                        date={"2017-10-03"}
                        want={"7.8k"}
                        curr={"429"}
                        read={"19.8k"}
                        dnf={"487"}
                        img={walker}
                        number={13}
                    />
                    <SampleBookCard
                        title={"WIZARD AND GLASS"}
                        author={"Stephen King"}
                        date={"2003"}
                        want={"308"}
                        curr={"13"}
                        read={"4.3k"}
                        dnf={"43"}
                        img={king}
                        number={14}
                    />
                    <SampleBookCard
                        title={"BOBBY FISCHER ..."}
                        author={"Bobby Fischer,Stu..."}
                        date={"1982-07-01"}
                        want={"410"}
                        curr={"13"}
                        read={"1.5k"}
                        dnf={"15"}
                        img={bobby}
                        number={15}
                    />
                    <SampleBookCard
                        title={"ELON MUSK"}
                        author={"Ashlee Vance"}
                        date={"2015-05-19"}
                        want={"8.1k"}
                        curr={"498"}
                        read={"42.9k"}
                        dnf={"1.2k"}
                        img={elonmusk}
                        number={16}
                    />
                    <SampleBookCard
                        title={"BRAVE NEW WORL..."}
                        author={"Aldous Huxley"}
                        date={"2005-07-05"}
                        want={"3.9k"}
                        curr={"2.1k"}
                        read={"158k"}
                        dnf={"15k"}
                        img={bravenewworld}
                        number={17}
                    />
                    <SampleBookCard
                        title={"MISTBORN"}
                        author={"Brandon Sanderson"}
                        date={"2010-04-01"}
                        want={"9.2k"}
                        curr={"5.2k"}
                        read={"73.8k"}
                        dnf={"2.1k"}
                        img={mistborn}
                        number={18}
                    />
                    <SampleBookCard
                        title={"THE NEUROSCIEN..."}
                        author={"Richard J. Haier"}
                        date={"2016-12-28"}
                        want={"521"}
                        curr={"4"}
                        read={"2.4k"}
                        dnf={"185"}
                        img={neuroscienceintelligence}
                        number={19}
                    />
                    <SampleBookCard
                        title={"MISERY"}
                        author={"Stephen King"}
                        date={"2017-02-28"}
                        want={"18k"}
                        curr={"1.2k"}
                        read={"125k"}
                        dnf={"8k"}
                        img={misery}
                        number={20}
                    />
                    <SampleBookCard
                        title={"THE BLACK SWAN"}
                        author={"Nassim Nicholas T..."}
                        date={"2007-04-17"}
                        want={"6.1k"}
                        curr={"398"}
                        read={"31.3k"}
                        dnf={"2.9k"}
                        img={blackswan}
                        number={21}
                    />
                    <SampleBookCard
                        title={"THE STAND"}
                        author={"Stephen King"}
                        date={"2012"}
                        want={"14.9k"}
                        curr={"792"}
                        read={"74.8k"}
                        dnf={"4.1k"}
                        img={stand}
                        number={22}
                    />
                    <SampleBookCard
                        title={"QUIET"}
                        author={"Susan Cain"}
                        date={"2013"}
                        want={"801"}
                        curr={"12"}
                        read={"5.1k"}
                        dnf={"128"}
                        img={quiet}
                        number={""}
                    />
                    <SampleBookCard
                        title={"FOOLED BY RAND..."}
                        author={"Nassim Nicholas T..."}
                        date={"2007-05-03"}
                        want={"4.7k"}
                        curr={"294"}
                        read={"12.9k"}
                        dnf={"1.2k"}
                        img={fooled}
                        number={""}
                    />
                    <SampleBookCard
                        title={"BLOOD OF ELVES"}
                        author={"Andrzej Sapkowski"}
                        date={"2010-08-19"}
                        want={"3.8k"}
                        curr={"242"}
                        read={"21.1k"}
                        dnf={"402"}
                        img={bloodelves}
                        number={""}
                    />
                    <SampleBookCard
                        title={"ATOMIC HABITS"}
                        author={"James Clear"}
                        date={"2018"}
                        want={"8.4k"}
                        curr={"794"}
                        read={"92k"}
                        dnf={"1.7k"}
                        img={atomichabits}
                        number={""}
                    />
                    <SampleBookCard
                        title={"RHYTHM OF WAR"}
                        author={"Brandon Sanderson"}
                        date={"2020-11-17"}
                        want={"18.7k"}
                        curr={"1.9k"}
                        read={"13.6k"}
                        dnf={"184"}
                        img={rhythymwar}
                        number={""}
                    />
                    <SampleBookCard
                        title={"THE HOW OF HAP..."}
                        author={"Sonja Lyubomirsky"}
                        date={"2008"}
                        want={"581"}
                        curr={"82"}
                        read={"9.2k"}
                        dnf={"318"}
                        img={howofhappiness}
                        number={""}
                    />
                    <SampleBookCard
                        title={"WARBREAKER"}
                        author={"Brandon Sanderson"}
                        date={"2009-06-09"}
                        want={"13.6k"}
                        curr={"281"}
                        read={"51.9k"}
                        dnf={"964"}
                        img={warbreaker}
                        number={""}
                    />
                    <SampleBookCard
                        title={"RISE OF THE ROBOTS"}
                        author={"Martin Ford"}
                        date={"2015-05-05"}
                        want={"424"}
                        curr={"8"}
                        read={"2.3k"}
                        dnf={"194"}
                        img={riseofrobots}
                        number={""}
                    />
                    <SampleBookCard
                        title={"DUNE"}
                        author={"Frank Herbert"}
                        date={"2005"}
                        want={"6.9k"}
                        curr={"152"}
                        read={"34.9k"}
                        dnf={"1.5k"}
                        img={dune}
                        number={""}
                    />
                    <SampleBookCard
                        title={"DISCOURSES AND..."}
                        author={"Epictetus"}
                        date={"2008-08-28"}
                        want={"195"}
                        curr={"4"}
                        read={"2.7k"}
                        dnf={"281"}
                        img={discourses}
                        number={""}
                    />
                    <SampleBookCard
                        title={"SECRETS OF THE..."}
                        author={"Brandon Mull,Bran..."}
                        date={"2010-02-23"}
                        want={"2.8k"}
                        curr={"29"}
                        read={"16.1k"}
                        dnf={"298"}
                        img={secretsfablehaven}
                        number={""}
                    />
                    <SampleBookCard
                        title={"A RANDOM WALK ..."}
                        author={"Burton G. Malkiel"}
                        date={"2015-01-05"}
                        want={"8.6k"}
                        curr={"104"}
                        read={"49.k"}
                        dnf={"2.1k"}
                        img={randomwalk}
                        number={""}
                    />
                    <SampleBookCard
                        title={"CHILDREN OF TIME"}
                        author={"Adrian Tchaikovsky"}
                        date={"2018-09-18"}
                        want={"2.8k"}
                        curr={"59"}
                        read={"10.2k"}
                        dnf={"3.1k"}
                        img={childrenoftime}
                        number={""}
                    />
                </div>
                <div className="get-started">
                    <LoginButton  text="Get Started" />
                </div>
            </div>
            
        )
    }
}
 
export default Home;