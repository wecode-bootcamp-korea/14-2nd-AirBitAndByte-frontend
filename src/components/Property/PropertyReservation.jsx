import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import 'moment/locale/ko';
import { theme } from '../../styles/theme';
import { MdStar } from 'react-icons/md';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { BiCurrentLocation } from 'react-icons/bi';
import { HiInformationCircle } from 'react-icons/hi';

const PropertyReservation = ({
  property,
  focus,
  endDate,
  startDate,
  handleOnDateChange,
  setFocus,
}) => {
  const [isCapacityModalOn, setCapacityModal] = useState(false);
  const [capacity, setCapacity] = useState([
    { value: '성인', id: 'adult', count: 1 },
    { value: '어린이', id: 'child', count: 0 },
    { value: '유아', id: 'infant', count: 0 },
  ]);
  const [nights, setNights] = useState(1);

  useEffect(() => {
    setNights(calculateNights(startDate, endDate));
  }, [startDate, endDate]);

  const calculateNights = (startDate, endDate) => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const res = Math.abs(Math.ceil((end - start) / (1000 * 3600 * 24)));
    if (res === 0) {
      return 1;
    } else {
      return res;
    }
  };

  const handleIncrement = (event) => {
    const total = capacity[0].count + capacity[1].count;

    const newCapacity = capacity.map((person) => {
      if (person.id === event.target.id) {
        if (event.target.id === 'infant') {
          return { ...person, count: person.count + 1 };
        }
        if (event.target.id === 'adult' || 'child') {
          if (total < property.capacity) {
            return { ...person, count: person.count + 1 };
          }
        }
      }
      return person;
    });
    setCapacity(newCapacity);
  };

  const handleDecrement = (event) => {
    const newCapacity = capacity.map((person) => {
      const res = person.count - 1;
      if (person.id === event.target.id) {
        if (event.target.id === 'adult') {
          return { ...person, count: res < 1 ? 1 : res };
        }
        return { ...person, count: res < 0 ? 0 : res };
      }
      return person;
    });
    setCapacity(newCapacity);
  };

  const money = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <>
      <PropertyReservationTab>
        <div className='flexCon'>
          <div className='leftCon'>
            <span className='propertyPrice'>
              ₩{money(Math.floor(property.price))}
            </span>
            <span>/박</span>
          </div>
          <div className='rightCon'>
            <span className='propertyRate'>
              <MdStar color={theme.pink} size={20} />
              {Math.floor(property.rate?.propertyRate * 100) / 100}
            </span>
            <span className='propertyReviewNum'>
              ({property.reviews?.length})
            </span>
          </div>
        </div>
        <CalenderBox>
          <DateRangePicker
            numberOfMonths={2}
            displayFormat='YYYY.MM.DD'
            startDatePlaceholderText='체크인'
            endDatePlaceholderText='체크아웃'
            startDate={startDate}
            endDate={endDate}
            onDatesChange={handleOnDateChange}
            showClearDates={true}
            focusedInput={focus}
            onFocusChange={(focus) => setFocus(focus)}
            startDateId='startDate'
            endDateId='endDate'
            minimumNights={1}
            noBorder={true}
            hideKeyboardShortcutsPanel={true}
          />
        </CalenderBox>
        <CapacityBox>
          <div
            className='capacitySelector'
            onClick={() => {
              setCapacityModal(!isCapacityModalOn);
            }}>
            <p>인원</p>
            <div className='capacityTotal'>
              <span>게스트 {capacity[0]?.count}명</span>{' '}
              {capacity[1].count ? (
                <span>, 어린이 {capacity[1]?.count}명</span>
              ) : (
                ''
              )}{' '}
              {capacity[2].count ? (
                <span>, 유아 {capacity[2]?.count}명</span>
              ) : (
                ''
              )}
            </div>
            <button>
              {isCapacityModalOn ? (
                <IoIosArrowUp size={23} />
              ) : (
                <IoIosArrowDown size={23} />
              )}
            </button>
          </div>
          <div className={isCapacityModalOn ? 'capacityModal' : 'displayNone'}>
            {capacity.map((person) => (
              <div key={person.id} className='switch'>
                <span>{person.value}</span>
                <div>
                  <button
                    className='minus'
                    id={person.id}
                    onClick={handleDecrement}>
                    --
                  </button>
                  <span className='switchNum'>{person.count}</span>
                  <button
                    className='plus'
                    id={person.id}
                    onClick={handleIncrement}>
                    +
                  </button>
                </div>
              </div>
            ))}

            <span>
              최대 {property.capacity}명. 유아는 숙박인원에 포함되지 않습니다.
            </span>
            <div
              className='closeBtn'
              onClick={() => {
                setCapacityModal(!isCapacityModalOn);
              }}>
              닫기
            </div>
          </div>
        </CapacityBox>
        <button className='reservationBtn'>예약하기</button>
        <span className='smallText'>
          예약 확정 전에는 요금이 청구되지 않습니다.
        </span>
        <PropertyBill>
          <div>
            <span>
              ₩{money(Math.floor(property.price))} x {nights}박
            </span>
            <span>₩{money(Math.floor(property.price * nights))}</span>
          </div>
          <div>
            <span className='underline'>서비스 수수료</span>
            <span>₩{money(Math.floor(property.price * 0.1))}</span>
          </div>
          <div>
            <span className='underline'>숙박세와 수수료</span>
            <span>₩{money(Math.floor(property.price * 0.01))}</span>
          </div>
          <div className='total'>
            <span>총 합계</span>
            <span>₩{money(Math.floor(property.price * (nights + 0.11)))}</span>
          </div>
        </PropertyBill>
      </PropertyReservationTab>
    </>
  );
};

