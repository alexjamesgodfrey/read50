import { useState } from 'react';
import PopoverContent from 'react-bootstrap/PopoverContent';
import Button from 'react-bootstrap/Button';

const FriendRequest = (props) => {

        const [denied, setDenied] = useState(false);

        const denyRequest = async (username, i) => {
                const deny = await fetch(`/api/friends/rejectrequest/${props.auth0}/${username}`, {
                        method: "DELETE"
                });
                setDenied(true)
        }



        return (
                <div>
                        <PopoverContent className="request-line">
                                {props.f.username_a}
                                <div className="contents">
                                        {denied ?
                                                <div className="denied"><Button className="denied" id="canceled" variant="outline-warning" size="sm">denied</Button></div>
                                        :
                                                <div className="removables">
                                                        <Button id="request-text" variant="warning" size="sm" onClick={() => denyRequest()}>deny</Button>
                                                        <Button id="request-text" variant="danger" size="sm">accept</Button>
                                                </div>
                                        }
                                </div>
                        </PopoverContent>
                </div>
        )
}

export default FriendRequest;