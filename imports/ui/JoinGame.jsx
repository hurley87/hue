import React, { useState } from 'react';

export const JoinGame = () => {
    const [code, setCode] = useState('');
    const [gameId, setGameId] = useState(null);

    function updateCode(e) {
        const codeInput = e.target.value;
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
        Meteor.call('games.joinGame', gameId, (error, result) => {
            if (result) console.log(result)
        });
    }

    return (
        <div>
            <div>
                <label htmlFor="code">Enter 5-character invite code</label>
                <input
                    type="text"
                    placeholder="00000"
                    name="code"
                    required
                    value={code}
                    onChange={e => updateCode(e)}
                />
                {
                    !gameId ? null : gameId === 'no match' ? <span>no match</span> : <button onClick={() => joinGame(gameId)}>join game</button>
                }
            </div>
        </div>

    );
};