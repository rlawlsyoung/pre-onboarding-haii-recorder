import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import GlobalStyle from './GlobalStyle';
import Play from './page/Play';
import Record from './page/Record';
import Header from './components/Header/Header';

function App() {
  const [recOn, setRecOn] = useState(true);
  return (
    <RecoilRoot>
      <GlobalStyle />
      <Header recOn={recOn} />
      <Routes>
        <Route path='/' element={<Play />} />
        <Route path='/:id' element={<Play />} />
        <Route path='/record' element={<Record recOn={recOn} setRecOn={setRecOn} />} />
      </Routes>
    </RecoilRoot>
  );
}

export default App;
