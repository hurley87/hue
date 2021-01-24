import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import ErrorStyle from './Styles/ErrorStyle';
import styled from 'styled-components';
import MagicRainbowButton from './MagicRainbowButton';

const WrappedButton = styled(MagicRainbowButton)`

`;


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
                error ? (
                    <Error>{error.reason}</Error>
                ) : null
            }
            <p>How many points to win?</p>
            <WrappedButton onClick={() => createGame(40)}>40</WrappedButton>
            <WrappedButton onClick={() => createGame(80)}>80</WrappedButton>
            <WrappedButton onClick={() => createGame(120)}>120</WrappedButton>
        </div>

    );
};