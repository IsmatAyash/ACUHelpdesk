import React, { useEffect, useContext } from 'react';
import auth from '../../services/authService';
import { UserContext } from './../../services/UserContext';
import { useHistory } from 'react-router-dom';

const Signout = () => {
  const history = useHistory();
  const { setUser } = useContext(UserContext);
  useEffect(() => {
    auth.logout();
    setUser(null);
    history.push('/');
  }, [history, setUser]);

  return <div>Bye Bye</div>;
};

export default Signout;
