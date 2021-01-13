import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Card } from "./Game/Card";

export const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const submit = e => {
        e.preventDefault();
        Meteor.loginWithPassword(username, password, function (err) {
            if (err) setError(err)
        });
    };

    return (
        <div>
            {
                error ? (
                    <p>{error.reason}</p>
                ) : null
            }
            <Card size={1.5} suit={'D'} value={15} />
            <p style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '10em', color: "#c41010" }}>🃍</span>
                <span style={{ fontSize: '10em', color: "#c41010" }}>🃍</span>
                <span style={{ fontSize: '10em', color: "#c41010" }}>🃍</span>
                <span style={{ fontSize: '10em', color: "#c41010" }}>🃍</span>
                <span style={{ fontSize: '10em', color: "#c41010" }}>🃍</span>
            </p>

            <form onSubmit={submit} className="login-form">
                <label htmlFor="username">Username</label>

                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    required
                    onChange={e => setUsername(e.target.value)}
                />

                <label htmlFor="password">Password</label>

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                    onChange={e => setPassword(e.target.value)}
                />

                <button type="submit">Log In</button>
            </form>
        </div>

    );
};