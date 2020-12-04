import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { SIGNUP_API } from '../../config';
import { flexColumnCenter, flexRow, theme } from '../../styles/theme';
import { MdClear } from 'react-icons/md';
import Fade from 'react-reveal/Fade';

const MakeOptions = ({ num }) => {
  if (num > 2000) {
    const res = [];
    for (let i = num; i > num - 100; i--) {
      res.push(i);
    }
    return res.map((i) => (
      <option key={i} value={i}>
        {i}
      </option>
    ));
  } else {
    return [...Array(num)].map((i, idx) => (
      <option key={idx + 1} value={idx + 1}>
        {idx + 1}
      </option>
    ));
  }
};

const SignupEmail = ({ openEmailSignup, openLoginModal, closeModalAll }) => {
  const [userSignupInfo, setUserSignupInfo] = useState([]);

  const handleInput = (e) => {
    const { value, name } = e.target;
    setUserSignupInfo({ ...userSignupInfo, [name]: value });
  };

  const axiosSignup = () => {
    axios
      .post(SIGNUP_API, {
        ...userSignupInfo,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  return (
    <SignupEmailModal>
      <Fade bottom>
        <div className='modalContainer'>
          <div className='modalHeader'>
            <i onClick={closeModalAll}>
              <MdClear size={25} />
            </i>
            <p>회원 가입</p>
          </div>
          <div className='otherWays' onClick={openEmailSignup}>
            <span>카카오</span> 또는 <span>구글</span>로 회원 가입 하세요.
          </div>
          <input
            type='text'
            className='email'
            placeholder='이메일 주소'
            onChange={handleInput}
            name='email'
            autoComplete='off'
          />
          <input
            type='text'
            className='givenName'
            placeholder='이름(예: 은정)'
            onChange={handleInput}
            name='givenName'
            autoComplete='off'
          />
          <input
            type='text'
            className='familyName'
            placeholder='성(예: 고)'
            onChange={handleInput}
            name='familyName'
            autoComplete='off'
          />
          <input
            type='password'
            className='password'
            placeholder='비밀번호 설정하기'
            onChange={handleInput}
            name='password'
            autoComplete='off'
          />
          <div className='birthdayBox'>
            <div className='birthdaySelectTitle'>생일</div>
            <p>
              만 18세 이상의 성인만 회원으로 가입할 수 있습니다.
              <br /> 생일은 다른 에어비트앤바이트 이용자에게 공개되지 않습니다.
            </p>
            <select name='birthdayMonth' onChange={handleInput}>
              <option value=''>월</option>
              <MakeOptions num={12} />
            </select>
            <select name='birthdayDate' onChange={handleInput}>
              <option value=''>일</option>
              <MakeOptions num={31} />
            </select>
            <select name='birthdayYear' onChange={handleInput}>
              <option value=''>년</option>
              <MakeOptions num={2020} />
            </select>
            <p>
              에어비앤비의 회원 전용 할인, 추천 여행 정보, 프로모션 및 정책
              변경사항을 이메일로 보내드립니다. 계정 관리의 환경설정 또는
              프로모션 알림에서 언제든지 메시지 수신을 거부할 수 있습니다.
            </p>
          </div>

          <button id='email' onClick={axiosSignup}>
            가입하기
          </button>
          <div className='modalFooter'>
            <span>이미 에어비트앤바이트 계정이 있나요?</span>{' '}
            <span onClick={openLoginModal}>로그인</span>
          </div>
        </div>
      </Fade>
    </SignupEmailModal>
  );
};

export default SignupEmail;

const SignupEmailModal = styled.div`
  display: flex;
  justify-content:center;
  align-items:center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #00000080;
  z-index: 10000;

  svg {
    margin-right: 12px;
    width: 20px;
    height: 20px;

    path {
      margin: 0;
      padding: 0;
    }
  }
  .modalContainer {
    ${flexColumnCenter}
    width: 570px;
    background-color: white;
    padding: 0 20px;
    border-radius: 15px;
    font-family: roboto;
    font-size: 15px;
    z-index: 100;

    .modalHeader {
      ${flexRow}
      align-items: center;
      position: relative;
      width: 568px;
      height: 64px;
      margin-bottom: 25px;
      font-size: 17px;
      font-weight: 600;
      border-bottom: 1px solid #e4e4e4;

      i {
        position: absolute;
        top: 20px;
        left: 20px;
      }
    }
    .otherWays {
      width: 568px;
      height: 30px;
      font-weight: 400;
      text-align: center;

      span {
        color: #2e7d81;
        font-weight: 600;
      }
    }

    input {
      width: 490px;
      height: 48px;
      padding: 0 15px;
      margin-bottom: 10px;
      border: 1px solid #e4e4e4;
      border-radius: 5px;
      font-size: 16px;
    }

    select {
      width: 30%;
      height: 48px;
      margin: 0 15px 15px 0;
      padding: 0 10px;
      border: 1px solid #e4e4e4;
      border-radius: 5px;
      font-size: 16px;
    }

    .birthdayBox {
      width: 520px;

      .birthdaySelectTitle {
        height: 50px;
        font-size: 16px;
        font-weight: 600;
        line-height: 50px;
      }
      p {
        font-size: 14px;
        font-weight: 400;
        margin: 10px 0 20px 0;
        line-height: 140%;
      }
    }

    button {
      width: 520px;
      height: 48px;
      margin-bottom: 10px;
      border-radius: 5px;
      color: white;
      background-color: ${theme.pink};
      font-size: 16px;
      font-weight: 600;
    }
    span {
      margin: 10px 0 20px 0;
    }
    .modalFooter {
      display: inline-block;
      width: 100%;
      height: 64px;
      line-height: 64px;
      border-top: 1px solid #e4e4e4;

      span {
        margin-right: 10px;
        &:nth-child(2) {
          color: #2e7d81;
        }
      }
    }
  }
`;
