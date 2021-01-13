import React from 'react';
import styled from 'styled-components';
import { Suit } from "./Suit";

const red = "#c41010";
const black = "#444444";

const CardStyles = styled.div`
    border-radius: 5px;
    border: 1px solid #444444;
    width: ${props => 64 * props.size}px;
    height: ${props => 89 * props.size}px;
    display: block;
    position: relative;
    margin: 10px;
`;

const TopNumber = styled.div`
    position: absolute;
    left: 4px;
    top: 2px;
    font-size: ${props => props.size}px;
    color: ${props => ["H", "D"].includes(props.suit) ? red : black};
`;

const TopSymbol = styled.div`
    position: absolute;
    left: 0px;
    top: 18px;
`;

const BottomNumber = styled.div`
    position: absolute;
    right: 5px;
    bottom: 2px;
    transform: rotate(180deg);
    font-size: ${props => props.size}px;
    color: ${props => ["H", "D"].includes(props.suit) ? red : black};
`;

const BottomSymbol = styled.div`
    position: absolute;
    right: 0px;
    bottom: 18px;
    transform: rotate(180deg);
`;

const MiddleSymbol = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

// TODO: finish card logic
const convertValue = (value) => {
    switch (value) {
        case 14:
            return 'A';
        case 13:
            return 'K';
        case 12:
            return 'Q';
        case 11:
            return 'J';
        case 10:
            return '10';
        case 9:
            return '9';
        default:
            return 'Joker';
    }
}


export const Card = ({ suit, size, value }) => (
    <>
        <CardStyles size={size}>
            <TopNumber size={size * 10} suit={suit}>{convertValue(value)}</TopNumber>
            <TopSymbol><Suit size={size / 3} suit={suit} /></TopSymbol>
            <MiddleSymbol><Suit size={size} suit={suit} /></MiddleSymbol>
            <BottomSymbol><Suit size={size / 3} suit={suit} /></BottomSymbol>
            <BottomNumber size={size * 8} suit={suit}>{convertValue(value)}</BottomNumber>
        </CardStyles>
    </>
);