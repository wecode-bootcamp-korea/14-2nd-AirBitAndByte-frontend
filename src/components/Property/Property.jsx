import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import PropertyGallery from './PropertyGallery';
import PropertyDetail from './PropertyDetail';
import PropertyCalender from './PropertyCalender';
import PropertyReview from './PropertyReview';
import PropertyMap from './PropertyMap';
import PropertyReservation from './PropertyReservation';
import PropertyOthers from './PropertyOthers';
import PropertyHost from './PropertyHost';
import { DETAIL_API, BOOKMARK_API } from '../../config';
import { theme } from '../../styles/theme';
import { MdStar } from 'react-icons/md';
import { FaMedal } from 'react-icons/fa';
import { FiShare2 } from 'react-icons/fi';
import { BsHeart, BsHeartFill } from 'react-icons/bs';

const ACCESS_TOKEN = localStorage.getItem('accessToken');

const Property = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [isBookmarked, setBookmarked] = useState(true);
  const [property, setProperty] = useState({});
  const [focus, setFocus] = useState(null);
  const [focusedInput, setFocusedInput] = useState('startDate');
  const [dateRange, setdateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const { startDate, endDate } = dateRange;

  const history = useHistory();

  const handleBookmark = (event) => {
    event.stopPropagation();
    axios(BOOKMARK_API, {
      method: isBookmarked ? 'delete' : 'post',
      headers: {
        Authorization: ACCESS_TOKEN,
      },
      data: { propertyId: property.propertyId },
    });
    setBookmarked(!isBookmarked);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    axios
      // 서버 연결
      .get(`${DETAIL_API}${props.match.params.id}`, {
        headers: {
          Authorization: ACCESS_TOKEN,
        },
      })
      // Mock data 연결
      // .get(DETAIL_API)
      .then(({ data: { result } }) => {
        setProperty(result);
        setBookmarked(result.isBookmarked);
      });
  }, [props.match.params.id]);

  const { rules, safeties, rate } = property;

  const handleOnDateChange = ({ startDate, endDate }) => {
    setdateRange({ startDate, endDate });
  };

  const moveToDetailPage = (id) => {
    history.push(`/property/${id}`);
    window.scrollTo(0, 0);
  };

  if (isLoading) {
    return (
      <PropertyWrapper>
        <Header isLoading={isLoading}>
          <div className='propertyTitle'>
            {property.propertyName}
            <Skeleton isLoading={isLoading} />
          </div>
          <div className='headerInfo'>
            <div className='headerInfoLeft'>
              <Skeleton isLoading={isLoading} />
              <MdStar size={20} style={{ marginRight: 5 }} />
              {rate?.propertyRate && (
                <span className='propertyRate'>
                  {Math.floor(rate.propertyRate * 100) / 100}
                </span>
              )}
              <span className='propertyReviewNum'>
                ({property.reviews?.length})
              </span>
              {property.isSupered ? (
                <span className='superhost'>
                  <FaMedal style={{ marginRight: 5 }} />
                  슈퍼호스트
                </span>
              ) : (
                ''
              )}
              <span className='propertyLocation'>
                {property.district}, {property.province}, {property.country}
              </span>
            </div>
            <div className='headerInfoRight'>
              <button className='shareBtn'>
                <Skeleton isLoading={isLoading} />
                <FiShare2 size={15} style={{ marginRight: 5 }} />
                공유하기
              </button>
              <button className='BookmarkBtn' onClick={handleBookmark}>
                <Skeleton isLoading={isLoading} />
                {isBookmarked ? (
                  <BsHeartFill size={15} style={{ marginRight: 5 }} />
                ) : (
                  <BsHeart size={15} style={{ marginRight: 5 }} />
                )}
                저장
              </button>
            </div>
          </div>
        </Header>
        {property.propertyImages?.length > 0 && (
          <PropertyGallery
            isLoading={isLoading}
            propertyImages={property.propertyImages}
          />
        )}
      </PropertyWrapper>
    );
  }

  return (
    <PropertyWrapper>
      <Header isLoading={isLoading}>
        <div className='propertyTitle'>{property.propertyName}</div>
        <div className='headerInfo'>
          <div className='headerInfoLeft'>
            <MdStar size={20} style={{ marginRight: 5 }} />
            {rate?.propertyRate && (
              <span className='propertyRate'>
                {Math.floor(rate.propertyRate * 100) / 100}
              </span>
            )}
            <span className='propertyReviewNum'>
              ({property.reviews?.length})
            </span>
            {property.isSupered ? (
              <span className='superhost'>
                <FaMedal style={{ marginRight: 5 }} />
                슈퍼호스트
              </span>
            ) : (
              ''
            )}
            <span className='propertyLocation'>
              {property.district}, {property.province}, {property.country}
            </span>
          </div>
          <div className='headerInfoRight'>
            <button className='shareBtn'>
              <FiShare2 size={15} style={{ marginRight: 5 }} />
              공유하기
            </button>
            <button className='BookmarkBtn' onClick={handleBookmark}>
              {isBookmarked ? (
                <BsHeartFill
                  color={theme.pink}
                  size={15}
                  style={{ marginRight: 5 }}
                />
              ) : (
                <BsHeart
                  color={theme.pink}
                  size={15}
                  style={{ marginRight: 5 }}
                />
              )}
              저장
            </button>
          </div>
        </div>
      </Header>
      {property.propertyImages?.length > 0 && (
        <PropertyGallery
          isLoading={isLoading}
          propertyImages={property.propertyImages}
        />
      )}

      <ParagraphContainer>
        <div className='propertyLeft'>
          {property.sizes !== undefined && (
            <PropertyDetail property={property} />
          )}
          <PropertyCalender
            setFocusedInput={setFocusedInput}
            focusedInput={focusedInput}
            endDate={endDate}
            startDate={startDate}
            handleOnDateChange={handleOnDateChange}
          />
        </div>
        <div className='proeprtyRight'>
          <PropertyReservation
            property={property}
            setFocusedInput={setFocusedInput}
            focus={focus}
            setFocus={setFocus}
            endDate={endDate}
            startDate={startDate}
            handleOnDateChange={handleOnDateChange}
          />
        </div>
      </ParagraphContainer>

      {property.rate && (
        <PropertyReview rate={property.rate} reviews={property.reviews} />
      )}
      {property.propertyId && <PropertyMap property={property} />}
      <PropertyHost property={property} />
      <PropertyFooter>
        <div className='propertyFooterTitle title'>알아두어야 할 사항</div>
        <div className='gridBox'>
          <div className='footerRule'>
            <p className='subtitle'>숙소 이용규칙</p>
            <p>{rules ? rules[0] : ''}</p>
            <p>{rules ? rules[1] : ''}</p>
            <p>{rules ? rules[2] : ''}</p>
          </div>
          <div className='footerSafety'>
            <p className='subtitle'>건강과 안전</p>
            <p>
              {safeties ? safeties[0] : ''}
              <b>자세히 알아보기</b>
            </p>
            <p>
              에이비트앤바이트의 사회적 거리 두기 및 관련 가이드라인이
              적용됩니다.
            </p>
            <p>{safeties ? safeties[1] : ''}</p>
            <p>{safeties ? safeties[2] : ''}</p>
          </div>
          <div className='footerRefund'>
            <p className='subtitle'>환불 정책</p>
            <p>{property.refund}</p>
            <p>
              그 이후로는 체크인 전에 취소하면 첫 1박 요금과 서비스 수수료를
              제외한 전액이 환불됩니다. <b>자세히 알아보기</b>
            </p>
          </div>
        </div>
      </PropertyFooter>
      {property.propertyId && (
        <PropertyOthers
          handleBookmark={handleBookmark}
          recommendedProperties={property.moreProperties}
          moveToDetailPage={moveToDetailPage}
        />
      )}
    </PropertyWrapper>
  );
};

