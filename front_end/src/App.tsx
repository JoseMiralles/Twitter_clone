import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WelcomePage from './components/auth_components/WelcomePage';
import MainClient from './components/MainClient';
import { appActionsTypes, AppStateType } from './model/appModel';
import { restoreSession } from './util/authUtil';

function App() {

  let userId = useSelector((s: AppStateType) => s.auth.userId);
  const dispatch = useDispatch();

  const content = userId ? <MainClient /> : <WelcomePage />;

  useEffect(() => {

    // Attempt to restore the session if there is no userId present.
    if (!userId) {
      (async () => {

        const newUserId = await restoreSession();
        console.log("Trying to restore session for: " + newUserId);

        if (newUserId) dispatch<appActionsTypes>({
          type: "RECEIVE_SESSION",
          userId: newUserId
        });

      })();
    }
  }, []);

  return (
    <div className="App">
      { content }
    </div>
  );
}

export default App;
