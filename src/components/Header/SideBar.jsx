import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ref, listAll, getDownloadURL, deleteObject } from 'firebase/storage';
import storage from '../../firebase';

import { mainColor } from '../../theme';

const SideBar = ({ setSelectedRecord, openSide, setOpenSide, recOn, isMessageOn }) => {
  const navigate = useNavigate();
  const [renderCheck, setRenderCheck] = useState(true);
  const [clickNum, setClickNum] = useState('');
  const [clickName, setClickName] = useState('');
  const [audioList, setAudioList] = useState('');
  const audioRef = ref(storage, `audio`);

  useEffect(() => {
    recOn &&
      (async () => {
        try {
          const { items } = await listAll(audioRef);
          setAudioList(items.reverse());
        } catch (error) {
          console.log(error);
        }
      })();
  }, [isMessageOn, renderCheck]);

  const clickList = async e => {
    if (clickNum !== e.currentTarget.value) {
      setClickNum(e.currentTarget.value);
      setClickName(e.currentTarget.id);
      try {
        const url = await getDownloadURL(ref(storage, `audio/${(storage, e.currentTarget.id)}`));
        setSelectedRecord(url);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteList = async e => {
    const removeRef = ref(storage, `audio/${clickName}`);
    try {
      await deleteObject(removeRef).then(res => setRenderCheck(!renderCheck));
      setClickNum('');
      setClickName('');
    } catch (error) {
      console.log(error);
    }
  };

  const moveHandle = () => {
    navigate(`/${clickName}`);
    setOpenSide(!openSide);
    setClickNum('');
    setClickName('');
  };

  return (
    <>
      {audioList && (
        <StyledSideBar openSide={openSide}>
          <div className='side-head'>녹음 리스트</div>
          <ul className='side-body'>
            {audioList.map((list, index) => {
              return (
                <li key={list.name} value={index} id={list.name} onClick={clickList}>
                  <div className='date-name'>
                    <span>{list.name.split('|')[0]}</span>
                    <span>{list.name.split('|')[1]}</span>
                  </div>
                  {clickNum === index && (
                    <div className='btn-box'>
                      <span onClick={moveHandle}>재생</span>
                      <span onClick={deleteList}>삭제</span>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </StyledSideBar>
      )}
    </>
  );
};

export default SideBar;

const StyledSideBar = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 100%;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: #f6f6f6;
  color: ${mainColor};
  transition: 0.3s;
  transform: translateX(${({ openSide }) => (openSide ? '-100%' : '0%')});
  z-index: 20;
  .side-head {
    width: 100%;
    height: 60px;
    background-color: ${mainColor};
    line-height: 60px;
    font-size: 160%;
    text-align: center;
    color: white;
  }
  .side-body {
    .btn-box {
      span {
        margin: 0 7px;
      }
    }
  }
  ul {
    overflow-y: auto;
    li {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      height: 10vh;
      padding: 0 10px;
      font-size: 130%;
      text-align: center;
      transition: box-shadow 0.3s;
      &:hover {
        box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
      }
    }
  }
  .date-name {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    span {
      margin: 4px 0;
    }
  }
`;
