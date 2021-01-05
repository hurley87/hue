import React, { useState } from 'react';
import { JoinGame } from './JoinGame';
import { NewGame } from './NewGame';


export const NoGame = ({ user }) => {
    const [showNewGame, setShowNewGame] = useState(false);
    const logout = () => Meteor.logout();

    return (
        <div>
            <h1>Hue</h1>
            <p>{user.username}</p>
            <button className='btn' onClick={logout}>logout</button>
            {
                showNewGame ? <NewGame /> : <JoinGame />
            }
            <button onClick={() => setShowNewGame(!showNewGame)}>{showNewGame ? "Have a code?" : "Create your own game"}</button>
        </div>
    );
};