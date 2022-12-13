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

export { selectedRecordAtom, recOnAtom, isMessageOnAtom };
