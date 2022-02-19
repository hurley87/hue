import React from 'react';
import styled from 'styled-components';
import { CardModal } from '../CardModal';

const Results = styled.div`
    b {
        background-color:#B366FF;
        color: white;
        padding: 2px 4px;
        border-radius: 3px;
        margin-right: 3px;
    }
    img {
        height: 40px;   
        width: auto;
        border-radius: 5px;
        float: left;
        margin-right: 5px;
    }
    h5 {
        position: relative;
        bottom: 5px;
        pointer-events: none;
        line-height: 40px;
    }`;

export const TopResults = ({ player, renderSuit, game }) => {
    return (
        <Results>
            <h5> 
                <CardModal cardImg={player.avatar} /> {player.username} {game.dealer === player.id ? <b>Dealer</b>  : null}{" "}
                {game.maker === player.id && game.trump !== "" ? (<span>{renderSuit(game.trump)}</span>) : null}{" "}
                <span><b>{player.score} / {game.limit}</b>{" "}Tricks: {player.trick}</span>
            </h5>
        </Results>
    );
};