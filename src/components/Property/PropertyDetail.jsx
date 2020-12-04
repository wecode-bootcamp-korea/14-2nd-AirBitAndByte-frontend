import React from 'react';
import styled from 'styled-components';
import { flexSpaceBetweenCenter, flexSet } from '../../styles/theme';

import { BsCalendar } from 'react-icons/bs';
import { BsBook } from 'react-icons/bs';
import { BiBed } from 'react-icons/bi';
import { ImSpoonKnife } from 'react-icons/im';
import { AiOutlineWifi } from 'react-icons/ai';
import { MdFreeBreakfast } from 'react-icons/md';
import { RiTShirtAirLine } from 'react-icons/ri';
import { AiOutlineLaptop } from 'react-icons/ai';
import { RiMoonClearLine } from 'react-icons/ri';
import { BiDoorOpen } from 'react-icons/bi';
import { RiMedal2Line } from 'react-icons/ri';

const PropertyDetail = (props) => {
  return (
    <PropertyDetailBox>
      <div className='propertyDetailHeader'>
        <div className='detailHeaderLeft'>
          <div className='title'>은정님이 호스팅하는 주택의 개인실</div>
          <div className='titleInfo'>
            최대 인원 2명 침실 1개 침대 2개 공동 사용 욕실 2개
          </div>
        </div>
        <div className='detailRight'>
          <img
            src='/images/hostProfile.jpg'
            alt='host profile'
            className='hostProfile'
          />
        </div>
      </div>

      <DefaultInfo>
        <div className='defaultInfoBox'>
          <RiMoonClearLine size={30} />
          <div className='defaultInfoRight'>
            <div className='defaultInfoTitle'>청결 강화</div>
            <div className='defaultInfodetail'>
              에어비트앤바이트의 강화된 5단계 청소 절차를 준수하겠다고 동의한
              호스트입니다. <span>자세히 알아보기</span>
            </div>
          </div>
        </div>
        <div className='defaultInfoBox'>
          <BiDoorOpen size={30} />
          <div className='defaultInfoRight'>
            <div className='defaultInfoTitle'>셀프 체크인</div>
            <div className='defaultInfodetail'>
              키패드를 이용해 체크인하세요.
            </div>
          </div>
        </div>
        <div className='defaultInfoBox'>
          <RiMedal2Line size={30} />
          <div className='defaultInfoRight'>
            <div className='defaultInfoTitle'>은정님은 슈퍼호스트입니다.</div>
            <div className='defaultInfodetail'>
              에어비트앤바이트의 강화된 5단계 청소 절차를 준수하겠다고 동의한
              호스트입니다. <span>자세히 알아보기</span>
            </div>
          </div>
        </div>
        <div className='defaultInfoBox'>
          <BsCalendar size={30} />
          <div className='defaultInfoRight'>
            <div className='defaultInfoTitle'>환불 정책</div>
            <div className='defaultInfodetail'>
              12월 13일 12:00 PM 전에 예약을 취소하면 총 숙박 요금의 50% 및
              서비스 수수료 전액이 환불됩니다. <span>자세히 보기</span>
            </div>
          </div>
        </div>
        <div className='defaultInfoBox'>
          <BsBook size={30} />
          <div className='defaultInfoRight'>
            <div className='defaultInfoTitle'>숙소 이용규칙</div>
            <div className='defaultInfodetail'>
              유아 24개월 미만 동반에 적합하지 않은 숙소이며, 반려동물 동반이
              금지됩니다. <span>세부 정보 보기</span>
            </div>
          </div>
        </div>
      </DefaultInfo>
      <InfoByHost>
        <p>❋ 프로필을 클릭하시면 더 많은 방이 있어요 :) ❋</p>
        <p>
          ❋ 2층짜리 단독주택을 쉐어하는 형태로 운영하고 있습니다. 거실, 주방,
          욕실은 공용공간입니다. 숙소 설명을 꼭 읽어주세요. ❋
        </p>
        <p> ❋ 조식 셀프, 별도 비용 없음❋ </p>
        <p>
          ※ 코로나19로 인한 특별한 환불규정은 적용되지 않으니 에어비앤비
          환불규정을 확인하신 후 신중히 예약해주시기 바랍니다. 뮤지션이 운영하는
          음악과 새소리, 휴식이 어우러진 숙소
        </p>
        <p>숙소</p>
        <p>
          ☀︎ 2층짜리 단독주택을 쉐어하는 형태로 운영하고 있습니다. 거실, 주방,
          욕실은 공용공간입니다.
        </p>
        <p> 1층 : 2인실 2개, 욕실 1, 거실 1, 주방 1 </p>
        <p>2층 : 2인실 1개, 1인실 1개, 욕실1, 거실1</p>
      </InfoByHost>
      <BedInfo>
        <div className='bedInfoTitle title'>침대/침구 유형</div>
        <div className='bedInfoBox'>
          <div className='bedIconBox'>
            <BiBed size={30} />
            <BiBed size={30} />
          </div>
          <div className='bold'> 1번 침실</div>
          <div> 슈퍼싱글 2개</div>
        </div>
      </BedInfo>
      <Accomodations>
        <div className='accomodationsTitle title'>편의시설</div>
        <div className='accomodationsBox'>
          <ImSpoonKnife size={24}/>
          <span>주방</span>
        </div>
        <div className='accomodationsBox'>
          <AiOutlineWifi size={24}/>
          <span>무선 인터넷</span>
        </div>
        <div className='accomodationsBox'>
          <MdFreeBreakfast size={24}/>
          <span>아침식사</span>
        </div>
        <div className='accomodationsBox'>
          <RiTShirtAirLine size={24}/>
          <span>헤어드라이어</span>
        </div>
        <div className='accomodationsBox'>
          <AiOutlineLaptop size={24}/>
          <span>업무 전용 공간</span>
        </div>
      </Accomodations>
    </PropertyDetailBox>
  );
};

