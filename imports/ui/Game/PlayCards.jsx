import React from 'react';


export const PlayCards = ({ game, renderCard }) => {
    return (
        <div>
            {
                game.handCount === 0 ? null :
                    game.handCount % 2 === 0 ? (
                        <p>{renderCard(game.deck[game.deck.length - 2].suit, game.deck[game.deck.length - 2].value)} lead {renderCard(game.deck[game.deck.length - 1].suit, game.deck[game.deck.length - 1].value)} played</p>
                    ) : (
                            <p>{renderCard(game.deck[game.deck.length - 1].suit, game.deck[game.deck.length - 1].value)} lead</p>
                        )
            }
        </div>

    );
};