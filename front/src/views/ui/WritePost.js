import React, { useRef, useState } from 'react';
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
import axios from 'axios';
import { setImages } from '../../api/apiClient';

const WritePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const quillRef = useRef(null);

  // 이미지 업로드 함수
  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];

      // 이미지 파일을 FormData로 서버에 전송
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await setImages(formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // 서버에서 반환된 이미지 URL
        const imageUrl = response.data;

        // 에디터에 이미지 URL 삽입
        const editor = quillRef.current.getEditor(); // Get the Quill editor instance
        const range = editor.getSelection(); // Get the current selection
        console.log(range);

        if (range) {
          editor.insertEmbed(range.index, 'image', imageUrl); // Insert image
        }
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
      }
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 글 작성 데이터 처리 로직
    axios
      .post('/api/posts', {
        title,
        content,
      })
      .then((response) => {
        console.log('글 작성 성공:', response.data);
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
                    onChange={setContent}
                    placeholder="내용을 입력하세요"
                    ref={quillRef}
                    modules={{
                      toolbar: {
                        container: [
                          [{ header: '1' }, { header: '2' }, { font: [] }],
                          [{ list: 'ordered' }, { list: 'bullet' }],
                          ['bold', 'italic', 'underline', 'strike'],
                          [{ align: [] }],
                          ['link', 'image'],
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
                      'image',
                    ]}
                    style={{
                      height: '300px',
                      maxHeight: '500px',
                      overflowY: 'auto',
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
