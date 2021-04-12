import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { withCookies, Cookies } from 'react-cookie';
import './Search.scss';
import { FormControl, Button } from 'react-bootstrap';

const Search = (props) => {

  const { user } = useAuth0();

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const search = `{
        "search_string": ` + `"` + props.state.searchField + `",` +
        `"madebyid": ` + `"` + user.sub + `",` +
        `"madebyusername": ` + `"` + user['https://www.read50.com/username'] + `"
        }`;
      const response = await fetch("/api/searches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: search
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="search">
      <form onSubmit={props.searchBook} actions="">
        <FormControl id="input" type="text" placeholder="enter title, author, or username" onChange={props.handleSearch} value={props.state.searchField} />
        <Button id="button" variant="danger" onMouseOver={onSubmitForm} type="submit">go</Button>
      </form>
    </div>
  )
}

export default Search;
