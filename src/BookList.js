import React, {useState} from 'react';
import CardPage from './components/CardPage';
import Pagination from 'react-bootstrap/Pagination';
import RightArrow from './images/rightarrow.png';
import './styles/pagination.scss';

const BookList = (props) => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
  const [page, setPage] = useState(1);
  console.log(page);

  const one = () => setPage(1);
  const two = () => setPage(2);
  const three = () => setPage(3);
  const four = () => setPage(4);

  if (page === 1 && props.state.searched === true) {
    return (
      <div>
        <CardPage state={props.state} books={props.books.slice(0, 10)} page={page} />
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
      </div>
    )
  } else if (page === 2 && props.state.searched === true) {
    return (
      <div>
        <CardPage state={props.state} books={props.books.slice(10, 20)} page={page} />
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
      </div>
    )
  } else if (page === 3 && props.state.searched === true) {
    return (
      <div>
        <CardPage state={props.state} books={props.books.slice(20, 30)} page={page} />
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
      </div>
    )
  } else if (page === 4 && props.state.searched === true) {
    return (
      <div>
        <CardPage state={props.state} books={props.books.slice(30, 40)} page={page} />
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
      </div>
    )
  } else {
    return null;
  }
}

export default BookList;
