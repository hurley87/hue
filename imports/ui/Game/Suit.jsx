import React from 'react';

const red = "#E53E3E";
const black = "#444444";
const fontSize = "1.2em";


export const Suit = ({ suit }) => (
    <>
        {suit === 'S' && (<span style={{ color: black, fontSize }}>♠</span>)}
        {suit === 'C' && (<span style={{ color: black, fontSize }}>♣</span>)}
        {suit === 'H' && (<span style={{ color: red, fontSize }}>♥</span>)}
        {suit === 'D' && (<span style={{ color: red, fontSize }}>♦</span>)}
    </>
);