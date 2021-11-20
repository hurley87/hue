import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import ErrorStyle from './Styles/ErrorStyle';
import styled from 'styled-components';

const Error = styled.div`${ErrorStyle}`;

export const NewGame = ({ setLoading, user }) => {
    const [error, setError] = useState(null);

    const createGame = limit => {
        try {
            setLoading(true);
            Meteor.call('games.insert', limit, (error) => {
                if (error) setError(error)
            });
            Meteor.call("games.discord", "911394307095801866", `${user.username} just create a game up to ${limit}`)
        } catch (e) {
            setError(e)
        }

    }

    return (
        <>
            {
                error && (
                    <Error>{error.reason}</Error>
                )
            }
            <p>How many points would you like to play up to?</p>
            <button onClick={() => createGame(10)}>10</button>
            <button onClick={() => createGame(80)}>60</button>
            <button onClick={() => createGame(120)}>120</button>
        </>

    );
};