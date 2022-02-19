import { Meteor } from "meteor/meteor";
import { GamesCollection } from "/imports/db/GamesCollection";

Meteor.publish("games", function publishGames() {
  console.log("hello games");
  console.log(this.userId);
  return GamesCollection.find({
    $or: [{ "playerTwo.id": this.userId }, { "playerOne.id": this.userId }],
  });
});

// Note: games.view is also used when editing an existing game.
Meteor.publish("games.view", function gamesView(gameId) {
  return GamesCollection.find({ _id: gameId });
});
