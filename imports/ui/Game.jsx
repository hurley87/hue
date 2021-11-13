import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { InviteSent } from "./Game/InviteSent";
import { Deal } from "./Game/Deal";
import { Order } from "./Game/Order";
import { OrderDiscard } from "./Game/OrderDiscard";
import { Pickup } from "./Game/Pickup";
import { PickupDiscard } from "./Game/PickupDiscard";
import { Make } from "./Game/Make";
import { StickDealer } from "./Game/StickDealer";
import { PlayCards } from "./Game/PlayCards";
import { Over } from "./Game/Over";
import { Final } from "./Game/Final";
import { Deck } from "./Game/Deck";
import { Suit } from "./Game/Suit";
import { TopCards } from "./Game/TopCards";
import { TopResults } from "./Game/TopResults";
import { BottomCards } from "./Game/BottomCards";
import { BottomResults } from "./Game/BottomResults";
import styled from 'styled-components';
import TransparantBtnStyle from './Styles/TransparantBtnStyle';
import _ from 'lodash';

const EndGame = styled.button`${TransparantBtnStyle}`;

const GameStyle = styled.div`
    height: 97.5vh;
    padding-top: 12px;
`;

const Main = styled.div`
    width: 95%;
    margin: auto;
    max-width: 800px;
    text-align: center;
    padding: 60px;
    border-radius: 3px;
    font-weight: 700;
    z-index: 1;
    position: relative;
    bottom: 50px;

    @media only screen and (max-width: 600px) {
        bottom: 0px;
    }

    p {
        color: #2f2c2a;
        line-height: 150%;
        font-family: 'Montserrat', sans-serif;
        text-align: center;
    }

    input {
        padding: 15px 10px;
        font-size: 14px;
        color: #333333;
        border: 0px none #1A0033;
        border-radius: 2px;
        background: #ffffff;
        font-family: 'Montserrat', sans-serif;
        margin: 5px;
        width: 62%;
        text-align: center;
        flex: 1;
    }
    button {
        color: white;
        border: 0;
        line-height: inherit;
        text-decoration: none;
        cursor: pointer;
        border-radius: 3px;
        background-color: #B366FF;
        font-family: 'Montserrat', sans-serif;
        flex: 1;
        padding: 10px 0px;
        font-size: 14px;
        z-index: 14;
        margin: 5px;
        width: 30%;
        max-width: 100px;
    }
    img {
        position: relative;
        top: 10px;
    }
`;


