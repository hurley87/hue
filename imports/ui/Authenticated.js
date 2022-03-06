import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { NoGame } from "./NoGame";
import { Game } from "./Game";
import { GamesCollection } from "../db/GamesCollection";
import { NoAssets } from "./NoAssets";

export const Authenticated = ({ user }) => {
  const { game, loading } = useTracker(() => {
    let game = null;
    let loading = null;
    if (user.profile && "gameId" in user.profile) {
      const gameId = user.profile.gameId;
      const handler = Meteor.subscribe("games.view", gameId);
      loading = !handler.ready();
      game = GamesCollection.findOne(gameId);
    }
    return { game, loading };
  });

  return (
    <>
      {loading ? (
        <div>loading ...</div>
      ) : game ? (
        <Game user={user} game={game} />
      ) : user.profile && user.profile.avatar ? (
        <NoGame user={user} />
      ) : (
        <NoAssets user={user} />
      )}
    </>
  );
};
