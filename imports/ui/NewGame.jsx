import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import FormStyle from './Styles/FormStyle';
import styled from 'styled-components';
import ErrorStyle from './Styles/ErrorStyle';

const Error = styled.div`${ErrorStyle}`;
const Form = styled.form`
    ${FormStyle}
    input {
        text-align: center;
    }
`;


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
                error ? (
                    <Error>{error.reason}</Error>
                ) : null
            }
            <p>How many points to win?</p>
            <button onClick={() => createGame(40)}>40</button>
            <button onClick={() => createGame(80)}>80</button>
            <button onClick={() => createGame(120)}>120</button>
        </div>

    );
};