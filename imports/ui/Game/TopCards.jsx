import React from 'react';
import styled from 'styled-components';

const Top = styled.div`
    text-align: center;
    width: 95%;
    margin: auto;
    min-height: 200px;
    position: relative;
    bottom: 20px;
`;

const SecondRow = styled.div`
    position: relative;
    bottom: 20px;
`;

export const TopCards = ({ player, renderCover, renderCard, game }) => {
    return (
        <Top>
            <div className="firstRow">
                <p>{player.hand.map((card, i) => <span key={i}>{renderCover()}</span>)}</p>
            </div>
            <SecondRow className="secondRow">
                {(player.first.length === 1 || player.first.length === 2) && game.status === 'PlayCards' ? <span>{renderCard(player.first[0].suit, player.first[0].value)}</span> : null}
                <span>{player.first.length === 2 ? renderCover() : null}</span>
                {(player.second.length === 1 || player.second.length === 2) && game.status === 'PlayCards' ? <span>{renderCard(player.second[0].suit, player.second[0].value)}</span> : null}
                <span>{player.second.length === 2 ? renderCover() : null}</span>
                {(player.third.length === 1 || player.third.length === 2) && game.status === 'PlayCards' ? <span>{renderCard(player.third[0].suit, player.third[0].value)}</span> : null}
                <span>{player.third.length === 2 ? renderCover() : null}</span>
            </SecondRow>
        </Top>
    );
};