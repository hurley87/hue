import React, { useState } from 'react';
import { JoinGame } from './JoinGame';
import { NewGame } from './NewGame';


export const NoGame = () => {
    const [showNewGame, setShowNewGame] = useState(false);

    return (
        <div>
            {
                showNewGame ? <NewGame /> : <JoinGame />
            }
            <button onClick={() => setShowNewGame(!showNewGame)}>{showNewGame ? "Have a code?" : "Create your own game"}</button>
        </div>
    );
};