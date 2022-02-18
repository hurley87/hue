import { Meteor } from "meteor/meteor";
import { GamesCollection } from "/imports/db/GamesCollection";

Meteor.publish("games", function publishGames() {
  console.log(this.userId);
  return GamesCollection.find({
    $or: [{ "playerTwo.id": this.userId }, { "playerOne.id": this.userId }],
  });
});
