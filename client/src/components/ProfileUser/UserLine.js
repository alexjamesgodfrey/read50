import {useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useCookies  } from 'react-cookie';
import Button from 'react-bootstrap/Button';
import './UserPage.scss';


const UserLine = props => {
    const [sent, setSent] = useState(false);
    const [changed, hasChanged] = useState(false);
    const [friend, setFriend] = useState(false);
    const [cookies, setCookie] = useCookies(['auth0', 'username']);

    const checkPending = () => {
        const usernames = [];
        for (let i=0; i<props.pend.length; i++) {
            usernames.push(props.pend[i].username_b);
        }
        if ((usernames.indexOf(props.info.username) !== -1) && !(changed === true)) {
            setSent(true);
        }
    }

    const checkFriend = () => {
        const usernames = [];
        for (let i=0; i<props.comp.length; i++) {
            usernames.push(props.comp[i].username_b);
        }
        if (usernames.indexOf(props.info.username) !== -1) {
            setFriend(true);
        }
    }

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

    const cancelRequest = async () => {
        hasChanged(true);
        setSent(false);
        const cancel = await fetch(`/api/friends/cancel/${cookies.auth0}/${props.info.username}`, {
            method: "DELETE"
        });
        
    }

    useEffect(() => {
        checkPending();
        checkFriend();
    });

    return (
        <div className="line">
            {(props.info.username !== cookies.username) ? <Link to={`/user/${props.info.username}`}><h4>{props.info.username}</h4></Link> : <Link to={`/user/${props.info.username}`}><h4>{props.info.username} (you)</h4></Link>}
            {(props.info.username !== cookies.username) ?
                <div>
                    {(sent === true) ? 
                        <Button id="request-text" variant="warning" size="md" onClick={() => cancelRequest()}>cancel</Button>
                    :
                        <div>
                            {(friend === true) ? 
                                <Button id="request-text" variant="danger" size="md" onClick={() => console.log('remove friend')}>remove friend</Button>
                            :
                                <Button id="request-text" variant="danger" size="md" onClick={() => sendRequest()}>add friend</Button>
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