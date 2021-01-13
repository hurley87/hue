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
import _ from 'lodash';

export const Game = ({ game }) => {
    const [error, setError] = useState(null);
    const [disableCards, setDisableCards] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const deleteGame = ({ _id }) => Meteor.call('games.remove', _id);
    const renderCard = (suit, value) => <Deck suit={suit} value={value} />
    const renderSuit = suit => <Suit suit={suit} />
    const renderCover = () => <Deck suit={'FD'} value={99} />
    const dealer = () => (<span>Dealer</span>);
    const yourTurn = () => (<span>Your { game.handCount % 2 === 0 ? 'lead' : 'turn'}</span>);
    const userId = Meteor.userId();
    let currentPlayer = game.playerOne;
    let opposingPlayer = game.playerTwo;
    if (userId === game.playerTwo.id) {
        currentPlayer = game.playerTwo;
        opposingPlayer = game.playerOne;
    }

    useEffect(() => {
        async function onLoad() {
            setDisableCards(false)
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
            Meteor.call('hand.insert', hand, (error) => {
                if (error) setError(error)
            })
        } catch (e) {
            setError(e)
        }
    }


    const endGame = () => {
        let winner = game.playerOne.id;
        let loser = game.playerTwo.id;
        let winnerScore = game.playerOne.score;

        if (game.playerTwo.score > game.playerOne.score) {
            winner = game.playerTwo.id;
            loser = game.playerOne.id;
            winnerScore = game.playerTwo.score;
        }

        const score = {
            winner,
            loser,
            winnerScore,
            loserScore,
            gameId: game._id,
        };

        try {
            Meteor.call('scores.insert', score, (error) => {
                if (error) setError(error)
            })
        } catch (e) {
            setError(e)
        }
    }

    const updateGame = (game) => {
        console.log(game)
        Meteor.call('games.update', game, (err) => {
            if (err) setError(err)
        });
    };

    const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    async function handlePlayCard(player, card, hand) {
        setDisableCards(true)

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
        await pause(200);
        setDisableCards(false);
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

    const renderTopCards = (player) => (
        <div>
            <div className="firstRow">
                {player.hand.map((card, i) => <span key={i}>{renderCover()}</span>)}
            </div>
            <div className="secondRow">
                {(player.first.length === 1 || player.first.length === 2) && game.status === 'PlayCards' ? <span>{renderCard(player.first[0].suit, player.first[0].value)}</span> : null}
                <span>{player.first.length === 2 ? renderCover() : null}</span>
                {(player.second.length === 1 || player.second.length === 2) && game.status === 'PlayCards' ? <span>{renderCard(player.second[0].suit, player.second[0].value)}</span> : null}
                <span>{player.second.length === 2 ? renderCover() : null}</span>
                {(player.third.length === 1 || player.third.length === 2) && game.status === 'PlayCards' ? <span>{renderCard(player.third[0].suit, player.third[0].value)}</span> : null}
                <span>{player.third.length === 2 ? renderCover() : null}</span>
            </div>
        </div>
    );

    const renderBottomCards = (player) => (
        <div>
            <div className="secondRow">
                {(player.first.length === 1 || player.first.length === 2) && game.status === 'PlayCards' ? <button disabled={followsuit(player, player.first[0])} onClick={() => handlePlayCard(player, player.first[0], 'first')}>{renderCard(player.first[0].suit, player.first[0].value)}</button> : null}
                <span>{player.first.length === 2 ? renderCover() : null}</span>
                {(player.second.length === 1 || player.second.length === 2) && game.status === 'PlayCards' ? <button disabled={followsuit(player, player.second[0])} onClick={() => handlePlayCard(player, player.second[0], 'second')}>{renderCard(player.second[0].suit, player.second[0].value)}</button> : null}
                <span>{player.second.length === 2 ? renderCover() : null}</span>
                {(player.third.length === 1 || player.third.length === 2) && game.status === 'PlayCards' ? <button disabled={followsuit(player, player.third[0])} onClick={() => handlePlayCard(player, player.third[0], 'third')}>{renderCard(player.third[0].suit, player.third[0].value)}</button> : null}
                <span>{player.third.length === 2 ? renderCover() : null}</span>
            </div>
            <div className="firstRow">
                {player.hand.map((card, i) => (!disableCards && <button key={i} disabled={followsuit(player, card)} onClick={() => handlePlayCard(player, card, 'hand')}>{renderCard(card.suit, card.value)}</button>))}
            </div>
        </div>
    );

    const renderTopResults = (player) => (
        <div>
            <h5>{player.username} {game.dealer === player.id ? dealer() : null} {game.maker === player.id && game.trump !== "" ? (<span>{renderSuit(game.trump)}</span>) : null}</h5>
            <h1>{player.score} <small>{player.trick}</small></h1>
        </div>
    );

    const renderBottomResults = (player) => (
        <div>
            <h1>{player.score} <small>{player.trick} {game.currentPlayer === player.id && game.status === 'PlayCards' ? yourTurn() : null}</small></h1>
            <h5>{player.username} {game.dealer === player.id ? dealer() : null} {game.maker === player.id && game.trump !== "" ? (<span>{renderSuit(game.trump)}</span>) : null}</h5>
        </div>
    );

    return (
        <div>

            {
                error ? (
                    <p>{error.reason}</p>
                ) : null
            }
            game up to {game.limit} - {game.status}
            <div className="resultsTop">
                {renderTopResults(opposingPlayer)}
            </div>
            <div className='topCards'>
                {renderTopCards(opposingPlayer)}
            </div>
            {game.status === 'InviteSent' && <InviteSent game={game} />}
            {game.status === 'Deal' && <Deal game={game} updateGame={updateGame} userId={userId} />}
            {game.status === 'Order' && <Order game={game} updateGame={updateGame} renderCard={renderCard} userId={userId} />}
            {game.status === 'OrderDiscard' && <OrderDiscard game={game} updateGame={updateGame} renderCard={renderCard} userId={userId} />}
            {game.status === 'Pickup' && <Pickup game={game} updateGame={updateGame} renderCard={renderCard} userId={userId} />}
            {game.status === 'PickupDiscard' && <PickupDiscard game={game} updateGame={updateGame} renderCard={renderCard} renderSuit={renderSuit} userId={userId} />}
            {game.status === 'Make' && <Make game={game} updateGame={updateGame} renderSuit={renderSuit} userId={userId} />}
            {game.status === 'StickDealer' && <StickDealer game={game} updateGame={updateGame} renderSuit={renderSuit} userId={userId} />}
            {game.status === 'PlayCards' && <PlayCards game={game} renderCard={renderCard} />}
            {game.status === 'Over' && <Over game={game} updateGame={updateGame} userId={userId} recordHand={recordHand} />}
            {game.status === 'Final' && <Final game={game} endGame={endGame} />}
            <div className='bottomCards'>
                {renderBottomCards(currentPlayer)}
            </div>
            <div className="resultsBottom">
                {renderBottomResults(currentPlayer)}
            </div>
            <button onClick={() => deleteGame({ _id: game._id })}>delete</button>
            <div className="diamond circled">
                <div className="square"></div>
            </div>
        </div>

    );
};