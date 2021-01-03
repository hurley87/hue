import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';


export const NewGame = () => {
    const [error, setError] = useState(null);

    const createGame = limit => {
        try {
            Meteor.call('games.insert', limit, (error) => {
                if (error) setError(error)
            });
        } catch (e) {
            setError(e)
        }

    }

    return (
        <div>
            {
                error ? (
                    <p>{error.reason}</p>
                ) : null
            }
            <button onClick={() => createGame(40)}>40</button>
            <button onClick={() => createGame(80)}>80</button>
            <button onClick={() => createGame(120)}>120</button>
        </div>

    );
};