import { Meteor } from "meteor/meteor";
import { GamesCollection } from "/imports/db/GamesCollection";

Meteor.publish("games.userData", function () {
  if (this.userId) {
    return Meteor.users.find(
      { _id: this.userId },
      { fields: { "profile.gameId": 1 } }
    );
  } else {
    this.ready();
  }
});

// Note: games.view is also used when editing an existing game.
Meteor.publish("games.view", function gamesView(gameId) {
  return GamesCollection.find({ _id: gameId });
});
