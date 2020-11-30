import React from 'react';
import './Property.scss';
import { RiMoonClearLine } from 'react-icons/ri';
import { BiDoorOpen } from 'react-icons/bi';
import { RiMedal2Line } from 'react-icons/ri';
import { BsCalendar } from 'react-icons/bs';
import { BsBook } from 'react-icons/bs';
import { BiBed } from 'react-icons/bi';
import { ImSpoonKnife } from 'react-icons/im';
import { AiOutlineWifi } from 'react-icons/ai';
import { MdFreeBreakfast } from 'react-icons/md';
import { RiTShirtAirLine } from 'react-icons/ri';
import { AiOutlineLaptop } from 'react-icons/ai';
import { MdStar } from 'react-icons/md';
import { HiShieldCheck } from 'react-icons/hi';

const Property = (props) => {
  return (
    <div>
      <header className='header'>
        <div className='propertyTitle'>
          하버하우스 웨스트 Guitar room (2인실 Twin bed)
        </div>
        <div className='headerInfo'>
          <div className='headerInfoLeft'>
            ★4.86(85) 슈퍼호스트 제주시, 제주특별자치도, 한국
          </div>
          <div className='headerInfoRight'>공유하기 ♡저장</div>
        </div>
      </header>
      <section className='propertyGallery'>
        <div className='bigImgWrapper'>
          <img src='/images/property1.png' alt='숙소사진' />
        </div>
        <div className='smallImgWrapper'>
          <img src='/images/property2.png' alt='숙소사진' />
        </div>
        <div className='smallImgWrapper'>
          <img src='/images/property3.png' alt='숙소사진' />
        </div>
        <div className='smallImgWrapper'>
          <img src='/images/property4.png' alt='숙소사진' />
        </div>
        <div className='smallImgWrapper'>
          <img src='/images/property5.png' alt='숙소사진' />
        </div>
      </section>
      <section className='propertyDetail'>
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

        <div className='defaultInfo'>
          <div className='defaultInfoBox'>
            <RiMoonClearLine />
            <div className='defaultInfoRight'>
              <div className='defaultInfoTitle'>청결 강화</div>
              <div className='defaultInfodetail'>
                에어비트앤바이트의 강화된 5단계 청소 절차를 준수하겠다고 동의한
                호스트입니다. 자세히 알아보기
              </div>
            </div>
          </div>
          <div className='defaultInfoBox'>
            <BiDoorOpen />
            <div className='defaultInfoRight'>
              <div className='defaultInfoTitle'>셀프 체크인</div>
              <div className='defaultInfodetail'>
                키패드를 이용해 체크인하세요.
              </div>
            </div>
          </div>
          <div className='defaultInfoBox'>
            <RiMedal2Line />
            <div className='defaultInfoRight'>
              <div className='defaultInfoTitle'>은정님은 슈퍼호스트입니다.</div>
              <div className='defaultInfodetail'>
                에어비트앤바이트의 강화된 5단계 청소 절차를 준수하겠다고 동의한
                호스트입니다. 자세히 알아보기
              </div>
            </div>
          </div>
          <div className='defaultInfoBox'>
            <BsCalendar />
            <div className='defaultInfoRight'>
              <div className='defaultInfoTitle'>환불 정책</div>
              <div className='defaultInfodetail'>
                12월 13일 12:00 PM 전에 예약을 취소하면 총 숙박 요금의 50% 및
                서비스 수수료 전액이 환불됩니다. 자세히 보기
              </div>
            </div>
          </div>
          <div className='defaultInfoBox'>
            <BsBook />
            <div className='defaultInfoRight'>
              <div className='defaultInfoTitle'>숙소 이용규칙</div>
              <div className='defaultInfodetail'>
                유아 24개월 미만 동반에 적합하지 않은 숙소이며, 반려동물 동반이
                금지됩니다. 세부 정보 보기
              </div>
            </div>
          </div>
        </div>
        <div className='infoByHost'>
          ❋ 프로필을 클릭하시면 더 많은 방이 있어요 :) ❋ ❋ 2층짜리 단독주택을
          쉐어하는 형태로 운영하고 있습니다. 거실, 주방, 욕실은 공용공간입니다.
          숙소 설명을 꼭 읽어주세요. ❋ ❋ 조식 셀프, 별도 비용 없음❋ ※ 코로나19로
          인한 특별한 환불규정은 적용되지 않으니 에어비앤비 환불규정을 확인하신
          후 신중히 예약해주시기 바랍니다. 뮤지션이 운영하는 음악과 새소리,
          휴식이 어우러진 숙소 숙소 ☀︎ 2층짜리 단독주택을 쉐어하는 형태로
          운영하고 있습니다. 거실, 주방, 욕실은 공용공간입니다. 1층 : 2인실 2개,
          욕실 1, 거실 1, 주방 1 2층 : 2인실 1개, 1인실 1개, 욕실1, 거실1 (현재
          보고 계신 방은 1층입니다) ☀︎ 14세 미만 어린이는 받지 않습니다. ☀︎
          반려동물은 입실이 불가능 합니다. ☀︎ 고내포구 앞 조용한 동네 돌담길
          사이에 위치해 있어 제주도에서 편안한 휴식을 하고자 하시는 손님들께
          추천합니다. ︎☀︎ 해안길이 아름다운 올레길 15-B 코스(한림-고내)의 종점,
          16코스(고내-광령)의 시작점에 있습니다. ︎☀︎ 현재 활동하고 있는 뮤지션이
          호스트로 운영하여 음악과 휴식, 그리고 새소리가 어우러지도록 공간을
          가꾸었습니다. ☀︎ 잔디와 나무, 꽃이 있는 앞마당에서 간단한 야외파티도
          즐기실 수 있습니다. ☀︎ 도보5분 거리에 제주도의 명소인 LP카페 마틸다가
          있으니 밤에 운전 걱정 없이 술과 음악을 즐기실 수 있습니다. ☀︎ 1분 거리
          고내포구에서 낚시를 하실 수 있으며, 1분 거리에 편의점이 있습니다. ☀︎
          호스트와 함께 작업하는 여러 뮤지션들의 즉흥연주를 즐길 수 있는 행운을
          잡으실 수도 있습니다! 또한 호스트의 작업 공간이 있고, 거실에 피아노와
          기타앰프를 비치해두어 음악을 사랑하시고 악기 연주를 즐기시는 분들께는
          더할 나위 없이 행복한 공간이 될 것입니다. 게스트 이용 가능 공간/시설
          주방, 세탁실, 빨래건조대, 야외테이블, 테라스 피아노,기타,
          기타앰프,베이스,PA 스피커, 마이크 Wi-fi
        </div>
        <div className='bedInfo'>
          <div className='bedInfoTitle title'>침대/침구 유형</div>
          <div className='bedInfoBox'>
            <div className='bedIconBox'>
              <BiBed />
              <BiBed />
            </div>
            <div> 1번 침실</div>
            <div> 슈퍼싱글 2개</div>
          </div>
        </div>
        <div className='accomodations'>
          <div className='accomodationsTitle title'>편의시설</div>
          <div className='accomodationsBox'>
            <ImSpoonKnife />
            <span>주방</span>
          </div>
          <div className='accomodationsBox'>
            <AiOutlineWifi />
            <span>무선 인터넷</span>
          </div>
          <div className='accomodationsBox'>
            <MdFreeBreakfast />
            <span>아침식사</span>
          </div>
          <div className='accomodationsBox'>
            <RiTShirtAirLine />
            <span>헤어드라이어</span>
          </div>
          <div className='accomodationsBox'>
            <AiOutlineLaptop />
            <span>업무 전용 공간</span>
          </div>
          <div className='accomodationBtn'>편의시설 27개 모두 보기</div>
        </div>
      </section>
      <section className='propertyCalender'>
        <img src='images/propertyCalender.png' alt='calender' />
      </section>
      <section className='propertyReview'>
        <div className='propertyRate'>
          <div className='averageRate'>★ 4.86점 (후기 85개)</div>
          <img src='images/propertyGraph.png' alt='property graph' />
        </div>
        <ul className='reviewList'>
          <li className='review'>
            <div className='reviewerBox'>
              <div className='reviewerProfile'>
                <img src='images/defaultProfile.png' alt='reviewer profile' />
              </div>
              <div className='reviewerName'>이디</div>
              <div className='reviewDate'>2020년 11월</div>
            </div>
            <div className='reviewText'>
              편하게 잘 쉬었습니다. 멋진 숙소였어요! 전기장판도 있어서
              춥지않았습니다.
            </div>
          </li>
          <li className='review'>
            <div className='reviewerBox'>
              <div className='reviewerProfile'>
                <img src='images/defaultProfile.png' alt='reviewer profile' />
              </div>
              <div className='reviewerName'>프린스기용</div>
              <div className='reviewDate'>2020년 10월</div>
            </div>
            <div className='reviewText'>
              1박 밖에 못하고 온게 아쉬울 만큼 좋았어요! 1. 뚜벅이 여행했는데
              위치가 매우 만족스러웠습니다. 주변에 맛집이 많고 한담 해수욕장,
              곽지 해수욕장 등 가까워요. 2. 쉐어형태이긴하지만 너무 멋지게
              꾸며진 공간에 합리적인 가격에 머물 수 있다는 점이 좋았어요. 머무른
              방, 거실, 마당 등 공간마다 호스트 분의 새심하고 센스있는 손길이
              묻어있어요. 3. 호스트 분이 친절하시고 응답이 빠른 편이에요. 조금
              일찍 도착했는데 마침 방이 준비되어 있었고, 체크아웃 후 짐 보관도
              해주셨어요. 4. 화장실 인테리어는 다른 부분에 비해 미흡해요.
              샤워공간이 애매하긴한데 막상 사용해보니 크게 불편하진 않았어요.
              세면대 수도에서 샤워기로 전환하기 때문에 까먹으면 대참사가
              일어나니 조심해야합니당 ㅎㅎ
            </div>
          </li>
          <li className='review'>
            <div className='reviewerBox'>
              <div className='reviewerProfile'>
                <img src='images/defaultProfile.png' alt='reviewer profile' />
              </div>
              <div className='reviewerName'>영주</div>
              <div className='reviewDate'>2020년 9월</div>
            </div>
            <div className='reviewText'>
              이 가격에 이런 숙소 또 없습니다 구옥을 좋아하지 않는데도 포근함이
              깃든 정든 공간이었어요. 호스트님께서 엄청 친절하시고 침대도
              폭신해서 하루도 잠 설친 적이 없습니다. 연주소리 들으면서 일어난
              아침엔 햇빛이 방 안에 예쁘게 들어와 기억에 오래 남을
              장면이었습니다. 숙소 주변에 식당과 펍이 있고 해안도 멀지 않아요.
              완벽한 시설이라고 말할 수는 없어도 자주 에어비앤비를 이용했던
              숙박객으로서 가장 좋았던 숙소입니자.
            </div>
          </li>
        </ul>
        <button className='reviewMoreBtn'>후기 85개 모두 보기</button>
      </section>
      <section className='propertyMap'>
        <img src='images/propertyMap.png' alt='property Map' />
      </section>
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
                후기 443개 <HiShieldCheck /> 본인 인증 완료 <RiMedal2Line />{' '}
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
        </div>
      </section>
    </div>
  );
};

export default Property;
