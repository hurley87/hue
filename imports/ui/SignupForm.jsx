import React, { useState } from 'react';
import { Accounts } from 'meteor/accounts-base';
import styled from 'styled-components';

const Form = styled.form`
    padding: 15px;
    margin: 20px auto;
    max-width: 700px;
    display: flex;

    input {
        padding: 15px 10px;
        font-size: 14px;
        color: #333333;
        border: 0px none #000;
        border-radius: 2px;
        background: #ffffff;
        font-family: 'Montserrat', sans-serif;
        float: left;
        position: relative;
        z-index: 11;
        flex: 2;
        margin: 5px;
    }

    button {
        color: white;
        border: 0;
        line-height: inherit;
        text-decoration: none;
        cursor: pointer;
        border-radius: 3px;
        background-color: #020202;
        font-family: 'Montserrat', sans-serif;
        flex: 1;
        padding: 15px 0px;
        font-size: 14px;
        z-index: 14;
        margin: 5px;
    }
`;

const Error = styled.div`
    display: inline-block;
    margin: auto;
    font-size: 15px;
    color: #c41010;
    text-align: center;
    width: 100%;
`;

export const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const submit = e => {
        e.preventDefault();
        Accounts.createUser({
            username,
            password,
        }, function (err) {
            if (err) setError(err)
        });
    };

    function updateUsername(e) {
        setUsername(e.target.value);
        setError(null);
    }

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
                    onChange={e => updateUsername(e)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                    onChange={e => setPassword(e.target.value)}
                />

                <button type="submit">Sign Up</button>
            </Form>
        </div>

    );
};