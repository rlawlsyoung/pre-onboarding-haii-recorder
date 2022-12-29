import { atom } from 'recoil';

const selectedRecordAtom = atom({
  key: 'selectedRecord',
  default: '',
});

const isMessageOnAtom = atom({
  key: 'isMessageOnRecord',
  default: false,
});

const clickedNameAtom = atom({
  key: 'clickedName',
  default: '',
});

const isPlayingAtom = atom({
  key: 'isPlaying',
  default: false,
});

export { selectedRecordAtom, isMessageOnAtom, clickedNameAtom, isPlayingAtom };
