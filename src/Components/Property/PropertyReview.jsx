import React from 'react';

const PropertyReview = (props) => {return (
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

)};

export default PropertyReview;