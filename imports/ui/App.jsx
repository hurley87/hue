import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Unauthenticated } from './Unauthenticated';
import { Loading } from './Loading';
import { NoGame } from './NoGame';
import { Game } from './Game';
import { GamesCollection } from "../db/GamesCollection";
import styled from 'styled-components';

export default Main = styled.div`
    width: 95%;
    margin: auto;
`;

export const App = () => {
  const { user, game, isLoading } = useTracker(() => {
    const noDataAvailable = { game: null, isLoading: true };
    const handler = Meteor.subscribe('games');

    if (!handler.ready()) {
      return { ...noDataAvailable };
    }

    const game = GamesCollection.find().fetch()[0];
    const user = Meteor.user();

    return { user, game, isLoading: false };
  });

  return (
    <Main>
      {
        isLoading ? <Loading /> : user ? (
          <div>
            {
              game ? <Game game={game} /> : <NoGame user={user} />
            }
          </div>
        ) : <Unauthenticated />
      }
    </Main>
  )
}




