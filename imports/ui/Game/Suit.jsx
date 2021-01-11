import React from 'react';
import styled from 'styled-components';

// https://codepen.io/Kaja24/pen/jazKrv

export const Suit = ({ suit, size }) => {

    const red = "#c41010";
    const black = "#444444";

    const Base = styled.div`
        width: ${24 * size}px;
        height: ${24 * size}px;
        margin: ${4.5 * size}px;
        position: relative;
        transform: rotate(45deg);
        cursor: pointer;
    `;

    const Square = styled.div`
        background-color: ${black};
        position: absolute;
        transition: all 350ms;
        width: ${24 * size}px;
        height: ${24 * size}px;
        top: ${4 * size}px;
        left: ${4 * size}px;
    `;

    return (
        <div className='Suit'>
            {
                suit === 'S' && (
                    <Base>
                        <Square />
                        <div className="circle1"></div>
                        <div className="circle2"></div>
                        <div className="tail"></div>
                    </Base>
                )
            }
            {
                suit === 'D' && (
                    <div style={baseStyle}>
                        <div className="square"></div>
                    </div>
                )
            }
            {
                suit === 'H' && (
                    <div style={baseStyle}>
                        <div className="square"></div>
                        <div className="circle1"></div>
                        <div className="circle2"></div>
                    </div>
                )
            }
            {
                suit === 'C' && (
                    <div style={baseStyle}>
                        <div className="circle1"></div>
                        <div className="circle2"></div>
                        <div className="circle3"></div>
                        <div className="tail"></div>
                    </div>
                )
            }
        </div>

    );
};