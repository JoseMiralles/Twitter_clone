import React from 'react';
import WelcomePage from './components/auth_components/WelcomePage';

function App() {

  const userId = undefined;

  return (
    <div className="App">

      { userId === undefined && <WelcomePage/> }

    </div>
  );
}

export default App;
