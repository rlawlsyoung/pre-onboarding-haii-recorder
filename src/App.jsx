import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import GlobalStyle from './GrobalStyle';
import Play from './page/Play';
import Record from './page/Record';
import Header from './components/Header/Header';

function App() {
  const [recOn, setRecOn] = useState(true);
  const [isMessageOn, setIsMessageOn] = useState(false);

  return (
    <>
      <GlobalStyle />
      <RecoilRoot>
        <Header //
          recOn={recOn}
          isMessageOn={isMessageOn}
        />
        <Routes>
          <Route path='/' element={<Play />} />
          <Route path='/:id' element={<Play />} />
          <Route
            path='/record'
            element={
              <Record //
                recOn={recOn}
                setRecOn={setRecOn}
                isMessageOn={isMessageOn}
                setIsMessageOn={setIsMessageOn}
              />
            }
          />
        </Routes>
      </RecoilRoot>
    </>
  );
}

export default App;
