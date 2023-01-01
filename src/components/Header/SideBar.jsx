import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { clickedNameAtom, isPlayingAtom } from '../../atom';
import styled from 'styled-components';
import { ref, listAll, getDownloadURL, deleteObject } from 'firebase/storage';
import storage from '../../firebase';
import AudioBar from './AudioBar';

import { mainColor } from '../../theme';

const SideBar = ({ selectedRecord, setSelectedRecord, openSide, setOpenSide, isMessageOn }) => {
  const navigate = useNavigate();
  const [clickedName, setClickedName] = useRecoilState(clickedNameAtom);
  const setIsPlaying = useSetRecoilState(isPlayingAtom);

  const [renderCheck, setRenderCheck] = useState(true);
  const [audioList, setAudioList] = useState('');
  const audioRef = ref(storage, `audio`);

  useEffect(() => {
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
    navigate(`/${clickedName}`);
    setOpenSide(false);
  }, [selectedRecord]);

  const handlePlay = async e => {
    setClickedName(e.currentTarget.id);
    setIsPlaying(false);
    navigate(`/${clickedName}`);
    setOpenSide(false);
    try {
      const url = await getDownloadURL(ref(storage, `audio/${(storage, e.currentTarget.id)}`));
      setSelectedRecord(url);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async e => {
    const removeRef = ref(storage, `audio/${e.currentTarget.id}`);
    try {
      await deleteObject(removeRef).then(() => setRenderCheck(!renderCheck));
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
                <AudioBar
                  key={list.name}
                  index={index}
                  clickedName={clickedName}
                  listName={list.name}
                  handlePlay={handlePlay}
                  handleRemove={handleRemove}
                />
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
        margin-left: 30px;
        font-size: 20px;
        cursor: pointer;
      }
    }
    .playing {
      width: 70px;
      margin-left: 30px;
      font-size: 20px;
      font-weight: 700;
    }
  }
  ul {
    overflow-y: auto;
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
