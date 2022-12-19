import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ref, listAll, getDownloadURL, deleteObject } from 'firebase/storage';
import storage from '../../firebase';

import { mainColor } from '../../theme';

const SideBar = ({ selectedRecord, setSelectedRecord, openSide, setOpenSide, recOn, isMessageOn }) => {
  const navigate = useNavigate();
  const [renderCheck, setRenderCheck] = useState(true);
  const [clickName, setClickName] = useState('');
  const [audioList, setAudioList] = useState('');
  const [isPlay, setIsPlay] = useState(false);
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

  useEffect(() => {
    if (isPlay) {
      navigate(`/${clickName}`);
      setOpenSide(false);
    } else {
      handleRemove();
    }
  }, [selectedRecord]);

  const handlePlay = async e => {
    setClickName(e.currentTarget.id);
    setIsPlay(true);
    try {
      const url = await getDownloadURL(ref(storage, `audio/${(storage, e.currentTarget.id)}`));
      setSelectedRecord(url);
    } catch (error) {
      console.log(error);
    }
  };

  const remove = async e => {
    setClickName(e.currentTarget.id);
    setIsPlay(false);
    try {
      const url = await getDownloadURL(ref(storage, `audio/${(storage, e.currentTarget.id)}`));
      setSelectedRecord(url);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async () => {
    const removeRef = ref(storage, `audio/${clickName}`);
    try {
      await deleteObject(removeRef).then(res => setRenderCheck(!renderCheck));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {audioList && (
        <StyledSideBar openSide={openSide}>
          <div className='side-head'>녹음 리스트</div>
          <ul className='side-body'>
            {audioList.map((list, index) => {
              return (
                <li key={list.name}>
                  <div className='date-name'>
                    <span className='date'>{list.name.split('|')[0]}</span>
                    <span>{list.name.split('|')[1]}</span>
                  </div>
                  <div className='btn-box'>
                    <span value={index} id={list.name} onClick={handlePlay}>
                      재생
                    </span>
                    <span value={index} id={list.name} onClick={remove}>
                      삭제
                    </span>
                  </div>
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
        margin: 0 12.5px;
        font-size: 18px;
        font-weight: 700;
        cursor: pointer;
      }
    }
  }
  ul {
    overflow-y: auto;
    li {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      height: 75px;
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
    .date {
      font-weight: 700;
    }
    span {
      margin: 4px 0;
    }
  }
`;
