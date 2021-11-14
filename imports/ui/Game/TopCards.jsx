import React from 'react';
import styled from 'styled-components';

const Top = styled.div`
    text-align: center;
    width: 75%;
    margin: auto;
    min-height: 200px;
    position: relative;
    bottom: 40px;
`;

const SecondRow = styled.div`
    position: relative;
    right: 32px;
`;

const Button = styled.button`
    background-color: #fbf6f1;
    border-radius: 3px;
    margin: 5px;
    padding: 0px;
    border: 1px solid #1A0033;
    padding: 2.8px;
    padding-bottom: 0px;
`;

export const TopCards = ({ player, renderCover, renderCard, game }) => {
    return (
        <Top>
            <div className="firstRow">
                <p>{player.hand.map((card, i) => <Button key={i}>{renderCover()}</Button>)}</p>
            </div>
            <SecondRow className="secondRow">
                {(player.first.length === 1 || player.first.length === 2) && game.status === 'PlayCards' ? <Button style={{position: 'relative', left: '60px'}}>{renderCard(player.first[0]?.suit, player.first[0]?.value)}</Button> : null}
                {player.first.length === 2 ? <Button>{renderCover()}</Button> : null}
                {(player.second.length === 1 || player.second.length === 2) && game.status === 'PlayCards' ? <Button style={{position: 'relative', left: '60px'}}>{renderCard(player.second[0]?.suit, player.second[0]?.value)}</Button> : null}
                {player.second.length === 2 ? <Button>{renderCover()}</Button> : null}
                {(player.third.length === 1 || player.third.length === 2) && game.status === 'PlayCards' ? <Button style={{position: 'relative', left: '60px'}}>{renderCard(player.third[0]?.suit, player.third[0]?.value)}</Button> : null}
                {player.third.length === 2 ? <Button>{renderCover()}</Button> : null}
            </SecondRow>
        </Top>
    );
};