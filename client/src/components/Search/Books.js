import React, { Component } from 'react';
import Search from './Search.js';
import BookList from './BookList.js';
import Alert from 'react-bootstrap/Alert';
import request from 'superagent';
import { Spinner } from 'react-bootstrap';
import '../../App.scss';

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      searchField: '',
      searchCount: 0,
      searched: false,
      page: 1,
      loading: false
    }
  }

  delay = ms => new Promise(res => setTimeout(res, ms));

  searchBook = async e => {
    this.setState({ loading: true });
    e.preventDefault();
    await request
      .get("https://www.googleapis.com/books/v1/volumes")
      .query({ q: this.state.searchField, maxResults: 40})
      .then((data) => {
        console.log(data)
        this.setState({ books: [...data.body.items] })
        console.log(this.state.books);
        this.setState({searched: true})
      })
    this.setState({ loading: false });
  }

  handleSearch = (e) => {
    this.setState({ searchField: e.target.value });
  }

  render() {
    return (
      <div>
        <Search searchBook={this.searchBook} handleSearch={this.handleSearch} state={this.state} />
        <div className="main">
          {this.state.loading ? <Spinner className="spinner" animation="grow" variant="danger" size="lg" /> : <BookList changeLoad={this.changeLoad} state={this.state} books={this.state.books} />}
        </div>
      </div>
    );
  }
}

export default Books;
