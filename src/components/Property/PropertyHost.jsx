import React from 'react';
import styled from 'styled-components';
import { theme, flexCenter } from '../../styles/theme';
import { HiShieldCheck } from 'react-icons/hi';
import { MdStar } from 'react-icons/md';
import { FaMedal } from 'react-icons/fa';

const PropertyHost = ({ property }) => {
  return (
    <HostInfo>
      <div className='flexBox'>
        <div className='hostProfile'>
          <img
            src='/images/defaultProfile.png'
            alt='host profile'
            className='hostProfile'
          />
          {property.isSupered ? (
            <FaMedal color={theme.pink} style={{ marginRight: 7 }} />
          ) : (
            ''
          )}
        </div>
        <div>
          <div className='hostName'>호스트: {property.hostName}님</div>
          <div className='hostSignUpDate'>회원가입일: 2019년 8월</div>
        </div>
      </div>
      <div className='hostContentBox'>
        <div className='hostContentBoxLeft'>
          <div className='hostSummary'>
            <div className='summaryBox'>
              <span>
                <MdStar color={theme.pink} size={20} />
                후기 {Math.floor(Math.random() * 500) + 1}개
              </span>
              <span>
                <HiShieldCheck color={theme.pink} size={20} /> 본인 인증 완료
              </span>
              {property.isSupered ? (
                <span>
                  <FaMedal color={theme.pink} size={20} /> 슈퍼호스트
                </span>
              ) : (
                ''
              )}
            </div>
            <p className='hostIntro'>
              안녕하세요 호스트 {property.hostName}입니다. 어린시절부터 쭉
              살아왔던 애월읍 고내리에 있는 저희 집을 여러분들과 함께 공유하고자
              합니다 :-) 여러분들과의 소통과 음악적 교류를 기대하며 기다리고
              있겠습니다 :-) 감사합니다 !
            </p>
            {property.isSupered ? (
              <p className='superhost'>
                {property.hostName}님은 슈퍼호스트입니다.
              </p>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className='hostContentBoxRight'>
          <p>응답률: 100%</p>
          <p>응답 시간: 1시간 이내</p>
          <div className='hostPhoneBtn'>호스트에게 연락하기</div>
          <div className='savePaymentInfo'>
            <i>
              <HiShieldCheck color={theme.pink} size={40} />
            </i>
            안전한 결제를 위해 에어비트앤바이트 웹사이트나 앱 외부에서
            송금하거나 대화를 나누지 마세요.
          </div>
        </div>
      </div>
    </HostInfo>
  );
};

export default PropertyHost;

const HostInfo = styled.div`
  max-width: 1130px;
  width: 100%;
  padding: 50px 0;
  line-height: 1.3;

  .flexBox {
    display: flex;
    height: 64px;
    margin-bottom: 25px;

    .hostProfile {
      position: relative;
      width: 64px;
      height: 64px;
      margin-right: 15px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
      svg {
        position: absolute;
        top: 5px;
        right: -5px;
        background-color: white;
        border: 1px solid #707070;
        border-radius: 50%;
      }
    }
    .hostName {
      font-size: 22px;
      font-weight: 500;
    }
    .hostSignUpDate {
      margin-top: 10px;
      font-size: 14px;
      color: #757575;
    }
  }
  .hostContentBox {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 80px;

    .hostContentBoxLeft {
      max-width: 476px;
      .hostSummary {
        .summaryBox {
          display: flex;
          margin-bottom: 30px;
          span {
            margin-right: 30px;
            svg {
              padding-top: 5px;
              margin-bottom: -3px;
            }
          }
        }
        .hostIntro {
          margin-bottom: 30px;
          line-height: 1.3;
        }
        .superhost {
          font-weight: 500;
          margin-bottom: 10px;
        }
      }
    }
    .hostContentBoxRight {
      max-width: 476px;
      p {
        margin-bottom: 7px;
        line-height: 1.3;
      }
      .hostPhoneBtn {
        ${({ theme }) => {
          return theme.flexSet({
            justifyContent: 'center',
            alignItems: 'center',
          });
        }};

        width: 175px;
        height: 48px;
        margin: 30px 0 20px 0;
        font-weight: 500;
        font-size: 16px;
        border: 1px solid ${theme.black};
        border-radius: 5px;
        background-color: white;
      }
      .savePaymentInfo {
        display: flex;
        font-size: 12px;
        width: 300px;
        i {
          margin-right: 10px;
          margin-top: -10px;
        }
      }
    }
  }
`;