const PropertyDetailBox = styled.div`
  margin: 20px 20px 20px 0;

  .title {
    font-size: 22px;
  }

  .propertyDetailHeader {
    ${flexSet('spacebetween', 'center')}
    padding: 24px 0;

    .titleInfo {
      margin-top: 7px;
    }

    img {
      border-radius: 50%;
      width: 56px;
    }
  }
`;

const DefaultInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 420px;
  padding: 24px 0;
  line-height: 18px;
  border-top: 1px solid #eeeeee;

  .defaultInfoBox {
    line-height: 18px;
    display: flex;
    height: 45px;

    .defaultInfoRight {
      margin-left: 15px;

      .defaultInfoTitle {
        margin-bottom: 4px;
        font-size: 16px;
        font-weight: 600;
      }

      .defaultInfodetail {
        font-size: 14px;
        color: #acacac;
        font-weight: 400;
        word-break: keep-all;

        span {
          font-weight: 600;
          text-decoration: underline;
          color: #222222;
          cursor: pointer;

          &:hover {
            color: black;
          }
        }
      }
    }
  }
`;

const InfoByHost = styled.div`
  border-top: 1px solid #eeeeee;
  padding: 32px 0 48px 0;
  font-size: 16px;
  line-height: 24px;
  word-break: break-word;
`;

const BedInfo = styled.div`
  border-top: 1px solid #eeeeee;
  padding-top: 48px;
  padding-bottom: 48px;

  .bedInfoBox {
    margin: 20px 0;
    width: 200px;
    padding: 5px 20px;
    border: 1px solid #eeeeee;
    border-radius: 10px;

    div {
      margin: 16px 0;
      font-size: 14px;
    }

    .bold {
      font-size: 16px;
      font-weight: 600;
    }
  }
`;

const Accomodations = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 48px 0;
  border-top: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;


  .accomodationsBox {
    margin:10px 0;
  }
  svg {
    margin-right: 10px;
  }
`;

export default PropertyDetail;
