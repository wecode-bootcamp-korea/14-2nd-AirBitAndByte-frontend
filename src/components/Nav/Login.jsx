import React, { useState } from 'react';
import axios from 'axios';
import Fade from 'react-reveal/Fade';
import styled from 'styled-components';
import { LOGIN_API } from '../../config';
import { MdClear } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { RiKakaoTalkFill } from 'react-icons/ri';

const Login = ({ onGoogleLogin, openLoginModal, closeModalAll }) => {
  const [userLoginInfo, setUserLoginInfo] = useState({});
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handleInput = (e) => {
    const { value, name } = e.target;
    setUserLoginInfo({ ...userLoginInfo, [name]: value });
  };

  const axiosLogin = () => {
    axios
      .post(LOGIN_API, {
        email: userLoginInfo.email,
        password: userLoginInfo.password,
      })
      .then((res) => {
        if (res.data.result) {
          localStorage.setItem('token', res.data.result.accessToken);
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };

  const showPassword = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <LoginModal>
      <Fade bottom>
        <ModalContainer>
          <div className='modalHeader'>
            <i onClick={closeModalAll}>
              <MdClear size={25} />
            </i>
            <p>로그인</p>
          </div>
          <button id='Google' onClick={onGoogleLogin}>
            <FcGoogle margin='10px' />
            구글 계정으로 로그인
          </button>
          <button>
            <RiKakaoTalkFill />
            카카오 계정으로 로그인
          </button>
          <span>또는</span>
          <input
            type='text'
            className='email'
            placeholder='이메일 주소'
            onChange={handleInput}
            name='email'
            autoComplete='off'
          />
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            className='password'
            placeholder='비밀번호'
            onChange={handleInput}
            name='password'
            autoComplete='off'
          />
          <p className='passwordBtn' onClick={showPassword}>
            비밀번호 보기
          </p>
          <p className='otherWays'>
            전화번호로 로그인 ・ 비밀번호를 잊으셨나요?
          </p>
          <button onClick={axiosLogin}>로그인</button>
          <div className='modalFooter'>
            <span>에어비트앤바이트 계정이 없으세요?</span>{' '}
            <span onClick={openLoginModal}>회원가입</span>
          </div>
        </ModalContainer>
      </Fade>
    </LoginModal>
  );
};

export default Login;

const LoginModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
    padding-top: 5ps;
    margin-bottom: -5px;
  }
`;

const ModalContainer = styled.div`
  ${({ theme }) => {
      return theme.flexSet({
        alignItems: 'center',
        flexDirection: 'column'
      });
    }};
  width: 570px;
  background-color: white;
  padding: 0 20px;
  border-radius: 15px;
  font-family: roboto;
  font-size: 15px;
  z-index: 100;

  .modalHeader {
    ${({ theme }) => {
      return theme.flexSet({
        flexDirection: 'row'
      });
    }};
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
  button {
    width: 520px;
    height: 48px;
    margin-bottom: 10px;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 600;

    &:nth-child(2) {
      border: 1px solid ${({ theme }) => theme.black};
    }
    &:nth-child(3) {
      background-color: #f3d631;
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
  .passwordBtn {
    width: 100%;
    margin: 5px 0 20px 0;
    text-align: right;
    color: #2e7d81;
  }

  .otherWays {
    width: 100%;
    margin-bottom: 20px;
    text-align: left;
    color: #2e7d81;
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
`;
