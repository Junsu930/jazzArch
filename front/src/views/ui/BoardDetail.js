import { useEffect, useState } from 'react';
import classes from './BoardDetail.module.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Container,
  Row,
} from 'reactstrap';
import { getOneBoard } from '../../api/apiClient';

const BoardDetail = () => {
  const [boardDetail, setBoardDetail] = useState();
  const { id } = useParams();
  useEffect(() => {
    async function getBoardDetail() {
      try {
        const response = await getOneBoard(id);
        setBoardDetail(response.data);
      } catch (error) {
        console.error('Error fetching the board data:', error);
      }
    }
    getBoardDetail();
  }, [id]);
  return (
    <Container>
      <Row className="my-4">
        <Col md>
          <Card>
            <CardBody>
              <CardTitle tag="h3">{boardDetail && boardDetail.title}</CardTitle>
              <CardText>
                <small className="text-muted">
                  작성자: {boardDetail && boardDetail.author} | 작성일:{' '}
                  {boardDetail && boardDetail.createdAt}
                </small>
              </CardText>
              <CardText className={classes.content}>
                {boardDetail && boardDetail.content}
              </CardText>
              <Button className="my-3">목록</Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BoardDetail;
