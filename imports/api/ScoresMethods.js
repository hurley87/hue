import { check } from "meteor/check";
import { ScoresCollection } from "/imports/db/ScoresCollection";
import { GamesCollection } from "../db/GamesCollection";

Meteor.methods({
  "scores.insert"(score) {
    check(score, {
      winner: String,
      loser: String,
      winnerScore: Number,
      loserScore: Number,
      gameId: String,
    });

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    try {
      Meteor.users.update(score.winner, {
        $set: {
          updatedAt: new Date().toISOString(),
        },
        $inc: {
          "profile.score": score.winnerScore,
          "profile.wins": score.wins,
        },
      });
    } catch (e) {
      console.log("Updating winner error.", e);
    }

    try {
      Meteor.users.update(score.loser, {
        $set: {
          updatedAt: new Date().toISOString(),
        },
        $inc: {
          "profile.losses": 1,
        },
      });
    } catch (e) {
      console.log("Updating winner error.", e);
    }

    try {
      ScoresCollection.insert({
        winner: score.winner,
        loser: score.loser,
        winnerScore: score.winnerScore,
        loserScore: score.loserScore,
        gameId: score.gameId,
        createdAt: new Date().toISOString(),
      });
    } catch (e) {
      console.log("Updating score collection error", e);
    }

    try {
      const winnerUsername = Meteor.users.findOne(score.winner).username;
      const loserUsername = Meteor.users.findOne(score.loser).username;
      Meteor.call(
        "games.discord",
        "911394133631963186",
        `${winnerUsername} beat ${loserUsername} with a score of ${score.winnerScore} to ${score.loserScore}`
      );
    } catch (e) {
      console.log("Updating udpating Discord", e);
    }

    GamesCollection.remove(score.gameId);
  },
});
