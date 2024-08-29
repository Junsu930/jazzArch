import { Card, CardText, CardTitle, Col, Row } from 'reactstrap';

const Starter = () => {
  return (
    <div>
      <Row>
        <Col xxl="14">
          <Card
            style={{
              height: 700,
              borderRadius: 10,
              padding: 40,
            }}
          >
            <CardTitle tag="h1">Jazz Archive</CardTitle>
            <CardText style={{ fontSize: 18, marginTop: 10 }}>
              재즈 아카이브는 전국 재즈 클럽의 공연 스케쥴을 정리하기 위한
              목적으로 만들어졌습니다. <br />
              주인 혼자 직접 관리, 수정하는 사이트이므로 최근 스케쥴을 바로
              반영하지 않을 수 있습니다. <br />
              <br />
              <br />
              문의 사항, 공연 일정 수정 등은 의견 제출을 통해서 메일을
              보내주시면 반영하도록 하겠습니다.
              <br />
              게시판에서 자유롭게 재즈 이야기를 해도 좋습니다. 광고나 욕설 등은
              관리해보겠습니다.
              <br />
              <br />
              <br />
              <CardTitle tag="h5">안내 사항</CardTitle>
              <br />
              1. 사이트에서 관리하는 업체는 '재즈 공연 라이브를 진행하는
              클럽'입니다. 재즈 음악을 트는 바, <br />
              재즈 이외의 음악을 다양하게 연주하는 라이브바는 관리하고 있지
              않습니다.
              <br />
              <br />
              2. 메일은 매일 확인하지만 수정사항 반영은 늦을 수 있습니다. <br />
              다만 일정 변경은 최대한 빠르게 반영하려고 하고 있습니다.
              <br />
              <br />
              3. 개인적인 취미생활의 일환으로 운영 중인 사이트입니다. <br />
              미숙한 부분은 너른 양해 부탁드립니다.
            </CardText>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Starter;
