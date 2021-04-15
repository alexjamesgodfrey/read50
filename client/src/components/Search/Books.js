import React, { Component } from 'react';
import Search from './Search.js';
import { FormControl, Button } from 'react-bootstrap';
import BookList from './BookList.js';
import request from 'superagent';
import { Spinner } from 'react-bootstrap';
import { withRouter } from "react-router";
import './Search.scss';

class Books extends Component {
  constructor(props) {
    super(props);

    this.state = {
      previousBooks: JSON.parse(sessionStorage.getItem('books')) || [],
      books: [],
      urlSearch: this.props.match.params.urlSearch,
      searchField: sessionStorage.getItem('searchField') || '',
      searchCount: 0,
      searched: false,
      page: sessionStorage.getItem('page') || 1,
      users: false,
      loading: false
    }
  }

  delay = ms => new Promise(res => setTimeout(res, ms));

  searchBook = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    if (this.state.searchField === "") {
      await this.setState({ searchField: 'brandon sanderson' });
    }
    await request
      .get("https://www.googleapis.com/books/v1/volumes")
      .query({ q: this.state.searchField, maxResults: 40})
      .then((data) => {
        sessionStorage.setItem('books', JSON.stringify(data.body.items));
        this.setState({ books: [...data.body.items] });
        this.setState({ searched: true });
      })
    this.setState({ loading: false });
    console.log(this.state.books);
  }

  handleSearch = (e) => {
    let change = e.target.value;
    sessionStorage.setItem('searchField', change);
    this.setState({ searchField: change });
  }

  changeUser = (value, e) => {
    if (this.state.searched === false) {
      this.searchBook(e);
    }
    this.setState({ users: value });
  }

  perfomurlSearch = async () => {
    this.setState({ loading: true });
    this.setState({ searchField: this.state.urlSearch });
    await request
      .get("https://www.googleapis.com/books/v1/volumes")
      .query({ q: this.state.urlSearch, maxResults: 40})
      .then((data) => {
        sessionStorage.setItem('books', JSON.stringify(data.body.items));
        this.setState({ books: [...data.body.items] })
        this.setState({searched: true})
      })
    this.setState({ loading: false });
  }

  componentDidMount() {
    if (this.state.urlSearch && this.state.searched === false) {
      console.log('url search');
      this.perfomurlSearch();
    }
  }

  render() {
    let users = this.state.users;
    let searchField = this.state.searchField;
    return (
      <div id="aggregation">
        <div className="search-total">
          <div className="search">
            <form>
              <FormControl id="input" type="text" placeholder="enter title, author, or username" onChange={this.handleSearch} value={this.state.searchField} />
              <Button id="button" variant="danger" type="submit" onClick={this.searchBook}>go</Button>
            </form>
          </div>
          {this.state.searchField !== "" ? 
            <div className="alt-container">
              {(users === true) ? <p onClick={() => this.changeUser(false)}>search books for "{searchField}"</p> : <p onClick={() => this.changeUser(true)}>search users for "{searchField}"</p>}
            </div>
          :
            <span></span>
          }
        </div>
        <div>
          {this.state.loading ?
            <div className="await">
              <Spinner className="spinner" animation="border" variant="danger" size="lg" />
            </div>
            :
            <BookList page={this.state.page} users={this.state.users} changeLoad={this.changeLoad} state={this.state} books={this.state.books} />
          }
        </div>
      </div>
    );
  }
}

export default withRouter(Books);
