import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { AiTwotoneHome, AiFillStar } from 'react-icons/ai';
import jsxToString from 'jsx-to-string';

const PlaceListMap = ({ placeList, hoverLocation }) => {
  const [myPosition, setMyPosition] = useState(0);
  const history = useHistory();

  useEffect(() => {}, [hoverLocation]);

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

    let clickedOverlay = null;
    kakao.maps.load(() => {
      let mapContainer = document.getElementById('setMap');
      let mapOption = {
        center: new kakao.maps.LatLng(33.319849, 126.578248),
        level: 10,
      };

      const map = new kakao.maps.Map(mapContainer, mapOption);

      placeList &&
        placeList.forEach((el) => {
          const content =
            '<div class="overlay" onclick="closeOverlay()" >' +
            '<img class="overlayImage" src=' +
            el.propertyImages[0] +
            '></img>' +
            '<div class="overLayForm"><div class="overlayContent">' +
            '<div class="dibs"><img class="overLayIcon" src="https://icon-icons.com/icons2/1324/PNG/256/star_86960.png" ></img>' +
            '<span>4.64</span></div></div>' +
            '<div class="overLayContent"><h1>' +
            el.hostName +
            '&nbsp&nbsp' +
            el.cateoryName +
            '</h1><h3>' +
            el.propertyName +
            '&nbsp&nbsp' +
            el.facilities[0] +
            '...</h3></div>' +
            '</div></div>';

          var marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(el.latitude, el.longitude),
          });

          var overlay = new kakao.maps.CustomOverlay({
            content: content,
            position: marker.getPosition(),
            removable: true,
          });

          const makeOverListener = (map, marker, overlay) => {
            if (clickedOverlay !== clickedOverlay) {
              clickedOverlay.setMap(null);
            }

            overlay.setMap(map);
            clickedOverlay = overlay;
          };

          kakao.maps.event.addListener(map, 'click', () => clickedOverlay && clickedOverlay.setMap(null));
          kakao.maps.event.addListener(marker, 'click', () => makeOverListener(map, marker, overlay));
        });

      map.relayout();
    });
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
  width: 100%;
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

  .overlay {
    position: relative;
    top: 0;
    left: 0;
    width: 250px;
    height: auto;
    background-color: rgb(255, 255, 255);
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.28) 0px 8px 28px;
    color: rgb(34, 34, 34);

    .overlayImage {
      position: relative;
      width: 100%;
      height: auto;
      top: -5px;
      border-radius: 15px;
    }

    .overLayForm {
      width: 100%;
      padding: 0 0 10px 10px;

      .overlayContent {
        position: relative;
        top: 0;
        bottom: 5px;
        padding-bottom: 10px;

        span {
          position: relative;
          top: 2px;
        }

        .dibs {
          display: flex;
          align-items: center;

          .overLayIcon {
            position: relative;
            width: 20px;
            height: 20px;
            z-index: 100;
            margin-right: 5px;
          }
        }
      }
    }
  }
`;
