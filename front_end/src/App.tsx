import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAction } from './actions/userActions';
import WelcomePage from './components/auth_components/WelcomePage';
import MainClient from './components/MainClient';
import { appActionsTypes, AppStateType } from './model/appModel';
import { restoreSession } from './util/authUtil';

function App() {

  const {userId, user} = useSelector((s: AppStateType) => {

    return {
      userId: s.auth.userId,
      user: s.auth.userId ? s.user.users[s.auth.userId] : undefined
    }
  }); 
  const dispatch = useDispatch();

  const content = userId ? <MainClient /> : <WelcomePage />;

  useEffect(() => {

    console.table({userId, user});

    // Attempt to restore the session if there is no userId present.
    if (!userId) {
      (async () => {

        const newUserId = await restoreSession();

        if (newUserId) dispatch<appActionsTypes>({
          type: "RECEIVE_SESSION",
          userId: newUserId
        });

      })();

    // Attempt to get the user object.
    } else if (userId && user === undefined) {
      (async () => {

        dispatch(await fetchUserAction(userId));

      })()
    }
  }, [userId]);

  return (
    <div className="App">
      { content }
    </div>
  );
}

export default App;
