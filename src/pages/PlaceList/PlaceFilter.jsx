import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import styled, { css } from 'styled-components';
import { theme, flexSpaceBetweenCenter, flexColumn } from '../../styles/theme';

const PlaceFilterPlaceList = ({ houseTypte, setHouseType, modalState, setModalState, facility, setfacility }) => {
  const modal = useRef(null);

  useEffect(() => {
    const closeModal = ({ target }) => {
      console.log(modalState);
      if (Object.keys(modalState).some((el) => modalState[el]) && !modal.current.contains(target)) {
        const closeModalList = {};
        Object.keys(modalState).forEach((modal) => {
          closeModalList[modal] = false;
        });
        setModalState(closeModalList);
      }
      document.removeEventListener('click', closeModal);
    };
    document.addEventListener('click', closeModal);
  });

  const openModal = (e) => {
    const { dataset } = e.currentTarget;
    Object.keys(modalState).forEach((filter) => {
      filter === dataset.filter && setModalState({ ...modalState, [dataset.filter]: true });
    });
  };

  const toggleFilter = (e) => {
    facility.indexOf(e.type) === -1
      ? setfacility([...facility, e.type])
      : setfacility(
          facility.filter((type) => {
            return type !== e.type;
          })
        );
  };

  const houseTypeFilter = (e) => {
    houseTypte.indexOf(e.type) === -1
      ? setHouseType([...houseTypte, e.type])
      : setHouseType(
          houseTypte.filter((type) => {
            return type !== e.type;
          })
        );
  };

  return (
    <FilterComponent ref={modal}>
      <div className='filter HouseTypeFilter' data-filter='houseFilter' onClick={openModal}>
        <span>숙소유형</span>
        <FilterModal state={modalState.houseFilter}>
          {FILTER_HOUSE_TYPE.map((el, index) => {
            return (
              <label>
                <input type='checkbox' onClick={() => houseTypeFilter(el)} />
                <div className='filterValue'>
                  <span className='filterTitle'>{el.title}</span>
                  <span className='filterContent'>{el.content}</span>
                </div>
              </label>
            );
          })}
          <div className='layoutLine'></div>
          <div className='filterDataSet'>
            <span className='filterDelete'>지우기</span>
            <span className='filterSave'>저장</span>
          </div>
        </FilterModal>
      </div>
      <div className='filter moneyFilter' data-filter='moneyFilter' onClick={openModal}>
        <span>요금</span>
        <FilterModal state={modalState.moneyFilter}>요금</FilterModal>
      </div>
      <div className='filter otherFilter' data-filter='otherFilter' onClick={openModal}>
        <span>필터 추가히기</span>
        <FilterFullModal state={modalState.otherFilter}>
          <h1>편의 시설</h1>
          {FILTER_FACILITY.map((el, index) => {
            return (
              <label className='filterItem'>
                <input type='checkbox' onClick={() => toggleFilter(el)} />
                <span>{el.title}</span>
              </label>
            );
          })}
        </FilterFullModal>
      </div>
    </FilterComponent>
  );
};
export default PlaceFilterPlaceList;

const FilterComponent = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 10px;

  .filter {
    margin-right: 10px;
    padding: 10px;
    font-size: 15px;
    border: 1px solid #b0b0b0;
    border-radius: 25px;

    &:hover {
      border: 1px solid ${theme.black};
    }
  }
`;

const FilterModal = styled.div`
  display: ${({ state }) => (state ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  top: 40px;
  width: 370px;
  padding: 20px;
  background-color: white;
  border-radius: 25px;
  border: 0.5px solid rgba(118, 118, 118, 0.28);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 10px 37px;

  label {
    display: flex;
    align-items: center;
    margin: 10px 0;
    font-size: 15px;

    .filterValue {
      ${flexColumn}
      justify-content : center;

      .filterTitle {
        font-size: 16px;
      }
      .filterContent {
        font-size: 13px;
      }
      span {
        margin: 2px;
      }
    }
  }

  .layoutLine {
    width: 100%;
    height: 1px;
    border-top: 1px solid #b0b0b0;
  }

  .filterDataSet {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin: 10px 0;
    .filterDelete {
      font-size: 15px;
      transition: 0.5s;
      cursor: pointer;

      &:hover {
        transform: scale(1.1);
      }
    }
    .filterSave {
      font-size: 15px;
      transition: 0.5s;
      cursor: pointer;

      &:hover {
        transform: scale(1.1);
      }
    }
  }
`;

const FilterFullModal = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: fixed;
  top: ${({ state }) => (state ? '50%' : '160%')};
  left: 50%;
  width: 60%;
  margin: 0 auto;
  padding: 2%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 25px;
  border: 0.5px solid rgba(118, 118, 118, 0.28);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 10px 37px;
  z-index: 100;
  transition: 0.5s;

  h1 {
    width: 100%;
  }

  .filterItem {
    display: inline;
    width: 40%;
    padding: 15px 10px;
    font-size: 21px;
    transition: 1s;
  }
`;

const FILTER_HOUSE_TYPE = [
  { type: 1, title: '집 전체', content: '집 전체를 단독으로 사용합니다.' },
  {
    type: 2,
    title: '개인실',
    content: '침실은 단독으로 쓰고, 이외의 공간은 호스트나 다른 게스트와 함께 이용할 수도 있습니다.',
  },
  { type: 3, title: '호텔 객실', content: '부티크 호텔, 호스텔 등의 개인실이나 다인실을 이용합니다.' },
  {
    type: 4,
    title: '다인실',
    content: '사적 공간 없이, 침실이나 욕실 등을 호스트나 다른 게스트와 함께 이용합니다.',
  },
];

const FILTER_FACILITY = [
  { type: 1, title: '무선 인터넷' },
  { type: 2, title: '업무 전용공간' },
  { type: 3, title: '난방' },
  { type: 4, title: 'TV' },
  { type: 5, title: '에어컨' },
  { type: 6, title: '온수' },
  { type: 7, title: '엘리베이터' },
  { type: 8, title: '건물 내 무료 주차' },
  { type: 9, title: '주방' },
  { type: 10, title: '게스트 전용 출입문' },
  { type: 11, title: '장기 숙박 가능' },
  { type: 12, title: '헤어드라이어' },
  { type: 13, title: '옷걸이' },
  { type: 14, title: '샴푸' },
  { type: 15, title: '소화기' },
  { type: 16, title: '일산화탄소 경보기' },
  { type: 17, title: '구급 상자' },
  { type: 18, title: '화재경보기' },
  { type: 19, title: '건조기' },
  { type: 20, title: '다리미' },
  { type: 21, title: '세탁기' },
  { type: 22, title: '암막 커튼' },
  { type: 23, title: '냉장고' },
  { type: 24, title: '전자레인지' },
  { type: 25, title: '기본 조리도구' },
  { type: 26, title: '식기류' },
  { type: 27, title: '디지털 도어록' },
  { type: 28, title: '여행 가방 보관 가능' },
  { type: 29, title: '침구' },
  { type: 30, title: '샤워젤' },
  { type: 31, title: '바베큐 그릴' },
  { type: 32, title: '정원 또는 뒷마당' },
];
