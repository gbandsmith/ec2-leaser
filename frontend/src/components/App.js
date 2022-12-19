import { Auth, Hub } from 'aws-amplify';
import { useEffect, useState } from 'react';
import LoginScreen from './LoginScreen';
import MainScreen from './MainScreen';

const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      // data contains {id, email, name, token}
      switch (event) {
        case 'signIn':
          setUser(data.signInUserSession.idToken.payload);
          break;
        case 'signOut':
          setUser(null);
          break;
        default:
          return null;
      }
    });

    Auth.currentAuthenticatedUser()
      .then(data => setUser(data.signInUserSession.idToken.payload))
      .catch(() => {throw new Error('Not signed in')});
  }, []);

  return !user ? <LoginScreen /> : <MainScreen user={user} />;
};

export default App;
