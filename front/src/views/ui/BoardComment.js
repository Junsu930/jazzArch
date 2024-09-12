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

const BoardComment = () => {
  const auth = useAuth();

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
      <Row>
        <Col className="md">
          <Card className="mb-3 shadow-sm" style={{ borderRadius: '10px' }}>
            <CardBody>
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="fw-bold mb-1">사용자 닉네임</h6>
                  <p className="text-muted">댓글 내용이 여기에 표시됩니다.</p>
                </div>
                <small className="text-muted">5분 전</small>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BoardComment;
