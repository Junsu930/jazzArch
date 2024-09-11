import React, { useState } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
  Card,
  CardBody,
} from 'reactstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { writeBoard } from '../../api/apiClient';
import { useAuth } from '../../context/AuthContexet';
import { useNavigate } from 'react-router-dom';

const WritePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 글 작성 데이터 처리 로직
    await writeBoard(
      title,
      content,
      auth.user.id,
      auth.user.email,
      auth.user.nickname,
    )
      .then((response) => {
        console.log('글 작성 성공:', response.data);
        navigate('/board');
      })
      .catch((error) => {
        console.error('글 작성 실패:', error);
      });
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={12} className="md-1">
          <Card>
            <CardBody>
              <h3>글 작성</h3>
              <Form onSubmit={handleSubmit}>
                {/* 제목 입력 필드 */}
                <FormGroup>
                  <Label for="postTitle">제목</Label>
                  <Input
                    type="text"
                    name="title"
                    id="postTitle"
                    placeholder="제목을 입력하세요"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </FormGroup>

                {/* 리치 텍스트 에디터 (내용 입력 필드) */}
                <FormGroup>
                  <Label for="postContent">내용</Label>
                  <ReactQuill
                    value={content}
                    onChange={(value) => setContent(value)}
                    placeholder="내용을 입력하세요"
                    modules={{
                      toolbar: {
                        container: [
                          [{ header: '1' }, { header: '2' }, { font: [] }],
                          [{ list: 'ordered' }, { list: 'bullet' }],
                          ['bold', 'italic', 'underline', 'strike'],
                          [{ align: [] }],
                          ['link'],
                          ['clean'],
                        ],
                      },
                    }}
                    formats={[
                      'header',
                      'font',
                      'list',
                      'bullet',
                      'bold',
                      'italic',
                      'underline',
                      'strike',
                      'align',
                      'link',
                    ]}
                    style={{
                      height: '500px',
                      maxHeight: '500px',
                      overflowY: 'inherit',
                      marginBottom: '100px',
                    }}
                  />
                </FormGroup>

                {/* 제출 버튼 */}
                <Button type="submit" color="primary">
                  글 작성
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default WritePost;
