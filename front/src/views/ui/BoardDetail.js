import { useEffect, useState } from 'react';
import classes from './BoardDetail.module.css';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { GrLinkPrevious } from 'react-icons/gr';
import { format } from 'date-fns';
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Container,
  Row,
} from 'reactstrap';
import { useCookies } from 'react-cookie';
import { getOneBoard, increaseViewCount } from '../../api/apiClient';
import BoardComment from './BoardComment';

const BoardDetail = () => {
  const [boardDetail, setBoardDetail] = useState();
  const [cookies, setCookie] = useCookies(['readBoard']);
  const { id } = useParams();
  const nav = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get('page') || 0; // 페이지 정보 가져오기

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
