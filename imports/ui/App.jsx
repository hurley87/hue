import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { LoginForm } from './LoginForm';

export const App = () => {
  const user = useTracker(() => Meteor.user());
  const logout = () => Meteor.logout();
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(function () { setIsLoading(false) }, 2000);

  return (
    <div className='main'>
      {
        isLoading ? (
          <div>
            loading
          </div>
        ) : user ? (
          <div>
            <h1>Hue</h1>
            <button className='btn' onClick={logout}>logout</button>
          </div>
        ) : <LoginForm />
      }
    </div>
  )
}




