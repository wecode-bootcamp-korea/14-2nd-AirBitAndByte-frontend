import React from 'react';
import styled from 'styled-components';
import { flexColumn, flexRow } from '../../styles/theme';

const RecommendedPlaces = (props) => {
  return (
    <RcmndPlaceComponents>
      <RcmndPlace>
        {PLACEDATA.map((place, index) => (
          <div className='placeListForm' key={index}>
            <img src={`images/mainImage/${place.place}.jpg`} alt='추천 주변거리 이미지' />
            <div>
              <span className='placeName'>{place.content}</span>
              <span className='placeAround'>{place.content} 주변거리</span>
            </div>
          </div>
        ))}
      </RcmndPlace>
      <PropertyType>
        <h1>어디에서나, 여행은 살아보는거야!</h1>
        <div>
          {PROPERTYTYPE.map((hoseType, index) => (
            <div className='propertyTypeHouse' key={index}>
              <img src={`images/mainImage/${hoseType.place}.jpg`} alt='집 종류 이미지' />
              <span>{hoseType.content}</span>
            </div>
          ))}
        </div>
      </PropertyType>
      <OpenHost>
        <h1>수백만 명에 이르는 에어비앤비 호스트 커뮤니티의 일원이 되어보세요.</h1>
        <div>
          {OPENCOMMUNITY.map((communityType, index) => (
            <div className='community' key={index}>
              <img src={`images/mainImage/${communityType.place}.jpg`} alt='집 종류 이미지' />
              <span>{communityType.content}</span>
            </div>
          ))}
        </div>
      </OpenHost>
    </RcmndPlaceComponents>
  );
};
export default RecommendedPlaces;

const RcmndPlaceComponents = styled.div`
  ${flexColumn}
  align-items : center;
  width: 100%;
`;

const RcmndPlace = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 30px 80px;

  .placeListForm {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 22%;
    margin: 10px;

    img {
      width: 70px;
      height: 70px;
      border-radius: 10px;
    }

    div {
      ${flexColumn}
      padding: 10px;

      .placeName {
        margin: 5px 0;
        font-weight: bold;
      }

      .placeAround {
        margin: 5px 0;
        font-weight: 400;
      }
    }
  }
`;

const PropertyType = styled.div`
  ${flexColumn}
  padding: 30px 80px;

  h1 {
    font-size: 30px;
    font-weight: bold;
    padding: 0 0 30px 10px;
    margin: 10px 0;
  }

  div {
    display: flex;
    justify-content: space-between;

    .propertyTypeHouse {
      ${flexColumn}
      width: 23%;
      margin: 0 10px;
      cursor: pointer;

      img {
        width: 100%;
        border-radius: 20px;
        transition: 0.3s;

        &:hover {
          transition: 0.3s;
          transform: scale(1.03);
        }
      }

      span {
        margin: 10px 0;
        font-size: 17px;
      }
    }
  }
`;

const OpenHost = styled.div`
  ${flexColumn}
  padding: 30px 80px;

  h1 {
    font-size: 30px;
    font-weight: bold;
    padding: 0 0 30px 10px;
    margin: 10px 0;
  }

  div {
    ${flexRow}
    padding: 10px;

    .community {
      ${flexColumn}
      width: 30%;
      margin: 0 10px;
      cursor: pointer;

      img {
        width: 100%;
        border-radius: 20px;
        transition: 0.3s;

        &:hover {
          transition: 0.3s;
          transform: scale(1.03);
        }
      }

      span {
        margin: 10px;
        font-size: 15px;
      }
    }
  }
`;

const PLACEDATA = [
  {
    place: 'seoul',
    content: '서울',
    latitude: 0.0,
    hardness: 0.0,
  },
  {
    place: 'daejeon',

    content: '대전',
    latitude: 0.0,
    hardness: 0.0,
  },
  {
    place: 'daegu',
    content: '대구',
    latitude: 0.0,
    hardness: 0.0,
  },
  {
    place: 'busan',
    content: '부산',
    latitude: 0.0,
    hardness: 0.0,
  },
  {
    place: 'gwangju',
    content: '광주',
    latitude: 0.0,
    hardness: 0.0,
  },
  {
    place: 'jeju',
    content: '제주',
    latitude: 0.0,
    hardness: 0.0,
  },
  {
    place: 'yeosu',
    content: '여수',
    latitude: 0.0,
    hardness: 0.0,
  },
  {
    place: 'suwon',
    content: '수원',
    latitude: 0.0,
    hardness: 0.0,
  },
];

const PROPERTYTYPE = [
  {
    place: 'allType',
    content: '집 전체',
  },
  {
    place: 'woodHouse',
    content: '통나무집 및 전원주택',
  },
  {
    place: 'specialHouse',
    content: '독특한 공간',
  },
  {
    place: 'animalHouse',
    content: '반려동물 환영',
  },
];

const OPENCOMMUNITY = [
  {
    place: 'nomad',
    content: '나만의 장소를 알리는 커뮤니티',
  },
  {
    place: 'comfortable',
    content: '아늑한 곳을 알리는 커뮤니티',
  },
  {
    place: 'happy',
    content: '즐거운 커뮤니티',
  },
  {
    place: 'tourism',
    content: '자랑할 수 있는 커뮤니티',
  },
];
