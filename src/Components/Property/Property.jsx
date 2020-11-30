import React, { useEffect, useState } from 'react';
import PropertyGallery from './PropertyGallery';
import PropertyDetail from './PropertyDetail';
import PropertyCalender from './PropertyCalender';
import PropertyReview from './PropertyReview';
import PropertyMap from './PropertyMap';
import styled from 'styled-components';
import {
  flexSpaceBetweenCenter,
  flexColumnCenter,
  theme,
} from '../../styles/theme';
import axios from 'axios';

import { FaMedal } from 'react-icons/fa';
import { MdStar } from 'react-icons/md';
import { HiShieldCheck } from 'react-icons/hi';
import { FiShare2 } from 'react-icons/fi';
import { BsHeart } from 'react-icons/bs';

const Property = (props) => {
  const [imgList, setImgList] = useState([]);

  useEffect(() => {
    axios
      .get('/data/imgList.json')
      .then((res) => setImgList(res.data.data));
  }, []);

  return (
    <PropertyWrapper>
      <Header>
        <div className='propertyTitle'>
          하버하우스 웨스트 Guitar room (2인실 Twin bed)
        </div>
        <div className='headerInfo'>
          <div className='headerInfoLeft'>
            <MdStar color={theme.pink} size={20} />
            <span className='propertyRate'>4.86</span>
            <span className='propertyReviewNum'>(85)</span>{' '}
            <span className='superhost'>
              <FaMedal color={theme.pink} />
              슈퍼호스트
            </span>{' '}
            <span className='propertyLocation'>
              제주시, 제주특별자치도, 한국
            </span>
          </div>
          <div className='headerInfoRight'>
            <button className='shareBtn'>
              <FiShare2 style={{ marginRight: 5 }} />
              공유하기
            </button>
            <button className='wishlistBtn'>
              <BsHeart style={{ marginRight: 5 }} />
              저장
            </button>
          </div>
        </div>
      </Header>
      {imgList.length > 0 && <PropertyGallery imgList={imgList} />}
      <PropertyDetail />
      <PropertyCalender />
      <PropertyReview />
      <PropertyMap />
      <section className='hostInfo'>
        <div className='hostBox'>
          <div className='hostProfile'>
            <img src='images/hostProfile.jpg' alt='host profile' />
          </div>
          <div className='hostName'>호스트: 은정님</div>
          <div className='hostSignUpDate'>2020년 8월</div>
        </div>
        <div className='hostContentBox'>
          <div className='hostContentBoxLeft'>
            <div className='hostSummary'>
              <div className='summaryBox'>
                <MdStar />
                후기 443개 <HiShieldCheck /> 본인 인증 완료 <FaMedal />{' '}
                슈퍼호스트
              </div>
              <p className='hostIntro'>
                안녕하세요 호스트 은정입니다. 어린시절부터 쭉 살아왔던 애월읍
                고내리에 있는 저희 집을 여러분들과 함께 공유하고자 합니다 :-)
                여러분들과의 소통과 음악적 교류를 기대하며 기다리고 있겠습니다
                :-) 감사합니다 !
              </p>
              <p className='title'>은정님은 슈퍼호스트입니다.</p>
              <p>
                슈퍼호스트는 풍부한 경험과 높은 평점을 자랑하며 게스트가
                숙소에서 편안히 머무를 수 있도록 최선을 다하는 호스트입니다.
              </p>
            </div>
          </div>
          <div className='hostContentBoxRight'>
            <p>응답률: 100%</p>
            <p>응답 시간: 1시간 이내</p>
            <div className='hostPhoneBtn'>호스트에게 연락하기</div>
            <div className='savePaymentInfo'>
              <HiShieldCheck /> 안전한 결제를 위해 에어비트앤바이트 웹사이트나
              앱 외부에서 송금하거나 대화를 나누지 마세요.
            </div>
          </div>
        </div>
      </section>
      <section className='propertyFooter'>
        <div className='propertyFooterTitle title'>알아두어야 할 사항</div>
        <div className='footerRule'>
          <p className='subtitle'>숙소 이용규칙</p>
          <p>체크인 시간: 오후 3:00 이후</p>
          <p>흡연 금지</p>
          <p>반려동물 동반 가능</p>
        </div>
        <div className='footerSafety'>
          <p className='subtitle'>건강과 안전</p>
          <p>
            에어비트앤바이트의 강화된 청소 절차 준수에 동의했습니다. 자세히
            알아보기
          </p>
          <p>
            에이비트앤바이트의 사회적 거리 두기 및 관련 가이드라인이 적용됩니다.
          </p>
          <p>일산화탄소 경보기</p>
          <p>화재경보기</p>
        </div>
        <div className='footerRefund'>
          <p className='subtitle'>환불 정책</p>
          <p>체크인 24시간 전까지 수수료 없이 예약 취소 가능</p>
          <p>
            그 이후로는 체크인 전에 취소하면 첫 1박 요금과 서비스 수수료를
            제외한 전액이 환불됩니다.
          </p>
        </div>
      </section>
      <section className='otherProperty'>
        <div className='otherPropertyHeader'>
          <div className='otherPropertyTitle title'>숙소 더 보기</div>
          <button>←</button> <button>→</button>
        </div>
        <div className='propertyList'>
          <div className='propertyBox'>
            <img src='/images/property1.png' alt='other property' />
            <p className='propertyRate'>★ 4.81(21)</p>
            <p className='propertyInfo'>호텔 객실 침대 2개</p>
            <p className='propertyName'>패밀리 스위트 트윈</p>
          </div>
        </div>
      </section>
    </PropertyWrapper>
  );
};

const PropertyWrapper = styled.div`
  ${flexColumnCenter};
  padding: 0 20px;
`;

const Header = styled.header`
  max-width: 1130px;
  width: 100%;
  height: 90px;
  .propertyTitle {
    font-size: 26px;
    font-weight: 600;
    margin: 20px 0;
  }
  .headerInfo {
    ${flexSpaceBetweenCenter}
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
    }
  }
`;

export default Property;
