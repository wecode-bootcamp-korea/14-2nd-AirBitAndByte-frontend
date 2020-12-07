import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { theme, flexSpaceBetweenCenter, flexColumn } from '../../styles/theme';
import { AiFillStar, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { LIST_API } from '../../config';
import PlaceListMap from './PlaceListMap.jsx';
import PlaceFilterPlaceList from './PlaceFilter.jsx';
import ReactPaginate from 'react-paginate';
import PlaceListItem from './PlaceListItem';
import axios from 'axios';

const PlaceList = (props) => {
  const [placeList, setPlaceList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [facility, setfacility] = useState([]);
  const [houseTypte, setHouseType] = useState([]);
  const [modalState, setModalState] = useState({ houseFilter: false, moneyFilter: false, otherFilter: false });
  const [lodingSpinner, setLodingSpinner] = useState(false);

  useEffect(() => {
    getPlaceList();
  }, [houseTypte, currentPage, facility]);

  const getPlaceList = async () => {
    const pageNation = `${currentPage > 1 ? `offset=${currentPage}&limit=10` : `limit=10`}`;
    const facilityFilter = toQueryString(facility, 'facility');
    const houseFilter = toQueryString(houseTypte, 'type');

    try {
      setLodingSpinner(true);
      const listData = await axios.get(
        `${LIST_API}?${pageNation}${facilityFilter && `&${facilityFilter}`}
        ${houseFilter && `&${houseFilter}`}`
      );
      setPlaceList(listData.data.result);
      setLodingSpinner(false);
    } catch (err) {
      console.log('err', err);
      setLodingSpinner(false);
    }
  };

  const toQueryString = (data, type) => {
    if (type === undefined) {
      const result = [];
      Object.entries(data).forEach((filterData) => filterData[1] && result.push(filterData.join('=')));
      return result && result.join('&');
    } else {
      const result = [];
      data.forEach((filterData) => result.push(`${type}=${filterData}`));
      return result && result.join('&');
    }
  };

  const onFocusData = (e) => {
    console.log(e);
  };

  return (
    <PlaceListComponent>
      <ListContainer>
        <h4>300개 이상의 숙소</h4>
        <h1>지도에서 선택한 지역의 숙소</h1>
        <PlaceFilterPlaceList
          houseTypte={houseTypte}
          setHouseType={setHouseType}
          modalState={modalState}
          setModalState={setModalState}
          facility={facility}
          setfacility={setfacility}
        />
        <span className='notice'>여행 날짜와 게스트 인원수를 입력하면 1박당 총 요금을 확인할 수 있습니다.</span>
        <div className='layoutLine'></div>
        {placeList.length ? (
          placeList.map((el, index) => {
            return <PlaceListItem listItem={el} key={index} onMouseOver={onFocusData}></PlaceListItem>;
          })
        ) : (
          <div>데이터가 없습니다</div>
        )}
        <div className='pageNate'>
          <ReactPaginate
            pageCount={Math.ceil(50 / 10)}
            pageRangeDisplayed={10}
            marginPagesDisplayed={0}
            breakLabel='다다음'
            previousLabel='이전'
            nextLabel='다음'
            onPageChange={(cnt) => {
              setCurrentPage(cnt.selected * 10);
            }}
            containerClassName='pagination-ul'
            activeClassName='currentPage'
            previousClassName='pageLabel-btn'
            nextClassName='pageLabel-btn'
          />
        </div>
      </ListContainer>
      {placeList && <PlaceListMap placeList={placeList} />}
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
  width: 100%;
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
