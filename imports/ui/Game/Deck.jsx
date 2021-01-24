import React from 'react';
import styled, { keyframes } from 'styled-components';

const red = "#c41010";
const black = "#444444";
  
const Card = styled.span`
    font-size: 6.3em;
    

    @media only screen and (max-width: 1200px) {
        font-size: 10.3em;
    }

    @media only screen and (max-width: 800px) {
        font-size: 8.3em;
    }

    @media only screen and (max-width: 600px) {
        font-size: 5.5em;
    }

    @media only screen and (max-width: 400px) {
        font-size: 5em;
    }

    @media only screen and (max-width: 320px) {
        font-size: 4em;
    }


`;

const gradient = keyframes`
    0% {
        -webkit-filter: hue-rotate(0deg);
    }
    100% {
        -webkit-filter: hue-rotate(-360deg);
    }
`;


const Joker = styled(Card)`
	color: #f35626;
	background-image: -webkit-linear-gradient(92deg, #f35626, #feab3a);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
    -webkit-animation: ${gradient} 10s infinite linear;
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
        { suit === "J" && value === 15 && (<Joker style={{ color: black }}>🃟</Joker>)}
        {/* face down */}
        { suit === "FD" && value === 99 && (<Card style={{ color: black }}>🂠</Card>)}
    </>
);