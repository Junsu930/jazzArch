import { useEffect, useState } from 'react';
import classes from './BoardDetail.module.css';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { GrLinkPrevious } from 'react-icons/gr';
import { format } from 'date-fns';
import {
  Card,
  CardBody,
  CardFooter,
  CardText,
  CardTitle,
  Col,
  Container,
  Row,
} from 'reactstrap';
import { useCookies } from 'react-cookie';
import {
  boardDelete,
  getCommentCount,
  getOneBoard,
  increaseViewCount,
} from '../../api/apiClient';
import BoardComment from './BoardComment';
import { useAuth } from '../../context/AuthContexet';

const BoardDetail = () => {
  const [boardDetail, setBoardDetail] = useState();
  const [cookies, setCookie] = useCookies(['readBoard']);
  const [commentCount, setCommentCount] = useState(0);
  const { id } = useParams();
  const nav = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get('page') || 0; // 페이지 정보 가져오기
  const auth = useAuth();

  useEffect(() => {
    async function getBoardDetail() {
      try {
        const response = await getOneBoard(id);
        setBoardDetail(response.data);
      } catch (error) {
        console.error('Error fetching the board data:', error);
      }
    }

    function handleViewCount() {
      // 쿠키에서 'readBoard' 항목 확인 후 처리

      const readBoard = cookies.readBoard || [];
      if (!readBoard.includes(id)) {
        increaseViewCount(id); // 조회수 증가 API 호출
        setBoardCookie();
      }
    }

    function setBoardCookie() {
      const readBoard = cookies.readBoard || [];
      setCookie('readBoard', [...readBoard, id], { path: '/', maxAge: 1800 }); // 기존 쿠키에 추가하여 저장
    }

    getBoardDetail();
    handleViewCount();
  }, [id]);

  function backToListHandler() {
    nav(`/freeboard?page=${page}`);
  }

  async function boardDeleteHandler(boardNo) {
    const response = await getCommentCount(boardNo);

    setCommentCount(response.data);

    if (commentCount > 0) {
      alert('댓글이 남겨진 글은 삭제할 수 없습니다.');
      return;
    } else {
      const isConfirmed = window.confirm('정말 게시물을 삭제하시겠습니까?');

      if (isConfirmed) {
        // 사용자가 확인을 눌렀을 때 삭제 처리
        try {
          await boardDelete(boardNo);
          // 댓글 목록을 갱신하는 로직 (삭제된 댓글을 제외한 리스트로 상태 업데이트)
          backToListHandler();
        } catch (error) {
          console.error('삭제 중 오류가 발생했습니다:', error);
        }
      }
    }
  }

  return (
    <Container>
      <Row className="my-4">
        <Col md>
          <Card>
            <Row className="m-3">
              <Col className="xs">
                <GrLinkPrevious
                  className={classes.backButton}
                  onClick={backToListHandler}
                />
              </Col>
            </Row>
            <CardBody>
              <CardTitle tag="h3">{boardDetail && boardDetail.title}</CardTitle>
              <CardText>
                <small className="text-muted">
                  작성자: {boardDetail && boardDetail.author} | 작성일:{' '}
                  {boardDetail &&
                    format(new Date(boardDetail.createdAt), 'yyyy년 MM월 dd일')}
                </small>
              </CardText>
              <CardText className={classes.content}>
                {boardDetail && (
                  <div
                    dangerouslySetInnerHTML={{ __html: boardDetail.content }}
                  ></div>
                )}
              </CardText>
            </CardBody>
            {auth.isLoggedIn &&
              boardDetail &&
              boardDetail.authorId === auth.user.id && (
                <CardFooter className={classes.cardFooter}>
                  <div className={classes.editBoard}>수정</div>
                  <div
                    className={classes.deleteBoard}
                    onClick={() => boardDeleteHandler(boardDetail.boardNo)}
                  >
                    삭제
                  </div>
                </CardFooter>
              )}
          </Card>
        </Col>
      </Row>
      <Row>
        <BoardComment boardNo={id}></BoardComment>
      </Row>
    </Container>
  );
};

export default BoardDetail;
