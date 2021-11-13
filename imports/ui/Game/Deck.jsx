import React from 'react';

export const Deck = ({ suit, value }) => (
    <img height="75px" src={`Cards/${suit}${value}.${value === 99 || value === 15 ? 'png' : 'svg'}`}/>
);