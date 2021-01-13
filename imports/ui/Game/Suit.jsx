import React from 'react';

const red = "#c41010";
const black = "#444444";
const fontSize = "3em";


export const Suit = ({ suit }) => (
    <>
        {suit === 'S' && (<span style={{ color: black, fontSize }}>♠</span>)}
        {suit === 'C' && (<span style={{ color: black, fontSize }}>♣</span>)}
        {suit === 'H' && (<span style={{ color: red, fontSize }}>♥</span>)}
        {suit === 'D' && (<span style={{ color: red, fontSize }}>♦</span>)}

    </>
);