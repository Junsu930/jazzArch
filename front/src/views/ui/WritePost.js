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
import { FaPaperclip } from 'react-icons/fa';
import classes from './WritePost.module.css';

const WritePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 글 작성 데이터 처리 로직
    console.log('Title:', title);
    console.log('Content:', content);
    console.log('File:', file);
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
                    onChange={setContent}
                    placeholder="내용을 입력하세요"
                    modules={{
                      toolbar: [
                        [{ header: '1' }, { header: '2' }, { font: [] }],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ align: [] }],
                        ['link', 'image'],
                        ['clean'],
                      ],
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
                      'image',
                    ]}
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
