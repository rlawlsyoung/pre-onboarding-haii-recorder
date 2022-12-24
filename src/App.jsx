import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import GlobalStyle from './GrobalStyle';
import Play from './page/Play';
import Record from './page/Record';
import Header from './components/Header/Header';

function App() {
  return (
    <>
      <GlobalStyle />
      <RecoilRoot>
        <Header />
        <Routes>
          <Route path='/' element={<Play />} />
          <Route path='/:id' element={<Play />} />
          <Route path='/record' element={<Record />} />
        </Routes>
      </RecoilRoot>
    </>
  );
}

export default App;
