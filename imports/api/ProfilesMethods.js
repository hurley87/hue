import { check } from 'meteor/check';
import { ProfilesCollection } from '../db/ProfilesCollection';
 
Meteor.methods({
  'profiles.insert'(profile) {
    check(profile, {
        username: String,
        score: Number,
        playerId: String,
        winner: Boolean,
    });

    let wins = 0;
    if (profile.winner) wins = 1;

    if (ProfilesCollection.find({ username: doc.username }).fetch().length === 0) {
        ProfilesCollection.insert({
            username: profile.username,
            playerId: profile.playerId,
            score: profile.score,
            games: 1,
            wins,
            createdAt: (new Date()).toISOString(),
        });
    } else {
        ProfilesCollection.update({ username: profile.username }, {
            $set: {
                updatedAt: (new Date()).toISOString(),
            },
            $inc: {
                score: profile.score,
                games: 1,
                wins,
            },
        });
    }
  },
});