import React from 'react';
import styled from 'styled-components';
import { Rules } from '../Rules';
import Modal from 'react-modal';

Modal.setAppElement('#react-target')


const Results = styled.div`
    position: absolute;
    bottom: 0px;
    width: 95%;
    margin: auto;

    h5 {
        line-height: 40px;
    }

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
`;

export const BottomResults = ({ player, game, renderSuit }) => {
    return (
        <Results>
            <h5>
                <img src={player.avatar} />
                {player.username} {game.dealer === player.id ? <b>Dealer</b>  : null} 
                {game.maker === player.id && game.trump !== "" ? (<span>{renderSuit(game.trump)}</span>) : null}
                <span><b>{player.score} / {game.limit}</b> {" "} Tricks: {player.trick}</span>
                <Rules />
            </h5>
        </Results>
    );
};