import React from 'react';
import { FaTrashAlt, FaPlay } from 'react-icons/fa';
import styled from 'styled-components';

const AudioBar = ({ index, clickedName, listName, isEditing, handlePlay, handleRemove }) => {
  return (
    <StyledAudioBar className='flex-center' clickedName={clickedName} listName={listName}>
      <div className='audio-bar-wrapper'>
        <div className='date-name'>
          <span className='date'>{listName.split('|')[0]}</span>
          <span>{listName.split('|')[1]}</span>
        </div>
        {clickedName === listName ? (
          <div className='playing'>재생 중</div>
        ) : (
          <div className='btn-box'>
            <span value={index} id={listName} onClick={handlePlay}>
              <FaPlay />
            </span>
            {isEditing && (
              <span value={index} id={listName} onClick={handleRemove}>
                <FaTrashAlt />
              </span>
            )}
          </div>
        )}
      </div>
    </StyledAudioBar>
  );
};

const StyledAudioBar = styled.div`
  height: 75px;
  padding: 0 10px;
  background-color: ${({ clickedName, listName }) => clickedName == listName && '#efefef'};
  font-size: 130%;
  text-align: center;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  }

  .audio-bar-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 768px;

    .date-name {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-left: 15px;

      .date {
        font-weight: 700;
      }

      span {
        margin: 4px 0;
      }
    }

    .btn-box {
      width: 100px;
      span {
        margin: 0 15px;
        font-size: 20px;
        cursor: pointer;
      }
    }
    .playing {
      width: 70px;
      margin: 0 15px;
      font-size: 20px;
      font-weight: 700;
    }
  }
`;

export default AudioBar;
