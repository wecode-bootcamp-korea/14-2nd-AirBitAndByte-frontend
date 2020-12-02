import React, { useState } from 'react';
import styled from 'styled-components';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { IoIosRemoveCircleOutline, IoIosAddCircleOutline } from 'react-icons/io';
import { BsToggleOff, BsToggleOn } from 'react-icons/bs';
import { flexColumn } from '../../styles/theme';

const NavSearchModal = ({ type }) => {
  const [ageGroup, setAgeGroup] = useState({ adult: 0, child: 0, baby: 0, haveAnimal: false });

  const setCount = (e, type) => {
    const { dataset } = e.target;

    ageGroup[type] =
      type !== 'haveAnimal'
        ? dataset.type === '+'
          ? ageGroup[type] + 1
          : ageGroup[type]
          ? ageGroup[type] - 1
          : 0
        : !ageGroup[type];

    setAgeGroup({ ...ageGroup, [type]: ageGroup[type] });
  };

  return (
    <>
      <SearchLocation type={type}>
        <FaMapMarkedAlt className='mapIcon' />
        가까운 여행지 둘러보기
      </SearchLocation>
      <SearchCheckDate type={type}>추후 넣을 예정</SearchCheckDate>
      <SearchPersonnel type={type}>
        {AGE_GROUP.map((group, index) => (
          <div className='ageGroup' key={index}>
            <div className='viewContentForm'>
              <span className='header'>{group.header}</span>
              <span className='content'>{group.content}</span>
            </div>
            <div className='setValueForm'>
              <IoIosRemoveCircleOutline
                className={`${!ageGroup[group.type] && 'disabled'}`}
                data-type='-'
                onClick={(e) => setCount(e, group.type)}
              />
              <span>{ageGroup[group.type]}</span>
              <IoIosAddCircleOutline data-type='+' onClick={(e) => setCount(e, group.type)} />
            </div>
          </div>
        ))}
        <div className='ageGroup'>
          <div className='viewContentForm'>
            <span className='header'>반려동물</span>
            <span className='content'>반려동물을 동반하시나요?</span>
          </div>
          <div className='setValueForm'>
            {ageGroup.haveAnimal ? (
              <BsToggleOn className='toggleBtn active' onClick={(e) => setCount(e, 'haveAnimal')} />
            ) : (
              <BsToggleOff className='toggleBtn ' onClick={(e) => setCount(e, 'haveAnimal')} />
            )}
          </div>
        </div>
      </SearchPersonnel>
    </>
  );
};

export default NavSearchModal;

const SearchLocation = styled.div`
  display: ${({ type }) => (type.indexOf('location') !== -1 ? 'flex' : 'none')};
  position: absolute;
  align-items: center;
  top: 70px;
  width: 550px;
  height: 100px;
  padding: 30px;
  border-radius: 30px;
  background-color: white;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.2);
  transition: 1s;

  .mapIcon {
    width: 50px;
    height: 50px;
    margin-right: 20px;
  }
`;

const SearchCheckDate = styled.div`
  display: ${({ type }) => (type.indexOf('check') !== -1 ? 'flex' : 'none')};
  position: absolute;
  top: 70px;
  width: 850px;
  height: 400px;
  border-radius: 30px;
  background-color: white;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.2);
  transition: 1s;
`;

const SearchPersonnel = styled.div`
  display: ${({ type }) => (type.indexOf('personnel') !== -1 ? 'flex' : 'none')};
  position: absolute;
  flex-direction: column;
  justify-content: space-between;
  top: 70px;
  right: 1px;
  width: 400px;
  height: 300px;
  padding: 30px 40px;
  border-radius: 30px;
  background-color: white;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.2);
  transition: 1s;

  .ageGroup {
    display: flex;
    position: relative;
    justify-content: space-between;
    margin: 10px 0;

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 1px;
      top: -10px;
      left: 1px;
      border-top: 1px solid #ebebeb;
    }

    &:first-child::after {
      display: none;
    }

    .viewContentForm {
      ${flexColumn}

      .header {
        font-size: 17px;
        margin-bottom: 3px;
      }

      .content {
        font-size: 14px;
        color: #717171;
      }
    }

    .setValueForm {
      display: flex;
      justify-content: center;
      align-items: center;

      .disabled {
        color: #ebebeb;
      }

      .toggleBtn {
        width: 70px;
        height: 41px;
      }

      .active {
        color: black;
      }

      span {
        margin: 0 10px;
        font-size: 18px;
      }

      svg {
        width: 35px;
        height: 35px;
        color: #b0b0b0;
      }
    }
  }

  .layoutLine {
    width: 100;
    height: 1px;
    border-top: 1px solid #ebebeb;
  }
`;

// .tgl-ios {
//   + .tgl-btn {
//     background: #fbfbfb;
//     border-radius: 2em;
//     padding: 2px;
//     transition: all .4s ease;
//     border: 1px solid #e8eae9;
//     &:after {
//       border-radius: 2em;
//       background: #fbfbfb;
//       transition:
//         left .3s cubic-bezier(
//           0.175, 0.885, 0.320, 1.275
//         ),
//         padding .3s ease, margin .3s ease;
//       box-shadow:
//         0 0 0 1px rgba(0,0,0,.1),
//         0 4px 0 rgba(0,0,0,.08);
//     }

//     &:hover:after {
//       will-change: padding;
//     }

//     &:active {
//       box-shadow: inset 0 0 0 2em #e8eae9;
//       &:after {
//         padding-right: .8em;
//       }
//     }
//   }

//   &:checked + .tgl-btn {
//     background: #86d993;
//     &:active {
//       box-shadow: none;
//       &:after {
//         margin-left: -.8em;
//       }
//     }
//   }
// }

const AGE_GROUP = [
  {
    header: '성인',
    content: '만 13세 이상',
    type: 'adult',
  },
  {
    header: '어린이',
    content: '2~12세',
    type: 'child',
  },
  {
    header: '유아',
    content: '2세 미만',
    type: 'baby',
  },
];
