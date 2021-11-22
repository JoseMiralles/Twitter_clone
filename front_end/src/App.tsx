import React from 'react';
import { useSelector } from 'react-redux';
import WelcomePage from './components/auth_components/WelcomePage';
import MainClient from './components/MainClient';
import { AppStateType } from './model/appModel';

function App() {

  const userId = useSelector((s: AppStateType) => s.auth.userId);
  const content = userId ? <MainClient /> : <WelcomePage />;

  return (
    <div className="App">
      { content }
    </div>
  );
}

export default App;
