import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setKeyWord } from '../../store/actions';
import styled from 'styled-components';
import NavSearchModal from './NavSearchModal';
import { BiSearch } from 'react-icons/bi';
import { theme, flexCenter, flexColumn, flexSpaceBetweenCenter } from '../../styles/theme';
import moment from 'moment';

const NavSearchInfo = ({ type }) => {
  const { checkIn, checkOut, keyWord, capacity } = useSelector((store) => store.searchFilterReducer);
  const [searchDetailType, setsearchDetailType] = useState('');
  const dispatch = useDispatch();
  const setRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const closeModal = ({ target }) => searchDetailType && !setRef.current.contains(target) && setsearchDetailType('');
    document.addEventListener('click', closeModal);
  });

  const changeSearchType = (e) => {
    setsearchDetailType(e.currentTarget.dataset.type);
  };

  const searchPropertyList = () => {
    let query = '';

    if (keyWord) {
      query += `&keyWord=${keyWord}`;
    }
    if (checkIn) {
      query += `&checkIn=${checkIn.format('YYYY-MM-DD')}`;
    }
    if (checkOut) {
      query += `&checkOut=${checkOut.format('YYYY-MM-DD')}`;
    }
    if (Object.values(capacity).some((item) => item)) {
      Object.keys(capacity).forEach((opt) => capacity[opt] && (query += `&${opt}=${capacity[opt]}`));
    }

    history.push({
      pathname: '/placelist',
      search: `?limit=10${query}`,
    });
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
                    {Object.values(capacity).reduce((acc, aur) => {
                      return acc + aur;
                    }) ? (
                      <span className='content'>
                        게스트 {capacity['adult'] + capacity['child']} 유아 {capacity['infant']}
                      </span>
                    ) : (
                      <span className='content'>게스트 추가</span>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className='flexColumn'>
                <span className='header'>{item.header}</span>
                {item.type === 'location' ? (
                  <input
                    placeholder={item.content}
                    value={keyWord}
                    onChange={(e) => dispatch(setKeyWord(e.target.value))}
                  />
                ) : item.type === 'checkin' ? (
                  <span className='content'>{checkIn ? moment(checkIn).format('YYYY-MM-DD') : item.content}</span>
                ) : item.type === 'checkout' ? (
                  <span className='content'>{checkOut ? moment(checkOut).format('YYYY-MM-DD') : item.content}</span>
                ) : (
                  <span></span>
                )}
              </div>
            )}
          </SearchInfoItem>
        );
      })}
      <SearchIconForm isSize={50} searchDetailType={searchDetailType} onClick={searchPropertyList}>
        <BiSearch />
        {searchDetailType && <span>검색</span>}
      </SearchIconForm>
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
    ${flexColumn}

    .header {
      margin: 2px 0;
      font-size: 12px;
    }
    .content {
      margin: 2px 0;
      font-size: 14px;
      color: #717171;
    }

    input {
      font-size: 15px;
    }
  }
`;

const SearchIconForm = styled.div`
  ${flexCenter}
  position : absolute;
  right: 10px;
  width: ${({ isSize }) => `${isSize}px`} ${({ searchDetailType }) => searchDetailType && '+100px'};
  height: ${({ isSize }) => `${isSize}px`};
  background-color: ${theme.pink};
  border-radius: 25px;
  padding: 10px;
  cursor: pointer;

  svg {
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
