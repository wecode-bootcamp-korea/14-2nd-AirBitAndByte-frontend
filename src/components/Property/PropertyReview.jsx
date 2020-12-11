import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { MdStar } from 'react-icons/md';

const PropertyReview = ({ reviews, rate }) => {
  const criteriaArr = [
    {
      name: '청결도',
      key: 'propertyCleanliness',
    },
    {
      name: '의사소통',
      key: 'propertyCommunication',
    },
    {
      name: '체크인',
      key: 'propertyCheckIn',
    },
    {
      name: '정확성',
      key: 'propertyAccuracy',
    },
    {
      name: '위치',
      key: 'propertyLocation',
    },
    {
      name: '가격 대비 만족도',
      key: 'propertyAffordability',
    },
  ];

  return (
    <>
      <PropertyReviewBox>
        <div className='propertyRate'>
          <div className='averageRate'>
            <MdStar color={theme.pink} size={25} />
            {Math.floor(rate?.propertyRate * 100) / 100}점 (후기{' '}
            {reviews.length}
            개)
          </div>

          <div className='rateBox'>
            {criteriaArr.map((criteria, idx) => (
              <div key={idx} className='barContainer'>
                <div className='criteria'>{criteria.name}</div>
                <div className='flexCon'>
                  <progress
                    className='progressTag'
                    value={rate[criteria.key]}
                    max='5'
                  />
                  {rate && (
                    <div className='rate'>
                      {Number(rate[criteria.key]).toFixed(2)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <ul className='reviewsBox'>
          {reviews.map((review, idx) => (
            <li key={idx} className='review'>
              <div className='reviewerBox'>
                <div className='reviewerProfile'>
                  <img
                    src={`/images/avatar${idx}.png`}
                    alt='reviewer profile'
                  />
                </div>
                <div className='flexRight'>
                  <div className='reviewerName'>{review.user}</div>
                  <div className='reviewDate'>
                    201{Math.floor(Math.random() * 10) + 1}년{' '}
                    {Math.floor(Math.random() * 12) + 1}월
                  </div>
                </div>
              </div>
              <div className='reviewText'>{review.content}</div>
            </li>
          ))}
        </ul>
        <button className='reviewMoreBtn'>
          후기 {reviews.length}개 모두 보기
        </button>
      </PropertyReviewBox>
    </>
  );
};

export default PropertyReview;

const PropertyReviewBox = styled.div`
  width: 100%;
  max-width: 1130px;
  padding: 40px 0;
  border-bottom: 1px solid #dadada;

  .propertyRate {
    font-size: 22px;
    font-weight: 500;

    svg {
      padding-top: 5px;
      margin: 0 3px -3px 0;
    }
  }
  .rateBox {
    margin: 30px 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    .barContainer {
      display: flex;
      justify-content: space-between;
      margin: 5px 0 15px 0;

      .criteria {
        font-size: 16px;
        font-weight: 400;
      }
      .flexCon {
        display: flex;
        align-items: center;

        progress {
          appearance: none;
          display: block;
          width: 120px;
          height: 4px;
        }
        progress::-webkit-progress-bar {
          background-color: #eee;
          border-radius: 3px;
        }
        progress::-webkit-progress-value {
          background-color: #414141;
          border-radius: 3px;
        }
        .rate {
          margin: 0 70px 0 10px;
          font-size: 13px;
          font-weight: 600;
        }
      }
    }
  }

  .reviewsBox {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 20px 0 40px 0;
    overflow: auto;

    .review {
      width: 460px;
      margin-bottom: 30px;

      .reviewerBox {
        display: flex;
        margin-bottom: 10px;

        .reviewerProfile {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .flexRight {
          margin: 10px;

          .reviewerName {
            font-weight: 500;
            margin-bottom: 5px;
          }
          .reviewDate {
            color: #727272;
          }
        }
      }
      .reviewText {
        max-height: 120px;
        overflow: hidden;
        white-space: normal;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        word-break: break-word;
        line-height: 120%;
      }
    }
  }
  .reviewMoreBtn {
    width: 175px;
    height: 48px;
    font-weight: 500;
    font-size: 16px;
    border: 1px solid ${theme.black};
    border-radius: 5px;
    background-color: white;
  }
`;
