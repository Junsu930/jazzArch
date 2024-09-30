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
import { useEffect, useRef, useState } from 'react';
import {
  deleteComment,
  getComment,
  getOneComment,
  updateComment,
  writeComment,
} from '../../api/apiClient'; // getComment 함수 import
import { format } from 'date-fns';

const BoardComment = ({ boardNo }) => {
  const auth = useAuth();
  const [commentList, setCommentList] = useState([]);
  const [commentPost, setCommentPost] = useState(null);
  const [editingComment, setEditingComment] = useState(null);
  const commentRef = useRef(null);
  const editRef = useRef({});

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

    return () => {
      isMounted = false;
    };
  }, [boardNo]); // boardNo가 변경될 때만 실행

  async function deleteHandler(commentNo) {
    // confirm 경고창 띄우기
    const isConfirmed = window.confirm('정말 이 댓글을 삭제하시겠습니까?');

    if (isConfirmed) {
      // 사용자가 확인을 눌렀을 때 삭제 처리
      try {
        await deleteComment(commentNo);
        // 댓글 목록을 갱신하는 로직 (삭제된 댓글을 제외한 리스트로 상태 업데이트)
        setCommentList((prevComments) =>
          prevComments.filter((comment) => comment.commentNo !== commentNo),
        );
      } catch (error) {
        console.error('댓글 삭제 중 오류가 발생했습니다:', error);
      }
    }
  }

  async function editHandler(commentNo) {
    setEditingComment(commentNo);
  }
  async function saveEditHandler(commentNo) {
    const editedComment = editRef.current[commentNo]?.value;

    if (!editedComment || editedComment.trim() === '') {
      alert('댓글을 입력해주세요');
      return;
    }

    try {
      await updateComment(commentNo, editedComment);
      setCommentList((prevComments) =>
        prevComments.map((comment) =>
          comment.commentNo === commentNo
            ? { ...comment, comment: editedComment }
            : comment,
        ),
      );
      setEditingComment(null); // 수정 완료 후 상태 초기화
    } catch (error) {
      console.error('댓글 수정 중 오류가 발생했습니다:', error);
    }
  }
  async function writeCommentHandler(e) {
    e.preventDefault();
    if (commentPost === '' || commentPost === null) {
      alert('댓글을 입력해주세요');
      return;
    }

    const newComment = {
      comment: commentPost,
      authorId: auth.user.id,
      boardNo: boardNo,
    };

    try {
      const responese = await writeComment(newComment);

      setCommentList([...commentList, responese.data]);
      setCommentPost('');
    } catch (error) {
      console.error('댓글 작성 중 오류가 발생했습니다:', error);
    }
  }
  // 동적으로 텍스트 영역 높이 조정
  function autoResizeTextArea(e) {
    e.target.style.height = 'auto'; // 높이를 자동으로 설정
    e.target.style.height = `${e.target.scrollHeight}px`; // 입력된 내용에 맞게 높이 조정
  }
  function EnterHandler(e) {
    if (e.key === 'Enter') writeCommentHandler(e);
  }

  function commentChangeHandler(e) {
    setCommentPost(e.target.value);
  }

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
              value={commentPost}
              onChange={commentChangeHandler}
              ref={commentRef}
              onKeyUp={EnterHandler}
            />
            <Button
              type="button"
              className="ms-3 my-2"
              style={{ borderRadius: '10px', width: '10%' }}
              onClick={writeCommentHandler}
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
                      {editingComment === comment.commentNo ? (
                        <textarea
                          className="form-control"
                          defaultValue={comment.comment}
                          ref={(el) =>
                            (editRef.current[comment.commentNo] = el)
                          } // ref를 통해 접근
                          onInput={autoResizeTextArea} // 입력 시마다 크기 조정
                          style={{
                            resize: 'none',
                            overflow: 'hidden',
                            width: '200%',
                          }} // 크기 수동 조정 방지
                        />
                      ) : (
                        <p className={classes.commentLine}>{comment.comment}</p>
                      )}
                    </div>
                    <small className="text-muted">
                      {format(new Date(comment.createdAt), 'yyyy년 MM월 dd일')}
                      {auth.isLoggedIn &&
                        comment.author.id === auth.user.id && (
                          <div className={classes.editDelete}>
                            {editingComment === comment.commentNo ? (
                              <div
                                className={classes.editDelete}
                                onClick={() =>
                                  saveEditHandler(comment.commentNo)
                                }
                              >
                                저장
                              </div>
                            ) : (
                              <>
                                <div
                                  className={classes.editDelete}
                                  onClick={() =>
                                    deleteHandler(comment.commentNo)
                                  }
                                >
                                  삭제
                                </div>
                                <div
                                  className={classes.editDelete}
                                  onClick={() => editHandler(comment.commentNo)}
                                >
                                  수정
                                </div>
                              </>
                            )}
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
