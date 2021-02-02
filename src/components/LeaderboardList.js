import React, {useState, useEffect} from 'react';
import LeaderboardPage from './LeaderboardPage.js';
import Pagination from 'react-bootstrap/Pagination';
import '../styles/pagination.scss';

const LeaderboardList = (props) => {
    window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
    });
    
    useEffect(() => {
        props.getLeaderboards();
    }, [])

  const [page, setPage] = useState(1);

  const one = () => setPage(1);
  const two = () => setPage(2);
  const three = () => setPage(3);
  const four = () => setPage(4);

  if (page === 1) {
    return (
      <div>
        <LeaderboardPage state={props.state} page={page} entries={props.entries.slice((page-1 * 25), (page * 25))} delay={props.delay} />
        <div className="pagination-box">
          <Pagination size="md" className="pagination">
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
  } else if (page === 2) {
    return (
      <div>
        <LeaderboardPage state={props.state} page={page} entries={props.entries.slice((page-1 * 25), (page * 25))} delay={props.delay} />
        <div className="pagination-box">
          <Pagination size="md" className="pagination">
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
  } else if (page === 3) {
    return (
      <div>
        <LeaderboardPage state={props.state} page={page} entries={props.entries.slice((page-1 * 25), (page * 25))} delay={props.delay} />
        <div className="pagination-box">
          <Pagination size="md" className="pagination">
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
  } else if (page === 4) {
    return (
      <div>
        <LeaderboardPage state={props.state} page={page} entries={props.entries.slice((page-1 * 25), (page * 25))} delay={props.delay} />
        <div className="pagination-box">
          <Pagination size="md" className="pagination">
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

export default LeaderboardList;
