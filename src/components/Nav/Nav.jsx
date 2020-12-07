import React, { useState, useLayoutEffect, useEffect } from 'react';
import styled, { css } from 'styled-components';
import NavSearchInfo from './NavSearchInfo.jsx';
import { BiSearch } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';
import {
  theme,
  flexSet,
  flexCenter,
  flexColumnCenter,
} from '../../styles/theme';
import Signup from './Signup.jsx';

const Nav = ({ authService }) => {
  const [scrollYdata, setScrollYdata] = useState(1);
  const [searchType, setsearchType] = useState('rooms');
  const [foldNav, setfoldNav] = useState(false);
  const [isSignupModalOn, setSignupModalOn] = useState(false);

  const openSignup = () => {
    setSignupModalOn(!isSignupModalOn);
  };

  useLayoutEffect(() => {
    const getPostion = () => {
      // window.scrollY ? setScrollYdata(window.scrollY) : setScrollYdata(0);
      setfoldNav(false);
    };
    window.addEventListener('scroll', getPostion);

    return () => window.removeEventListener('scroll', getPostion);
  }, [scrollYdata]);

  const changeSearchType = (e) => setsearchType(e.target.dataset.type);
  const toggleFoldNav = () => setfoldNav(!foldNav);

  return (
    <>
      <NavComponent scrollYdata={scrollYdata} foldNav={foldNav}>
        <div className='bitAandByteIcon'>
          <img
            className='logoImg'
            src='images/airBnBlogo.svg'
            alt='로고 이미지'
          />
        </div>
        <div className='searchForm'>
          <SearcBox
            scrollYdata={scrollYdata}
            foldNav={foldNav}
            onClick={() => toggleFoldNav()}>
            <label>검색 시작하기</label>
            <SearchIcon isSize={35}>
              <BiSearch className='biSearch' />
            </SearchIcon>
          </SearcBox>
          <NavSearchVar scrollYdata={scrollYdata} foldNav={foldNav}>
            <NavSearchTheme foldNav={foldNav}>
              <span
                className={searchType === 'rooms' ? 'setType' : ''}
                data-type='rooms'
                onClick={changeSearchType}>
                숙소
              </span>
              <span
                className={searchType === 'experience' ? 'setType' : ''}
                data-type='experience'
                onClick={changeSearchType}>
                체험
              </span>
            </NavSearchTheme>
            <NavSearchInfo type={searchType} />
          </NavSearchVar>
        </div>
        <NavUserInfo onClick={openSignup}>
          <GiHamburgerMenu className='hameburgerIcon' />
          <div className='ImageBorder'>
            <img src='images/defaultProfile.png' alt='프로파일이미지' />
          </div>
        </NavUserInfo>
      </NavComponent>
      {foldNav && <SetFoldNavBackground />}
      {isSignupModalOn && (
        <Signup
          authService={authService}
          isSignupModalOn={isSignupModalOn}
          setSignupModalOn={setSignupModalOn}
        />
      )}
    </>
  );
};
export default Nav;

const NavComponent = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: fixed;
  width: 100%;
  height: ${({ scrollYdata, foldNav }) =>
    !scrollYdata || !foldNav ? '90px' : '150px'};
  top: 0;
  padding: 20px 60px;
  font-size: 21px;
  background-color: ${({ scrollYdata }) => (!scrollYdata ? 'none' : 'white')};
  z-index: 100;
  transition: 0.25s;
  ${({ scrollYdata }) =>
    scrollYdata &&
    css`
      box-shadow: 0 -1px 5px 1px rgba(0, 0, 0, 0.3);
    `};

  .bitAandByteIcon {
    position: relative;
    cursor: pointer;

    .logoImg {
      position: relative;
      top: -5px;
      color: white;
    }
  }

  .searchForm {
    ${flexColumnCenter}
    position : relative;
  }
`;

const NavSearchVar = styled.div`
  position: relative;
  top: ${({ foldNav }) => (foldNav ? 0 : '-40px')};
  transition: all 0.2s;
  transform: ${({ scrollYdata, foldNav }) =>
    !scrollYdata || foldNav
      ? `translate(0, 0)`
      : `translate(0, -100px) scaleX( 0.5 )`};
  opacity: ${({ scrollYdata, foldNav }) => (!scrollYdata || foldNav ? 1 : 0)};

  .modal {
    position: absolute;
    background-color: red;
    width: 100%;
    height: 100px;
  }
`;

const NavSearchTheme = styled.div`
  ${flexSet('center', 'center')}
  margin-bottom:20px;

  span {
    position: relative;
    margin: 0 20px;
    color: ${({ foldNav }) => (foldNav ? theme.black : 'white')};
    font-size: 17px;
    cursor: pointer;

    &::after {
      content: '';
      width: 0%;
      left: 0%;
      height: 1px;
      display: block;
      position: absolute;
      margin-top: 3px;
      border-bottom: 2px solid
        ${({ foldNav }) => (foldNav ? theme.black : 'white')};
      transition: all 0.3s ease;
    }

    &:hover::after {
      content: '';
      width: 100%;
      transition: all 0.3s ease;
    }
  }

  .setType::after {
    content: '';
    width: 100%;
  }
`;

const SearcBox = styled.div`
  display: ${({ foldNav }) => (foldNav ? 'none' : 'flex')};
  justify-content: space-between;
  align-items: center;
  width: 300px;
  height: 50px;
  border-radius: 50px;
  padding: 5px;
  background-color: white;
  border: 1px solid #dddddd;
  opacity: ${({ scrollYdata }) => (!scrollYdata ? 0 : 1)};
  transition: 0.1s;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.18);
  }

  label {
    padding: 10px 10px 10px 20px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: bold;
  }

  .biSearch {
    color: white;
  }
`;

const SearchIcon = styled.div`
  ${flexCenter}
  width : ${(props) => `${props.isSize}px`};
  height: ${(props) => `${props.isSize}px`};
  border-radius: 50%;
  background-color: ${theme.pink};
`;

const NavUserInfo = styled.div`
  ${flexCenter};
  height: 50px;
  padding: 0 10px;
  border: 1px solid #dddddd;
  border-radius: 50px;
  background-color: white;
  transition: 0.1s;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.18);
  }

  .hameburgerIcon {
    color: ${theme.black};
    height: 100%;
    margin-right: 10px;
  }

  .ImageBorder {
    ${flexCenter};
    height: 100%;

    img {
      width: 30px;
      height: 30px;
    }
  }
`;

const SetFoldNavBackground = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.25);
  inset: 0px;
  z-index: 99;
`;
