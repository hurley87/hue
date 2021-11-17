import { check } from "meteor/check";
import { GamesCollection } from "../db/GamesCollection";

Meteor.methods({
  "games.insert"(limit) {
    check(limit, Number);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    const suits = ["S", "D", "H", "C"];
    const cards = [];
    let count = 9;

    while (count <= 14) {
      for (const i in suits) {
        cards.push({
          suit: suits[i],
          value: count,
        });
      }
      count += 1;
    }

    cards.push({
      suit: "J",
      value: 15,
    });

    let inviteCode = "";
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (var i = 0; i < 5; i++) {
      inviteCode += characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }

    let username = Meteor.users.findOne(this.userId).username;
    if (!username.includes(".eth"))
      username = address.slice(0, 2) + "..." + address.slice(-4);
    const avatar = Meteor.users.findOne(this.userId).profile.avatar;

    try {
      return GamesCollection.insert({
        limit,
        inviteCode,
        playerOne: {
          id: this.userId,
          username,
          avatar,
          score: 0,
          trick: 0,
          hand: [],
          first: [],
          second: [],
          third: [],
        },
        playerTwo: {
          id: "",
          username: "",
          avatar: "",
          score: 0,
          trick: 0,
          hand: [],
          first: [],
          second: [],
          third: [],
        },
        dealer: this.userId,
        maker: "",
        currentPlayer: this.userId,
        handCount: 0,
        deck: cards,
        status: "InviteSent",
        trump: "",
      });
    } catch (e) {
      throw new Meteor.Error(e);
    }
  },
  "games.remove"(taskId) {
    check(taskId, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    GamesCollection.remove(taskId);
  },
  "games.findGameUsingCode"(inviteCode) {
    check(inviteCode, String);

    const games = GamesCollection.find({ inviteCode }).fetch();

    if (games.length > 0) {
      return games[0]._id;
    } else {
      return "no match";
    }
  },
  "games.joinGame"(gameId) {
    check(gameId, String);

    const newGame = GamesCollection.findOne(gameId);
    let username = Meteor.users.findOne(this.userId).username;
    if (!username.includes(".eth"))
      username = username.slice(0, 4) + "..." + username.slice(-4);

    const avatar = Meteor.users.findOne(this.userId).profile.avatar;

    newGame.playerTwo.avatar = avatar;
    newGame.playerTwo.username = username;
    newGame.playerTwo.id = this.userId;
    newGame.status = "Deal";

    GamesCollection.update(gameId, { $set: newGame });
  },
  "games.update"(game) {
    check(game, {
      _id: String,
      limit: Number,
      playerOne: Object,
      playerTwo: Object,
      dealer: String,
      maker: String,
      handCount: Number,
      currentPlayer: String,
      deck: Array,
      status: String,
      trump: String,
      inviteCode: String,
    });

    GamesCollection.update(game._id, { $set: game });
  },
  "games.updateAvatar"(avatar) {
    check(avatar, String);

    Meteor.users.update(this.userId, {
      $set: {
        "profile.avatar": avatar,
      },
    });
  },
});
