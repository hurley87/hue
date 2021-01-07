import { check } from 'meteor/check';
import { ScoresCollection } from '/imports/db/ScoresCollection';
import { GamesCollection } from '../db/GamesCollection';
 
Meteor.methods({
  'scores.insert'(score) {
    check(score, {
        winner: String,
        loser: String,
        winnerScore: Number,
        loserScore: Number,
        gameId: String,
    });

    if (!this.userId) {
        throw new Meteor.Error('Not authorized.');
    }

    let wins = 0;
    if (score.winner) wins = 1;

    try {
        Meteor.users.update(
            score.winner,
            {
                $set: {
                    updatedAt: (new Date()).toISOString(),
                },
                $inc: {
                    "profile.score": score.winnerScore,
                    "profile.wins": score.wins,
                }
            }
        )
    } catch(e) {
        console.log("Updating winner error.", e);
    }

    try {
        Meteor.users.update(
            score.loser,
            {
                $set: {
                    updatedAt: (new Date()).toISOString(),
                },
                $inc: {
                    "profile.score": score.loserScore,
                    "profile.losses": 1,
                }
            }
        )
    } catch(e) {
        console.log("Updating winner error.", e);
    }

    try {
        ScoresCollection.insert({
            winner: score.winner,
            loser: score.loser,
            winnerScore: score.winnerScore,
            loserScore: score.loserScore,
            createdAt: (new Date()).toISOString(),
        });
    } catch(e) {
        console.log("Updating score collection error", e);
    }

    GamesCollection.remove(score.gameId);
  },
});