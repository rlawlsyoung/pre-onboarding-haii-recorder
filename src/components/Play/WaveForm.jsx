import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { selectedRecordAtom, isPlayingAtom } from '../../atom';
import styled from 'styled-components';
import WaveSurfer from 'wavesurfer.js';
import PlayButton from './PlayButton';

import { mainColor } from '../../theme';

const WaveForm = () => {
  const selectedRecord = useRecoilValue(selectedRecordAtom);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingAtom);
  const [currentTime, setCurrentTime] = useState(0);
  const [fullTime, setFullTime] = useState(0);

  const waveFormRef = useRef();
  const waveSurfer = useRef(null);

  const handlePlay = () => {
    setIsPlaying(!waveSurfer.current.isPlaying());
    waveSurfer.current.playPause();
    console.log(waveSurfer.current);
  };

  const handleOnClick = () => {
    setCurrentTime(waveSurfer.current.getCurrentTime().toFixed());
  };

  useEffect(() => {
    if (waveFormRef.current) {
      waveSurfer.current = WaveSurfer.create({
        container: waveFormRef.current,
        barWidth: 3,
        barRadius: 3,
        barGap: 2,
        hideScrollbar: true,
        barMinHeight: 1,
        cursorWidth: 1,
        backend: 'WebAudio',
        height: 180,
        progressColor: mainColor,
        responsive: true,
        waveColor: '#C4C4C4',
        cursorColor: 'transparent',
      });
      waveSurfer.current.load(selectedRecord);
      waveSurfer.current.on('finish', () => {
        setIsPlaying(false);
      });
      waveSurfer.current.on('audioprocess', () => {
        setCurrentTime(waveSurfer.current.getCurrentTime().toFixed());
      });
      waveSurfer.current.on('ready', () => {
        setFullTime(waveSurfer.current.getDuration().toFixed());
        setCurrentTime(0);
      });
    }

    return () => waveSurfer.current.destroy();
  }, [selectedRecord]);

  const toMMSS = seconds => {
    var min =
      parseInt((seconds % 3600) / 60) < 10 ? '0' + parseInt((seconds % 3600) / 60) : parseInt((seconds % 3600) / 60);
    var sec = seconds % 60 < 10 ? '0' + (seconds % 60) : seconds % 60;

    return min + ':' + sec;
  };

  return (
    <WaveformContainer>
      <p className='wave-form-wrapper flex-center'>
        {toMMSS(currentTime)}
        <div className='wave-form' ref={waveFormRef} onClick={handleOnClick} />
        {toMMSS(fullTime)}
      </p>
      <PlayButton isPlaying={isPlaying} handlePlay={handlePlay} waveSurfer={waveSurfer} />
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

  .wave-form-wrapper {
    width: 100%;
    margin-bottom: 25px;
    color: rgba(0, 0, 0, 0.5);
    font-size: 18px;
    font-weight: 700;

    .wave-form {
      font-size: 30px;
      width: 100%;
      margin: 10px;
    }
  }
`;

export default WaveForm;
