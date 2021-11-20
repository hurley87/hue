import { check } from "meteor/check";
import { HandsCollection } from "../db/HandsCollection";

Meteor.methods({
  "hand.insert"(hand) {
    check(hand, {
      winnerId: String,
      loserId: String,
      gameId: String,
      maker: String,
      points: Number,
      timePlayed: Number,
    });

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    try {
      Meteor.users.update(hand.winnerId, {
        $set: {
          updatedAt: new Date().toISOString(),
        },
        $inc: {
          "profile.handWins": 1,
          "profile.euchresFor": 1,
          "profile.score": hand.points,
          "profile.makes": hand.winnerId === hand.maker ? 1 : 0,
          "profile.timePlayed": parseInt(hand.timePlayed),
        },
      });
    } catch (e) {
      console.log("Updating winner error.", e);
    }

    try {
      Meteor.users.update(hand.loserId, {
        $set: {
          updatedAt: new Date().toISOString(),
        },
        $inc: {
          "profile.handLosses": 1,
          "profile.euchresAgainst": 1,
          "profile.timePlayed": parseInt(hand.timePlayed),
        },
      });
    } catch (e) {
      console.log("Updating winner error.", e);
    }

    try {
      HandsCollection.insert({
        gameId: hand.gameId,
        winnerId: hand.winnerId,
        loserId: hand.loserId,
        points: hand.points,
        timePlayed: parseInt(hand.timePlayed),
        trump: hand.trump,
        maker: hand.maker,
        createdAt: new Date().toISOString(),
      });
    } catch (e) {
      console.log("Updating score collection error", e);
    }

    try {
      const winnerUsername = Meteor.users.findOne(hand.winnerId).username;
      const loserUsername = Meteor.users.findOne(hand.loserId).username;
      Meteor.call(
        "games.discord",
        "911394414025383936",
        `${winnerUsername} earned ${hand.points} ${
          hand.points === 1 ? "point" : "points"
        } against ${loserUsername} in ${parseInt(hand.timePlayed / 60)} minutes`
      );
    } catch (e) {
      console.log("Updating udpating Discord", e);
    }
  },
});
