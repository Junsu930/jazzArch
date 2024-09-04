import { Table } from 'reactstrap';
import { FaRegEye } from 'react-icons/fa';
import { IoPerson } from 'react-icons/io5';
import { MdOutlineTitle, MdFormatListNumbered } from 'react-icons/md';
import classes from './Freeboard.module.css';
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getAllBoard } from '../../api/apiClient';
const Freeboard = () => {
  const [boardList, setBoardList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

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
                <Link to={`/post/${board.boardNo}`}>{board.title}</Link>
              </td>
              <td>{board.viewCount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
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
      />
    </>
  );
};

export default Freeboard;
