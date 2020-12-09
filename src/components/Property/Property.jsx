import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
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
import { BsHeart } from 'react-icons/bs';
import { BsHeartFill } from 'react-icons/bs';

const ACCESS_TOKEN = localStorage.getItem('accessToken');

const Property = (props) => {
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
    axios({
      method: isBookmarked ? 'delete' : 'get',
      headers: {
        Authorization: ACCESS_TOKEN,
      },
      propertyId: property.propertyId,
    });
    setBookmarked(!isBookmarked);
  };

  useEffect(() => {
    axios
      .get(`${DETAIL_API}`)
      // .get(`${DETAIL_API}${props.match.params.id}`)
      .then(({ data: { result } }) => {
        setProperty(result);
        setBookmarked(result.isBookmarked);
      });
  }, [props.match.params.id]);

  const handleOnDateChange = ({ startDate, endDate }) => {
    setdateRange({ startDate, endDate });
  };

  const moveToDetailPage = (id) => {
    history.push(`/property/${id}`);
    window.scrollTo(0, 0);
  };

  return (
    <PropertyWrapper>
      <Header>
        <div className='propertyTitle'>{property.propertyName}</div>
        <div className='headerInfo'>
          <div className='headerInfoLeft'>
            <MdStar color={theme.pink} size={20} style={{ marginRight: 5 }} />
            <span className='propertyRate'>4.86</span>
            <span className='propertyReviewNum'>
              ({property.reviews?.length})
            </span>
            <span className='superhost'>
              <FaMedal color={theme.pink} style={{ marginRight: 5 }} />
              슈퍼호스트
            </span>
            <span className='propertyLocation'>
              제주시, 제주특별자치도, 한국
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
      {property.propertyImageslength > 0 && (
        <PropertyGallery propertyImages={property.propertyImages} />
      )}

      <ParagraphContainer>
        <div className='propertyLeft'>
          <PropertyDetail />
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
      {property.propertyId && <PropertyReview reviews={property.reviews} />}
      {property.propertyId && <PropertyMap property={property} />}
      <PropertyHost />
      <PropertyFooter>
        <div className='propertyFooterTitle title'>알아두어야 할 사항</div>
        <div className='gridBox'>
          <div className='footerRule'>
            <p className='subtitle'>숙소 이용규칙</p>
            <p>체크인 시간: 오후 3:00 이후</p>
            <p>흡연 금지</p>
            <p>반려동물 동반 가능</p>
          </div>
          <div className='footerSafety'>
            <p className='subtitle'>건강과 안전</p>
            <p>
              에어비트앤바이트의 강화된 청소 절차 준수에 동의했습니다.{' '}
              <b>자세히 알아보기</b>
            </p>
            <p>
              에이비트앤바이트의 사회적 거리 두기 및 관련 가이드라인이
              적용됩니다.
            </p>
            <p>일산화탄소 경보기</p>
            <p>화재경보기</p>
          </div>
          <div className='footerRefund'>
            <p className='subtitle'>환불 정책</p>
            <p>체크인 24시간 전까지 수수료 없이 예약 취소 가능</p>
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
  height: 90px;

  .propertyTitle {
    font-size: 26px;
    font-weight: 600;
    margin-bottom: 30px;
  }
  .headerInfo {
    ${({ theme }) => {
    return theme.flexSet({
      justifyContent: 'space-between',
      alignItems: 'center',
    });
  }};
    font-size: 14px;
    .superhost,
    .propertyReviewNum {
      color: #8f8f8f;
      &::after {
        content: '·';
        margin: 0 7px;
      }
    }
    .propertyLocation {
      text-decoration: underline;
    }
    button {
      width: 90px;
      height: 36px;
      border-radius: 10px;
      background-color: #fff;
      text-decoration: underline;
      &:hover {
        background-color: #f1f1f1;
      }
      svg {
        margin-bottom: -3px;
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
