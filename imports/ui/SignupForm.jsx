import React, { useState } from 'react';
import { Accounts } from 'meteor/accounts-base';
import ErrorStyle from './Styles/ErrorStyle';
import FormStyle from './Styles/FormStyle';
import styled from 'styled-components';


const Form = styled.form`${FormStyle}`;
const Error = styled.div`${ErrorStyle}`;

export const SignupForm = ({ setLoading }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const submit = e => {
        e.preventDefault();
        setLoading(true);
        Accounts.createUser({
            username,
            password,
        }, function (err) {
            if (err) setError(err);
        });
        setLoading(false);
    };

    function updateUsername(e) {
        setUsername(e.target?.value);
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
                    onChange={e => setPassword(e.target?.value)}
                />

                <button type="submit">Sign Up</button>
            </Form>
        </div>

    );
};