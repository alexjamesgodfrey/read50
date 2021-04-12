import React, {useState} from 'react';
import CardPage from '../CardPage.js';
import UserPage from '../ProfileUser/UserPage.js';
import Pagination from 'react-bootstrap/Pagination';
import '../../styles/pagination.scss';

const BookList = (props) => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
  const [page, setPage] = useState(1);
  const [books, setBooks] = useState(true);

  const one = () => setPage(1);
  const two = () => setPage(2);
  const three = () => setPage(3);
  const four = () => setPage(4);

  //runs if the user has no book sessionStorage or has clicked the search button
  if (props.state.previousBooks.length < 1 || props.state.searched === true) {
    if (page === 1 && props.state.searched === true) {
      return (
        <div>
          <div className="navigation">
            <h3 onClick={() => setBooks(true)} style={{ 'margin-right': '20px' }}>books</h3>
            <h3 onClick={() => setBooks(false)}>users</h3>
          </div>
          {books ? <CardPage state={props.state} books={props.books.slice(0, 10)} page={page} /> : <UserPage state={props.state} />}
          {books ?
            <div className="pagination-box">
              <Pagination size="lg" className="pagination">
                <Pagination.Prev id="non-active" onClick={four} />
                <Pagination.Item id="pagination">1</Pagination.Item>
                <Pagination.Item id="non-active" onClick={two}>2</Pagination.Item>
                <Pagination.Item id="non-active" onClick={three}>3</Pagination.Item>
                <Pagination.Item id="non-active" onClick={four}>4</Pagination.Item>
                <Pagination.Next id="non-active" onClick={two} />
              </Pagination>
            </div>
            :
            <span></span>
          }
        </div>
      )
    } else if (page === 2 && props.state.searched === true) {
      return (
        <div>
          <div className="navigation">
            <h3 onClick={() => setBooks(true)} style={{ 'margin-right': '20px' }}>books</h3>
            <h3 onClick={() => setBooks(false)}>users</h3>
          </div>
          {books ? <CardPage state={props.state} books={props.books.slice(10, 20)} page={page} /> : <UserPage state={props.state} />}
          {books ?
            <div className="pagination-box">
              <Pagination size="lg" className="pagination">
                <Pagination.Prev id="non-active" onClick={one} />
                <Pagination.Item id="non-active" onClick={one}>1</Pagination.Item>
                <Pagination.Item id="pagination">2</Pagination.Item>
                <Pagination.Item id="non-active" onClick={three}>3</Pagination.Item>
                <Pagination.Item id="non-active" onClick={four}>4</Pagination.Item>
                <Pagination.Next id="non-active" onClick={three} />
              </Pagination>
            </div>
            :
            <span></span>
          }
        </div>
      )
    } else if (page === 3 && props.state.searched === true) {
      return (
        <div>
          <div className="navigation">
            <h3 onClick={() => setBooks(true)} style={{ 'margin-right': '20px' }}>books</h3>
            <h3 onClick={() => setBooks(false)}>users</h3>
          </div>
          {books ? <CardPage state={props.state} books={props.books.slice(20, 30)} page={page} /> : <UserPage state={props.state} />}
          {books ?
            <div className="pagination-box">
              <Pagination size="lg" className="pagination">
                <Pagination.Prev id="non-active" onClick={two} />
                <Pagination.Item id="non-active" onClick={one}>1</Pagination.Item>
                <Pagination.Item id="non-active" onClick={two}>2</Pagination.Item>
                <Pagination.Item id="pagination">3</Pagination.Item>
                <Pagination.Item id="non-active" onClick={four}>4</Pagination.Item>
                <Pagination.Next id="non-active" onClick={four} />
              </Pagination>
            </div>
            :
            <span></span>
          }
        </div>
      )
    } else if (page === 4 && props.state.searched === true) {
      return (
        <div>
          <div className="navigation">
            <h3 onClick={() => setBooks(true)} style={{ 'margin-right': '20px' }}>books</h3>
            <h3 onClick={() => setBooks(false)}>users</h3>
          </div>
          {books ? <CardPage state={props.state} books={props.books.slice(30, 40)} page={page} /> : <UserPage state={props.state} />}
          {books ?
            <div className="pagination-box">
              <Pagination size="lg" className="pagination">
                <Pagination.Prev id="non-active" onClick={three} />
                <Pagination.Item id="non-active" onClick={one}>1</Pagination.Item>
                <Pagination.Item id="non-active" onClick={two}>2</Pagination.Item>
                <Pagination.Item id="non-active" onClick={three}>3</Pagination.Item>
                <Pagination.Item id="pagination">4</Pagination.Item>
                <Pagination.Next id="non-active" onClick={one} />
              </Pagination>
            </div>
            :
            <span></span>
          }
        </div>
      )
    } else {
      return null;
    }
  //runs if the user has not searched and does not have a session storage
  } else {
    if (page === 1) {
      return (
        <div>
          <div className="navigation">
            <h3 onClick={() => setBooks(true)} style={{ 'margin-right': '20px' }}>books</h3>
            <h3 onClick={() => setBooks(false)}>users</h3>
          </div>
          {books ? <CardPage state={props.state} books={props.state.previousBooks.slice(0, 10)} page={page} /> : <UserPage state={props.state} />}
          {books ?
            <div className="pagination-box">
              <Pagination size="lg" className="pagination">
                <Pagination.Prev id="non-active" onClick={four} />
                <Pagination.Item id="pagination">1</Pagination.Item>
                <Pagination.Item id="non-active" onClick={two}>2</Pagination.Item>
                <Pagination.Item id="non-active" onClick={three}>3</Pagination.Item>
                <Pagination.Item id="non-active" onClick={four}>4</Pagination.Item>
                <Pagination.Next id="non-active" onClick={two} />
              </Pagination>
            </div>
            :
            <span></span>
          }
        </div>
      )
    } else if (page === 2 && props.state.searched === true) {
      return (
        <div>
          <div className="navigation">
            <h3 onClick={() => setBooks(true)} style={{ 'margin-right': '20px' }}>books</h3>
            <h3 onClick={() => setBooks(false)}>users</h3>
          </div>
          {books ? <CardPage state={props.state} books={props.books.slice(10, 20)} page={page} /> : <UserPage state={props.state} />}
          {books ?
            <div className="pagination-box">
              <Pagination size="lg" className="pagination">
                <Pagination.Prev id="non-active" onClick={one} />
                <Pagination.Item id="non-active" onClick={one}>1</Pagination.Item>
                <Pagination.Item id="pagination">2</Pagination.Item>
                <Pagination.Item id="non-active" onClick={three}>3</Pagination.Item>
                <Pagination.Item id="non-active" onClick={four}>4</Pagination.Item>
                <Pagination.Next id="non-active" onClick={three} />
              </Pagination>
            </div>
            :
            <span></span>
          }
        </div>
      )
    } else if (page === 3 && props.state.searched === true) {
      return (
        <div>
          <div className="navigation">
            <h3 onClick={() => setBooks(true)} style={{ 'margin-right': '20px' }}>books</h3>
            <h3 onClick={() => setBooks(false)}>users</h3>
          </div>
          {books ? <CardPage state={props.state} books={props.books.slice(20, 30)} page={page} /> : <UserPage state={props.state} />}
          {books ?
            <div className="pagination-box">
              <Pagination size="lg" className="pagination">
                <Pagination.Prev id="non-active" onClick={two} />
                <Pagination.Item id="non-active" onClick={one}>1</Pagination.Item>
                <Pagination.Item id="non-active" onClick={two}>2</Pagination.Item>
                <Pagination.Item id="pagination">3</Pagination.Item>
                <Pagination.Item id="non-active" onClick={four}>4</Pagination.Item>
                <Pagination.Next id="non-active" onClick={four} />
              </Pagination>
            </div>
            :
            <span></span>
          }
        </div>
      )
    } else if (page === 4 && props.state.searched === true) {
      return (
        <div>
          <div className="navigation">
            <h3 onClick={() => setBooks(true)} style={{ 'margin-right': '20px' }}>books</h3>
            <h3 onClick={() => setBooks(false)}>users</h3>
          </div>
          {books ? <CardPage state={props.state} books={props.books.slice(30, 40)} page={page} /> : <UserPage state={props.state} />}
          {books ?
            <div className="pagination-box">
              <Pagination size="lg" className="pagination">
                <Pagination.Prev id="non-active" onClick={three} />
                <Pagination.Item id="non-active" onClick={one}>1</Pagination.Item>
                <Pagination.Item id="non-active" onClick={two}>2</Pagination.Item>
                <Pagination.Item id="non-active" onClick={three}>3</Pagination.Item>
                <Pagination.Item id="pagination">4</Pagination.Item>
                <Pagination.Next id="non-active" onClick={one} />
              </Pagination>
            </div>
            :
            <span></span>
          }
        </div>
      )
    } else {
      return null;
    }
  }
}

export default BookList;
