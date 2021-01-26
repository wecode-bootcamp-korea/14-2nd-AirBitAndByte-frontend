import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { LIST_API } from '../../config';
import PlaceListMap from './PlaceListMap.jsx';
import PlaceFilterPlaceList from './PlaceFilter.jsx';
import PlaceListItem from './PlaceListItem';
import axios from 'axios';
import { Pagination } from 'antd';
import queryStirng from 'query-string';
import { toQueryStr } from '../../Components/Common/util';

const PlaceList = (props) => {
  const [facility, setfacility] = useState([]);
  const [placeList, setPlaceList] = useState([]);
  const [houseType, setHouseType] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lodingSpinner, setLodingSpinner] = useState(false);
  const [priceValue, setPriceValue] = useState([0, 0]);
  const [hoverLocation, sethoverLocation] = useState({ latitude: 0, longitude: 0 });

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const query = location.search;
    const getPlaceList = async () => {
      if (query) {
        try {
          window.scrollTo(0, 0);
          setLodingSpinner(true);

          const listData = await axios.get(`${LIST_API}${query}`);
          setPlaceList(listData.data.result);
        } catch (err) {
          console.log('err', err);
        } finally {
          setLodingSpinner(false);
        }
      }
    };
    getPlaceList();
    const { type, offset, facility, min, max } = queryStirng.parse(query);

    if (type) setHouseType([...type]);
    if (facility) setfacility([...facility]);
    if (offset) setCurrentPage(Number(offset));
    if (min && max) setPriceValue([Number(min), Number(max)]);
  }, [location, currentPage]);

  const changePage = (page) => {
    let query = queryStirng.parse(location.search);
    query['offset'] = page;

    history.push({
      pathname: '/placelist',
      search: toQueryStr(query),
    });
  };

  return (
    <PlaceListComponent>
      <ListContainer>
        <h4>300개 이상의 숙소</h4>
        <h1>지도에서 선택한 지역의 숙소</h1>
        <PlaceFilterPlaceList
          facility={facility}
          houseType={houseType}
          priceValue={priceValue}
          setfacility={setfacility}
          setHouseType={setHouseType}
          setPriceValue={setPriceValue}
        />
        <span className='notice'>여행 날짜와 게스트 인원수를 입력하면 1박당 총 요금을 확인할 수 있습니다.</span>
        <div className='layoutLine'></div>
        {placeList.length ? (
          placeList.map((itemData, index) => {
            return (
              <PlaceListItem
                key={index}
                listItem={itemData}
                onMouseOver={({ latitude, longitude }) => sethoverLocation({ latitude, longitude })}
              ></PlaceListItem>
            );
          })
        ) : (
          <div>데이터가 없습니다</div>
        )}
        <div className='pageNate'>
          <Pagination current={currentPage} onChange={(num) => changePage(num)} total={50} />
        </div>
      </ListContainer>
      {placeList && <PlaceListMap placeList={placeList} hoverLocation={hoverLocation} />}
      <LoadingSpinner state={lodingSpinner}>
        <img className='spinner' src='images/airBnB_pink.png' alt='스피너 이미지'></img>
      </LoadingSpinner>
    </PlaceListComponent>
  );
};

export default PlaceList;

const PlaceListComponent = styled.main`
  display: flex;
  position: relative;
  justify-content: space-between;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  padding: 90px 20px 20px 20px;

  h4 {
    font-size: 14px;
    margin-top: 50px;
  }

  h1 {
    font-size: 30px;
    font-weight: bold;
    margin: 20px 0;
  }

  .notice {
    margin: 5px;
    font-size: 14px;
    color: #717171;
  }

  .layoutLine {
    width: 100%;
    margin: 15px 0 0 0;
    border-top: 1px solid ${theme.bordergrey};
  }

  .pageNate {
    display: flex;
    justify-content: center;
    width: 100%;

    .pagination-ul {
      list-style: none;
      float: right;
      margin: 0;

      li {
        float: left;
        vertical-align: middle;
        padding: 15px;
        margin: 20px 20px;
        text-align: center;
        font-size: 14px;
        cursor: pointer;

        &:hover {
          outline: none;
          border-radius: 50%;
          border: 50%;
        }
      }
    }
  }
`;

const LoadingSpinner = styled.div`
  display: ${({ state }) => (state ? 'flex' : 'none')};
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;

  .spinner {
    transition: all 0.5s;
    backface-visibility: hidden;
    animation: moveSlideshow 0.5s infinite;

    &:hover {
      transform: rotateY(180deg);
    }

    @keyframes moveSlideshow {
      50% {
        transform: rotateY(180deg);
      }
    }
  }
`;
