import {
  Card,
  CardText,
  CardTitle,
  Button,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import classes from './ClubList.module.css';
import { useEffect, useState } from 'react';
import { getAllClub } from '../../api/apiClient';

const ClubList = (state) => {
  const [clubData, setClubData] = useState([]);
  const [originalClubData, setOriginalClubData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [regionOptions, setRegionOptions] = useState([
    { code: 'all', codeNm: '전체' },
    { code: 'metro', codeNm: '수도권' },
    { code: 'spCity', codeNm: '광역시/특별시' },
    { code: 'rural', codeNm: '지방' },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllClub();
        setOriginalClubData(response.data); // 원본 데이터를 저장
        filterData(response.data, selectedRegion, searchTerm); // 데이터 필터링
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // 컴포넌트가 마운트될 때 한 번 실행

  useEffect(() => {
    filterData(originalClubData, selectedRegion, searchTerm); // selectedRegion이 변경될 때마다 필터링
  }, [selectedRegion, originalClubData, searchTerm]); // selectedRegion 또는 originalClubData가 변경될 때 실행

  const filterData = (data, region, searchTerm) => {
    let filteredData = data;

    switch (region) {
      case 'metro':
        filteredData = filteredData.filter(
          (item) => item.regionCategory === 'metro',
        );
        break;
      case 'spCity':
        filteredData = filteredData.filter(
          (item) => item.regionCategory === 'spCity',
        );
        break;
      case 'rural':
        filteredData = filteredData.filter(
          (item) => item.regionCategory === 'rural',
        );
        break;
      default:
        filteredData = data; // 필터링되지 않은 모든 데이터를 보여줌
        break;
    }

    if (searchTerm) {
      filteredData = filteredData.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    setClubData(filteredData);
  };

  const regionSearchHandler = (e) => {
    setSelectedRegion(e.target.value);
  };

  const searchInputHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle} size="md">
        <ModalHeader toggle={toggle}>상세정보</ModalHeader>
        <ModalBody>상세정보예정</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Row>
        <Col>
          <div className={classes.titleBar}>
            <div className={classes.selectSet}>
              <p className={classes.static}>세부 지역</p>
              <select onChange={regionSearchHandler}>
                {regionOptions &&
                  regionOptions.map((region) => {
                    return (
                      <option key={region.code} value={region.code}>
                        {region.codeNm}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className={classes.selectSet}>
              <p className={classes.static}>클럽 이름</p>
              <input
                className={classes.nameInput}
                onInput={searchInputHandler}
              ></input>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <h5 className="mb-3 mt-3">{state.name} 재즈클럽 리스트</h5>
        {clubData &&
          clubData.map((eachClub, index) => {
            return (
              <Col key={index} md="6" lg="4">
                <Card body style={{ height: '10rem' }}>
                  <CardTitle tag="h5">{eachClub.title}</CardTitle>
                  <CardText>{eachClub.detlAddr}</CardText>
                  <div>
                    <Button color="dark" onClick={toggle}>
                      상세 정보
                    </Button>
                  </div>
                </Card>
              </Col>
            );
          })}
      </Row>
    </div>
  );
};

export default ClubList;
