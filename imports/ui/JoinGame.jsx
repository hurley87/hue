import React, { useState } from 'react';
import ErrorStyle from './Styles/ErrorStyle';
import styled from 'styled-components';

const Error = styled.div`${ErrorStyle}`;

export const JoinGame = ({ setLoading }) => {
    const [code, setCode] = useState('');
    const [gameId, setGameId] = useState(null);

    function updateCode(e) {
        const codeInput = e.target?.value;
        if (codeInput.length === 5) {
            Meteor.call('games.findGameUsingCode', codeInput, (error, result) => {
                if (result) setGameId(result)
            });
            setCode(codeInput);
        } else if (codeInput.length > 5) {
            setCode(codeInput.slice(0, 5))
        } else if (codeInput.length < 5) {
            setCode(codeInput);
            setGameId(null)
        }
    }

    function joinGame(gameId) {
        setLoading(true);
        Meteor.call('games.joinGame', gameId, (error, result) => {
            if (result) console.log(result)
        });
    }

    return (
        <>
            {
                gameId && gameId === 'no match' && <Error>There's no game with that invite code.</Error>
            }
            <p htmlFor="code">Enter 5-character invite code sent to you.</p>
            <input
                type="text"
                placeholder="00000"
                name="code"
                required
                value={code}
                style={{ width: gameId && gameId !== 'no match' ? '58%' : '90%' }}
                onChange={e => updateCode(e)}
            />
            {
                gameId && gameId !== 'no match' && <button onClick={() => joinGame(gameId)}>join game</button>
            }
        </>

    );
};