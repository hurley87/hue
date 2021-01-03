import React, { useState } from 'react';
import { Accounts } from 'meteor/accounts-base';

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
                    <p>{error.reason}</p>
                ) : null
            }
            <form onSubmit={submit} className="login-form">
                <label htmlFor="username">Username</label>

                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    required
                    onChange={e => updateUsername(e)}
                />

                <label htmlFor="password">Password</label>

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                    onChange={e => setPassword(e.target.value)}
                />

                <button type="submit">Sign Up</button>
            </form>
        </div>

    );
};