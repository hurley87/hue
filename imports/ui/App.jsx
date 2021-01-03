import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Unauthenticated } from './Unauthenticated';
import { Loading } from './Loading';
import { NoGame } from './NoGame';
import { ViewGame } from './ViewGame';
import { GamesCollection } from "../db/GamesCollection"

export const App = () => {
  const logout = () => Meteor.logout();

  const { user, game, isLoading } = useTracker(() => {
    const noDataAvailable = { game: null, isLoading: true };
    const handler = Meteor.subscribe('games');

    if (!handler.ready()) {
      return { ...noDataAvailable };
    }

    const game = GamesCollection.find().fetch()[0];
    const user = Meteor.user();

    return { user, game, isLoading: false };
  })

  return (
    <div className='main'>
      {
        isLoading ? <Loading /> : user ? (
          <div>
            <h1>Hue</h1>
            <p>{user.username}</p>
            <button className='btn' onClick={logout}>logout</button>
            {
              game ? <ViewGame game={game} /> : <NoGame />
            }
          </div>
        ) : <Unauthenticated />
      }
    </div>
  )
}




