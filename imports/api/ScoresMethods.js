import { check } from 'meteor/check';
import { ScoresCollection } from '/imports/db/ScoresCollection';
 
Meteor.methods({
  'scores.insert'(score) {
    check(score, {
        winner: String,
        loser: String,
        winnerScore: Number,
        loserScore: Number,
    });

    let wins = 0;
    let losses = 0;
    if (profile.winner) wins = 1;
    if (!profile.winner) losses = 1;

    Meteor.users.update(
        profile.profileId,
        {
            $set: {
                updatedAt: (new Date()).toISOString(),
            },
            $inc: {
                "profile.score": profile.score,
                "profile.games": 1,
                "profile.wins": wins,
                "profile.losses": losses,
            }
        }
    )

    ScoresCollection.insert({
        winner: score.winner,
        loser: score.loser,
        winnerScore: score.winnerScore,
        loserScore: score.loserScore,
        createdAt: (new Date()).toISOString(),
    });
  },
});