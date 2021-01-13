import React from 'react';

const red = "#c41010";
const black = "#444444";
const fontSize = "7em";


export const Deck = ({ suit, value }) => (
    <>
        {suit === "D" && value === 14 && (<span style={{ color: red, fontSize }}>🃁</span>)}
        {suit === "D" && value === 13 && (<span style={{ color: red, fontSize }}>🃎</span>)}
        {suit === "D" && value === 12 && (<span style={{ color: red, fontSize }}>🃍</span>)}
        {suit === "D" && value === 11 && (<span style={{ color: red, fontSize }}>🃋</span>)}
        {suit === "D" && value === 10 && (<span style={{ color: red, fontSize }}>🃊</span>)}
        {suit === "D" && value === 9 && (<span style={{ color: red, fontSize }}>🃉</span>)}
        {suit === "H" && value === 14 && (<span style={{ color: red, fontSize }}>🂱</span>)}
        {suit === "H" && value === 13 && (<span style={{ color: red, fontSize }}>🂾</span>)}
        {suit === "H" && value === 12 && (<span style={{ color: red, fontSize }}>🂽</span>)}
        {suit === "H" && value === 11 && (<span style={{ color: red, fontSize }}>🂻</span>)}
        {suit === "H" && value === 10 && (<span style={{ color: red, fontSize }}>🂺</span>)}
        {suit === "H" && value === 9 && (<span style={{ color: red, fontSize }}>🂹</span>)}

        {suit === "S" && value === 14 && (<span style={{ color: black, fontSize }}>🂡</span>)}
        {suit === "S" && value === 13 && (<span style={{ color: black, fontSize }}>🂮</span>)}
        {suit === "S" && value === 12 && (<span style={{ color: black, fontSize }}>🂭</span>)}
        {suit === "S" && value === 11 && (<span style={{ color: black, fontSize }}>🂫</span>)}
        {suit === "S" && value === 10 && (<span style={{ color: black, fontSize }}>🂪</span>)}
        {suit === "S" && value === 9 && (<span style={{ color: black, fontSize }}>🂩</span>)}

        {suit === "C" && value === 14 && (<span style={{ color: black, fontSize }}>🃑</span>)}
        {suit === "C" && value === 13 && (<span style={{ color: black, fontSize }}>🃞</span>)}
        {suit === "C" && value === 12 && (<span style={{ color: black, fontSize }}>🃝</span>)}
        {suit === "C" && value === 11 && (<span style={{ color: black, fontSize }}>🃛</span>)}
        {suit === "C" && value === 10 && (<span style={{ color: black, fontSize }}>🃚</span>)}
        {suit === "C" && value === 9 && (<span style={{ color: black, fontSize }}>🃙</span>)}
        {/* joker */}
        { suit === "J" && value === 15 && (<span style={{ color: black, fontSize }}>🃟</span>)}
        {/* face down */}
        { suit === "FD" && value === 99 && (<span style={{ color: black, fontSize }}>🂠</span>)}
    </>
);