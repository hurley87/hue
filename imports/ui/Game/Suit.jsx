import React from 'react';
import styled from 'styled-components';

const red = "#c41010";
const black = "#444444";

const Base = styled.div`
    width: ${props => 24 * props.size}px;
    height: ${props => 24 * props.size}px;
    margin: ${props => 4.5 * props.size}px;
    position: relative;
    transform: rotate(45deg);
    display: inline-block;
`;

const SSquare = styled.div`
    background-color: ${black};
    position: absolute;
    width: ${props => 12 * props.size}px;
    height: ${props => 12 * props.size}px;
    top: ${props => 4 * props.size}px;
    left: ${props => 4 * props.size}px;
`;

const SCircle1 = styled.div`
    background-color: ${black};
    position: absolute;
    width: ${props => 12 * props.size}px;
    height: ${props => 12 * props.size}px;
    border-radius: ${props => 6 * props.size}px;
    top: ${props => 4 * props.size}px;
    left: ${props => 10 * props.size}px;
`;

const SCircle2 = styled.div`
    background-color: ${black};
    position: absolute;
    width: ${props => 12 * props.size}px;
    height: ${props => 12 * props.size}px;
    border-radius: ${props => 6 * props.size}px;
    top: ${props => 10 * props.size}px;
    left: ${props => 4 * props.size}px;
`;

const STail = styled.div`
    position: absolute;
    width: 0;
    height: 0;
    top: ${props => 17.5 * props.size}px;
    left: ${props => 17.5 * props.size}px;
    border-top: ${props => 5 * props.size}px solid ${black};
    border-right: ${props => 5 * props.size}px solid transparent;
`;

const DSquare = styled.div`
    background-color: ${red};
    position: absolute;
    width: ${props => 16 * props.size}px;
    height: ${props => 16 * props.size}px;
    top: ${props => 4 * props.size}px;
    left: ${props => 4 * props.size}px;
`;

const HSquare = styled.div`
    background-color: ${red};
    position: absolute;
    width: ${props => 12 * props.size}px;
    height: ${props => 12 * props.size}px;
    top: ${props => 7 * props.size}px;
    left: ${props => 7 * props.size}px;
`;

const HCircle1 = styled.div`
    background-color: ${red};
    position: absolute;
    width: ${props => 12 * props.size}px;
    height: ${props => 12 * props.size}px;
    border-radius: ${props => 6 * props.size}px;
    top: ${props => 1 * props.size}px;
    left: ${props => 7 * props.size}px;
`;

const HCircle2 = styled.div`
    background-color: ${red};
    position: absolute;
    width: ${props => 12 * props.size}px;
    height: ${props => 12 * props.size}px;
    border-radius: ${props => 6 * props.size}px;
    top: ${props => 7 * props.size}px;
    left: ${props => 1 * props.size}px;
`;

const CCircle3 = styled.div`
    background-color: ${black};
    position: absolute;
    width: ${props => 12 * props.size}px;
    height: ${props => 12 * props.size}px;
    border-radius: ${props => 6 * props.size}px;
    top: ${props => 2 * props.size}px;
    left: ${props => 2 * props.size}px;
`;

const CTail = styled.div`
    position: absolute;
    width: 0;
    height: 0;
    top: ${props => 17.5 * props.size}px;
    left: ${props => 17.5 * props.size}px;
    border-top: ${props => 5 * props.size}px solid ${black};
    border-right: ${props => 5 * props.size}px solid transparent;
`;


export const Suit = ({ suit, size }) => (
    <>
        {
            suit === 'S' && (
                <Base size={size}>
                    <SSquare size={size} />
                    <SCircle1 size={size} />
                    <SCircle2 size={size} />
                    <STail size={size} />
                </Base>
            )
        }
        {
            suit === 'D' && (
                <Base size={size}>
                    <DSquare size={size} />
                </Base>
            )
        }
        {
            suit === 'H' && (
                <Base size={size}>
                    <HSquare size={size} />
                    <HCircle1 size={size} />
                    <HCircle2 size={size} />
                </Base>
            )
        }
        {
            suit === 'C' && (
                <Base size={size}>
                    <SCircle1 size={size} />
                    <SCircle2 size={size} />
                    <CCircle3 size={size} />
                    <CTail size={size} />
                </Base>
            )
        }
    </>
);