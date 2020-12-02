import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import NavSearchModal from './NavSearchModal';
import { BiSearch } from 'react-icons/bi';
import { theme, flexCenter, flexColumn, flexSpaceBetweenCenter } from '../../styles/theme';

const NavSearchInfo = ({ type }) => {
  const [searchDetailType, setsearchDetailType] = useState('');
  const setRef = useRef(null);

  useEffect(() => {
    const closeModal = ({ target }) => searchDetailType && !setRef.current.contains(target) && setsearchDetailType('');
    document.addEventListener('click', closeModal);
  });

  const changeSearchType = (e) => {
    setsearchDetailType(e.currentTarget.dataset.type);
  };

  return (
    <NavSearchInfoComponent data-toggle='modal' ref={setRef}>
      {SEARCH_ITEMS[type].map((item, index) => {
        return (
          <SearchInfoItem
            key={index}
            data-type={`${type}_${item.type}`}
            className={`${searchDetailType === `${type}_${item.type}` ? 'setFocus' : ''}`}
            onClick={changeSearchType}
          >
            {SEARCH_ITEMS[type].length === index + 1 ? (
              <>
                <div className='flexLow'>
                  <div className='flexColumn'>
                    <span className='header'>{item.header}</span>
                    <span className='content'>{item.content}</span>
                  </div>
                  <SearchIconForm isSize={50} searchDetailType={searchDetailType}>
                    <BiSearch className='searchIcon' />
                    {searchDetailType && <span>검색</span>}
                  </SearchIconForm>
                </div>
              </>
            ) : (
              <div className='flexColumn'>
                <span className='header'>{item.header}</span>
                <span className='content'>{item.content}</span>
              </div>
            )}
          </SearchInfoItem>
        );
      })}
      <NavSearchModal type={searchDetailType} />
    </NavSearchInfoComponent>
  );
};
export default NavSearchInfo;

const NavSearchInfoComponent = styled.div`
  ${flexSpaceBetweenCenter}
  width: 850px;
  border: 1px solid #dddddd;
  border-radius: 50px;
  background-color: white;
  position: relative;
  transition: 0.1s;
`;

const SearchInfoItem = styled.div`
  ${flexColumn}
  justify-content: center;
  position: relative;
  flex: 1;
  height: 65px;
  padding: 5px 10px 5px 30px;
  text-align: start;
  cursor: pointer;

  &.setFocus {
    background-color: white;
    border-radius: 50px;
    box-shadow: rgba(1, 1, 1, 0.2) 0px 6px 20px !important;
  }

  &.outFocus {
    background-color: #ebebeb;
  }

  &:first-child::after {
    display: none;
  }

  &::after {
    content: '';
    float: left;
    position: absolute;
    border-left: 2px solid #ebebeb;
    width: 1px;
    height: 30px;
    left: -2px;
  }

  &:hover {
    border-radius: 50px;
    background-color: #ebebeb;
    transition: 0.3s;
  }

  &:hover::after {
    display: none;
  }

  input {
    background-color: transparent;
  }

  .flexLow {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .flexColumn {
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .header {
      margin: 2px 0;
      font-size: 12px;
    }
    .content {
      margin: 2px 0;
      font-size: 14px;
      color: #717171;
    }
  }
`;

const SearchIconForm = styled.div`
  ${flexCenter}
  width : ${({ isSize }) => `${isSize}px`}  ${({ searchDetailType }) => searchDetailType && '+100px'};
  height: ${({ isSize }) => `${isSize}px`};
  background-color: ${theme.pink};
  border-radius: 25px;

  .searchIcon {
    padding: 10px;
    color: white;
  }

  span {
    margin-right: 10px;
    font-size: 15px;
    color: white;
  }
`;

const SEARCH_ITEMS = {
  rooms: [
    {
      header: '위치',
      content: '어디로 여행가세요?',
      type: 'location',
    },
    {
      header: '체크인',
      content: '날짜 추가',
      type: 'checkin',
    },
    {
      header: '체크아웃',
      content: '날짜 추가',
      type: 'checkout',
    },
    {
      header: '인원',
      content: '게스트 추가',
      type: 'personnel',
    },
  ],
  experience: [
    {
      header: '위치',
      content: '어디로 여행가세요?',
      type: 'location',
    },
    {
      header: '체크인',
      content: '원하는 날짜를 입력하세요',
      type: 'checkin',
    },
  ],
};
