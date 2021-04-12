import { useState, useEffect } from 'react';
import { useCookies  } from 'react-cookie';
import { Spinner } from 'react-bootstrap';
import UserLine from './UserLine.js';
import './UserPage.scss';


const UserPage = (props) => {
  //cookies
  const [cookies, setCookie] = useCookies(['auth0', 'username']);
  //loading to be used for edit of searchfield
  const [loading, setLoading] = useState(false);
  //users array
  const [usersArray, setUsersArray] = useState([]);
  //outgoing friends
  const [pendings, setPendings] = useState([]);
  //complete friends
  const [friends, setFriends] = useState([]);

  const getUsers = async () => {
    setLoading(true);
    const users = await fetch(`/api/users/levenshtein/${props.state.searchField}`);
    const usersJson = await users.json();
    console.log(usersJson);
    setUsersArray(usersJson);
    console.log(usersArray);
    setLoading(false);
  }

  const getPendings = async () => {
    const response = await fetch(`/api/friends/outgoing/${cookies.auth0}`);
    const responseJson = await response.json();
    setPendings(responseJson);
  }

  const getFriends = async () => {
    const response = await fetch(`/api/friends/${cookies.auth0}`);
    const responseJson = await response.json();
    setFriends(responseJson);
  }

  useEffect(() => {
    getUsers();
    getPendings();
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
                <UserLine key={i} info={user} pend={pendings} comp={friends} />
            )
            })
        }
        </div>
    }
    </div>
  )
}

export default UserPage;