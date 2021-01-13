import React, { useState } from 'react';
import { SignupForm } from './SignupForm';
import { LoginForm } from './LoginForm';
import styled from 'styled-components';

const Headline = styled.div`
    margin: auto;
    max-width: 1000px;
    text-align: center;

    h1 {
        font-size: 80px;
        line-height: 96px;
        font-family: "Domine";
        margin-bottom: 30px;
        color: #292827;
    }

    p {
        color: #2f2c2a;
        font-size: 28px;
        line-height: 150%;
        font-family: 'Montserrat', sans-serif;
    }
`;

const Button = styled.div`
    font-size: inherit;
    color: #141414;
    text-decoration: underline;
    background: none;
    font-size: 20px;
    font-family: 'Montserrat', sans-serif;
    margin: auto;
    display: block;
    position: relative;
    text-align: center;
    width: 100%auto;
    cursor: pointer;
    margin-top: 15px;
`;





export const Unauthenticated = () => {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <div>
            <Headline>
                <h1>Hue</h1>
                <p>Challenge your friend to a game of heads up euchre online.</p>
            </Headline>
            {
                showLogin ? <LoginForm /> : <SignupForm />
            }
            <Button onClick={() => setShowLogin(!showLogin)}>
                {showLogin ? "Need an account?" : "Already have an account?"}
            </Button>
        </div>
    );
};