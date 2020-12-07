import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const PlaceListMap = ({ placeList }) => {
  const [myPosition, setMyPosition] = useState(0);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=0770b1cc9392dd3dccaecc81e3d9734e&autoload=false';
    document.head.appendChild(script);
    script.onload = () => {
      getKakaoData();
    };
  }, []);

  useEffect(() => {
    getKakaoData();
  }, [placeList]);

  const getKakaoData = () => {
    const { kakao } = window;

    kakao.maps.load(() => {
      let mapContainer = document.getElementById('setMap');
      let mapOption = {
        center: new kakao.maps.LatLng(33.319849, 126.578248),
        level: 10,
      };

      var map = new kakao.maps.Map(mapContainer, mapOption);
      placeList &&
        placeList.forEach((el) => {
          var marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(el.latitude, el.longitude),
          });

          var infowindow = new kakao.maps.InfoWindow({
            position: new kakao.maps.LatLng(el.latitude, el.longitude),
            content: `${`<div class="intoWindow" >
              <img src="https://blog.kakaocdn.net/dn/0mySg/btqCUccOGVk/nQ68nZiNKoIEGNJkooELF1/img.jpg"/>
              <div/>`}`,
          });
          //추후 연동 예정
          // kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
          // kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
        });
      map.relayout();
    });

    const makeOverListener = (map, marker, infowindow) => {
      return () => {
        infowindow.open(map, marker);
      };
    };

    const makeOutListener = (infowindow) => {
      return () => {
        infowindow.close();
      };
    };
  };

  return (
    <PlaceListMapComponent>
      <div className='kakaoMap' id='setMap'></div>
    </PlaceListMapComponent>
  );
};
export default PlaceListMap;

const PlaceListMapComponent = styled.div`
  position: sticky;
  top: 0;
  width: 75%;
  height: 100vh;
  padding-top: 90px;

  .kakaoMap {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .intoWindow {
    position: absolute;
    top: -200px;
    border-radius: 8px !important;
    box-shadow: rgba(0, 0, 0, 0.28) 0px 8px 28px !important;
    z-index: 100;

    img {
      width: 300px;
      height: 200px;
    }
  }
`;
