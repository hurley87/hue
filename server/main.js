import '/imports/api/GamesMethods';
import '/imports/api/GamesPublications';
import '/imports/api/ScoresMethods';

Accounts.onCreateUser((options, user) => {
    const customizedUser = Object.assign({
      score: 0,
      wins: 0,
      losses: 0,
      handWins: 0,
      handLosses: 0,
      euchresFor: 0,
      euchresAgainst: 0,
      timePlayed: 0,
    }, user);
  
    if (options.profile) {
      customizedUser.profile = options.profile;
    }
  
    return customizedUser;
});