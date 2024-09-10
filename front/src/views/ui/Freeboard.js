import { Button, Table } from 'reactstrap';
import { FaRegEye } from 'react-icons/fa';
import { IoPerson } from 'react-icons/io5';
import { MdOutlineTitle, MdFormatListNumbered } from 'react-icons/md';
import classes from './Freeboard.module.css';
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getAllBoard } from '../../api/apiClient';
import { useAuth } from '../../context/AuthContexet';

const Freeboard = () => {
  const [boardList, setBoardList] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialPage = Number(queryParams.get('page')) || 0;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const itemsPerPage = 10;
  const auth = useAuth();

  useEffect(() => {
    async function getBoard() {
      try {
        const response = await getAllBoard();
        setBoardList(response.data);
      } catch (error) {
        console.error('Error fetching the board data:', error);
      }
    }
    getBoard();
  }, []);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    navigate(`?page=${selected}`);
  };

  const gotoWriteHandler = () => {
    navigate('/writePost');
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = boardList.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(boardList.length / itemsPerPage);

  return (
    <>
      <Table hover>
        <thead>
          <tr className={classes.tableRat}>
            <th>
              <MdFormatListNumbered />
            </th>
            <th>
              <IoPerson />
            </th>
            <th>
              <MdOutlineTitle />
            </th>
            <th>
              <FaRegEye />
            </th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((board) => (
            <tr key={board.boardNo}>
              <th scope="row">{board.boardNo}</th>
              <td>{board.author}</td>
              <td>
                <Link
                  to={`/post/${board.boardNo}?page=${currentPage}`}
                  className={classes.titleLink}
                >
                  {board.title}
                </Link>
              </td>
              <td>{board.viewCount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {auth.isLoggedIn && (
        <Button color="light" size="sm" onClick={gotoWriteHandler}>
          글쓰기
        </Button>
      )}
      <ReactPaginate
        previousLabel={'이전'}
        nextLabel={'다음'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={classes.pagination}
        activeClassName={classes.active}
        forcePage={currentPage}
        previousClassName={classes.prevButton}
        nextClassName={classes.nextButton}
      />
    </>
  );
};

export default Freeboard;
