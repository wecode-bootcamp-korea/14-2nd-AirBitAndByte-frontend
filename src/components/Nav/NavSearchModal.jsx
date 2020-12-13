import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCapacity, setFocus, setCheckIn, setCheckOut } from '../store/actions';
import styled from 'styled-components';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { IoIosRemoveCircleOutline, IoIosAddCircleOutline } from 'react-icons/io';
import { BsToggleOff, BsToggleOn } from 'react-icons/bs';
import { flexColumn } from '../../styles/theme';
import PropertyCalender from '../Property/PropertyCalender';

const NavSearchModal = ({ type }) => {
  const filter = useSelector((store) => store.searchFilterReducer);
  const dispatch = useDispatch();

  const setCount = (e, type) => {
    const { dataset } = e.currentTarget;

    filter.capacity[type] =
      type !== 'animal'
        ? dataset.type === '+'
          ? dispatch(setCapacity({ ...filter.capacity, [type]: filter.capacity[type] + 1 }))
          : filter.capacity[type]
          ? dispatch(setCapacity({ ...filter.capacity, [type]: filter.capacity[type] - 1 }))
          : dispatch(setCapacity({ ...filter.capacity, [type]: 0 }))
        : dispatch(setCapacity({ ...filter.capacity, animal: !filter.capacity.animal }));
  };

  const handleOnDateChange = ({ startDate, endDate }) => {
    !endDate ? dispatch(setCheckIn(startDate)) : dispatch(setCheckOut(endDate));
  };

  return (
    <>
      <SearchLocation type={type}>
        <div className='myLocation'>
          <FaMapMarkedAlt className='mapIcon' />
          가까운 여행지 둘러보기
        </div>
      </SearchLocation>
      {type.indexOf('check') !== -1 && (
        <SearchCheckDate type={type}>
          <PropertyCalender
            setFocusedInput={(focus) => dispatch(setFocus(focus))}
            focusedInput={filter.focus}
            endDate={filter.checkOut}
            startDate={filter.checkIn}
            handleOnDateChange={handleOnDateChange}
          />
        </SearchCheckDate>
      )}

      <SearchPersonnel type={type}>
        {AGE_GROUP.map((group, index) => (
          <div className='ageGroup' key={index}>
            <div className='viewContentForm'>
              <span className='header'>{group.header}</span>
              <span className='content'>{group.content}</span>
            </div>
            <div className='setValueForm'>
              <IoIosRemoveCircleOutline
                className={`${!filter.capacity[group.type] && 'disabled'}`}
                data-type='-'
                onClick={(e) => setCount(e, group.type)}
              />
              <span>{filter.capacity[group.type]}</span>
              <IoIosAddCircleOutline data-type='+' onClick={(e) => setCount(e, group.type)} />
            </div>
          </div>
        ))}
        <div className='ageGroup'>
          <div className='viewContentForm'>
            <span className='header'>반려동물</span>
            <span className='content'>반려동물을 동반하시나요?</span>
          </div>
          <div className='setValueForm'>
            {filter.capacity.animal ? (
              <BsToggleOn className='toggleBtn active' onClick={(e) => setCount(e, 'animal')} />
            ) : (
              <BsToggleOff className='toggleBtn ' onClick={(e) => setCount(e, 'animal')} />
            )}
          </div>
        </div>
      </SearchPersonnel>
    </>
  );
};

export default NavSearchModal;

const SearchLocation = styled.div`
  display: ${({ type }) => (type.indexOf('location') !== -1 ? 'flex' : 'none')};
  position: absolute;
  align-items: center;
  top: 70px;
  width: 550px;
  min-height: 100px;
  padding: 30px;
  border-radius: 30px;
  background-color: white;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.2);
  transition: 1s;

  .myLocation {
    display: flex;
    align-items: center;

    .mapIcon {
      width: 50px;
      height: 50px;
      margin-right: 20px;
    }
  }
`;

const SearchCheckDate = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 70px;
  width: 850px;
  height: 400px;
  border-radius: 30px;
  background-color: white;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.2);
  transition: 1s;

  div {
    margin-top: 5px !important;
  }
`;

const SearchPersonnel = styled.div`
  display: ${({ type }) => (type.indexOf('personnel') !== -1 ? 'flex' : 'none')};
  position: absolute;
  flex-direction: column;
  justify-content: space-between;
  top: 70px;
  right: 1px;
  width: 400px;
  height: 300px;
  padding: 30px 40px;
  border-radius: 30px;
  background-color: white;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.2);
  transition: 1s;

  .ageGroup {
    display: flex;
    position: relative;
    justify-content: space-between;
    margin: 10px 0;

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 1px;
      top: -10px;
      left: 1px;
      border-top: 1px solid #ebebeb;
    }

    &:first-child::after {
      display: none;
    }

    .viewContentForm {
      ${flexColumn}

      .header {
        font-size: 17px;
        margin-bottom: 3px;
      }

      .content {
        font-size: 14px;
        color: #717171;
      }
    }

    .setValueForm {
      display: flex;
      justify-content: center;
      align-items: center;

      .disabled {
        color: #ebebeb;
      }

      .toggleBtn {
        width: 70px;
        height: 41px;
      }

      .active {
        color: black;
      }

      span {
        margin: 0 10px;
        font-size: 18px;
      }

      svg {
        width: 35px;
        height: 35px;
        color: #b0b0b0;
      }
    }
  }

  .layoutLine {
    width: 100;
    height: 1px;
    border-top: 1px solid #ebebeb;
  }
`;

const AGE_GROUP = [
  {
    header: '성인',
    content: '만 13세 이상',
    type: 'adult',
  },
  {
    header: '어린이',
    content: '2~12세',
    type: 'child',
  },
  {
    header: '유아',
    content: '2세 미만',
    type: 'infant',
  },
];
