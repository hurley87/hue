import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import ErrorStyle from './Styles/ErrorStyle';
import FormStyle from './Styles/FormStyle';
import styled from 'styled-components';

const Form = styled.form`${FormStyle}`;
const Error = styled.div`${ErrorStyle}`;

export const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const submit = e => {
        e.preventDefault();
        Meteor.loginWithPassword(username, password, function (err) {
            if (err) {
                setError(err);
            }
        });
    };

    return (
        <div>
            {
                error ? (
                    <Error>{error.reason}</Error>
                ) : null
            }
            <Form onSubmit={submit} className="login-form">
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    required
                    onChange={e => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                    onChange={e => setPassword(e.target.value)}
                />

                <button type="submit">Log In</button>
            </Form>
        </div>

    );
};