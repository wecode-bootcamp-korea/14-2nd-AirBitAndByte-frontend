import React, { useState } from 'react';
import axios from 'axios';
import Fade from 'react-reveal/Fade';
import styled from 'styled-components';
import SignupEmail from './SignupEmail';
import Login from './Login';
import { theme } from '../../styles/theme';
import { SOCIAL_API } from '../../config';
import { MdClear } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { GoMail } from 'react-icons/go';

const Signup = ({ authService }) => {
  const [isEmailSignup, setEmailSignup] = useState(false);
  const [isLoginModalOn, setLoginModal] = useState(false);
  const [isSignupModalOn, setSignupModalOn] = useState(true);

  const closeModalAll = () => {
    setSignupModalOn(false);
    setEmailSignup(false);
    setLoginModal(false);
  };

  const openEmailSignup = () => {
    setEmailSignup(!isEmailSignup);
  };

  const openLoginModal = () => {
    setLoginModal(!isLoginModalOn);
    setEmailSignup(false);
  };

  const sendGoogleUser = (token) => {
    axios({
      method: 'post',
      url: SOCIAL_API,
      headers: {
        token,
        client: process.env.REACT_APP_GOOGLE_OAUTH_API_KEY,
      },
    })
      .then((res) => {
        if (res.data.result) {
          localStorage.setItem('token', res.data.result.accessToken);
        }
      })
      .catch((err) => console.log(err));
  };

  const onGoogleLogin = (event) => {
    authService //
      .login(event.currentTarget.id)
      .then((res) => sendGoogleUser(res.credential.idToken));
  };

  return (
    <>
      <SignupModal visible={isSignupModalOn}>
        <Fade bottom>
          <div className='modalContainer'>
            <div className='modalHeader'>
              <i onClick={closeModalAll}>
                <MdClear size={25} />
              </i>
              <p>회원 가입</p>
            </div>
            <button id='Google' onClick={onGoogleLogin}>
              <FcGoogle margin='10px' />
              구글 계정으로 회원 가입
            </button>
            <button>
              <RiKakaoTalkFill />
              카카오 계정으로 회원 가입
            </button>
            <span>또는</span>
            <button id='email' onClick={openEmailSignup}>
              <GoMail />
              이메일로 회원 가입
            </button>
            <div className='modalFooter'>
              <span>이미 에어비트앤바이트 계정이 있나요?</span>
              <span onClick={openLoginModal}>로그인</span>
            </div>
          </div>
        </Fade>
      </SignupModal>
      {isEmailSignup && (
        <SignupEmail
          openEmailSignup={openEmailSignup}
          openLoginModal={openLoginModal}
          closeModalAll={closeModalAll}
        />
      )}
      {isLoginModalOn && (
        <Login
          sendGoogleUser={sendGoogleUser}
          onGoogleLogin={onGoogleLogin}
          openLoginModal={openLoginModal}
          closeModalAll={closeModalAll}
        />
      )}
    </>
  );
};

export default Signup;

const SignupModal = styled.div`
  display: ${(props) => (props.visible ? 'flex' : 'none')};
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

  .modalContainer {
    ${({ theme }) => {
      return theme.flexSet({
        justifyContent: 'center',
        flexDirection: 'column',
      });
    }};
    width: 570px;
    height: 370px;
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
        border: 1px solid ${theme.black};
      }
      &:nth-child(3) {
        background-color: #f3d631;
      }
      &:nth-child(5) {
        color: white;
        background-color: ${theme.pink};
      }
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
