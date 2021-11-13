import React from 'react';

const yourTurn = (game) => (<b>Your { game.handCount % 2 === 0 ? 'lead.' : 'turn.'}</b>);

export const PlayCards = ({ game, renderCard, player, opposingPlayer }) => {
    return (
        <div>
            {
                game.handCount === 0 && <p>{game.currentPlayer === player.id ? yourTurn(game) : `It's ${opposingPlayer.username}'${opposingPlayer.username.slice(-1) !== 's' ? "s" : " "} turn.`}</p>
            }
            {
                game.handCount === 0 ? null :
                    game.handCount % 2 === 0 ? (
                        
                        <p>
                            {renderCard(game.deck[game.deck.length - 2]?.suit, game.deck[game.deck.length - 2]?.value)} lead and{" "}
                            {renderCard(game.deck[game.deck.length - 1]?.suit, game.deck[game.deck.length - 1]?.value)} played.{" "}
                            {game.currentPlayer === player.id ? yourTurn(game) : `It's ${opposingPlayer.username}'${opposingPlayer.username.slice(-1) !== 's' ? "s" : " "} turn.`}
                        </p>
                        

                    ) : (
                        
                        <p style={{paaddingTop: "60px"}}>
                            {renderCard(game.deck[game.deck.length - 1]?.suit, game.deck[game.deck.length - 1]?.value)} lead.{" "}
                            {game.currentPlayer === player.id ? yourTurn(game) : `It's ${opposingPlayer.username}'${opposingPlayer.username.slice(-1) !== 's' ? "s" : " "} turn.`}
                        </p>
                        
                            
                        )
            }
        </div>

    );
};