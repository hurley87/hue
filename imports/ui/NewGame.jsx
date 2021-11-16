import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import ErrorStyle from './Styles/ErrorStyle';
import styled from 'styled-components';

const Error = styled.div`${ErrorStyle}`;

export const NewGame = ({ setLoading }) => {
    const [error, setError] = useState(null);

    const createGame = limit => {
        try {
            setLoading(true);
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
                error && (
                    <Error>{error.reason}</Error>
                )
            }
            <p>How many points do you need to win your game?</p>
            <button onClick={() => createGame(10)}>10</button>
            <button onClick={() => createGame(80)}>60</button>
            <button onClick={() => createGame(120)}>120</button>
        </div>

    );
};