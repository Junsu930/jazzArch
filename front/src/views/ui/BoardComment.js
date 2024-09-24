import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  Row,
  Button,
} from 'reactstrap';
import classes from './BoardComment.module.css';
import { useAuth } from '../../context/AuthContexet';
import { useEffect, useState } from 'react';
import { getComment } from '../../api/apiClient'; // getComment 함수 import
import { format } from 'date-fns';

const BoardComment = ({ boardNo }) => {
  const auth = useAuth();
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    let isMounted = true; // 컴포넌트가 언마운트된 후에도 state 업데이트 방지

    async function fetchComment() {
      try {
        const response = await getComment(boardNo);
        if (isMounted) {
          setCommentList(response.data); // 데이터가 있을 때만 상태 업데이트
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching the comments:', error);
        }
      }
    }

    if (boardNo) {
      fetchComment(); // boardNo가 있을 때만 호출
    }

    // cleanup 함수로 컴포넌트 언마운트 시 isMounted 플래그를 false로 설정
    return () => {
      isMounted = false;
    };
  }, [boardNo]); // boardNo가 변경될 때만 실행

  return (
    <Container className={`${classes.board_comment_container} mt-1 p-3 shadow`}>
      <Row className="mb-3">
        {auth.isLoggedIn && (
          <Form className="d-flex">
            <Input
              type="text"
              placeholder="댓글을 입력하세요..."
              className="my-2 p-3"
              style={{ borderRadius: '10px', border: '1px solid #ced4da' }}
            />
            <Button
              type="button"
              className="ms-3 my-2"
              style={{ borderRadius: '10px', width: '10%' }}
            >
              등록
            </Button>
          </Form>
        )}
      </Row>
      {commentList &&
        commentList.map((comment, index) => (
          <Row key={index}>
            <Col className="md">
              <Card className="mb-3 shadow-sm" style={{ borderRadius: '10px' }}>
                <CardBody>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="fw-bold mb-1">
                        {comment.author.nickname}
                      </h6>
                      <p className={classes.commentLine}>{comment.comment}</p>
                    </div>
                    <small className="text-muted">
                      {format(new Date(comment.createdAt), 'yyyy년 MM월 dd일')}
                      {comment.author.id === auth.user.id && (
                        <div className={classes.editDelete}>
                          <div>삭제</div>
                          <div>수정</div>
                        </div>
                      )}
                    </small>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        ))}
    </Container>
  );
};

export default BoardComment;
