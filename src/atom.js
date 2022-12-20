import { atom } from 'recoil';

const selectedRecordAtom = atom({
  key: 'selectedRecord',
  default: '',
});

const recOnAtom = atom({
  key: 'recOn',
  default: true,
});

const isMessageOnAtom = atom({
  key: 'isMessageOnRecord',
  default: false,
});

const clickedNameAtom = atom({
  key: 'clickedName',
  default: '',
});

export { selectedRecordAtom, recOnAtom, isMessageOnAtom, clickedNameAtom };
