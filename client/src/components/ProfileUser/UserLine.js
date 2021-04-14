import {useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useCookies  } from 'react-cookie';
import Button from 'react-bootstrap/Button';
import './UserPage.scss';


const UserLine = props => {
    //cookies & loaded
    const [cookies, setCookie] = useCookies(['auth0', 'username']);
    const [loading, setLoading] = useState(false);

    //incoming state
    const [received, setReceived] = useState(false);
    const [incomingChange, setIncomingChange] = useState(false);

    //outgoing state
    const [sent, setSent] = useState(false);
    const [outgoingChange, setOutgoingChange] = useState(false);

    //accepted state
    const [friend, setFriend] = useState(false);
    const [acceptedChange, setAcceptedChange] = useState(false);
    

    //incoming functions
    const checkIncoming = () => {
        const usernames = [];
        for (let i = 0; i < props.incoming.length; i++) {
            usernames.push(props.incoming[i].username_a);
        }
        if ((usernames.indexOf(props.info.username) !== -1) && !(incomingChange === true)) {
            setReceived(true);
        }
    }

    const denyRequest = async () => {
        setIncomingChange(true);
        setReceived(false);
        const deny = await fetch(`/api/friends/rejectrequest/${cookies.auth0}/${props.info.username}`, {
            method: "DELETE"
        });
    }

    const acceptRequest = async () => {
        setIncomingChange(true);
        setReceived(false);
        setFriend(true)
        const accept = await fetch(`/api/friends/acceptrequest/${cookies.auth0}/${props.info.username}`, {
            method: "PUT"
        });
    }


    //outgoing functions
    const checkOutgoing = () => {
        const usernames = [];
        for (let i = 0; i < props.outgoing.length; i++) {
            usernames.push(props.outgoing[i].username_b);
        }
        if ((usernames.indexOf(props.info.username) !== -1) && !(outgoingChange === true)) {
            setSent(true);
        }
    }

    const cancelRequest = async () => {
        setOutgoingChange(true);
        setSent(false);
        const cancel = await fetch(`/api/friends/cancel/${cookies.auth0}/${props.info.username}`, {
            method: "DELETE"
        });
    }

    
    //accepted functions
    const checkFriend = () => {
        const usernames = [];
        for (let i = 0; i < props.accepted.length; i++) {
            usernames.push(props.accepted[i].username_a);
            usernames.push(props.accepted[i].username_b);
        }
        if ((usernames.indexOf(props.info.username) !== -1) && !(acceptedChange === true)) {
            setFriend(true);
        }
        setLoading(false)
    }

    const removeFriend = async () => {
        setAcceptedChange(true)
        setFriend(false);
        const str = `/api/friends/remove/${cookies.auth0}/${props.info.username}`;
        console.log(str);
        const remove = await fetch(`/api/friends/remove/${cookies.auth0}/${props.info.username}`, {
            method: "DELETE"
        });
    }


    //no incoming, outgoing, or accepted status functions
    const sendRequest = async () => {
        setSent(true);
        const json = `{
            "auth0_a": "${cookies.auth0}",
            "auth0_b": "${props.info.auth0_id}",
            "username_a": "${cookies.username}",
            "username_b": "${props.info.username}"
        }`
        const send = await fetch("/api/friends/createrequest", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: json
        });
    }


    useEffect(() => {
        if (props.profile === false) {
            checkIncoming();
            checkOutgoing();
        }
        checkFriend();
    });
    

    if (received === true) {
        return (
            <div className="line">
                <Link to={`/user/${props.info.username}`}><h4 className="username" style={props.sty}>{props.info.username}</h4></Link>
                {loading === false ? 
                    <div>  
                        <Button id="request-text" variant="warning" size="md" onClick={() => denyRequest()}>deny</Button>
                        <Button id="request-text" variant="danger" size="md" onClick={() => acceptRequest()}>accept</Button>
                    </div>
                    :
                    <span></span>
                    }
            </div>
        )
    }

    return (
        <div className="line">
            {(props.info.username !== cookies.username) ? <Link to={`/user/${props.info.username}`}><h4 className="username" style={props.sty}>{props.info.username}</h4></Link> : <Link to={`/profile`}><h4 className="username" style={props.sty}>{props.info.username} (you)</h4></Link>}
            {((props.info.username !== cookies.username) && loading === false) ?
                <div>
                    {(sent === true) ? 
                        <Button id="request-text" variant="warning" size="md" onClick={() => cancelRequest()}>cancel request</Button>
                    :
                        <div>
                            {(friend === true) ? 
                                <Button id="request-text" variant="warning" size="md" onClick={() => removeFriend()}>remove friend</Button>
                            :
                                <Button id="request-text" variant="danger" size="md" onClick={() => sendRequest()}>send request</Button>
                            }
                            
                        </div>
                    }
                </div>
            :
                <span></span>
            }
        </div>
    )
    
}

export default UserLine;