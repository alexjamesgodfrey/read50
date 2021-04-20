import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext.js';
import { Spinner } from 'react-bootstrap';
import UserLine from './UserLine.js';
import './UserPage.scss';


const UserPage = (props) => {
  const { currentUser } = useAuth();
  //loading to be used for edit of searchfield
  const [loading, setLoading] = useState(false);
  //users array
  const [usersArray, setUsersArray] = useState([]);
  //outgoing friends
  const [outgoings, setOutgoings] = useState([]);
  //incoming friends
  const [incomings, setIncomings] = useState([]);
  //complete friends
  const [friends, setFriends] = useState([]);

  //gets a list of users based on input
  const getUsers = async () => {
    setLoading(true);
    const users = await fetch(`/api/users/levenshtein/${props.state.searchField}`);
    const usersJson = await users.json();
    await setUsersArray(usersJson);
    
  }

  //gets a list of friends who you have sent requests to
  const getOutgoing = async () => {
    const out = await fetch(`/api/friends/outgoing/${currentUser.uid}`);
    const outJson = await out.json();
    await setOutgoings(outJson);
  }

  //gets a list of friend who you have gotten requests
  const getIncoming = async () => {
    const inc = await fetch(`/api/friends/incoming/${currentUser.uid}`)
    const incJson = await inc.json();
    await setIncomings(incJson);
  }

  //gets a list of completed friend requests
  const getFriends = async () => {
    let empty = [];
    const to = await fetch(`/api/friends/tome/${currentUser.uid}`);
    const toJson = await to.json();
    const from = await fetch(`/api/friends/fromme/${currentUser.uid}`);
    const fromJson = await from.json();
    empty = empty.concat(toJson).concat(fromJson);
    await setFriends(empty);
    setLoading(false);
  }

  useEffect(() => {
    getUsers();
    getIncoming();
    getOutgoing();
    getFriends();
  }, []);

  return (
    <div>
    {loading ? 
        <div className="await">
            <Spinner className="spinner" animation="border" variant="danger" size="lg" />
        </div>
    :
        <div className="users">
        {
            usersArray.map((user, i) => {
            return (
              <UserLine key={i} info={user} profile={false} sty={{'text-decoration': 'underline'}, {'font-size': '26px'}} incoming={incomings} outgoing={outgoings} accepted={friends} />
            )
            })
        }
        </div>
    }
    </div>
  )
}

export default UserPage;