export const Game = ({ game }) => {
    const [startTime, setStartTime] = useState(null);
    const deleteGame = ({ _id }) => {
        const confirmed = window.confirm(
            "Are you sure you want to end this game?"
          );
      
          if (!confirmed) {
            return;
          }
      
        Meteor.call('games.remove', _id);
    } 
    const renderCard = (suit, value) => <Deck suit={suit} value={value} />
    const renderSuit = suit => <Suit suit={suit} />
    const renderCover = () => <Deck suit={'FD'} value={99} />
    const userId = Meteor.userId();
    let currentPlayer = game.playerOne;
    let opposingPlayer = game.playerTwo;
    if (userId === game.playerTwo.id) {
        currentPlayer = game.playerTwo;
        opposingPlayer = game.playerOne;
    }

    useEffect(() => {
        async function onLoad() {
            setStartTime(new Date())
        }
        onLoad();
    }, []);

    function recordHand() {
        let winnerId = game.playerOne.id;
        let loserId = game.playerTwo.id;
        let winnerScore = game.playerOne.score;
        let loserScore = game.playerTwo.score;

        if (game.playerTwo.score > game.playerOne.score) {
            winnerId = game.playerTwo.id;
            loserId = game.playerOne.id;
            winnerScore = game.playerTwo.score;
            loserScore = game.playerOne.score;
        }

        const endTime = new Date();
        const timePlayed = (endTime - startTime) / 1000;

        const hand = {
            winnerId,
            loserId,
            gameId: game._id,
            maker: game.maker,
            winnerScore,
            loserScore,
            timePlayed,
        };

        try {
            Meteor.call('hand.insert', hand)
        } catch (e) {
            alert(e);
        }
    }


    const endGame = () => {
        let winner = game.playerOne.id;
        let loser = game.playerTwo.id;
        let winnerScore = game.playerOne.score;
        let loserScore = game.playerTwo.score;

        if (game.playerTwo.score > game.playerOne.score) {
            winner = game.playerTwo.id;
            loser = game.playerOne.id;
            winnerScore = game.playerTwo.score;
            loserScore = game.playerOne.score;
        }

        const score = {
            winner,
            loser,
            winnerScore,
            loserScore,
            gameId: game._id,
        };

        try {
            Meteor.call('scores.insert', score)
        } catch (e) {
            alert(e)
        }
    }

    const updateGame = (game) => Meteor.call('games.update', game);

    async function handlePlayCard(player, card, hand) {

        const newGame = game;
        if (game.handCount % 2 !== 0) {
            if (game.currentPlayer === game.playerOne.id) {
                const playerTwoLeadCard = convertCard(game.trump, game.deck[game.deck.length - 1]);
                const playerOneReponseCard = convertCard(game.trump, card);

                if (playerTwoLeadCard.suit === game.trump) {
                    // player two and player one are both trump
                    if (playerOneReponseCard.suit === game.trump) {
                        if (playerTwoLeadCard.value < playerOneReponseCard.value) {
                            game.playerOne.trick += 1;
                            game.currentPlayer = game.playerOne.id;
                        } else {
                            game.playerTwo.trick += 1;
                            game.currentPlayer = game.playerTwo.id;
                        }
                    } else {
                        // player two is trump and player one is not trump
                        game.playerTwo.trick += 1;
                        game.currentPlayer = game.playerTwo.id;
                    }
                } else {
                    // player not not trump and player one is trump
                    if (playerOneReponseCard.suit === game.trump) {
                        game.playerOne.trick += 1;
                        game.currentPlayer = game.playerOne.id;
                    } else {
                        // player two and player one are not trump
                        if (playerTwoLeadCard.suit !== playerOneReponseCard.suit) {
                            game.playerTwo.trick += 1;
                            game.currentPlayer = game.playerTwo.id;
                        } else if (playerTwoLeadCard.value < playerOneReponseCard.value) {
                            game.playerOne.trick += 1;
                            game.currentPlayer = game.playerOne.id;
                        } else {
                            game.playerTwo.trick += 1;
                            game.currentPlayer = game.playerTwo.id;
                        }
                    }
                }
            } else {
                const playerOneLeadCard = convertCard(game.trump, game.deck[game.deck.length - 1]);
                const playerTwoReponseCard = convertCard(game.trump, card);

                if (playerOneLeadCard.suit === game.trump) {
                    // player two and player one are both trump
                    if (playerTwoReponseCard.suit === game.trump) {
                        if (playerOneLeadCard.value < playerTwoReponseCard.value) {
                            game.playerTwo.trick += 1;
                            game.currentPlayer = game.playerTwo.id;
                        } else {
                            game.playerOne.trick += 1;
                            game.currentPlayer = game.playerOne.id;
                        }
                    } else {
                        // player one is trump and player two is not trump
                        game.playerOne.trick += 1;
                        game.currentPlayer = game.playerOne.id;
                    }
                } else {
                    // player one not trump and player two is trump
                    if (playerTwoReponseCard.suit === game.trump) {
                        game.playerTwo.trick += 1;
                        game.currentPlayer = game.playerTwo.id;
                    } else {
                        // player two and player one are not trump
                        if (playerOneLeadCard.suit !== playerTwoReponseCard.suit) {
                            game.playerOne.trick += 1;
                            game.currentPlayer = game.playerOne.id;
                        } else if (playerOneLeadCard.value < playerTwoReponseCard.value) {
                            game.playerTwo.trick += 1;
                            game.currentPlayer = game.playerTwo.id;
                        } else {
                            game.playerOne.trick += 1;
                            game.currentPlayer = game.playerOne.id;
                        }
                    }
                }
            }
        } else {
            console.log('dont eval');
            newGame.currentPlayer === newGame.playerOne.id ? newGame.currentPlayer = newGame.playerTwo.id : newGame.currentPlayer = newGame.playerOne.id;
        }

        switch (hand) {
            case 'first':
                player.id === newGame.playerOne.id ? newGame.playerOne.first.splice(_.findIndex(newGame.playerOne.first, { suit: card.suit, value: card.value }), 1) : newGame.playerTwo.first.splice(_.findIndex(newGame.playerTwo.first, { suit: card.suit, value: card.value }), 1);
                newGame.deck.push(card);
                break;
            case 'second':
                player.id === newGame.playerOne.id ? newGame.playerOne.second.splice(_.findIndex(newGame.playerOne.second, { suit: card.suit, value: card.value }), 1) : newGame.playerTwo.second.splice(_.findIndex(newGame.playerTwo.second, { suit: card.suit, value: card.value }), 1);
                newGame.deck.push(card);
                break;
            case 'third':
                player.id === newGame.playerOne.id ? newGame.playerOne.third.splice(_.findIndex(newGame.playerOne.third, { suit: card.suit, value: card.value }), 1) : newGame.playerTwo.third.splice(_.findIndex(newGame.playerTwo.third, { suit: card.suit, value: card.value }), 1);
                newGame.deck.push(card);
                break;
            case 'hand':
                player.id === newGame.playerOne.id ? newGame.playerOne.hand.splice(_.findIndex(newGame.playerOne.hand, { suit: card.suit, value: card.value }), 1) : newGame.playerTwo.hand.splice(_.findIndex(newGame.playerTwo.hand, { suit: card.suit, value: card.value }), 1);
                newGame.deck.push(card);
                break;
            default:
                console.log('we have lost');
                break;
        }

        if (newGame.handCount === 21) {
            newGame.status = 'Over';
        } else {
            newGame.status = 'PlayCards';
            newGame.handCount = game.handCount + 1;
        }
        updateGame(newGame);
    };

    const convertCard = (trump, card) => {
        try {
            if (card.value === 15) {
                return { suit: trump, value: 18 };
            } else if (card.value === 11 && card.suit === trump) {
                return { suit: trump, value: 17 };
            } else if (trump === 'S' && card.value === 11 && card.suit === 'C') {
                return { suit: trump, value: 16 };
            } else if (trump === 'C' && card.value === 11 && card.suit === 'S') {
                return { suit: trump, value: 16 };
            } else if (trump === 'H' && card.value === 11 && card.suit === 'D') {
                return { suit: trump, value: 16 };
            } else if (trump === 'D' && card.value === 11 && card.suit === 'H') {
                return { suit: trump, value: 16 };
            }
            return card;
        } catch (e) {
            console.log('error converting card', e)
        }
    };

    const hasSuitToFollow = (player, suitToFollow, trump) => {
        const cardsToCheck = [];
        const playableCards = [];
        for (let i = 0; i < player.hand.length; i++) cardsToCheck.push(player.hand[i]);
        player.first.length > 0 ? cardsToCheck.push(player.first[0]) : null;
        player.second.length > 0 ? cardsToCheck.push(player.second[0]) : null;
        player.third.length > 0 ? cardsToCheck.push(player.third[0]) : null;

        for (let i = 0; i < cardsToCheck.length; i++) {
            if (convertCard(trump, cardsToCheck[i]).suit === suitToFollow) {
                playableCards.push(cardsToCheck[i]);
            }
        }
        return playableCards;
    };

    const followsuit = (player, card) => {
        const cardPlayed = game.deck[game.deck.length - 1];
        const handCard = convertCard(game.trump, card);
        const cardLead = convertCard(game.trump, cardPlayed);
        const suitToFollow = cardLead.suit;
        const playableCards = hasSuitToFollow(player, suitToFollow, game.trump);
        let bestCard = { suit: 'D', value: 1 };

        for (let i = 0; i < playableCards.length; i++) {
            const playCard = convertCard(game.trump, playableCards[i]);
            if (playCard.value > bestCard.value) {
                bestCard = playCard;
            }
        }

        if (game.currentPlayer !== player.id || game.status !== 'PlayCards') {
            return true;
        }
        if (game.handCount % 2 === 0) {
            return false;
        } else if (playableCards.length > 0) {
            if (cardPlayed.suit === 'J') {
                if (handCard.suit === bestCard.suit && handCard.value === bestCard.value) {
                    return false;
                }
                return true;
            }
            if (handCard.suit === cardLead.suit) {
                return false;
            }
            return true;
        }
        return false;
    };

    return (
        <GameStyle>
            <EndGame onClick={() => deleteGame({ _id: game._id })}>end game</EndGame>
            <TopResults player={opposingPlayer} renderSuit={renderSuit} game={game} />
            <TopCards player={opposingPlayer} renderCover={renderCover} renderCard={renderCard} game={game} />
            <Main>
            {game.status === 'InviteSent' && <InviteSent game={game} />}
            {game.status === 'Deal' && <Deal game={game} updateGame={updateGame} userId={userId} />}
            {game.status === 'Order' && <Order game={game} updateGame={updateGame} renderCard={renderCard} userId={userId} />}
            {game.status === 'OrderDiscard' && <OrderDiscard game={game} updateGame={updateGame} renderCard={renderCard} userId={userId} />}
            {game.status === 'Pickup' && <Pickup game={game} updateGame={updateGame} renderCard={renderCard} userId={userId} />}
            {game.status === 'PickupDiscard' && <PickupDiscard game={game} updateGame={updateGame} renderCard={renderCard} renderSuit={renderSuit} userId={userId} />}
            {game.status === 'Make' && <Make game={game} updateGame={updateGame} renderSuit={renderSuit} userId={userId} />}
            {game.status === 'StickDealer' && <StickDealer game={game} updateGame={updateGame} renderSuit={renderSuit} userId={userId} />}
            {game.status === 'PlayCards' && <PlayCards game={game} renderCard={renderCard} player={currentPlayer} opposingPlayer={opposingPlayer} />}
            {game.status === 'Over' && <Over game={game} updateGame={updateGame} userId={userId} recordHand={recordHand} />}
            {game.status === 'Final' && <Final game={game} endGame={endGame} />}
            </Main>
            <BottomCards player={currentPlayer} followsuit={followsuit} game={game} handlePlayCard={handlePlayCard} renderCard={renderCard} />
            <BottomResults player={currentPlayer} game={game} renderSuit={renderSuit}/>
        </GameStyle>

    );
};