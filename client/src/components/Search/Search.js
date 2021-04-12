import { useState } from 'react';
import './Search.scss';
import { FormControl, Button } from 'react-bootstrap';

const Search = (props) => {
  const [books, setBooks] = useState(true);

  return (
    <div className="search-total">
      <div className="search">
        <form actions="">
          <FormControl id="input" type="text" placeholder="enter title, author, or username" onChange={props.handleSearch} value={props.state.searchField} />
          <Button id="button" variant="danger" type="submit">go</Button>
        </form>
      </div>
      <div className="alt-container">
        {books ? <p onClick={() => setBooks(false)}>search users for "{props.state.searchField}"</p> : <p onClick={() => setBooks(true)}>search books for "{props.state.searchField}"</p>}
      </div>
    </div>
  )
}

export default Search;