export default PropertyReservation;

const PropertyReservationTab = styled.div`
  ${({ theme }) => {
    return theme.flexSet({
      alignItems: 'space-between',
      flexDirection: 'column',
    });
  }};
  position: sticky;
  top: 120px;
  width: 100%;
  padding: 30px 20px;
  margin: 0 0 0 20px;
  border: 1px solid #cccccc;
  border-radius: 15px;
  z-index: 100000000 important!;
  -webkit-box-shadow: -1px 11px 12px 6px rgba(102, 102, 102, 0.1);
  box-shadow: -1px 11px 12px 6px rgba(102, 102, 102, 0.1);

  .flexCon {
    ${({ theme }) => {
      return theme.flexSet({
        justifyContent: 'space-between',
      });
    }};
    height: 40px;

    .propertyPrice {
      font-size: 22px;
    }
    .propertyReviewNum {
      color: #b1b1b1;
    }
  }
  .reservationBtn {
    width: 100%;
    height: 48px;
    margin: 15px 0;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 600;
    color: white;
    background-color: ${theme.pink};
  }
  .smallText {
    margin: 5px 0 25px 0;
    font-size: 14px;
    text-align: center;
  }
`;

const CalenderBox = styled.div`
  .DateRangePicker {
    width: 100%;

    .DateRangePickerInput_arrow {
      display: none;
    }
    svg {
      margin: 0;
      padding: 0;
    }
    .DateRangePickerInput {
      display: flex;
      width: 100%;
      height: 75px;
      margin: 20px 0 0 0;
      border: 1px solid #cccccc;
      border-radius: 10px;
      padding: 5px;

      #startDate {
        font-size: 16px;
        font-weight: 400;
        width: 80%;
      }
      #endDate {
        width: 80%;
        font-size: 16px;
        font-weight: 400;
      }
    }
  }
  .DayPicker {
    margin: 0;
  }

  .DayPickerNavigation_button {
    border: none;
  }

  .CalendarDay {
    padding: 10px;
    border: none;
  }
  .CalendarDay__selected_span {
    background: #ebebeb;
    color: black;
  }

  .CalendarDay__selected {
    background-color: #575757;
    border-radius: 50%;
    color: white;
  }

  .CalendarDay__selected:hover {
    border-radius: 50%;
    color: white;
  }

  .CalendarDay__hovered_span:hover,
  .CalendarDay__hovered_span {
    background-color: #ebebeb;
    border-radius: 50%;
    color: #575757;
  }
`;

const CapacityBox = styled.div`
  .capacitySelector {
    position: relative;
    height: 60px;
    padding: 10px;
    border: 1px solid #cccccc;
    border-radius: 0 0 8px 8px;

    &::after {
      content: '.';
      position: absolute;
      top: -10px;
      left: -1px;
      width: 100%;
      color: white;
      background-color: white;
      border-top: 1px solid #cccccc;
      border-left: 1px solid #cccccc;
      border-right: 1px solid #cccccc;
    }

    p {
      font-size: 12px;
      margin: -3px 0 8px 0;
    }

    button {
      background-color: white;
      position: absolute;
      right: 10px;
      top: 10px;
      cursor: pointer;
    }
  }
  .displayNone {
    display: none;
  }
  .capacityModal {
    ${({ theme }) => {
      return theme.flexSet({
        justifyContent: 'space-between',
        flexDirection: 'column',
      });
    }};
    position: absolute;
    height: 300px;
    width: 88%;
    padding: 20px 10px;
    border: 1px solid #e2e2e2;
    border-radius: 8px;
    background-color: white;
    -webkit-box-shadow: -1px 11px 12px 6px rgba(102, 102, 102, 0.1);
    box-shadow: -1px 11px 12px 6px rgba(102, 102, 102, 0.1);
    .switch {
      ${({ theme }) => {
        return theme.flexSet({
          justifyContent: 'space-between',
          alignItems: 'space-between',
        });
      }};
      width: 100%;
      height: 50px;
      span {
        font-size: 16px;
      }
      p {
        font-size: 12px;
        margin-top: 3px;
      }
      button {
        width: 32px;
        height: 32px;
        font-size: 22px;
        color: #6b6b6b;
        background-color: white;
        border: 1px solid #cccccc;
        border-radius: 50%;
        letter-spacing: -2px;
        cursor: pointer;
      }
      .switchNum {
        margin: 0 10px;
      }
    }
    span {
      margin-top: 10px;
      font-size: 14px;
    }
    .closeBtn {
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: end;
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

const PropertyBill = styled.div`
  div {
    ${({ theme }) => {
      return theme.flexSet({
        justifyContent: 'space-between',
        alignItems: 'center',
      });
    }};
    margin-bottom: 20px;
    font-size: 16px;

    &:nth-child(4) {
      padding-top: 30px;
      font-weight: 500;
      border-top: 1px solid #cccccc;
    }
    .underline {
      text-decoration: underline;
    }
  }
`;
