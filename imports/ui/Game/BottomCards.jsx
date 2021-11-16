import React from 'react';
import styled from 'styled-components';

const Bottom = styled.div`
    position: absolute;
    bottom: 10px;
    text-align: center;
    width: 95%;
    margin: auto;
`;

const Button = styled.button`
    
    border-radius: 5px;
    cursor: pointer;
    margin: 5px;
    padding: 0px;
    border: none;
    z-index: 2;
    border: 1px solid #B366FF;
    padding: 2.8px;
    padding-bottom: 0px;
    background-color: #B366FF;

    &:disabled {
        background-color: #fbf6f1 !important;
        border: 1px solid #1A0033;
        cursor: default;
    }
`;

const SecondRow = styled.div`
    position: relative;
    right: 32px;
`;

export const BottomCards = ({ player, followsuit, game, handlePlayCard, renderCard }) => {
    return (
        <Bottom>
            <SecondRow>
                {(player.first.length === 1 || player.first.length === 2) && game.status === 'PlayCards' ? <Button style={{position: 'relative', left: '60px'}} disabled={followsuit(player, player.first[0])} onClick={() => handlePlayCard(player, player.first[0], 'first')}>{renderCard(player.first[0]?.suit, player.first[0]?.value)}</Button> : null}
                <span>{player.first.length === 2 ? <Button disabled={true} >{renderCard("FD", 99)}</Button> : null}</span>
                {(player.second.length === 1 || player.second.length === 2) && game.status === 'PlayCards' ? <Button style={{position: 'relative', left: '60px'}} disabled={followsuit(player, player.second[0])} onClick={() => handlePlayCard(player, player.second[0], 'second')}>{renderCard(player.second[0]?.suit, player.second[0]?.value)}</Button> : null}
                <span>{player.second.length === 2 ? <Button disabled={true} >{renderCard("FD", 99)}</Button> : null}</span>
                {(player.third.length === 1 || player.third.length === 2) && game.status === 'PlayCards' ? <Button style={{position: 'relative', left: '60px'}} disabled={followsuit(player, player.third[0])} onClick={() => handlePlayCard(player, player.third[0], 'third')}>{renderCard(player.third[0]?.suit, player.third[0]?.value)}</Button> : null}
                <span>{player.third.length === 2 ? <Button disabled={true} >{renderCard("FD", 99)}</Button> : null}</span>
            </SecondRow>
            <div className="firstRow">
                {player.hand.map((card, i) => (<Button key={i} disabled={followsuit(player, card)} onClick={() => handlePlayCard(player, card, 'hand')}>{renderCard(card?.suit, card?.value)}</Button>))}
            </div>
        </Bottom>
    );
};