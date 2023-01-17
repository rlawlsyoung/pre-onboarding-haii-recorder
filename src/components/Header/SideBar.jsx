import { useEffect, useState, useCallback } from 'react';
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
  const [isEditing, setIsEditing] = useState(false);
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

  const handlePlay = useCallback(async e => {
    setClickedName(e.currentTarget.id);
    setIsPlaying(false);
    setOpenSide(false);
    try {
      const url = await getDownloadURL(ref(storage, `audio/${(storage, e.currentTarget.id)}`));
      setSelectedRecord(url);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleRemove = useCallback(
    async e => {
      const removeRef = ref(storage, `audio/${e.currentTarget.id}`);
      try {
        await deleteObject(removeRef).then(() => setRenderCheck(!renderCheck));
      } catch (error) {
        console.log(error);
      }
    },
    [renderCheck]
  );

  const handleEdit = useCallback(() => {
    setIsEditing(!isEditing);
  }, [isEditing]);

  return (
    <>
      {audioList && (
        <StyledSideBar openSide={openSide}>
          <div className='side-head flex-center'>
            <div className='side-wrapper'>
              <p className='edit' onClick={handleEdit}>
                {isEditing ? '완료' : '편집'}
              </p>
              <p className='side-title'>녹음 리스트</p>
              <p className='dummy' />
            </div>
          </div>
          <ul className='side-body'>
            {audioList.map((list, index) => {
              return (
                <AudioBar
                  key={list.name}
                  index={index}
                  clickedName={clickedName}
                  listName={list.name}
                  isEditing={isEditing}
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
    font-weight: 700;
    text-align: center;
    color: white;

    .side-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 738px;
      margin: 15px;

      .edit {
        font-size: 20px;
        cursor: pointer;
      }

      .dummy {
        width: 40px;
      }
    }
  }

  ul {
    overflow-y: auto;
  }
`;

export default SideBar;
