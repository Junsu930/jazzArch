import { useEffect, useState } from 'react';
import classes from './BoardDetail.module.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BoardDetail = () => {
  const [boardDetail, setBoardDetail] = useState();
  const { id } = useParams();
  useEffect(() => {
    async function getBoardDetail() {
      try {
        const response = await axios.get('/data.json');
        const boardList = response.data.boardList;
        const foundBoard = boardList.find(
          (board) => Number(board.id) === Number(id),
        );
        setBoardDetail(foundBoard);
      } catch (error) {
        console.error('Error fetching the board data:', error);
      }
    }
    getBoardDetail();
  }, [id]);

  return (
    <>
      {boardDetail && <div>{boardDetail.author}</div>}
      {boardDetail && <div>{boardDetail.contend}</div>}
      {boardDetail && <div>{boardDetail.createdAt}</div>}
      {boardDetail && <div>{boardDetail.title}</div>}
      {boardDetail && <div>{boardDetail.viewCount}</div>}
    </>
  );
};

export default BoardDetail;
