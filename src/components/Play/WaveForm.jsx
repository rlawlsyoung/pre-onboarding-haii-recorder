import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { selectedRecordAtom, isPlayingAtom } from '../../atom';
import WaveSurfer from 'wavesurfer.js';
import styled from 'styled-components';

import { mainColor } from '../../theme';
import { BsFillPlayFill } from 'react-icons/bs';
import { BsFillPauseFill } from 'react-icons/bs';

const WaveForm = () => {
  const selectedRecord = useRecoilValue(selectedRecordAtom);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingAtom);

  const waveformRef = useRef();
  const wavesurfer = useRef(null);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    wavesurfer.current.playPause();
  };

  useEffect(() => {
    if (waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        barWidth: 3,
        barRadius: 3,
        barGap: 2,
        barMinHeight: 1,
        cursorWidth: 1,
        backend: 'WebAudio',
        height: 180,
        progressColor: mainColor,
        responsive: true,
        waveColor: '#C4C4C4',
        cursorColor: 'transparent',
      });
      wavesurfer.current.load(selectedRecord);
    }
    return () => wavesurfer.current.destroy();
  }, [selectedRecord]);

  return (
    <WaveformContainer>
      <Wave id='waveform' ref={waveformRef} />
      <PlayButton onClick={handlePlay}>
        {isPlaying ? <BsFillPauseFill className='pause-btn' /> : <BsFillPlayFill className='play-btn' />}
      </PlayButton>
    </WaveformContainer>
  );
};

const WaveformContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 25px;
  background: transparent;

  div {
    font-size: 30px;
  }
`;

const Wave = styled.div`
  width: 100%;
  margin: 10px 0;
`;

const PlayButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 90px;
  background: ${mainColor};
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  cursor: pointer;
  padding-bottom: 3px;

  .play-btn {
    font-size: 30px;
  }
  .pause-btn {
    font-size: 30px;
  }
`;
export default WaveForm;
