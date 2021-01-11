import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Suit } from "./Game/Suit";

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
            <Suit size={0.5} suit={"S"} />
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