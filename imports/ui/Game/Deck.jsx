import React from 'react';
import styled from 'styled-components';

const red = "#c41010";
const black = "#444444";

const Card = styled.span`
    font-size: 4.8em;
`;


export const Deck = ({ suit, value }) => (
    <>
        {suit === "D" && value === 14 && (<Card style={{ color: red }}>🃁</Card>)}
        {suit === "D" && value === 13 && (<Card style={{ color: red }}>🃎</Card>)}
        {suit === "D" && value === 12 && (<Card style={{ color: red }}>🃍</Card>)}
        {suit === "D" && value === 11 && (<Card style={{ color: red }}>🃋</Card>)}
        {suit === "D" && value === 10 && (<Card style={{ color: red }}>🃊</Card>)}
        {suit === "D" && value === 9 && (<Card style={{ color: red }}>🃉</Card>)}
        {suit === "H" && value === 14 && (<Card style={{ color: red }}>🂱</Card>)}
        {suit === "H" && value === 13 && (<Card style={{ color: red }}>🂾</Card>)}
        {suit === "H" && value === 12 && (<Card style={{ color: red }}>🂽</Card>)}
        {suit === "H" && value === 11 && (<Card style={{ color: red }}>🂻</Card>)}
        {suit === "H" && value === 10 && (<Card style={{ color: red }}>🂺</Card>)}
        {suit === "H" && value === 9 && (<Card style={{ color: red }}>🂹</Card>)}

        {suit === "S" && value === 14 && (<Card style={{ color: black }}>🂡</Card>)}
        {suit === "S" && value === 13 && (<Card style={{ color: black }}>🂮</Card>)}
        {suit === "S" && value === 12 && (<Card style={{ color: black }}>🂭</Card>)}
        {suit === "S" && value === 11 && (<Card style={{ color: black }}>🂫</Card>)}
        {suit === "S" && value === 10 && (<Card style={{ color: black }}>🂪</Card>)}
        {suit === "S" && value === 9 && (<Card style={{ color: black }}>🂩</Card>)}

        {suit === "C" && value === 14 && (<Card style={{ color: black }}>🃑</Card>)}
        {suit === "C" && value === 13 && (<Card style={{ color: black }}>🃞</Card>)}
        {suit === "C" && value === 12 && (<Card style={{ color: black }}>🃝</Card>)}
        {suit === "C" && value === 11 && (<Card style={{ color: black }}>🃛</Card>)}
        {suit === "C" && value === 10 && (<Card style={{ color: black }}>🃚</Card>)}
        {suit === "C" && value === 9 && (<Card style={{ color: black }}>🃙</Card>)}
        {/* joker */}
        { suit === "J" && value === 15 && (<Card style={{ color: black }}>🃟</Card>)}
        {/* face down */}
        { suit === "FD" && value === 99 && (<Card style={{ color: black }}>🂠</Card>)}
    </>
);