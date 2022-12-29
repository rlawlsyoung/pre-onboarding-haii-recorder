import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedRecordAtom, recOnAtom, isMessageOnAtom } from '../../atom';
import styled from 'styled-components';
import ToRecordBtn from './ToRecordBtn';
import Logo from './Logo';
import MenuBtn from './MenuBtn';
import SideBar from './SideBar';

const Header = () => {
  const [selectedRecord, setSelectedRecord] = useRecoilState(selectedRecordAtom);
  const recOn = useRecoilValue(recOnAtom);
  const isMessageOn = useRecoilValue(isMessageOnAtom);
  const [openSide, setOpenSide] = useState(false);

  return (
    <>
      <StyledHeader>
        <ToRecordBtn recOn={recOn} />
        <Logo recOn={recOn} />
        <MenuBtn //
          openSide={openSide}
          setOpenSide={setOpenSide}
          recOn={recOn}
        />
      </StyledHeader>
      <SideBar //
        selectedRecord={selectedRecord}
        setSelectedRecord={setSelectedRecord}
        openSide={openSide}
        setOpenSide={setOpenSide}
        recOn={recOn}
        isMessageOn={isMessageOn}
      />
    </>
  );
};

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  margin: 10px 0;
  height: 35px;
`;

export default Header;