export default Property;

const loading = keyframes` 
  0% {
    opacity: 1;
  }
  50%{
    opacity: 0.3;
  }
  100% {
    opacity : 1;
  }
  `;

const PropertyWrapper = styled.div`
  ${({ theme }) => {
    return theme.flexSet({
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    });
  }};
  margin-top: 120px;
  padding: 0 20px;

  .title {
    font-size: 22px;
    font-weight: 500;
  }
`;

const Header = styled.header`
  max-width: 1130px;
  width: 100%;
  height: 60px;

  .propertyTitle {
    position: relative;
    font-size: 26px;
    font-weight: 600;
    margin-bottom: 10px;
    width: 500px;
    color: ${(props) => (props.isLoading ? 'transparent' : 'black')};
  }

  .headerInfo {
    ${({ theme }) => {
      return theme.flexSet({
        justifyContent: 'space-between',
        alignItems: 'center',
      });
    }};
    font-size: 16px;

    .headerInfoLeft {
      position: relative;

      svg {
        margin-bottom: -3px;
        color: ${(props) => (props.isLoading ? 'transparent' : '#ff3a5c')};
      }

      .propertyRate {
        font-weight: 500;
        color: ${(props) => (props.isLoading ? 'transparent' : 'black')};
      }

      .superhost,
      .propertyReviewNum {
        color: ${(props) => (props.isLoading ? 'transparent' : '#8f8f8f')};

        &::after {
          content: '·';
          margin: 0 7px;
        }
      }
      .propertyLocation {
        color: ${(props) => (props.isLoading ? 'transparent' : 'black')};
        text-decoration: underline;
      }
      .propertyReviewNum {
        margin-left: 3px;
      }
    }

    button {
      position: relative;
      width: 90px;
      height: 30px;
      margin-left: 10px;
      border-radius: 10px;
      background-color: #fff;
      text-decoration: underline;
      color: ${(props) => (props.isLoading ? 'transparent' : 'black')};

      &:hover {
        background-color: #f1f1f1;
      }
      svg {
        margin-bottom: -3px;
        &::nth-child(2) {
          color: ${theme.pink};
        }
      }
    }
  }
`;

const ParagraphContainer = styled.div`
  display: flex;
  flex-basis: 100%;
  max-width: 1130px;
  width: 100%;
  min-width: 500px;
  padding: 0 0 80px 0;
  border-bottom: 1px solid #dadada;
  .propertyLeft {
    width: 68%;
  }
  .propertyRight {
    position: relative;
    width: 100%;
  }
`;

const PropertyFooter = styled.div`
  max-width: 1130px;
  width: 100%;
  margin-bottom: 50px;

  .propertyFooterTitle {
    margin: 50px 0 25px 0;
  }
  .subtitle {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 20px;
  }
  p {
    line-height: 1.3;
    margin-bottom: 10px;
    b {
      font-weight: 500;
      text-decoration: underline;
    }
  }
  .gridBox {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 40px;
    .footerRule {
    }
    .footerSafety {
    }
  }
`;

const Skeleton = styled.div`
  background-color: #bdbdbd;
  position: absolute;
  top: -8px;
  left: 0;
  right: 0;
  bottom: 0px;
  border-radius: 5px;
  animation: ${loading} 2.5s ease-in-out alternate;
`;
