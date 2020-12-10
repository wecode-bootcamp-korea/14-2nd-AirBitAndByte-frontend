import React from 'react';
import styled from 'styled-components';
import { theme, flexSpaceBetweenCenter, flexColumn } from '../../styles/theme';
import { AiFillStar, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import Slider from 'react-slick';

const PlaceListItem = ({ onMouseOver, listItem }) => {
  const settings = {
    adaptiveHeight: true,
    accessibility: true,
    dots: true,
    infinite: true,
    focusOnSelect: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <PlaceListItemComponent onMouseOver={onMouseOver}>
      <div className='placeImg'>
        <MdKeyboardArrowLeft className='arrow_prev' />
        <Slider {...settings}>
          {listItem.propertyImages.map((image, index) => {
            return <img src={image} key={index} />;
          })}
        </Slider>
        <MdKeyboardArrowRight className='arrow_next' />
      </div>
      <div className='placeContent'>
        <div className='contentTitle'>
          <div>
            <div className='subTitle'>{`${listItem.hostName}의 ${listItem.porpertyType}`}</div>
            <div className='title'>{listItem.propertyName}</div>
          </div>
          <div className='placeDibs'>{true ? <AiOutlineHeart /> : <AiFillHeart />}</div>
        </div>
        <div className='layoutLine'></div>
        <div className='optionList'>
          <span clsasName='optionCapacity'>
            <span>{`·최대인원 ${listItem.capacity}명`}</span>
            <span>{`·${listItem.porpertyType}`}</span>
          </span>
          <span className='option'>
            {listItem.facilities.map((option, index) => {
              return <span key={index}>{`·${option}`}</span>;
            })}
          </span>
        </div>
        <div className='placeValue'>
          <div className='placeGrade'>
            <AiFillStar className='plceGradeIcon' />
            <span className='plceGradeNumber'>4.64</span>
          </div>
          <div className='placePrice'>
            <span className='price'>{Number(listItem.price).toLocaleString()}</span>
            <span className='perMonth'>/월</span>
          </div>
        </div>
      </div>
    </PlaceListItemComponent>
  );
};
export default PlaceListItem;

const PlaceListItemComponent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20px 0;
  border-top: 1px solid ${theme.bordergrey};

  .placeImg {
    position: relative;
    width: 300px;
    height: 200px;
    border-radius: 15px;

    img {
      width: 300px;
      height: 200px;
      border-radius: 15px;
    }

    .slick-dots {
      bottom: -19px;
    }

    .arrow_prev {
      position: absolute;
      top: 40%;
      left: 5px;
      width: 15px;
      height: 15px;
      padding: 10px;
      border-radius: 50px;
      transform: translateY(-10);
      transition: 0.5s;
      background-color: rgba(255, 255, 255, 0.5);
      z-index: 101;

      &:hover {
        background-color: rgba(255, 255, 255, 1);
      }
    }
    .arrow_next {
      position: absolute;
      top: 40%;
      right: 5px;
      width: 15px;
      height: 15px;
      padding: 10px;
      border-radius: 50px;
      transform: translateY(-10);
      transition: 0.5s;
      background-color: rgba(255, 255, 255, 0.3);
      z-index: 101;

      &:hover {
        background-color: rgba(255, 255, 255, 1);
      }
    }
  }

  .placeContent {
    width: 100%;
    height: 100%;
    padding: 10px 10px 10px 20px;

    .contentTitle {
      display: flex;
      justify-content: space-between;

      div {
        ${flexColumn}
        justify-content : center;

        .subTitle {
          font-size: 13px;
          color: #717171;
        }
        .title {
          margin: 7px 0;
          font-size: 20px;
        }
      }

      .placeDibs {
        svg {
          width: 30px;
          height: 30px;
        }
      }
    }
    .layoutLine {
      width: 10%;
      margin: 15px 0;
      border-top: 1px solid ${theme.bordergrey};
    }

    .optionList {
      ${flexColumn}

      .optionCapacity {
        margin: 5px 0;
        font-size: 14px;
        color: ${theme.grey};
      }

      .option {
        margin: 10px 0;
        font-size: 14px;
        color: #ceceec;

        span {
          margin-right: 5px;
        }
      }
    }

    .placeValue {
      ${flexSpaceBetweenCenter}

      .placeGrade {
        display: flex;
        align-items: center;

        .plceGradeIcon {
          color: ${theme.pink};
        }
        .plceGradeNumber {
          font-size: 13px;
        }
      }
      .placePrice {
        .price {
          font-size: 20px;
          font-weight: bold;
        }
        .perMonth {
          margin: 0 5px;
          font-size: 20px;
        }
      }
    }
  }
`;
