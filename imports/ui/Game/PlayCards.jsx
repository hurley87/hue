import React from 'react';

const yourTurn = (game) => (<b>Your { game.handCount % 2 === 0 ? 'lead. Pick a card to play.' : 'turn.'}</b>);

export const PlayCards = ({ game, renderCard, player, opposingPlayer }) => {
    return (
        <div>
            {
                game.handCount === 0 && <p>{game.currentPlayer === player.id ? yourTurn(game) : `Waiting on ${opposingPlayer.username} to play a card.`}</p>
            }
            {
                game.handCount === 0 ? null :
                    game.handCount % 2 === 0 ? (
                        <>
                        <p>
                            {renderCard(game.deck[game.deck.length - 2]?.suit, game.deck[game.deck.length - 2]?.value)} lead and{" "}
                            {renderCard(game.deck[game.deck.length - 1]?.suit, game.deck[game.deck.length - 1]?.value)} played
                        </p>
                        <p>
                            {game.currentPlayer === player.id ? yourTurn(game) : `Waiting on ${opposingPlayer.username} to play a card.`}
                        </p>
                        </>

                    ) : (
                        <>
                        <p>{renderCard(game.deck[game.deck.length - 1]?.suit, game.deck[game.deck.length - 1]?.value)} lead</p>
                        <p>
                            {game.currentPlayer === player.id ? yourTurn(game) : `Waiting on ${opposingPlayer.username} to play a card.`}
                        </p>
                        </>
                            
                        )
            }
        </div>

    );
};