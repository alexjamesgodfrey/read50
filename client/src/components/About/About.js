import { Link } from 'react-router-dom';
import Header from '../Header/Header.js';
import me from '../../images/me.jpg';
import privacy from '../../images/privacy.jpg';
import './About.scss';

const About = () => {
    return (
        <div className="about">
            <Header />
            <div className="about-meat">
                <h3 style={{textDecoration: 'underline'}}>about read50.com</h3>
                <h3 className="push-left">history</h3>
                <p>first of all, thank you so much for using my site! i look forward to watching the community grow
                    and site features along with it.</p>
                <div className="picture-container">
                    <p>next let's talk about why i made this site. about 5 months ago, i started learning web development.
                    it was pretty fun. but i was just making silly one-page sites that had 0 function. of course you have to
                    start with the basics, but i wanted to make website that not only had utility but looked <i>clean</i>.
                    taking courses is really boring though. so i decided to learn hands on
                        and just experiment. it took a long time to learn. in fact, i think i could remake this website from scratch in 1/10th the
                time it took me to originally make it.</p>
                    <div>
                        <img className="me" src={me} alt="a picture of me"></img>
                        <p>me (alex)</p>
                    </div>
                </div>
                <h3 className="push-left">why</h3>
                <p>it was the first project that came to mind, probably because i like to read so much. <span className="special">about
                halfway through i realized that i was remaking goodreads. then i made a goodreads account and found out how
                much it <i>sucked</i>. amazon does not care about you at all. </span>
                 from that point on in the project i decided to improve upon every one of goodread's features, and add more.
                all with a much more slick user interface. but i haven't been to design school -- so <span className="special">i want to hear all the feedback you have.</span></p>
                <h3 className="push-left">bugs</h3>
                <p>be forewarned: <span className="special">there will be bugs. but you will not lose any of your data.</span> it is regularly backed up.
                <Link id="about-link" to="/bugs"> visit bugs to report bugs</Link></p>
                <h3 className="push-left">privacy</h3>
                <p>i believe privacy is a fundamental human right. this website uses 0 cookies and 0 trackers. your browser temporarily
                stores only your most recent search. when signing up with google, we only get access to your email and listed name. we do not request
                additional information (like contacts) through google or any other login providers. we <i>do not</i> track your deleted books or any other input/clicks.</p>
                <img className="privacy" src={privacy} alt="a picture showing that we don't use any trackers"></img>
                <p>a screenshot taken on mac's new secure browser</p>
                <h3 className="push-left">money</h3>
                <p>does/will this site generate profit? currently, the only source of profit is through amazon affiliate links.
                when you click on a link from this website that points to amazon and you then buy something from amazon,
                i earn a slight commission. it costs you nothing more on amazon and helps to pay for the database/web servers
                that run this website :)</p>
                <h3 className="push-left">faq</h3>
                <p><Link id="about-link" to="/bugs">send questions over at bugs</Link></p>
                <p>q: is this website open source? a: yes! you can <a id="about-link" href="https://github.com/agod1373/read50" target="_blank">view the code here</a></p>

            </div>
        </div>
    )
}

export default About;